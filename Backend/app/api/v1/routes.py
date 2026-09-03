from datetime import datetime, timezone
from typing import Annotated
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, WebSocket, WebSocketDisconnect, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pymongo.errors import DuplicateKeyError
from ...core.realtime import manager
from ...core.security import create_access_token, decode_access_token, hash_password, verify_password
from ...db.mongo import get_database
from ...schemas import AIAnalyzeRequest, DisputeCreate, DisputeUpdate, LoginRequest, MessageCreate, RegisterRequest
from ...services import analyze_dispute_text

router = APIRouter()
bearer = HTTPBearer(auto_error=False)


def now(): return datetime.now(timezone.utc)
def db(): return get_database()
def serialize(value):
    if isinstance(value, ObjectId): return str(value)
    if isinstance(value, datetime): return value.isoformat()
    if isinstance(value, list): return [serialize(x) for x in value]
    if isinstance(value, dict): return {k: serialize(v) for k, v in value.items() if k != "password_hash"}
    return value


def current_user(credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer)]):
    if credentials is None: raise HTTPException(401, "Authentication required")
    payload = decode_access_token(credentials.credentials)
    user = db().users.find_one({"_id": ObjectId(payload["sub"])})
    if not user: raise HTTPException(401, "User no longer exists")
    return user


def dispute_for_user(dispute_id: str, user: dict):
    if not ObjectId.is_valid(dispute_id): raise HTTPException(404, "Dispute not found")
    value = db().disputes.find_one({"_id": ObjectId(dispute_id), "participant_ids": str(user["_id"])})
    if not value: raise HTTPException(404, "Dispute not found")
    return value


def audit(dispute_id, actor_id, action, metadata=None):
    db().audit_events.insert_one({"dispute_id": dispute_id, "actor_id": actor_id, "action": action, "metadata": metadata or {}, "created_at": now()})


@router.get("/health", tags=["system"])
def health_check():
    try: db().command("ping"); database = "connected"
    except Exception: database = "unavailable"
    return {"status": "ok", "message": "NIRVIVAAD API is online.", "database": database}


@router.post("/auth/register", status_code=201, tags=["authentication"])
def register(payload: RegisterRequest):
    user = {"name": payload.name, "email": payload.email.lower(), "password_hash": hash_password(payload.password), "created_at": now()}
    try: result = db().users.insert_one(user)
    except DuplicateKeyError as exc: raise HTTPException(409, "An account with this email already exists") from exc
    user["_id"] = result.inserted_id
    return {"access_token": create_access_token(str(result.inserted_id)), "token_type": "bearer", "user": serialize(user)}


@router.post("/auth/login", tags=["authentication"])
def login(payload: LoginRequest):
    user = db().users.find_one({"email": payload.email.lower()})
    if not user or not verify_password(payload.password, user["password_hash"]): raise HTTPException(401, "Incorrect email or password")
    return {"access_token": create_access_token(str(user["_id"])), "token_type": "bearer", "user": serialize(user)}


@router.get("/auth/me", tags=["authentication"])
def me(user: Annotated[dict, Depends(current_user)]): return serialize(user)


@router.get("/dashboard", tags=["dashboard"])
def dashboard(user: Annotated[dict, Depends(current_user)]):
    uid = str(user["_id"])
    counts = {item["_id"]: item["count"] for item in db().disputes.aggregate([{"$match": {"participant_ids": uid}}, {"$group": {"_id": "$status", "count": {"$sum": 1}}}])}
    recent = list(db().disputes.find({"participant_ids": uid}).sort("updated_at", -1).limit(5))
    return {"counts": counts, "recent_disputes": serialize(recent)}


@router.post("/disputes", status_code=201, tags=["disputes"])
async def create_dispute(payload: DisputeCreate, user: Annotated[dict, Depends(current_user)]):
    people = list(db().users.find({"email": {"$in": [str(x).lower() for x in payload.participant_emails]}}, {"_id": 1, "name": 1, "email": 1}))
    record = {"title": payload.title, "description": payload.description, "category": payload.category, "status": "open", "created_by": str(user["_id"]), "participant_ids": list({str(user["_id"]), *[str(x["_id"]) for x in people]}), "created_at": now(), "updated_at": now()}
    result = db().disputes.insert_one(record); record["_id"] = result.inserted_id
    audit(str(result.inserted_id), str(user["_id"]), "dispute_created")
    data = serialize(record); await manager.broadcast(str(result.inserted_id), {"type": "dispute.created", "data": data})
    return data


@router.get("/disputes", tags=["disputes"])
def list_disputes(user: Annotated[dict, Depends(current_user)], status_filter: str | None = Query(None, alias="status")):
    query = {"participant_ids": str(user["_id"])}
    if status_filter: query["status"] = status_filter
    return serialize(list(db().disputes.find(query).sort("updated_at", -1)))


@router.get("/disputes/{dispute_id}", tags=["disputes"])
def get_dispute(dispute_id: str, user: Annotated[dict, Depends(current_user)]): return serialize(dispute_for_user(dispute_id, user))


@router.patch("/disputes/{dispute_id}", tags=["disputes"])
async def update_dispute(dispute_id: str, payload: DisputeUpdate, user: Annotated[dict, Depends(current_user)]):
    dispute_for_user(dispute_id, user); changes = payload.model_dump(exclude_none=True)
    if not changes: raise HTTPException(422, "Provide at least one field to update")
    changes["updated_at"] = now(); db().disputes.update_one({"_id": ObjectId(dispute_id)}, {"$set": changes})
    data = serialize(db().disputes.find_one({"_id": ObjectId(dispute_id)})); audit(dispute_id, str(user["_id"]), "dispute_updated", {"fields": list(changes)})
    await manager.broadcast(dispute_id, {"type": "dispute.updated", "data": data}); return data


@router.get("/disputes/{dispute_id}/messages", tags=["messages"])
def list_messages(dispute_id: str, user: Annotated[dict, Depends(current_user)]):
    dispute_for_user(dispute_id, user); return serialize(list(db().messages.find({"dispute_id": dispute_id}).sort("created_at", 1)))


@router.post("/disputes/{dispute_id}/messages", status_code=201, tags=["messages"])
async def create_message(dispute_id: str, payload: MessageCreate, user: Annotated[dict, Depends(current_user)]):
    dispute_for_user(dispute_id, user)
    record = {"dispute_id": dispute_id, "body": payload.body, "author": {"id": str(user["_id"]), "name": user["name"]}, "created_at": now()}
    result = db().messages.insert_one(record); record["_id"] = result.inserted_id
    db().disputes.update_one({"_id": ObjectId(dispute_id)}, {"$set": {"updated_at": now(), "status": "in_discussion"}}); audit(dispute_id, str(user["_id"]), "message_posted")
    data = serialize(record); await manager.broadcast(dispute_id, {"type": "message.created", "data": data}); return data


@router.post("/ai/analyze", tags=["ai"])
async def analyze(payload: AIAnalyzeRequest, _: Annotated[dict, Depends(current_user)]):
    return await analyze_dispute_text(payload.text, payload.task)


@router.get("/disputes/{dispute_id}/audit", tags=["audit"])
def audit_log(dispute_id: str, user: Annotated[dict, Depends(current_user)]):
    dispute_for_user(dispute_id, user); return serialize(list(db().audit_events.find({"dispute_id": dispute_id}).sort("created_at", -1)))


@router.websocket("/realtime/disputes/{dispute_id}")
async def dispute_socket(websocket: WebSocket, dispute_id: str, token: str = Query()):
    try:
        user = db().users.find_one({"_id": ObjectId(decode_access_token(token)["sub"])}); dispute_for_user(dispute_id, user)
        if not user: raise ValueError()
    except Exception:
        await websocket.close(code=1008); return
    await manager.connect(dispute_id, websocket)
    try:
        while True: await websocket.receive_text()
    except WebSocketDisconnect: manager.disconnect(dispute_id, websocket)

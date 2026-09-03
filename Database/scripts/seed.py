"""Run with: python seed.py after configuring local MongoDB."""
from datetime import datetime, timezone
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["nirvivaad"]
db.disputes.update_one(
    {"title": "Sample dispute"},
    {"$setOnInsert": {"description": "Starter record", "category": "general", "status": "open", "created_by": "seed", "participant_ids": ["seed"], "created_at": datetime.now(timezone.utc), "updated_at": datetime.now(timezone.utc)}},
    upsert=True,
)
db.users.create_index("email", unique=True)
db.disputes.create_index([("status", 1), ("created_at", -1)])
db.messages.create_index([("dispute_id", 1), ("created_at", 1)])
print("Sample data is ready.")

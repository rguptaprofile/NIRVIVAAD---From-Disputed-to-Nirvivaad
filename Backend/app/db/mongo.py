from pymongo import ASCENDING, DESCENDING, MongoClient

# Supports both FastAPI package imports and a direct diagnostic invocation.
if __package__ in (None, ""):
    import sys
    from pathlib import Path

    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
    from app.core.config import settings
else:
    from ..core.config import settings

client = MongoClient(settings.mongodb_uri)
database = client[settings.mongodb_db_name]


def get_database():
    return database


def create_indexes() -> None:
    database.users.create_index("email", unique=True)
    database.disputes.create_index([("status", ASCENDING), ("created_at", DESCENDING)])
    database.disputes.create_index([("participant_ids", ASCENDING), ("updated_at", DESCENDING)])
    database.messages.create_index([("dispute_id", ASCENDING), ("created_at", ASCENDING)])
    database.audit_events.create_index([("dispute_id", ASCENDING), ("created_at", DESCENDING)])

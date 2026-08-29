"""Run with: python seed.py after configuring local MongoDB."""
from datetime import datetime, timezone
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["nirvivaad"]
db.disputes.update_one({"title": "Sample dispute"}, {"$setOnInsert": {"description": "Starter record", "status": "open", "createdAt": datetime.now(timezone.utc)}}, upsert=True)
print("Sample data is ready.")

"""Swappable processing contract. Production adapters must preserve confidence, provenance and model version."""
from Backend.app.services import process_document
def process(db, document_id: str, actor_id: str): return process_document(db, document_id, actor_id)

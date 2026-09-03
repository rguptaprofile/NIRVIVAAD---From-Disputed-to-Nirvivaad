"""Render entrypoint when the repository root is the service root.

Render imports this module with the repository root on PYTHONPATH. The FastAPI
application itself deliberately remains in Backend/app, so local development
and Render use the same application package.
"""
from Backend.app.main import app

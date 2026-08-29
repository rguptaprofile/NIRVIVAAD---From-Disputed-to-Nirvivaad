from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.v1.routes import router as v1_router
from .core.config import settings

app = FastAPI(title="NIRVIVAAD API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=settings.cors_origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(v1_router, prefix="/api/v1")

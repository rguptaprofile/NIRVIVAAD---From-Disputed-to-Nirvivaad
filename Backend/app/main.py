# from contextlib import asynccontextmanager
# import logging

# from fastapi import FastAPI
# from fastapi.responses import RedirectResponse
# from fastapi.middleware.cors import CORSMiddleware

# # Supports both `uvicorn app.main:app` and direct execution of this file.
# if __package__ in (None, ""):
#     import sys
#     from pathlib import Path

#     sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
#     from app.api.v1.routes import router as v1_router
#     from app.core.config import settings
#     from app.db.mongo import create_indexes
# else:
#     from .api.v1.routes import router as v1_router
#     from .core.config import settings
#     from .db.mongo import create_indexes


# logger = logging.getLogger(__name__)


# @asynccontextmanager
# async def lifespan(_: FastAPI):
#     # A database outage or an unavailable Atlas network rule must not prevent
#     # Vercel from starting the API function. Database-backed endpoints will
#     # report their own availability through /api/v1/health.
#     try:
#         create_indexes()
#     except Exception:
#         logger.exception("MongoDB index setup failed; starting API without indexes")
#     yield
#     # Keep the client open for the lifetime of the serverless worker so warm
#     # invocations can reuse the connection pool.


# app = FastAPI(title="NIRVIVAAD API", version="1.0.0", lifespan=lifespan)
# app.add_middleware(CORSMiddleware, allow_origins=settings.cors_origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
# app.include_router(v1_router, prefix="/api/v1")


# # -- This is for API routing path --
# app = FastAPI()
# @app.get("/api/v1")
# def api_root():
#     return {"message": "Nirvivaad API is working"}

# # @app.get("/", include_in_schema=False)
# # def root():
# #     """Provide a useful landing page instead of a 404 for the deployment URL."""
# #     return RedirectResponse(url="/docs")


# if __name__ == "__main__":
#     import uvicorn

#     uvicorn.run(app, host="127.0.0.1", port=8000)



















from contextlib import asynccontextmanager
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.v1.routes import router as v1_router
from .core.config import settings
from .db.mongo import create_indexes

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(_: FastAPI):
    try:
        create_indexes()
    except Exception:
        logger.exception(
            "MongoDB index setup failed; starting API without indexes"
        )

    yield


app = FastAPI(
    title="NIRVIVAAD API",
    version="1.0.0",
    lifespan=lifespan,
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# API ROUTES
# --------------------------------------------------

app.include_router(
    v1_router,
    prefix="/api/v1",
)


# --------------------------------------------------
# ROOT ENDPOINT
# --------------------------------------------------

@app.get("/", include_in_schema=False)
def root():
    return {
        "message": "NIRVIVAAD API is running"
    }


@app.get("/api/v1", include_in_schema=False)
def api_root():
    return {
        "message": "Nirvivaad API is working"
    }
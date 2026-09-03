from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

# Supports both `uvicorn app.main:app` and direct execution of this file.
if __package__ in (None, ""):
    import sys
    from pathlib import Path

    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
    from app.api.v1.routes import router as v1_router
    from app.core.config import settings
    from app.db.mongo import client, create_indexes
else:
    from .api.v1.routes import router as v1_router
    from .core.config import settings
    from .db.mongo import client, create_indexes

@asynccontextmanager
async def lifespan(_: FastAPI):
    create_indexes()
    yield
    client.close()


app = FastAPI(title="NIRVIVAAD API", version="1.0.0", lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=settings.cors_origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(v1_router, prefix="/api/v1")


@app.get("/", include_in_schema=False)
def root():
    """Provide a useful landing page instead of a 404 for the deployment URL."""
    return RedirectResponse(url="/docs")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)

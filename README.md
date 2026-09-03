# NIRVIVAAD — From Disputed to Nirvivaad

A starter monorepo with a HTML/CSS/JavaScript client, a Python FastAPI API, MongoDB persistence, and a Python AI/ML module.

## Structure

```text
Frontend/       Static web client (HTML5, CSS3, JavaScript)
Backend/        FastAPI application and API routes
Database/       MongoDB configuration, collections, and seed scripts
AI_ML/          Python ML services, models, and training scripts
Assets/         Shared images, fonts, and other static assets
```

## Quick start

1. Copy `Backend/.env.example` to `Backend/.env`, set a strong `JWT_SECRET_KEY`, and optionally add `OPENAI_API_KEY`.
2. Start MongoDB locally from `Database/` with `docker compose up -d` (or configure MongoDB Atlas).
3. Run the backend:

```powershell
cd Backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

4. Open `Frontend/index.html`. The demo calls `http://localhost:8000/api/v1/health`.

API docs: `http://localhost:8000/docs`

The backend includes JWT authentication, MongoDB persistence, dispute/message APIs, WebSocket updates (`/api/v1/realtime/disputes/{id}?token=JWT`), audit history, and a safe local AI analysis endpoint. Add the optional model API key only to `Backend/.env`; never commit it.

React is optional for now; if the UI needs routing or complex state later, add it under `Frontend/react-client/`.

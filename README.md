# NIRVIVAAD

AI-assisted land-record digitization and human verification platform.

## Run locally

1. Start MongoDB from `Database/` with `docker compose up -d`.
2. Copy `Backend/.env.example` to `Backend/.env`; for local MongoDB use `MONGODB_URI=mongodb://localhost:27017`.
3. Start the API:

```powershell
cd Backend
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

4. Copy `Frontend/.env.example` to `Frontend/.env`, set `VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1`, then run `npm install` and `npm run dev` from `Frontend`.

## Deploy

- **Vercel:** import the repository with root directory unchanged. `vercel.json` builds `Frontend` and deploys only `Frontend/dist`. Set `VITE_API_BASE_URL` to the Render API URL ending in `/api/v1`, then redeploy.
- **Render:** create a Blueprint from this repository (or a Python Web Service with root directory `Backend`). It needs an Atlas `MONGODB_URI`, a strong `JWT_SECRET_KEY`, and `ALLOWED_ORIGINS` set to the exact Vercel URL.

Do not use `localhost` in deployed variables. Render local disk is temporary; replace `/tmp` upload storage with GridFS or object storage before production use.

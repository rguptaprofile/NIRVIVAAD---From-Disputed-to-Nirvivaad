# NIRVIVAAD

AI-assisted land-record digitization and human verification platform.

## Run locally

1. Start MongoDB from `Database/` with `docker compose up -d`.
2. Copy `Backend/.env.example` to `Backend/.env`; for local MongoDB use `MONGODB_URI=`.
3. Start the API:

```powershell
cd Backend
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

4. Copy `Frontend/.env.example` to `Frontend/.env`, set `VITE_API_BASE_URL=https://nirvivaad-from-disputed-to-nirvivaad-5.onrender.com/api/v1`, then run `npm install` and `npm run dev` from `Frontend`.

## Deploy

- **Vercel:** import the repository with root directory unchanged. `vercel.json` builds `Frontend` and deploys only `Frontend/dist`. Set `VITE_API_BASE_URL` to the Render API URL ending in `/api/v1`, then redeploy.
- **Render:** create a Blueprint from this repository. For an existing manually-created service, leave Root Directory blank, use build command `python -m pip install --upgrade pip && python -m pip install --prefer-binary -r Backend/requirements.txt`, and start command `uvicorn render_start:app --host 0.0.0.0 --port $PORT`. It needs an Atlas `MONGODB_URI`, a strong `JWT_SECRET_KEY`, and `ALLOWED_ORIGINS` set to the exact Vercel URL.

Do not use `localhost` in deployed variables. Render local disk is temporary; replace `/tmp` upload storage with GridFS or object storage before production use.

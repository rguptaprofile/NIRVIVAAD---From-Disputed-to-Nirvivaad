# NIRVIVAAD

AI-assisted land-record digitization and human verification platform.

## Run locally

1. Start MongoDB from `Database/` with `docker compose up -d`.
2. Create `Backend/.env` with `MONGODB_URI=mongodb://localhost:27017`, a unique `JWT_SECRET_KEY`, and `ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173`. Do not commit this file.

   To enable administrator self-registration from the frontend, also set a strong `ADMIN_SIGNUP_CODE`. Only people with this invite code can create an administrator account.
3. Start the API:

```powershell
cd Backend
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

4. Create `Frontend/.env` with `VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1`, then run `npm install` and `npm run dev` from `Frontend`.

## Deploy

- **Vercel:** import the repository with root directory unchanged. `vercel.json` builds `Frontend` and deploys only `Frontend/dist`. Set `VITE_API_BASE_URL` to the Render API URL ending in `/api/v1`, then redeploy.
- **Render:** create a Blueprint from this repository. For an existing manually-created service, leave Root Directory blank, use build command `python -m pip install --upgrade pip && python -m pip install --prefer-binary -r requirements.txt`, and start command `uvicorn render_start:app --host 0.0.0.0 --port $PORT`. It needs an Atlas `MONGODB_URI`, a strong `JWT_SECRET_KEY`, and `ALLOWED_ORIGINS` set to the exact Vercel URL (without a trailing `/`). To create the first admin, set `BOOTSTRAP_ADMIN_EMAIL` and `BOOTSTRAP_ADMIN_PASSWORD` once; then remove the password setting.

Do not use `localhost` in deployed variables. Render local disk is temporary; replace `/tmp` upload storage with GridFS or object storage before production use.

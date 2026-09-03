# NIRVIVAAD React frontend

React + Vite application for dashboard, batch upload, verification, repository audit trails and reports.

```powershell
cd Frontend
npm install
Copy-Item .env.example .env
npm run dev
```

Set `VITE_API_BASE_URL` to FastAPI's `/api/v1` URL. Requests require a JWT from `/auth/login`, currently stored as `nirvivaad_token` in browser local storage.

@echo off
title NIRVIVAAD - Land Record AI & Verification Platform
echo ===================================================
echo   Starting NIRVIVAAD Application Suite
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Starting FastAPI Backend on https://nirvivaad-from-disputed-to-nirvivaad-5.onrender.com...
start "NIRVIVAAD Backend (Port 8000)" cmd /k "cd /d %~dp0Backend & python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

timeout /t 2 /nobreak >nul

echo [2/3] Starting Vite Frontend on https://nirvivaad.vercel.app/...
start "NIRVIVAAD Frontend (Port 5173)" cmd /k "cd /d %~dp0Frontend & npm run dev"

timeout /t 3 /nobreak >nul

echo [3/3] Opening browser at https://nirvivaad.vercel.app/...
start https://nirvivaad.vercel.app/

echo.
echo ===================================================
echo   NIRVIVAAD is now running!
echo   Frontend:  https://nirvivaad.vercel.app/
echo   Backend:   https://nirvivaad-from-disputed-to-nirvivaad-5.onrender.com
echo   API Docs:  https://nirvivaad-from-disputed-to-nirvivaad-5.onrender.com/docs
echo ===================================================

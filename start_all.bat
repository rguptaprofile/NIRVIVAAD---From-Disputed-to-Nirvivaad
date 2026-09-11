@echo off
title NIRVIVAAD - Land Record AI & Verification Platform
echo ===================================================
echo   Starting NIRVIVAAD Application Suite
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Starting FastAPI Backend on http://127.0.0.1:8000...
start "NIRVIVAAD Backend (Port 8000)" cmd /k "cd /d %~dp0Backend & python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

timeout /t 2 /nobreak >nul

echo [2/3] Starting Vite Frontend on http://localhost:5173...
start "NIRVIVAAD Frontend (Port 5173)" cmd /k "cd /d %~dp0Frontend & npm run dev"

timeout /t 3 /nobreak >nul

echo [3/3] Opening browser at http://localhost:5173...
start http://localhost:5173

echo.
echo ===================================================
echo   NIRVIVAAD is now running!
echo   Frontend:  http://localhost:5173
echo   Backend:   http://127.0.0.1:8000
echo   API Docs:  http://127.0.0.1:8000/docs
echo ===================================================

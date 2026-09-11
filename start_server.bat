@echo off
title NIRVIVAAD FastAPI Backend
cd /d "%~dp0Backend"
echo Starting FastAPI Backend at https://nirvivaad-from-disputed-to-nirvivaad-5.onrender.com...
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
pause

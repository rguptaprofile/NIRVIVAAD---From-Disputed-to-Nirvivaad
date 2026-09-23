@echo off
title NIRVIVAAD FastAPI Backend
cd /d "%~dp0Backend"
echo Starting FastAPI Backend at http://localhost:8000 (docs at http://localhost:8000/docs)...
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
pause

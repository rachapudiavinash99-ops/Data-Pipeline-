@echo off
echo Starting Data Pipeline Platform...

echo Starting Backend...
cd /d "D:\Data pipeline\backend"
start "Backend API" cmd /k ".\venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000"

echo Starting Frontend...
cd /d "D:\Data pipeline\frontend"
start "Frontend UI" cmd /k "npm run dev"

echo Done! Leave the two black windows open, and go to http://127.0.0.1:3000 in your browser.
pause

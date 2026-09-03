Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "D:\Data pipeline\backend"
WshShell.Run "cmd /c .\venv\Scripts\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000 > backend.log 2>&1", 0, False

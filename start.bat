@echo off
echo ================================================
echo   Starting BG Remover AI Application
echo ================================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8 or higher from https://www.python.org
    pause
    exit /b 1
)

echo [1/3] Checking Python installation...
python --version

:: Check if dependencies are installed
echo.
echo [2/3] Installing dependencies (if needed)...
pip install -r requirements.txt

:: Start the backend server
echo.
echo [3/3] Starting backend server...
echo.
echo ================================================
echo   Backend Server Running
echo ================================================
echo   API URL: http://localhost:5000
echo   Health Check: http://localhost:5000/api/health
echo.
echo   To access the web app:
echo   1. Open another terminal
echo   2. Run: python -m http.server 8000
echo   3. Open: http://localhost:8000
echo.
echo   Press Ctrl+C to stop the server
echo ================================================
echo.

python server.py

pause

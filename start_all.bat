@echo off
echo Starting Credvista Full Stack...

REM Check for concurrently
call npm list concurrently >nul 2>&1
if errorlevel 1 (
    echo Installing concurrently for root management...
    call npm install
)

REM Start both servers
echo.
echo Starting Frontend and Backend...
npm run dev

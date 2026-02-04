@echo off
setlocal
chcp 65001 > nul
color 0A
echo.
echo ==============================================================================
echo  _    _          _____  _____ __     __   _____
echo ^| ^|  ^| ^|   /\   ^|  __ \^|  __ \\ \   / /  / ____^|
echo ^| ^|__^| ^|  /  \  ^| ^|__) ^| ^|__) ^|\ \_/ /  ^| ^|  __  __ _ _ __ ___   ___  ___
echo ^|  __  ^| / /\ \ ^|  ___/^|  ___/  \   /   ^| ^| ^|_ ^|/ _` ^| '_ ` _ \ / _ \/ __^|
echo ^| ^|  ^| ^|/ ____ \^| ^|    ^| ^|       ^| ^|   ^| ^|__^| ^| (_^| ^| ^| ^| ^| ^| ^|  __/\__ \
echo ^|_^|  ^|_/_/    \_\_^|    ^|_^|       ^|_^|     \_____^|\__,_^|_^| ^|_^| ^|_^|\___^|^|___/
echo.
echo                            (c) 2026 HAPPY GAMES
echo                       MBTI Personality Test Launcher
echo ==============================================================================
echo.
echo [INFO] Preparing environment...

where powershell >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] PowerShell not found.
    pause
    exit /b
)

echo [INFO] Starting local server...
echo [INFO] Please keep this window open.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Server exited with code: %errorlevel%
    echo Possible causes:
    echo 1. Port blocked
    echo 2. Path contains special characters
    echo.
    pause
)

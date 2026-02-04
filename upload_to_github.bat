@echo off
setlocal
color 0A

echo =======================================================
echo          GitHub Uploader Tool (Force Mode)
echo          (c) 2026 HAPPY GAMES
echo =======================================================
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    echo Please download it from: https://git-scm.com/download/win
    pause
    exit /b
)

echo [INFO] Initializing Git repository...
if not exist ".git" (
    git init
    git branch -M main
)

REM Ensure Git user is configured for this repository
git config user.name "ZHANGYUEMIN"
git config user.email "uploader@mbti.local"

echo [INFO] Adding files...
git add .

echo [INFO] Committing changes...
git commit -m "Fresh upload" 2>nul

echo [INFO] Configuring remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/ZHANGYUEMIN/MBTI.git

echo [INFO] Pushing to GitHub (Force)...
echo.
echo [NOTE] Please sign in to GitHub if a window pops up.
echo.
git push -u origin main --force

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed!
    echo Possible causes:
    echo 1. Network connection issue
    echo 2. Authentication cancelled
    echo 3. GitHub repository does not exist
    echo.
) else (
    echo.
    echo [SUCCESS] Successfully pushed to GitHub!
    echo Repository URL: https://github.com/ZHANGYUEMIN/MBTI
    echo.
)

pause

@echo off
setlocal
color 0A

echo =======================================================
echo          GitHub Pages Deploy Tool
echo          (c) 2026 HAPPY GAMES
echo =======================================================
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    pause
    exit /b
)

echo [INFO] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed!
    pause
    exit /b
)

echo [INFO] Deploying to gh-pages...
cd dist

:: Initialize a temporary git repo in dist folder
git init
git add -A
git commit -m "Deploy to GitHub Pages"

:: Push to gh-pages branch of the main repository
echo [INFO] Pushing to remote...
echo.
echo [NOTE] Please sign in if prompted.
echo.
git push -f https://github.com/ZHANGYUEMIN/MBTI.git main:gh-pages

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Deployment failed!
) else (
    echo.
    echo [SUCCESS] Deployed successfully!
    echo Your site will be live at: https://zhangyuemin.github.io/MBTI/
    echo (It may take a few minutes to update)
)

cd ..
pause

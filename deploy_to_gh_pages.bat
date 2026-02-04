@echo off
setlocal
color 0A

echo =======================================================
echo          GitHub Pages Deploy Tool (Clean Build)
echo          (c) 2026 HAPPY GAMES
echo =======================================================
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    pause
    exit /b
)

echo [INFO] Cleaning up old build...
if exist "dist" rd /s /q "dist"

echo [INFO] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed!
    pause
    exit /b
)

echo [INFO] Deploying to gh-pages...
cd dist

:: Disable Jekyll processing
type nul > .nojekyll

:: Initialize a fresh git repo
git init

:: Configure temp user
git config user.name "DeployBot"
git config user.email "deploy@local"

git add -A
git commit -m "Deploy to GitHub Pages"

:: Push to gh-pages branch of the main repository (Force Update)
echo [INFO] Pushing to remote...
echo.
echo [NOTE] Please sign in if prompted.
echo.

git push -f https://github.com/ZHANGYUEMIN/MBTI.git HEAD:gh-pages

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

@echo off
setlocal
chcp 65001 > nul
color 0A

echo =======================================================
echo          GitHub 上传助手 (GitHub Uploader)
echo               (c) 2026 HAPPY GAMES
echo =======================================================
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] 未检测到 Git！
    echo.
    echo 请先下载并安装 Git: https://git-scm.com/download/win
    echo 安装完成后，请重新运行此脚本。
    echo.
    pause
    exit /b
)

echo [INFO] 正在初始化 Git 仓库...
if not exist ".git" (
    git init
    git branch -M main
)

echo [INFO] 添加文件...
git add .

echo [INFO] 提交更改...
git commit -m "Initial commit: MBTI Personality Test Project"

echo [INFO] 配置远程仓库...
git remote remove origin 2>nul
git remote add origin https://github.com/ZHANGYUEMIN/MBTI.git

echo [INFO] 正在推送到 GitHub...
echo.
echo [注意] 如果弹出登录窗口，请在浏览器中完成授权。
echo.
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] 推送失败！
    echo 可能的原因：
    echo 1. 仓库地址不存在或无权限
    echo 2. 网络连接问题
    echo 3. 登录验证取消
    echo.
) else (
    echo.
    echo [SUCCESS] 代码已成功上传到 GitHub！
    echo 仓库地址: https://github.com/ZHANGYUEMIN/MBTI
    echo.
)

pause

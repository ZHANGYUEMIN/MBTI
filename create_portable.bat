@echo off
setlocal
chcp 65001 > nul
color 0A

echo ==============================================================================
echo  _    _          _____  _____ __     __   _____
echo ^| ^|  ^| ^|   /\   ^|  __ \^|  __ \\ \   / /  / ____^|
echo ^| ^|__^| ^|  /  \  ^| ^|__) ^| ^|__) ^|\ \_/ /  ^| ^|  __  __ _ _ __ ___   ___  ___
echo ^|  __  ^| / /\ \ ^|  ___/^|  ___/  \   /   ^| ^| ^|_ ^|/ _` ^| '_ ` _ \ / _ \/ __^|
echo ^| ^|  ^| ^|/ ____ \^| ^|    ^| ^|       ^| ^|   ^| ^|__^| ^| (_^| ^| ^| ^| ^| ^| ^|  __/\__ \
echo ^|_^|  ^|_/_/    \_\_^|    ^|_^|       ^|_^|     \_____^|\__,_^|_^| ^|_^| ^|_^|\___^|^|___/
echo.
echo                            (c) 2026 HAPPY GAMES
echo                         Portable Builder Tool v1.0
echo ==============================================================================
echo.

echo [1/4] 正在构建 Vue 项目...
call npm run build
if %errorlevel% neq 0 (
    echo 构建失败！请确保已安装 Node.js 并运行了 npm install。
    pause
    exit /b 1
)

echo [2/4] 创建便携版目录...
set "OUT_DIR=MBTI_Portable"
if exist "%OUT_DIR%" rd /s /q "%OUT_DIR%"
mkdir "%OUT_DIR%"
mkdir "%OUT_DIR%\www"

echo [3/4] 复制文件...
xcopy /s /e /y "dist\*.*" "%OUT_DIR%\www\" > nul
copy /y "server_template.ps1" "%OUT_DIR%\server.ps1" > nul
copy /y "launcher_template.bat" "%OUT_DIR%\启动测试.bat" > nul
copy /y "便携版使用说明.md" "%OUT_DIR%\使用说明.txt" > nul

echo [4/4] 正在打包为 ZIP...
powershell -Command "Compress-Archive -Path '%OUT_DIR%' -DestinationPath '%OUT_DIR%.zip' -Force"

echo.
echo ==========================================
echo 便携版制作完成！
echo.
echo [文件夹] %OUT_DIR%
echo [压缩包] %OUT_DIR%.zip
echo.
echo 使用方法:
echo 1. 将 %OUT_DIR%.zip 发送给用户
echo 2. 用户解压后双击 "启动测试.bat" 即可运行
echo ==========================================
pause

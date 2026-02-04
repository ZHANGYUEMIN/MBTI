# MBTI 人格测试 (Vue 3 + PowerShell)

(c) 2026 HAPPY GAMES

这是一个基于 Vue 3 开发的现代 MBTI 人格测试应用，并配备了 PowerShell 启动器，支持在 Windows 上离线运行。

## 🌟 主要功能

- **便携设计**：无需安装，支持 U 盘携带，即插即用。
- **现代界面**：基于 Vue 3 和 Vite 构建，提供流畅的动画和响应式体验。
- **离线可用**：内置轻量级 PowerShell HTTP 服务器 (`server.ps1`)。
- **零依赖**：用户无需安装 Node.js 或 Python，仅需 Windows 10/11 系统自带组件。
- **双语支持**：内置中英文切换功能。

## 🛠️ 项目结构

- `src/`: Vue 3 源代码目录。
- `launcher_template.bat`: Windows 启动脚本模板。
- `server_template.ps1`: PowerShell 静态文件服务器模板。
- `create_portable.bat`: 用于生成便携版的构建脚本。

## 🚀 在线体验

👉 [点击这里开始测试](https://zhangyuemin.github.io/MBTI/)

## 📦 如何使用（便携版）

1. 下载最新的 `MBTI_Portable` 压缩包（如果有）。
2. 解压后双击 `启动测试.bat`。
3. 应用将在默认浏览器中自动打开。

## 💻 开发者指南

### 环境要求

- Node.js (v16+)
- npm

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

### 构建便携版

在根目录下运行 `create_portable.bat` 脚本：

```cmd
.\create_portable.bat
```

该脚本会自动：
1. 构建 Vue 项目 (`npm run build`)。
2. 创建 `MBTI_Portable` 目录。
3. 复制所有必要文件。
4. 生成可直接分发的便携包。

## 📄 版权信息

(c) 2026 HAPPY GAMES. All Rights Reserved.

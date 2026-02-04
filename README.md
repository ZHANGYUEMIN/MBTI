# MBTI Personality Test (Vue 3 + PowerShell)

(c) 2026 HAPPY GAMES

A modern, portable MBTI personality test application built with Vue 3 and wrapped with a custom PowerShell launcher for offline usage on Windows.

## 🌟 Features

- **Portable Design**: Runs directly from a USB drive or local folder without installation.
- **Modern UI**: Built with Vue 3 and Vite for a smooth, responsive experience.
- **Offline Ready**: Includes a lightweight PowerShell-based HTTP server (`server.ps1`).
- **No Dependencies**: Users don't need to install Node.js or Python; only Windows 10/11 built-in components are required.

## 🛠️ Project Structure

- `src/`: Vue 3 source code.
- `launcher_template.bat`: Template for the Windows batch launcher.
- `server_template.ps1`: Template for the PowerShell static file server.
- `create_portable.bat`: Build script to generate the portable version.

## 🚀 Development

### Prerequisites

- Node.js (v16+)
- npm

### Setup

```bash
npm install
```

### Local Development

```bash
npm run dev
```

### Build Portable Version

Run the `create_portable.bat` script in the root directory:

```cmd
.\create_portable.bat
```

This will:
1. Build the Vue project (`npm run build`).
2. Create the `MBTI_Portable` folder.
3. Copy all necessary assets and scripts.
4. Generate a ready-to-distribute portable package.

## 📦 Usage (Portable Version)

1. Open the `MBTI_Portable` folder.
2. Double-click `启动测试.bat`.
3. The application will launch in your default browser.

## 📄 License

(c) 2026 HAPPY GAMES. All Rights Reserved.

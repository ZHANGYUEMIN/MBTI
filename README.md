# MBTI 人格测试 (MBTI Personality Test)

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)

一个现代、美观且响应式的 MBTI 16型人格测试应用。支持中英双语，提供快速版（30题）和详细版（60题）两种测试模式。

🌐 **在线体验**: [https://zhangyuemin.github.io/MBTI/](https://zhangyuemin.github.io/MBTI/)

---

## ✨ 功能特色

*   **双语支持**: 🇨🇳 中文 / 🇺🇸 English 一键切换
*   **双模式测试**:
    *   ⚡ **快速版**: 30道精选题目，3分钟快速测出结果。
    *   🧠 **详细版**: 60道深度题目，更精准的性格剖析。
*   **精美 UI**:
    *   支持 🌞 浅色 / 🌙 深色模式（自动跟随系统）。
    *   采用玻璃拟态 (Glassmorphism) 设计风格。
    *   丝滑的转场与启动动画。
*   **专业报告**:
    *   动态生成的个性化评语。
    *   详细的维度分析图表 (E/I, S/N, T/F, J/P)。
    *   支持一键生成结果图片并保存。
*   **移动端适配**: 完美适配手机、平板和桌面端。

---

## 🚀 如何使用

### 方式一：在线访问 (推荐)
直接点击访问 GitHub Pages 部署版本：
👉 [**开始测试**](https://zhangyuemin.github.io/MBTI/)

### 方式二：下载便携版 (离线运行)
如果您需要在没有网络的环境下使用，或想分享给朋友：
1. 下载最新的 `MBTI_Portable.zip` 压缩包。
2. 解压整个文件夹。
3. 双击运行 **`启动测试.bat`**。
4. 浏览器会自动打开测试页面。

---

## 🛠️ 开发者指南

如果您想修改源码或进行二次开发：

### 1. 环境准备
确保您已安装 [Node.js](https://nodejs.org/) (v16+)。

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 构建项目
```bash
# 构建网页版
npm run build

# 构建便携版 (Windows)
.\create_portable.bat

# 部署到 GitHub Pages
.\deploy_to_gh_pages.bat
```

---

## 📁 项目结构

```
src/
├── data/           # 题目数据 (questions_simple.js, etc.)
├── i18n/           # 国际化语言包 (zh.json, en.json)
├── stores/         # Pinia 状态管理
├── views/          # 页面组件 (Home, Test, Result)
├── App.vue         # 根组件
└── style.css       # 全局样式
```

---

(c) 2026 HAPPY GAMES. All rights reserved.

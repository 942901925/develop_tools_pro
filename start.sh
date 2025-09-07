#!/bin/bash

# Develop Tools Pro 启动脚本

echo "🚀 正在启动 Develop Tools Pro..."
echo ""

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js"
    echo "请先安装 Node.js (版本 >= 16.0.0)"
    echo "下载地址: https://nodejs.org/"
    exit 1
fi

# 检查 npm 是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm"
    echo "请先安装 npm"
    exit 1
fi

# 检查 Node.js 版本
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ 错误: Node.js 版本过低"
    echo "当前版本: $(node -v)"
    echo "需要版本: >= 16.0.0"
    exit 1
fi

echo "✅ Node.js 版本检查通过: $(node -v)"
echo "✅ npm 版本: $(npm -v)"
echo ""

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
    echo ""
fi

# 启动开发服务器
echo "🔥 启动开发服务器..."
echo "🌐 项目将在 http://localhost:3000 打开"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

npm run dev

# Develop Tools Pro (DTP)

一个现代化的开发者工具集合网站，采用 Bento Grid 设计风格，为开发者提供高效、便捷的在线工具体验。

## ✨ 特性

- 🎨 **现代化设计** - 采用 Bento Grid 布局，视觉清爽，交互流畅
- 🛠️ **30+ 实用工具** - 涵盖 JSON、时间、编码、文本处理等多个类别
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **纯前端实现** - 无需后端，所有功能在浏览器端完成
- 🔍 **智能搜索** - 支持工具名称、描述、分类的模糊搜索
- 🎯 **分类筛选** - 按工具类别快速筛选

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看项目

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 🛠️ 工具列表

### JSON工具
- **JSON格式化** - 格式化、压缩、验证JSON数据
- **JSON转YAML** - JSON与YAML格式互转
- **JSON Schema生成** - 根据JSON数据生成Schema

### 时间工具
- **时间戳转换** - Unix时间戳与日期互转
- **时间计算器** - 日期加减、时区转换
- **倒计时器** - 自定义倒计时功能

### 编码解码
- **Base64编解码** - Base64编码解码工具
- **URL编解码** - URL编码解码工具
- **HTML实体编解码** - HTML实体字符转换

### 文本处理
- **文本差异对比** - 两个文本的差异对比
- **正则表达式测试** - 正则表达式在线测试
- **文本统计** - 字符、单词、行数统计

### 数据生成
- **UUID生成器** - 生成各种格式的UUID
- **随机密码生成** - 自定义规则密码生成
- **假数据生成** - 姓名、邮箱、地址等假数据

### 图像处理
- **图片压缩** - 在线图片压缩工具
- **图片格式转换** - 支持JPG/PNG/WebP转换
- **二维码生成** - 文本/链接生成二维码

### 加密解密
- **MD5/SHA哈希** - 多种哈希算法计算
- **AES加密解密** - AES对称加密工具
- **密码强度检测** - 密码安全性评估

### 网络工具
- **IP地址查询** - 查询IP地址信息
- **User-Agent解析** - 解析浏览器User-Agent
- **HTTP状态码查询** - HTTP状态码含义查询

### 开发工具
- **CSS美化** - CSS代码格式化美化
- **SQL格式化** - SQL语句格式化
- **颜色选择器** - 颜色值转换和选择
- **单位转换器** - 长度、重量、温度等转换
- **进制转换器** - 二进制、八进制、十六进制转换
- **代码高亮** - 多语言代码语法高亮

## 🎨 设计规范

### 色彩系统
- **主色调**: 蓝色系 (#3b82f6)
- **辅助色**: 紫色 (#8b5cf6)、绿色 (#10b981)、橙色 (#f59e0b)
- **中性色**: 灰色系 (#f9fafb - #111827)

### 布局系统
- **网格**: 12列响应式网格，支持1-4列自适应
- **卡片**: 12px圆角，悬停动画效果
- **间距**: 16px (移动端) / 24px (桌面端)

## 🏗️ 项目结构

```
src/
├── components/          # 组件目录
│   └── tools/          # 工具组件
├── data/               # 数据配置
│   └── tools.js        # 工具数据
├── views/              # 页面组件
│   ├── Home.vue        # 首页
│   └── ToolDetail.vue  # 工具详情页
├── App.vue             # 根组件
├── main.js             # 入口文件
└── style.css           # 全局样式
```

## 🔧 技术栈

- **前端框架**: Vue 3 + Composition API
- **构建工具**: Vite
- **CSS框架**: Tailwind CSS
- **图标库**: Lucide Vue
- **工具库**: 
  - dayjs - 日期时间处理
  - js-yaml - YAML解析
  - highlight.js - 代码高亮
  - crypto-js - 加密解密
  - qrcode - 二维码生成

## 📝 开发指南

### 添加新工具

1. 在 `src/data/tools.js` 中添加工具配置
2. 在 `src/components/tools/` 中创建工具组件
3. 在 `src/views/ToolDetail.vue` 中注册组件映射

### 工具组件规范

```vue
<template>
  <div class="space-y-6">
    <!-- 工具内容 -->
  </div>
</template>

<script setup>
// 工具逻辑
</script>
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

感谢所有开源项目的贡献者，特别是：
- Vue.js 团队
- Tailwind CSS 团队
- Lucide 图标库
- 所有工具库的维护者

---

**Develop Tools Pro** - 为开发者打造的现代化工具集合 🚀

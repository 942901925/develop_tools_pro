# 🚀 Google Analytics 快速配置指南

## 📋 概述

已为您的网站添加了Google Analytics代码，现在可以分析PV、UV等关键数据。

## ⚡ 快速配置（3步完成）

### 步骤1：获取Google Analytics测量ID

1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新属性 → 选择"网站"
3. 输入网站信息，获取测量ID（格式：`G-XXXXXXXXXX`）

### 步骤2：配置测量ID

**方法一：使用配置脚本（推荐）**
```bash
npm run setup-analytics G-XXXXXXXXXX
```

**方法二：手动配置**
编辑 `index.html` 文件，将 `%VITE_GA_MEASUREMENT_ID%` 替换为您的实际ID：
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 步骤3：部署并验证

1. 部署网站到生产环境
2. 访问网站
3. 在Google Analytics中查看实时报告

## 📊 可分析的数据

### 基础指标
- **PV (Page Views)**：页面浏览量
- **UV (Unique Visitors)**：独立访客数
- **会话数**：用户访问会话
- **跳出率**：单页访问比例
- **平均会话时长**：用户停留时间

### 高级分析
- **用户行为流**：用户在网站中的导航路径
- **设备类型**：桌面、移动设备、平板
- **地理位置**：用户所在国家/地区
- **流量来源**：直接访问、搜索引擎、社交媒体等
- **工具使用排行**：最受欢迎的开发工具

## 🔍 验证安装

### 浏览器检查
1. 打开网站，按F12
2. 查看Network标签页
3. 确认有 `gtag/js` 请求

### Google Analytics实时报告
1. 登录Google Analytics
2. 进入"实时"报告
3. 访问您的网站
4. 确认看到访问数据

## 🚀 部署配置

### Vercel部署
在Vercel项目设置中添加环境变量：
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 其他平台
确保在部署时设置正确的环境变量。

## 📈 数据分析建议

### 关键指标监控
- **日活跃用户**：了解网站日常使用情况
- **工具使用排行**：优化最受欢迎的工具
- **用户停留时间**：评估内容质量
- **跳出率**：分析用户体验问题

### 优化方向
- **高跳出率页面**：优化页面内容和用户体验
- **低使用率工具**：考虑改进或移除
- **用户路径分析**：优化网站导航结构
- **设备适配**：根据设备使用情况优化响应式设计

## 🛡️ 隐私保护

### GDPR合规建议
- 添加Cookie同意横幅
- 提供隐私政策
- 允许用户选择退出跟踪

### 示例隐私政策片段
```
本网站使用Google Analytics分析用户行为，以改善用户体验。
我们不会收集个人身份信息，所有数据都是匿名的。
您可以通过浏览器设置禁用Cookie来退出跟踪。
```

## 🔧 高级功能

### 自定义事件跟踪
可以添加自定义事件来跟踪特定用户行为：

```javascript
// 跟踪工具使用
gtag('event', 'tool_used', {
  'tool_name': 'json_formatter',
  'tool_category': 'data_processing'
});

// 跟踪搜索行为
gtag('event', 'search', {
  'search_term': 'json',
  'search_category': 'tools'
});
```

## 📞 技术支持

### 常见问题
1. **数据不显示**：检查测量ID是否正确，确认网站已部署
2. **实时数据延迟**：Google Analytics实时数据可能有几分钟延迟
3. **跨域问题**：确保域名配置正确

### 调试工具
- [Google Tag Assistant](https://tagassistant.google.com/)：浏览器扩展
- Google Analytics调试模式
- 浏览器开发者工具Network标签页

## 🎉 完成

配置完成后，您就可以在Google Analytics中查看详细的网站分析数据，包括PV、UV、用户行为等关键指标，帮助您更好地了解用户需求并优化网站体验！

---

**需要帮助？** 查看详细配置文档：`GOOGLE_ANALYTICS_SETUP.md`

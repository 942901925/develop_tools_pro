# Vercel 部署指南

## 项目配置

本项目已经配置好所有必要的Vercel部署文件：

### 1. 配置文件说明

- **`vercel.json`**: Vercel部署配置
  - 配置了SPA路由支持
  - 设置了静态资源缓存
  - 配置了构建输出目录

- **`.vercelignore`**: 排除不需要部署的文件
  - 开发依赖
  - 临时文件
  - 编辑器配置

- **`vite.config.js`**: 优化了构建配置
  - 代码分割优化
  - 生产环境优化
  - Vercel兼容性配置

## 部署步骤

### 方法一：通过Vercel CLI（推荐）

1. **安装Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```

4. **生产环境部署**
   ```bash
   vercel --prod
   ```

### 方法二：通过GitHub集成

1. **推送代码到GitHub**
   ```bash
   git add .
   git commit -m "准备Vercel部署"
   git push origin main
   ```

2. **在Vercel网站部署**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入GitHub仓库
   - 选择项目根目录
   - 点击 "Deploy"

### 方法三：通过Vercel Dashboard

1. **上传项目**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 选择 "Upload" 选项
   - 拖拽项目文件夹

## 构建配置

### 环境变量
项目会自动设置以下环境变量：
- `NODE_ENV=production`

### 构建命令
- **构建命令**: `npm run build`
- **输出目录**: `dist`
- **Node.js版本**: 18.x

## 路由配置

项目使用Vue Router的History模式，已配置：
- 所有路由重定向到 `index.html`
- 静态资源缓存优化
- SPA路由支持

## 性能优化

### 代码分割
- `vendor`: Vue核心库
- `utils`: 工具库（dayjs, js-yaml等）
- `ui`: UI组件库
- `crypto`: 加密相关库
- `canvas`: 画布相关库

### 缓存策略
- 静态资源：1年缓存
- HTML文件：无缓存

## 域名配置

部署完成后，您可以：
1. 使用Vercel提供的默认域名
2. 配置自定义域名
3. 设置HTTPS（自动配置）

## 监控和分析

Vercel提供：
- 实时部署状态
- 性能监控
- 访问统计
- 错误日志

## 常见问题

### Q: 部署后页面空白？
A: 检查路由配置，确保所有路由都重定向到index.html

### Q: 静态资源404？
A: 检查vercel.json中的路由配置

### Q: 构建失败？
A: 检查package.json中的依赖版本和构建脚本

## 更新部署

每次推送代码到main分支，Vercel会自动重新部署。也可以手动触发部署：

```bash
vercel --prod
```

## 回滚

如果需要回滚到之前的版本：
1. 在Vercel Dashboard中找到之前的部署
2. 点击 "Promote to Production"

---

部署完成后，您的Develop Tools Pro将在Vercel上运行，享受全球CDN加速和自动HTTPS！

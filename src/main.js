import { createApp } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import i18n from './i18n/index.js'
import { trackPageView } from './utils/analytics.js'

// 导入页面组件
import Home from './views/Home.vue'
import ToolDetail from './views/ToolDetail.vue'
import FeedbackAdmin from './views/FeedbackAdmin.vue'

// 路由配置
const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home,
    meta: { 
      title: 'Develop Tools Pro - 为高效工作人士打造的现代化工具集合 | 30+ 实用工具',
      description: 'Develop Tools Pro 是为高效工作人士打造的现代化工具集合，包含30+实用工具：JSON格式化、时间转换、编码解码、密码生成、二维码生成等，提升工作效率。',
      keywords: '开发者工具,在线工具,JSON格式化,时间转换,编码解码,密码生成,二维码生成,工作效率,工具集合,免费工具'
    }
  },
  { 
    path: '/tool/:id', 
    name: 'ToolDetail', 
    component: ToolDetail, 
    props: true,
    meta: { 
      title: '工具详情 - Develop Tools Pro',
      description: '使用 Develop Tools Pro 的专业工具，提升您的工作效率。',
      keywords: '开发者工具,在线工具,工作效率'
    }
  },
  { 
    path: '/admin/feedback', 
    name: 'FeedbackAdmin', 
    component: FeedbackAdmin,
    meta: { 
      title: '反馈管理 - Develop Tools Pro',
      description: 'Develop Tools Pro 用户反馈管理系统',
      robots: 'noindex, nofollow'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 添加路由跟踪和动态标题更新
router.afterEach((to, from) => {
  // 更新页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // 更新meta描述
  if (to.meta.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', to.meta.description)
    }
  }
  
  // 更新meta关键词
  if (to.meta.keywords) {
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', to.meta.keywords)
    }
  }
  
  // 更新robots meta
  if (to.meta.robots) {
    const metaRobots = document.querySelector('meta[name="robots"]')
    if (metaRobots) {
      metaRobots.setAttribute('content', to.meta.robots)
    }
  }
  
  // 跟踪页面浏览
  trackPageView(to.fullPath, to.meta.title)
})

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')

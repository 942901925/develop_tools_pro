import { createApp } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import i18n from './i18n/index.js'
import { trackPageView } from './utils/analytics.js'

// 导入页面组件
import Home from './views/Home.vue'
import ToolDetail from './views/ToolDetail.vue'

// 路由配置
const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home,
    meta: { title: 'Develop Tools Pro - 开发者工具集合' }
  },
  { 
    path: '/tool/:id', 
    name: 'ToolDetail', 
    component: ToolDetail, 
    props: true,
    meta: { title: '工具详情 - Develop Tools Pro' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 添加路由跟踪
router.afterEach((to, from) => {
  // 跟踪页面浏览
  trackPageView(to.fullPath, to.meta.title)
})

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')

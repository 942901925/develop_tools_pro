import { createApp } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import i18n from './i18n/index.js'

// 导入页面组件
import Home from './views/Home.vue'
import ToolDetail from './views/ToolDetail.vue'

// 路由配置
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/tool/:id', name: 'ToolDetail', component: ToolDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')

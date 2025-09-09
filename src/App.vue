<template>
  <div class="min-h-screen">
    <!-- 导航栏 -->
    <nav class="glass-effect sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-purple rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">DTP</span>
            </div>
            <span class="text-xl font-bold text-white">Develop Tools Pro</span>
          </router-link>
          
          <!-- 搜索框 -->
          <div class="hidden md:flex flex-1 max-w-md mx-8">
            <div class="relative w-full">
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="$t('nav.searchPlaceholder')"
                class="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-gray-800/70"
                @input="handleSearch"
              />
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300" />
            </div>
          </div>
          
          <!-- 语言切换器 -->
          <div class="hidden md:block">
            <LanguageSwitcher />
          </div>
          
          <!-- 移动端菜单按钮 -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
        
        <!-- 移动端搜索和语言切换 -->
        <div v-if="mobileMenuOpen" class="md:hidden pb-4 space-y-4">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('nav.searchPlaceholder')"
              class="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-gray-800/70"
              @input="handleSearch"
            />
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300" />
          </div>
          <div class="flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
    
    <!-- 主要内容 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>
    
    <!-- 页脚 -->
    <footer class="glass-effect mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center text-gray-400">
          <p>{{ $t('footer.copyright') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Menu, X } from 'lucide-vue-next'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

const router = useRouter()
const searchQuery = ref('')
const mobileMenuOpen = ref(false)

const handleSearch = () => {
  // 搜索逻辑将在Home组件中实现
  if (searchQuery.value.trim()) {
    // 可以在这里添加搜索逻辑
    console.log('搜索:', searchQuery.value)
  }
}

// 监听路由变化，关闭移动端菜单
watch(() => router.currentRoute.value.path, () => {
  mobileMenuOpen.value = false
})
</script>

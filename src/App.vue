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
                @focus="showSearchResults = searchQuery.trim() !== ''"
                @blur="setTimeout(() => showSearchResults = false, 200)"
              />
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300" />
              
              <!-- 搜索结果下拉框 -->
              <div 
                v-if="showSearchResults && searchResults.length > 0" 
                class="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto"
              >
                <div class="p-2">
                  <div 
                    v-for="result in searchResults" 
                    :key="result.id"
                    @click="goToTool(result.id)"
                    class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-colors"
                  >
                    <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Search class="w-5 h-5 text-purple-400" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-sm font-medium text-white truncate">{{ result.name }}</h4>
                      <p class="text-xs text-gray-400 truncate">{{ result.description }}</p>
                      <span class="text-xs text-purple-400">{{ result.category }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 无搜索结果提示 -->
              <div 
                v-if="showSearchResults && searchResults.length === 0 && searchQuery.trim()" 
                class="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl z-50"
              >
                <div class="p-4 text-center">
                  <Search class="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p class="text-sm text-gray-400">未找到相关工具</p>
                  <p class="text-xs text-gray-500 mt-1">尝试其他关键词</p>
                </div>
              </div>
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
              @focus="showSearchResults = searchQuery.trim() !== ''"
              @blur="setTimeout(() => showSearchResults = false, 200)"
            />
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300" />
            
            <!-- 移动端搜索结果 -->
            <div 
              v-if="showSearchResults && searchResults.length > 0" 
              class="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto"
            >
              <div class="p-2">
                <div 
                  v-for="result in searchResults" 
                  :key="result.id"
                  @click="goToTool(result.id)"
                  class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-colors"
                >
                  <div class="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Search class="w-4 h-4 text-purple-400" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-white truncate">{{ result.name }}</h4>
                    <p class="text-xs text-gray-400 truncate">{{ result.description }}</p>
                    <span class="text-xs text-purple-400">{{ result.category }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 移动端无搜索结果提示 -->
            <div 
              v-if="showSearchResults && searchResults.length === 0 && searchQuery.trim()" 
              class="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl z-50"
            >
              <div class="p-3 text-center">
                <Search class="w-6 h-6 text-gray-500 mx-auto mb-2" />
                <p class="text-sm text-gray-400">未找到相关工具</p>
              </div>
            </div>
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
import { ref, watch, provide } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Search, Menu, X } from 'lucide-vue-next'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

const router = useRouter()
const route = useRoute()
const searchQuery = ref('')
const mobileMenuOpen = ref(false)
const showSearchResults = ref(false)
const searchResults = ref([])

// 提供搜索状态给子组件
provide('searchQuery', searchQuery)
provide('searchResults', searchResults)
provide('showSearchResults', showSearchResults)

const handleSearch = () => {
  const query = searchQuery.value.trim()
  
  if (query) {
    // 如果不在主页，跳转到主页
    if (route.path !== '/') {
      router.push('/')
      // 等待路由跳转完成后再设置搜索
      setTimeout(() => {
        searchQuery.value = query
        performSearch(query)
      }, 100)
    } else {
      performSearch(query)
    }
  } else {
    // 清空搜索
    searchResults.value = []
    showSearchResults.value = false
  }
}

const performSearch = async (query) => {
  try {
    // 动态导入工具数据
    const { tools } = await import('./data/tools.js')
    
    // 搜索过滤逻辑
    const filtered = tools.filter(tool => {
      const searchTerm = query.toLowerCase()
      return (
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm) ||
        tool.category.toLowerCase().includes(searchTerm) ||
        tool.id.toLowerCase().includes(searchTerm)
      )
    })
    
    // 限制搜索结果数量，避免下拉框过长
    searchResults.value = filtered.slice(0, 8)
    showSearchResults.value = true
    
    console.log('搜索结果:', filtered.length, '个工具')
  } catch (error) {
    console.error('搜索失败:', error)
    searchResults.value = []
    showSearchResults.value = false
  }
}

// 监听路由变化，关闭移动端菜单和搜索结果
watch(() => router.currentRoute.value.path, () => {
  mobileMenuOpen.value = false
  showSearchResults.value = false
})

// 监听搜索框变化，实现实时搜索
watch(searchQuery, (newQuery) => {
  if (newQuery.trim()) {
    performSearch(newQuery.trim())
  } else {
    searchResults.value = []
    showSearchResults.value = false
  }
})

// 跳转到工具详情页
const goToTool = (toolId) => {
  searchQuery.value = ''
  showSearchResults.value = false
  mobileMenuOpen.value = false
  router.push(`/tool/${toolId}`)
}
</script>

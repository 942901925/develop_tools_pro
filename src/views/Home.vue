<template>
  <div class="space-y-16">
    <!-- 页面标题 -->
    <div class="hero-section text-center space-y-8 animate-fade-in">
      <!-- 主标题 -->
      <div class="relative">
        <h1 class="text-6xl md:text-8xl lg:text-9xl font-black text-gradient animate-float leading-none">
          {{ $t('home.title') }}
        </h1>
        <!-- 装饰性背景元素 -->
        <div class="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
      
      <!-- 副标题 -->
      <div class="space-y-4">
        <p class="text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
          {{ $t('home.subtitle') }}
        </p>
        
        <!-- 特色标签 -->
        <div class="flex flex-wrap justify-center gap-3 mt-6">
          <span class="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full text-sm text-purple-300 border border-purple-500/30 backdrop-blur-sm">
            ✨ {{ $t('home.features.tools') }}
          </span>
          <span class="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full text-sm text-green-300 border border-green-500/30 backdrop-blur-sm">
            🚀 {{ $t('home.features.instant') }}
          </span>
          <span class="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full text-sm text-orange-300 border border-orange-500/30 backdrop-blur-sm">
            💻 {{ $t('home.features.frontend') }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- 分类筛选 -->
    <div class="flex flex-wrap justify-center gap-4 px-4">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectedCategory = category.id"
        :class="[
          'category-pill-enhanced',
          selectedCategory === category.id ? 'active' : ''
        ]"
      >
        <span class="font-medium">{{ category.name }}</span>
        <span class="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs font-mono">
          {{ category.count }}
        </span>
      </button>
    </div>
    
    <!-- 搜索框（移动端） -->
    <div class="md:hidden">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('nav.searchPlaceholder')"
          class="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 focus:bg-gray-800/70"
          @input="handleSearch"
        />
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300" />
      </div>
    </div>
    <!-- 工具网格 -->
    <div class="bento-grid-enhanced">
      <div
        v-for="(tool, index) in filteredTools"
        :key="tool.id"
        @click="goToTool(tool.id)"
        :class="[
          'tool-card-enhanced group cursor-pointer',
          getCardSizeClass(tool.size),
          getCardAnimationDelay(index)
        ]"
      >
        <div class="flex flex-col h-full relative">
          <!-- 顶部区域 -->
          <div class="flex items-start justify-between mb-4">
            <div :class="[
              'w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3',
              getIconColorClass(tool.color)
            ]">
              <component :is="getIconComponent(tool.icon)" class="w-7 h-7" />
            </div>
            <div class="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <ArrowRight class="w-5 h-5 text-purple-400" />
            </div>
          </div>
          
          <!-- 内容区域 -->
          <div class="flex-1 flex flex-col">
            <h3 class="text-lg font-bold text-white group-hover:text-purple-200 transition-colors mb-3 line-clamp-1">
              {{ $t(`toolNames.${tool.id}.name`) || tool.name }}
            </h3>
            <p class="text-sm text-gray-300 group-hover:text-gray-200 line-clamp-2 leading-relaxed flex-1">
              {{ $t(`toolNames.${tool.id}.description`) || tool.description }}
            </p>
            
            <!-- 底部标签 -->
            <div class="mt-auto pt-3">
              <span class="text-xs text-purple-300 bg-purple-500/20 px-3 py-1.5 rounded-full backdrop-blur-sm border border-purple-500/30 font-medium">
                {{ $t(`tools.categories.${tool.category}`) || tool.category }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 空状态 -->
    <div v-if="filteredTools.length === 0" class="text-center py-16">
      <div class="glass-effect rounded-3xl p-12 max-w-md mx-auto">
        <Search class="w-20 h-20 text-white/40 mx-auto mb-6 animate-pulse" />
        <h3 class="text-xl font-semibold text-white mb-3">{{ $t('home.noResults') }}</h3>
        <p class="text-gray-200">{{ $t('home.noResultsDesc') }}</p>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { 
  Search, ArrowRight, Code, ArrowLeftRight, FileText, Clock, Calculator, Timer,
  Shield, Link, Hash, GitCompare, BarChart3,
  Key, Lock, Users, Image, RefreshCw, QrCode,
  Fingerprint, ShieldCheck, AlertTriangle, Globe, Monitor,
  Server, Palette, Database, Droplets, Ruler, Binary, Code2
} from 'lucide-vue-next'
import { tools, getLocalizedCategories, getToolsByCategory, searchTools } from '../data/tools.js'

// 注入全局搜索状态
const globalSearchQuery = inject('searchQuery', ref(''))
const globalSearchResults = inject('searchResults', ref([]))
const showGlobalSearchResults = inject('showSearchResults', ref(false))

// 图标组件映射
const iconComponents = {
  Code, ArrowLeftRight, FileText, Clock, Calculator, Timer,
  Shield, Link, Hash, GitCompare, Search, BarChart3,
  Key, Lock, Users, Image, RefreshCw, QrCode,
  Fingerprint, ShieldCheck, AlertTriangle, Globe, Monitor,
  Server, Palette, Database, Droplets, Ruler, Binary, Code2
}

const router = useRouter()
const { t: $t } = useI18n()
const selectedCategory = ref('all')
const searchQuery = ref('')

// 获取本地化的分类列表
const categories = computed(() => {
  return getLocalizedCategories($t)
})

// 计算过滤后的工具列表
const filteredTools = computed(() => {
  let result = getToolsByCategory(selectedCategory.value)
  
  // 优先使用全局搜索，如果没有则使用本地搜索
  const activeSearchQuery = globalSearchQuery.value.trim() || searchQuery.value.trim()
  
  if (activeSearchQuery) {
    result = searchTools(activeSearchQuery)
  }
  
  return result
})

// 处理搜索
const handleSearch = () => {
  // 搜索逻辑已在computed中处理
}

// 跳转到工具详情页
const goToTool = (toolId) => {
  router.push(`/tool/${toolId}`)
}

// 获取卡片尺寸类
const getCardSizeClass = (size) => {
  // 所有卡片使用统一尺寸
  return ''
}

// 获取图标颜色类
const getIconColorClass = (color) => {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    green: 'bg-green-500/20 text-green-400 border border-green-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    orange: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    red: 'bg-red-500/20 text-red-400 border border-red-500/30'
  }
  return colorClasses[color] || 'bg-gray-800/50 text-gray-400 border border-gray-700/50'
}

// 获取图标组件
const getIconComponent = (iconName) => {
  return iconComponents[iconName] || iconComponents['Code'] || 'div'
}

// 获取卡片动画延迟类
const getCardAnimationDelay = (index) => {
  const delays = ['delay-0', 'delay-75', 'delay-150', 'delay-225', 'delay-300', 'delay-375', 'delay-450', 'delay-525']
  return delays[index % delays.length]
}

// 监听分类变化，重置搜索
watch(selectedCategory, () => {
  searchQuery.value = ''
  // 如果全局搜索有内容，也清空它
  if (globalSearchQuery.value) {
    globalSearchQuery.value = ''
  }
})

// 监听全局搜索变化，同步到本地搜索
watch(globalSearchQuery, (newQuery) => {
  if (newQuery.trim()) {
    searchQuery.value = newQuery
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

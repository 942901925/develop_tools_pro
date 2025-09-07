<template>
  <div class="space-y-12">
    <!-- 页面标题 -->
    <div class="hero-section text-center space-y-6 animate-fade-in">
      <h1 class="text-5xl md:text-7xl font-bold text-gradient animate-float">
        {{ $t('home.title') }}
      </h1>
      <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
        {{ $t('home.subtitle') }}
      </p>
    </div>
    
    <!-- 分类筛选 -->
    <div class="flex flex-wrap justify-center gap-3">
      <button
        v-for="category in categories"
        :key="category.id"
        @click="selectedCategory = category.id"
        :class="[
          'category-pill',
          selectedCategory === category.id ? 'active' : ''
        ]"
      >
        {{ category.name }}
        <span class="ml-2 text-xs opacity-75">({{ category.count }})</span>
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
    <div class="bento-grid">
      <div
        v-for="tool in filteredTools"
        :key="tool.id"
        @click="goToTool(tool.id)"
        :class="[
          'tool-card group cursor-pointer',
          getCardSizeClass(tool.size)
        ]"
      >
        <div class="flex flex-col h-full">
          <!-- 顶部区域 -->
          <div class="flex items-start justify-between mb-3">
            <div :class="[
              'w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0',
              getIconColorClass(tool.color)
            ]">
              <component :is="getIconComponent(tool.icon)" class="w-6 h-6" />
            </div>
            <ArrowRight class="w-5 h-5 text-gray-600 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
          </div>
          
          <!-- 内容区域 -->
          <div class="flex-1 flex flex-col">
            <h3 class="text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors mb-2 line-clamp-1">
              {{ $t(`tools.${tool.id}.name`) || tool.name }}
            </h3>
            <p class="text-sm text-gray-700 line-clamp-2 leading-relaxed flex-1">
              {{ $t(`tools.${tool.id}.description`) || tool.description }}
            </p>
            
            <!-- 底部标签 -->
            <div class="mt-3">
              <span class="text-xs text-gray-800 bg-gray-200/80 px-2.5 py-1 rounded-full backdrop-blur-sm border border-gray-300/50">
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
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Search, ArrowRight } from 'lucide-vue-next'
import { tools, getLocalizedCategories, getToolsByCategory, searchTools } from '../data/tools.js'

// 动态导入所有图标组件
const iconComponents = {}
const iconNames = [
  'Code', 'ArrowLeftRight', 'FileText', 'Clock', 'Calculator', 'Timer',
  'Shield', 'Link', 'Hash', 'GitCompare', 'Search', 'BarChart3',
  'Key', 'Lock', 'Users', 'Image', 'RefreshCw', 'QrCode',
  'Fingerprint', 'ShieldCheck', 'AlertTriangle', 'Globe', 'Monitor',
  'Server', 'Palette', 'Database', 'Droplets', 'Ruler', 'Binary', 'Code2'
]

// 动态导入图标
const loadIcons = async () => {
  const module = await import('lucide-vue-next')
  iconNames.forEach(name => {
    iconComponents[name] = module[name]
  })
}
loadIcons()

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
  
  if (searchQuery.value.trim()) {
    result = searchTools(searchQuery.value)
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

// 监听分类变化，重置搜索
watch(selectedCategory, () => {
  searchQuery.value = ''
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

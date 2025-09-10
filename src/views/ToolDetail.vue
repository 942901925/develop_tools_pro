<template>
  <div v-if="tool" class="max-w-full mx-auto px-2">
    <!-- 工具头部 -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div class="flex items-center space-x-4">
        <div :class="[
          'w-16 h-16 rounded-xl flex items-center justify-center',
          getIconColorClass(tool.color)
        ]">
          <component :is="getIconComponent(tool.icon)" class="w-8 h-8" />
        </div>
        <div class="flex-1">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ $t(`tools.${tool.id}.name`) || tool.name }}</h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 mt-1">{{ $t(`tools.${tool.id}.description`) || tool.description }}</p>
          <div class="flex items-center space-x-4 mt-3">
            <span class="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {{ $t(`tools.categories.${tool.category}`) || tool.category }}
            </span>
            <button
            
              @click="copyToClipboard"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              {{ $t('toolDetail.copyLink') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 工具内容区域 -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-1">
      <!-- 动态加载工具组件 -->
      <component 
        :is="toolComponent" 
        v-if="toolComponent"
      />
      <div v-else class="text-center py-12">
        <component :is="getIconComponent(tool.icon)" class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{{ $t('toolDetail.underDevelopment') }}</h3>
        <p class="text-gray-500 dark:text-gray-400">{{ $t('toolDetail.underDevelopmentDesc') }}</p>
      </div>
    </div>
    
    <!-- 返回按钮 -->
    <div class="mt-6 text-center">
      <button
        @click="goBack"
        class="btn-secondary inline-flex items-center space-x-2"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>{{ $t('toolDetail.backToList') }}</span>
      </button>
    </div>
  </div>
  
  <!-- 工具不存在 -->
  <div v-else class="text-center py-12">
    <AlertCircle class="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 class="text-lg font-medium text-gray-900 mb-2">{{ $t('toolDetail.toolNotFound') }}</h3>
    <p class="text-gray-500 mb-4">{{ $t('toolDetail.toolNotFoundDesc') }}</p>
    <button @click="goBack" class="btn-primary">
      {{ $t('toolDetail.backToList') }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  ArrowLeft, AlertCircle, Code, ArrowLeftRight, FileText, Clock, Calculator, Timer,
  Shield, Link, Hash, GitCompare, Search, BarChart3,
  Key, Lock, Users, Image, RefreshCw, QrCode,
  Fingerprint, ShieldCheck, AlertTriangle, Globe, Monitor,
  Server, Palette, Database, Droplets, Ruler, Binary, Code2
} from 'lucide-vue-next'
import { getToolById } from '../data/tools.js'
import logger from '../utils/logger.js'
import { trackToolUsage, trackUserInteraction } from '../utils/analytics.js'
import { copyTextWithFeedback } from '../utils/clipboard.js'

const router = useRouter()
const route = useRoute()
const toolId = computed(() => route.params.id)
const tool = ref(null)
const toolComponent = ref(null)

// 图标组件映射
const iconComponents = {
  Code, ArrowLeftRight, FileText, Clock, Calculator, Timer,
  Shield, Link, Hash, GitCompare, Search, BarChart3,
  Key, Lock, Users, Image, RefreshCw, QrCode,
  Fingerprint, ShieldCheck, AlertTriangle, Globe, Monitor,
  Server, Palette, Database, Droplets, Ruler, Binary, Code2
}

// 获取工具组件
const getToolComponent = async (toolId) => {
  logger.log('Loading tool component for:', toolId)
  
  try {
    // 直接尝试导入对应的组件
    const componentPath = `../components/tools/${toolId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}.vue`
    logger.log('Trying to load component from:', componentPath)
    
    const module = await import(componentPath)
    logger.log('Component loaded successfully:', toolId, module)
    toolComponent.value = module.default
  } catch (error) {
    logger.error(`Failed to load tool component: ${toolId}`, error)
    
    // 如果直接导入失败，尝试使用映射表
    const toolComponentMap = {
      'json-formatter': () => import('../components/tools/JsonFormatter.vue'),
      'json-yaml-converter': () => import('../components/tools/JsonYamlConverter.vue'),
      'json-schema-generator': () => import('../components/tools/JsonSchemaGenerator.vue'),
      'base64-encoder': () => import('../components/tools/Base64Encoder.vue'),
      'url-encoder': () => import('../components/tools/UrlEncoder.vue'),
      'html-entities': () => import('../components/tools/HtmlEntities.vue'),
      'password-generator': () => import('../components/tools/PasswordGenerator.vue'),
      'uuid-generator': () => import('../components/tools/UuidGenerator.vue'),
      'fake-data-generator': () => import('../components/tools/FakeDataGenerator.vue'),
      'hash-generator': () => import('../components/tools/HashGenerator.vue'),
      'aes-encryptor': () => import('../components/tools/AesEncryptor.vue'),
      'password-strength': () => import('../components/tools/PasswordStrength.vue'),
      'text-statistics': () => import('../components/tools/TextStatistics.vue'),
      'text-diff': () => import('../components/tools/TextDiff.vue'),
      'regex-tester': () => import('../components/tools/RegexTester.vue'),
      'timestamp-converter': () => import('../components/tools/TimestampConverter.vue'),
      'time-calculator': () => import('../components/tools/TimeCalculator.vue'),
      'countdown-timer': () => import('../components/tools/CountdownTimer.vue'),
      'color-picker': () => import('../components/tools/ColorPicker.vue'),
      'unit-converter': () => import('../components/tools/UnitConverter.vue'),
      'number-base-converter': () => import('../components/tools/NumberBaseConverter.vue'),
      'css-formatter': () => import('../components/tools/CssFormatter.vue'),
      'sql-formatter': () => import('../components/tools/SqlFormatter.vue'),
      'code-highlighter': () => import('../components/tools/CodeHighlighter.vue'),
      'image-compressor': () => import('../components/tools/ImageCompressor.vue'),
      'image-converter': () => import('../components/tools/ImageConverter.vue'),
      'qr-code-generator': () => import('../components/tools/QrCodeGenerator.vue'),
      'ip-lookup': () => import('../components/tools/IpLookup.vue'),
      'user-agent-parser': () => import('../components/tools/UserAgentParser.vue'),
      'http-status-codes': () => import('../components/tools/HttpStatusCodes.vue')
    }
    
    const componentLoader = toolComponentMap[toolId]
    if (componentLoader) {
      try {
        logger.log('Loading component from map for:', toolId)
        const module = await componentLoader()
        logger.log('Component loaded successfully from map:', toolId, module)
        toolComponent.value = module.default
      } catch (mapError) {
        logger.error(`Failed to load tool component from map: ${toolId}`, mapError)
        // 使用占位符组件
        const placeholderModule = await import('../components/tools/PlaceholderTool.vue')
        toolComponent.value = placeholderModule.default
      }
    } else {
      logger.warn('No component loader found for:', toolId)
      // 使用占位符组件
      const placeholderModule = await import('../components/tools/PlaceholderTool.vue')
      toolComponent.value = placeholderModule.default
    }
  }
}

// 获取工具信息
onMounted(async () => {
  logger.log('ToolDetail mounted, toolId:', toolId.value)
  tool.value = getToolById(toolId.value)
  logger.log('Tool found:', tool.value)
  if (tool.value) {
    await getToolComponent(toolId.value)
    logger.log('Tool component loaded:', toolComponent.value)
    
    // 跟踪工具使用
    trackToolUsage(toolId.value, tool.value.name, tool.value.category)
    
    // 确保组件已加载，如果没有则使用占位符
    if (!toolComponent.value) {
      logger.warn('No component loaded, using placeholder')
      try {
        const placeholderModule = await import('../components/tools/PlaceholderTool.vue')
        toolComponent.value = placeholderModule.default
      } catch (error) {
        logger.error('Failed to load placeholder component:', error)
      }
    }
  } else {
    logger.warn('Tool not found for ID:', toolId.value)
  }
})

// 获取图标颜色类
const getIconColorClass = (color) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600'
  }
  return colorClasses[color] || 'bg-gray-100 text-gray-600'
}

// 获取图标组件
const getIconComponent = (iconName) => {
  return iconComponents[iconName] || 'div'
}

// 复制链接到剪贴板
const copyToClipboard = async () => {
  const success = await copyTextWithFeedback(window.location.href, '链接')
  if (success) {
    // 跟踪用户交互
    trackUserInteraction('copy_link', 'tool_detail')
  }
}

// 返回上一页
const goBack = () => {
  router.push('/')
}
</script>

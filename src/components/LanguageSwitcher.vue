<template>
  <div class="relative">
    <!-- 语言切换按钮 -->
    <button
      @click="toggleDropdown"
      :disabled="isDetecting"
      class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span class="text-lg">{{ currentLocaleInfo.flag }}</span>
      <span class="text-sm font-medium text-gray-700">{{ currentLocaleInfo.name }}</span>
      <ChevronDown 
        :class="[
          'w-4 h-4 text-gray-400 transition-transform duration-200',
          isOpen ? 'rotate-180' : ''
        ]"
      />
    </button>
    
    <!-- 检测状态指示器 -->
    <div v-if="isDetecting" class="absolute -top-1 -right-1">
      <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
    </div>
    
    <!-- 下拉菜单 -->
    <div
      v-if="isOpen"
      class="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
    >
      <!-- 检测状态提示 -->
      <div v-if="isDetecting" class="px-4 py-2 border-b border-gray-100">
        <div class="flex items-center space-x-2 text-sm text-blue-600">
          <MapPin class="w-4 h-4 animate-pulse" />
          <span>{{ t('geoLocation.detecting') }}</span>
        </div>
      </div>
      
      <!-- 检测结果提示 -->
      <div v-if="detectedLocation" class="px-4 py-2 border-b border-gray-100">
        <div class="flex items-center space-x-2 text-sm text-green-600">
          <MapPin class="w-4 h-4" />
          <span>{{ t('geoLocation.autoSwitched') }} {{ detectedLocation.displayName }}</span>
        </div>
      </div>
      
      <!-- 语言选项 -->
      <button
        v-for="locale in supportedLocales"
        :key="locale.code"
        @click="selectLocale(locale.code)"
        :class="[
          'w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150',
          currentLocale === locale.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
        ]"
      >
        <span class="text-lg">{{ locale.flag }}</span>
        <span class="text-sm font-medium">{{ locale.name }}</span>
        <Check 
          v-if="currentLocale === locale.code"
          class="w-4 h-4 text-blue-600 ml-auto"
        />
      </button>
    </div>
    
    <!-- 点击外部关闭 -->
    <div
      v-if="isOpen"
      @click="closeDropdown"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDown, Check, MapPin } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { supportedLocales, setLocale, getCurrentLocale, getLocaleInfo } from '../i18n/index.js'
import { detectUserLanguage, saveUserLanguagePreference, getLanguageDisplayName } from '../utils/geoLocation.js'

const { t } = useI18n()

const isOpen = ref(false)
const currentLocale = ref(getCurrentLocale())
const isDetecting = ref(false)
const detectedLocation = ref(null)

// 计算当前语言信息
const currentLocaleInfo = computed(() => {
  return getLocaleInfo(currentLocale.value) || supportedLocales[0]
})

// 切换下拉菜单
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// 关闭下拉菜单
const closeDropdown = () => {
  isOpen.value = false
}

// 选择语言
const selectLocale = (localeCode) => {
  setLocale(localeCode)
  currentLocale.value = localeCode
  saveUserLanguagePreference(localeCode)
  closeDropdown()
}

// 自动检测用户语言
const autoDetectLanguage = async () => {
  // 检查是否已有用户手动设置的语言偏好
  const savedPreference = localStorage.getItem('user-language-preference')
  if (savedPreference) {
    return // 用户已手动设置，不进行自动检测
  }
  
  isDetecting.value = true
  
  try {
    const recommendedLanguage = await detectUserLanguage()
    
    if (recommendedLanguage && recommendedLanguage !== currentLocale.value) {
      // 显示检测结果提示
      detectedLocation.value = {
        language: recommendedLanguage,
        displayName: getLanguageDisplayName(recommendedLanguage)
      }
      
      // 自动切换到推荐语言
      setLocale(recommendedLanguage)
      currentLocale.value = recommendedLanguage
      saveUserLanguagePreference(recommendedLanguage)
      
      // 3秒后隐藏提示
      setTimeout(() => {
        detectedLocation.value = null
      }, 3000)
    }
  } catch (error) {
    console.error('自动语言检测失败:', error)
  } finally {
    isDetecting.value = false
  }
}

// 监听语言变化
const handleLocaleChange = () => {
  currentLocale.value = getCurrentLocale()
}

// 点击外部关闭
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // 监听语言变化事件
  window.addEventListener('localechange', handleLocaleChange)
  
  // 自动检测用户语言
  autoDetectLanguage()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('localechange', handleLocaleChange)
})
</script>


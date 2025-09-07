<template>
  <div class="relative">
    <!-- 语言切换按钮 -->
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
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
    
    <!-- 下拉菜单 -->
    <div
      v-if="isOpen"
      class="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
    >
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
import { ChevronDown, Check } from 'lucide-vue-next'
import { supportedLocales, setLocale, getCurrentLocale, getLocaleInfo } from '../i18n/index.js'

const isOpen = ref(false)
const currentLocale = ref(getCurrentLocale())

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
  closeDropdown()
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
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('localechange', handleLocaleChange)
})
</script>


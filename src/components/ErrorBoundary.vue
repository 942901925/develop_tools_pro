<template>
  <div v-if="hasError" class="error-boundary">
    <div class="max-w-md mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
      <div class="flex items-center mb-4">
        <AlertTriangle class="w-6 h-6 text-red-500 mr-2" />
        <h3 class="text-lg font-medium text-red-800">出现错误</h3>
      </div>
      
      <p class="text-red-700 mb-4">
        {{ error.message || '发生了意外错误，请稍后重试' }}
      </p>
      
      <div class="flex space-x-3">
        <button 
          @click="retry" 
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          重试
        </button>
        <button 
          @click="goHome" 
          class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          返回首页
        </button>
      </div>
      
      <details v-if="isDev" class="mt-4">
        <summary class="text-sm text-red-600 cursor-pointer">错误详情</summary>
        <pre class="mt-2 text-xs text-red-600 bg-red-100 p-2 rounded overflow-auto">{{ error.stack }}</pre>
      </details>
    </div>
  </div>
  <slot v-else />
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'
import { AlertTriangle } from 'lucide-vue-next'
import logger from '../utils/logger.js'
import { trackError } from '../utils/analytics.js'

const router = useRouter()
const hasError = ref(false)
const error = ref(null)
const isDev = import.meta.env.DEV

onErrorCaptured((err, instance, info) => {
  hasError.value = true
  error.value = err
  
  // 记录错误日志
  logger.error('ErrorBoundary捕获到错误:', err)
  logger.error('错误信息:', info)
  
  // 跟踪错误到Google Analytics
  trackError(err, `ErrorBoundary: ${info}`)
  
  return false // 阻止错误继续传播
})

const retry = () => {
  hasError.value = false
  error.value = null
}

const goHome = () => {
  hasError.value = false
  error.value = null
  router.push('/')
}
</script>

<style scoped>
.error-boundary {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

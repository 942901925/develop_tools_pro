<template>
  <div class="text-center py-12">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <component :is="iconComponent" class="w-8 h-8 text-gray-400" />
    </div>
    <h3 class="text-lg font-medium text-gray-900 mb-2">{{ toolName }}</h3>
    <p class="text-gray-500 mb-6">{{ toolDescription }}</p>
    
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h4 class="text-sm font-medium text-blue-800">功能开发中</h4>
          <div class="mt-2 text-sm text-blue-700">
            <p>此工具正在开发中，敬请期待！</p>
            <p class="mt-1">预计功能：{{ expectedFeatures }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 模拟功能演示 -->
    <div class="mt-8 max-w-2xl mx-auto">
      <h4 class="text-lg font-semibold text-gray-900 mb-4">功能预览</h4>
      <div class="bg-gray-50 rounded-lg p-6">
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div class="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
        <div class="mt-4 text-center">
          <button class="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed">
            功能开发中...
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Code } from 'lucide-vue-next'

const props = defineProps({
  toolName: {
    type: String,
    default: '工具'
  },
  toolDescription: {
    type: String,
    default: '此工具正在开发中'
  },
  expectedFeatures: {
    type: String,
    default: '基础功能实现'
  }
})

const iconComponent = Code
</script>

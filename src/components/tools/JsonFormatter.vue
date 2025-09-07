<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 输入区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">JSON 输入</h3>
          <div class="flex space-x-2">
            <button
              @click="formatJson"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              格式化
            </button>
            <button
              @click="minifyJson"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              压缩
            </button>
            <button
              @click="clearInput"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              清空
            </button>
          </div>
        </div>
        <textarea
          v-model="inputJson"
          placeholder="请输入JSON数据..."
          class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
      </div>

      <!-- 输出区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">格式化结果</h3>
          <button
            @click="copyResult"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            复制结果
          </button>
        </div>
        <pre class="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto text-sm">{{ formattedJson }}</pre>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-blue-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600">字符数</div>
        <div class="text-2xl font-bold text-blue-600">{{ inputJson.length }}</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600">行数</div>
        <div class="text-2xl font-bold text-green-600">{{ inputJson.split('\n').length }}</div>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600">对象数</div>
        <div class="text-2xl font-bold text-purple-600">{{ objectCount }}</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600">数组数</div>
        <div class="text-2xl font-bold text-orange-600">{{ arrayCount }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputJson = ref('')
const formattedJson = ref('')
const error = ref('')

const objectCount = computed(() => {
  try {
    const obj = JSON.parse(inputJson.value)
    return countObjects(obj)
  } catch {
    return 0
  }
})

const arrayCount = computed(() => {
  try {
    const obj = JSON.parse(inputJson.value)
    return countArrays(obj)
  } catch {
    return 0
  }
})

const formatJson = () => {
  try {
    const obj = JSON.parse(inputJson.value)
    formattedJson.value = JSON.stringify(obj, null, 2)
    error.value = ''
  } catch (e) {
    error.value = 'JSON格式错误: ' + e.message
    formattedJson.value = ''
  }
}

const minifyJson = () => {
  try {
    const obj = JSON.parse(inputJson.value)
    formattedJson.value = JSON.stringify(obj)
    error.value = ''
  } catch (e) {
    error.value = 'JSON格式错误: ' + e.message
    formattedJson.value = ''
  }
}

const clearInput = () => {
  inputJson.value = ''
  formattedJson.value = ''
  error.value = ''
}

const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(formattedJson.value)
    // 可以添加成功提示
  } catch (e) {
    console.error('复制失败:', e)
  }
}

const countObjects = (obj) => {
  if (typeof obj !== 'object' || obj === null) return 0
  if (Array.isArray(obj)) return obj.reduce((count, item) => count + countObjects(item), 0)
  return 1 + Object.values(obj).reduce((count, value) => count + countObjects(value), 0)
}

const countArrays = (obj) => {
  if (typeof obj !== 'object' || obj === null) return 0
  if (Array.isArray(obj)) return 1 + obj.reduce((count, item) => count + countArrays(item), 0)
  return Object.values(obj).reduce((count, value) => count + countArrays(value), 0)
}
</script>
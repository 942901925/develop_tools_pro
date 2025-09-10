<template>
  <div class="space-y-2">
    <!-- 示例数据 -->
    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-1">
      <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-1">示例数据</h4>
      <div class="flex flex-wrap gap-1">
        <button
          v-for="example in examples"
          :key="example.name"
          @click="loadExample(example.data)"
          class="px-2 py-1 bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700 text-blue-800 dark:text-blue-100 rounded text-xs transition-colors"
        >
          {{ example.name }}
        </button>
      </div>
    </div>

    <!-- 操作按钮区域 -->
    <div class="flex flex-wrap gap-2 justify-center mb-1">
      <button
        @click="formatJson"
        :disabled="!inputJson.trim()"
        class="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        格式化
      </button>
      <button
        @click="minifyJson"
        :disabled="!inputJson.trim()"
        class="px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        压缩
      </button>
      <button
        @click="validateJson"
        :disabled="!inputJson.trim()"
        class="px-3 py-1.5 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        验证
      </button>
      <button
        @click="clearInput"
        class="px-3 py-1.5 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
      >
        清空
      </button>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-2">
      <!-- 输入区域 -->
      <div class="space-y-1">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">JSON 输入</h3>
          <div class="flex space-x-2">
            <button
              @click="copyInput"
              :disabled="!inputJson.trim()"
              class="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              复制
            </button>
          </div>
        </div>
        <textarea
          v-model="inputJson"
          placeholder="请输入JSON数据，或点击上方示例按钮加载示例数据..."
          class="w-full h-96 p-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        ></textarea>
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
          <div class="flex items-center">
            <AlertCircle class="w-5 h-5 text-red-500 mr-2" />
            <span class="text-red-700 text-sm">{{ error }}</span>
          </div>
        </div>
        <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-3">
          <div class="flex items-center">
            <CheckCircle class="w-5 h-5 text-green-500 mr-2" />
            <span class="text-green-700 text-sm">{{ successMessage }}</span>
          </div>
        </div>
      </div>

      <!-- 输出区域 -->
      <div class="space-y-1">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">格式化结果</h3>
          <div class="flex space-x-2">
            <button
              @click="copyResult"
              :disabled="!formattedJson"
              class="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              复制结果
            </button>
            <button
              @click="downloadJson"
              :disabled="!formattedJson"
              class="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下载
            </button>
          </div>
        </div>
        <div class="relative">
          <pre class="w-full h-96 p-1 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg overflow-auto text-sm font-mono">{{ formattedJson || '格式化结果将显示在这里...' }}</pre>
          <div v-if="!formattedJson" class="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
            暂无结果
          </div>
        </div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-1">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
        <div class="text-sm text-gray-600 dark:text-gray-400">字符数</div>
        <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ inputJson.length }}</div>
      </div>
      <div class="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
        <div class="text-sm text-gray-600 dark:text-gray-400">行数</div>
        <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ inputJson.split('\n').length }}</div>
      </div>
      <div class="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
        <div class="text-sm text-gray-600 dark:text-gray-400">对象数</div>
        <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ objectCount }}</div>
      </div>
      <div class="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg">
        <div class="text-sm text-gray-600 dark:text-gray-400">数组数</div>
        <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ arrayCount }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { AlertCircle, CheckCircle } from 'lucide-vue-next'

const inputJson = ref('')
const formattedJson = ref('')
const error = ref('')
const successMessage = ref('')

// 示例数据
const examples = ref([
  {
    name: '用户信息',
    data: {
      "id": 1,
      "name": "张三",
      "email": "zhangsan@example.com",
      "age": 25,
      "address": {
        "street": "中山路123号",
        "city": "北京",
        "country": "中国"
      },
      "hobbies": ["读书", "游泳", "编程"]
    }
  },
  {
    name: 'API响应',
    data: {
      "status": "success",
      "data": {
        "users": [
          {"id": 1, "name": "用户1", "active": true},
          {"id": 2, "name": "用户2", "active": false}
        ],
        "total": 2,
        "page": 1
      },
      "message": "获取用户列表成功"
    }
  },
  {
    name: '配置信息',
    data: {
      "database": {
        "host": "localhost",
        "port": 5432,
        "name": "myapp",
        "ssl": true
      },
      "redis": {
        "host": "localhost",
        "port": 6379,
        "password": null
      },
      "features": {
        "enableCache": true,
        "enableLogging": false,
        "maxConnections": 100
      }
    }
  }
])

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

// 加载示例数据
const loadExample = (data) => {
  inputJson.value = JSON.stringify(data, null, 2)
  error.value = ''
  successMessage.value = ''
  formattedJson.value = ''
}

// 格式化JSON
const formatJson = () => {
  try {
    const obj = JSON.parse(inputJson.value)
    formattedJson.value = JSON.stringify(obj, null, 2)
    error.value = ''
    successMessage.value = 'JSON格式化成功！'
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch (e) {
    error.value = 'JSON格式错误: ' + e.message
    formattedJson.value = ''
    successMessage.value = ''
  }
}

// 压缩JSON
const minifyJson = () => {
  try {
    const obj = JSON.parse(inputJson.value)
    formattedJson.value = JSON.stringify(obj)
    error.value = ''
    successMessage.value = 'JSON压缩成功！'
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch (e) {
    error.value = 'JSON格式错误: ' + e.message
    formattedJson.value = ''
    successMessage.value = ''
  }
}

// 验证JSON
const validateJson = () => {
  try {
    JSON.parse(inputJson.value)
    error.value = ''
    successMessage.value = 'JSON格式验证通过！'
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch (e) {
    error.value = 'JSON格式错误: ' + e.message
    successMessage.value = ''
  }
}

// 清空输入
const clearInput = () => {
  inputJson.value = ''
  formattedJson.value = ''
  error.value = ''
  successMessage.value = ''
}

// 复制输入内容
const copyInput = async () => {
  try {
    await navigator.clipboard.writeText(inputJson.value)
    successMessage.value = '输入内容已复制到剪贴板！'
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch (e) {
    error.value = '复制失败: ' + e.message
  }
}

// 复制结果
const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(formattedJson.value)
    successMessage.value = '结果已复制到剪贴板！'
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch (e) {
    error.value = '复制失败: ' + e.message
  }
}

// 下载JSON文件
const downloadJson = () => {
  if (!formattedJson.value) return
  
  const blob = new Blob([formattedJson.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'formatted.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  successMessage.value = 'JSON文件已下载！'
  setTimeout(() => { successMessage.value = '' }, 3000)
}

// 统计对象数量
const countObjects = (obj) => {
  if (typeof obj !== 'object' || obj === null) return 0
  if (Array.isArray(obj)) return obj.reduce((count, item) => count + countObjects(item), 0)
  return 1 + Object.values(obj).reduce((count, value) => count + countObjects(value), 0)
}

// 统计数组数量
const countArrays = (obj) => {
  if (typeof obj !== 'object' || obj === null) return 0
  if (Array.isArray(obj)) return 1 + obj.reduce((count, item) => count + countArrays(item), 0)
  return Object.values(obj).reduce((count, value) => count + countArrays(value), 0)
}
</script>
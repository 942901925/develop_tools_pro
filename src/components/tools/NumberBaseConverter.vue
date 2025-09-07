<template>
  <div class="space-y-6">
    <!-- 进制转换器 -->
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">进制转换器</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">输入数值</label>
            <input
              v-model="inputValue"
              placeholder="输入要转换的数值"
              class="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">源进制</label>
            <select
              v-model="fromBase"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="2">二进制 (2)</option>
              <option value="8">八进制 (8)</option>
              <option value="10">十进制 (10)</option>
              <option value="16">十六进制 (16)</option>
            </select>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">目标进制</label>
            <select
              v-model="toBase"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="2">二进制 (2)</option>
              <option value="8">八进制 (8)</option>
              <option value="10">十进制 (10)</option>
              <option value="16">十六进制 (16)</option>
            </select>
          </div>
          
          <div class="flex space-x-2">
            <button
              @click="convert"
              class="flex-1 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              转换
            </button>
            <button
              @click="clearAll"
              class="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              清空
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 转换结果 -->
    <div v-if="conversionResult" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">转换结果</h3>
      <div class="bg-gray-900 text-white p-6 rounded-lg">
        <div class="text-center">
          <div class="text-2xl font-bold text-green-400 mb-2">{{ conversionResult }}</div>
          <div class="text-lg text-gray-300">
            {{ inputValue }}<sub>{{ fromBase }}</sub> = {{ conversionResult }}<sub>{{ toBase }}</sub>
          </div>
        </div>
      </div>
      
      <div class="flex space-x-2">
        <button
          @click="copyResult"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          复制结果
        </button>
        <button
          @click="copyAll"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          复制全部
        </button>
      </div>
    </div>

    <!-- 所有进制显示 -->
    <div v-if="allBasesResult" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">所有进制表示</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(value, base) in allBasesResult"
          :key="base"
          class="p-4 bg-gray-50 rounded-lg text-center"
        >
          <div class="text-sm text-gray-600 mb-1">{{ getBaseName(base) }}</div>
          <div class="font-mono text-lg font-bold text-gray-900">{{ value }}</div>
        </div>
      </div>
    </div>

    <!-- 快速转换 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">快速转换</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="quick in quickConversions"
          :key="quick.name"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="loadQuickConversion(quick)"
        >
          <div class="font-medium text-gray-900">{{ quick.name }}</div>
          <div class="text-sm text-gray-600 mt-1">{{ quick.description }}</div>
          <div class="text-xs text-gray-500 mt-2 font-mono">{{ quick.value }}</div>
        </div>
      </div>
    </div>

    <!-- 进制对照表 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">进制对照表</h3>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-50">
              <th class="border border-gray-300 px-4 py-2">十进制</th>
              <th class="border border-gray-300 px-4 py-2">二进制</th>
              <th class="border border-gray-300 px-4 py-2">八进制</th>
              <th class="border border-gray-300 px-4 py-2">十六进制</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 16" :key="i">
              <td class="border border-gray-300 px-4 py-2 text-center">{{ i - 1 }}</td>
              <td class="border border-gray-300 px-4 py-2 text-center font-mono">{{ (i - 1).toString(2) }}</td>
              <td class="border border-gray-300 px-4 py-2 text-center font-mono">{{ (i - 1).toString(8) }}</td>
              <td class="border border-gray-300 px-4 py-2 text-center font-mono">{{ (i - 1).toString(16).toUpperCase() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 转换历史 -->
    <div v-if="conversionHistory.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">转换历史</h3>
      <div class="space-y-2">
        <div
          v-for="(record, index) in conversionHistory"
          :key="index"
          class="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
        >
          <div>
            <div class="font-medium font-mono">{{ record.input }}<sub>{{ record.fromBase }}</sub> = {{ record.result }}<sub>{{ record.toBase }}</sub></div>
            <div class="text-sm text-gray-600">{{ record.timestamp }}</div>
          </div>
          <button
            @click="removeHistory(index)"
            class="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputValue = ref('')
const fromBase = ref('10')
const toBase = ref('2')
const conversionResult = ref('')
const allBasesResult = ref(null)
const conversionHistory = ref([])

const quickConversions = ref([
  { name: '255转二进制', value: '255', fromBase: '10', toBase: '2', description: '常用IP地址' },
  { name: 'FF转十进制', value: 'FF', fromBase: '16', toBase: '10', description: '十六进制转十进制' },
  { name: '100转八进制', value: '100', fromBase: '10', toBase: '8', description: '十进制转八进制' },
  { name: '1010转十六进制', value: '1010', fromBase: '2', toBase: '16', description: '二进制转十六进制' }
])

const getBaseName = (base) => {
  const names = {
    '2': '二进制',
    '8': '八进制',
    '10': '十进制',
    '16': '十六进制'
  }
  return names[base] || base
}

const convert = () => {
  if (!inputValue.value) return
  
  try {
    // 先转换为十进制
    let decimal = parseInt(inputValue.value, parseInt(fromBase.value))
    
    if (isNaN(decimal)) {
      alert('输入值不是有效的数字')
      return
    }
    
    // 再转换为目标进制
    conversionResult.value = decimal.toString(parseInt(toBase.value)).toUpperCase()
    
    // 生成所有进制表示
    allBasesResult.value = {
      '2': decimal.toString(2),
      '8': decimal.toString(8),
      '10': decimal.toString(10),
      '16': decimal.toString(16).toUpperCase()
    }
    
    // 添加到历史记录
    addToHistory()
  } catch (e) {
    alert('转换失败: ' + e.message)
  }
}

const addToHistory = () => {
  const record = {
    input: inputValue.value,
    fromBase: fromBase.value,
    result: conversionResult.value,
    toBase: toBase.value,
    timestamp: new Date().toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  conversionHistory.value.unshift(record)
  if (conversionHistory.value.length > 20) {
    conversionHistory.value = conversionHistory.value.slice(0, 20)
  }
}

const loadQuickConversion = (quick) => {
  inputValue.value = quick.value
  fromBase.value = quick.fromBase
  toBase.value = quick.toBase
  convert()
}

const removeHistory = (index) => {
  conversionHistory.value.splice(index, 1)
}

const clearAll = () => {
  inputValue.value = ''
  conversionResult.value = ''
  allBasesResult.value = null
}

const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(conversionResult.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}

const copyAll = async () => {
  try {
    const text = `${inputValue.value}(${fromBase.value}) = ${conversionResult.value}(${toBase.value})`
    await navigator.clipboard.writeText(text)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

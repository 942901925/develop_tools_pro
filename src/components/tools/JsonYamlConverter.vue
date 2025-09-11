<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- JSON输入 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('jsonYamlConverter.jsonInput') }}</h3>
          <div class="flex space-x-2">
            <button
              @click="jsonToYaml"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {{ t('jsonYamlConverter.jsonToYaml') }}
            </button>
            <button
              @click="clearJson"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {{ t('jsonYamlConverter.clear') }}
            </button>
          </div>
        </div>
        <textarea
          v-model="jsonInput"
          :placeholder="t('jsonYamlConverter.enterJsonData')"
          class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <div v-if="jsonError" class="text-red-600 text-sm">{{ jsonError }}</div>
      </div>

      <!-- YAML输出 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('jsonYamlConverter.yamlOutput') }}</h3>
          <button
            @click="copyYaml"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            {{ t('jsonYamlConverter.copyYaml') }}
          </button>
        </div>
        <pre class="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto text-sm">{{ yamlOutput }}</pre>
      </div>
    </div>

    <!-- 反向转换 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- YAML输入 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('jsonYamlConverter.yamlInput') }}</h3>
          <div class="flex space-x-2">
            <button
              @click="yamlToJson"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {{ t('jsonYamlConverter.yamlToJson') }}
            </button>
            <button
              @click="clearYaml"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {{ t('jsonYamlConverter.clear') }}
            </button>
          </div>
        </div>
        <textarea
          v-model="yamlInput"
          :placeholder="t('jsonYamlConverter.enterYamlData')"
          class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        ></textarea>
        <div v-if="yamlError" class="text-red-600 text-sm">{{ yamlError }}</div>
      </div>

      <!-- JSON输出 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('jsonYamlConverter.jsonOutput') }}</h3>
          <button
            @click="copyJson"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            {{ t('jsonYamlConverter.copyJson') }}
          </button>
        </div>
        <pre class="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto text-sm">{{ jsonOutput }}</pre>
      </div>
    </div>

    <!-- 示例数据 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('jsonYamlConverter.exampleData') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="example in examples"
          :key="example.name"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="loadExample(example)"
        >
          <div class="font-medium text-gray-900">{{ example.name }}</div>
          <div class="text-sm text-gray-600 mt-1">{{ example.description }}</div>
        </div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-blue-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-blue-600">{{ jsonInput.length }}</div>
        <div class="text-sm text-gray-600">{{ t('jsonYamlConverter.jsonCharCount') }}</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ yamlInput.length }}</div>
        <div class="text-sm text-gray-600">{{ t('jsonYamlConverter.yamlCharCount') }}</div>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-purple-600">{{ conversionRatio }}%</div>
        <div class="text-sm text-gray-600">{{ t('jsonYamlConverter.conversionRatio') }}</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-orange-600">{{ hasError ? t('jsonYamlConverter.hasError') : t('jsonYamlConverter.normal') }}</div>
        <div class="text-sm text-gray-600">{{ t('jsonYamlConverter.status') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const jsonInput = ref('')
const yamlOutput = ref('')
const yamlInput = ref('')
const jsonOutput = ref('')
const jsonError = ref('')
const yamlError = ref('')

const examples = computed(() => [
  {
    name: t('jsonYamlConverter.examples.simpleObject.name'),
    description: t('jsonYamlConverter.examples.simpleObject.description'),
    json: '{"name": "张三", "age": 25, "city": "北京"}',
    yaml: 'name: 张三\nage: 25\ncity: 北京'
  },
  {
    name: t('jsonYamlConverter.examples.nestedObject.name'),
    description: t('jsonYamlConverter.examples.nestedObject.description'),
    json: '{"user": {"name": "李四", "profile": {"email": "li@example.com", "phone": "13800138000"}}, "settings": {"theme": "dark", "language": "zh-CN"}}',
    yaml: 'user:\n  name: 李四\n  profile:\n    email: li@example.com\n    phone: "13800138000"\nsettings:\n  theme: dark\n  language: zh-CN'
  },
  {
    name: t('jsonYamlConverter.examples.arrayData.name'),
    description: t('jsonYamlConverter.examples.arrayData.description'),
    json: '{"items": ["苹果", "香蕉", "橙子"], "counts": [5, 3, 8], "metadata": {"total": 16, "categories": ["水果"]}}',
    yaml: 'items:\n  - 苹果\n  - 香蕉\n  - 橙子\ncounts:\n  - 5\n  - 3\n  - 8\nmetadata:\n  total: 16\n  categories:\n    - 水果'
  }
])

const conversionRatio = computed(() => {
  if (jsonInput.value.length === 0 || yamlOutput.value.length === 0) return 0
  return Math.round((yamlOutput.value.length / jsonInput.value.length) * 100)
})

const hasError = computed(() => {
  return !!(jsonError.value || yamlError.value)
})

const jsonToYaml = () => {
  try {
    const obj = JSON.parse(jsonInput.value)
    yamlOutput.value = convertToYaml(obj)
    jsonError.value = ''
  } catch (e) {
    jsonError.value = t('jsonYamlConverter.jsonFormatError') + ': ' + e.message
    yamlOutput.value = ''
  }
}

const yamlToJson = () => {
  try {
    const obj = convertFromYaml(yamlInput.value)
    jsonOutput.value = JSON.stringify(obj, null, 2)
    yamlError.value = ''
  } catch (e) {
    yamlError.value = t('jsonYamlConverter.yamlFormatError') + ': ' + e.message
    jsonOutput.value = ''
  }
}

const convertToYaml = (obj, indent = 0) => {
  const spaces = '  '.repeat(indent)
  
  if (obj === null) return 'null'
  if (typeof obj === 'string') return `"${obj}"`
  if (typeof obj === 'number' || typeof obj === 'boolean') return obj.toString()
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]'
    return obj.map(item => `${spaces}- ${convertToYaml(item, indent + 1)}`).join('\n')
  }
  
  if (typeof obj === 'object') {
    const entries = Object.entries(obj)
    if (entries.length === 0) return '{}'
    
    return entries.map(([key, value]) => {
      const valueStr = convertToYaml(value, indent + 1)
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return `${spaces}${key}:\n${valueStr}`
      } else {
        return `${spaces}${key}: ${valueStr}`
      }
    }).join('\n')
  }
  
  return obj.toString()
}

const convertFromYaml = (yaml) => {
  // 简单的YAML解析器（仅支持基本功能）
  const lines = yaml.split('\n')
  const result = {}
  const stack = [{ obj: result, indent: -1 }]
  
  for (const line of lines) {
    if (line.trim() === '') continue
    
    const indent = line.search(/\S/)
    const content = line.trim()
    
    // 移除多余的栈元素
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop()
    }
    
    const current = stack[stack.length - 1].obj
    
    if (content.startsWith('- ')) {
      // 数组项
      if (!Array.isArray(current)) {
        throw new Error('Invalid YAML: array item in non-array context')
      }
      const value = parseYamlValue(content.substring(2))
      current.push(value)
    } else if (content.includes(':')) {
      // 键值对
      const [key, ...valueParts] = content.split(':')
      const keyStr = key.trim()
      const valueStr = valueParts.join(':').trim()
      
      if (valueStr === '') {
        // 对象开始
        const newObj = {}
        current[keyStr] = newObj
        stack.push({ obj: newObj, indent })
      } else {
        // 简单值
        current[keyStr] = parseYamlValue(valueStr)
      }
    }
  }
  
  return result
}

const parseYamlValue = (value) => {
  value = value.trim()
  
  if (value === 'null') return null
  if (value === 'true') return true
  if (value === 'false') return false
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1)
  }
  if (!isNaN(value) && !isNaN(parseFloat(value))) {
    return parseFloat(value)
  }
  
  return value
}

const loadExample = (example) => {
  jsonInput.value = example.json
  yamlInput.value = example.yaml
  jsonToYaml()
  yamlToJson()
}

const clearJson = () => {
  jsonInput.value = ''
  yamlOutput.value = ''
  jsonError.value = ''
}

const clearYaml = () => {
  yamlInput.value = ''
  jsonOutput.value = ''
  yamlError.value = ''
}

const copyYaml = async () => {
  try {
    await navigator.clipboard.writeText(yamlOutput.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}

const copyJson = async () => {
  try {
    await navigator.clipboard.writeText(jsonOutput.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- JSON输入 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">JSON 数据</h3>
          <div class="flex space-x-2">
            <button
              @click="generateSchema"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              生成Schema
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
          v-model="jsonInput"
          placeholder="请输入JSON数据..."
          class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <div v-if="jsonError" class="text-red-600 text-sm">{{ jsonError }}</div>
      </div>

      <!-- Schema输出 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">JSON Schema</h3>
          <button
            @click="copySchema"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            复制Schema
          </button>
        </div>
        <pre class="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto text-sm">{{ schemaOutput }}</pre>
      </div>
    </div>

    <!-- Schema配置选项 -->
    <div class="bg-gray-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Schema 配置选项</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Schema标题</label>
            <input
              v-model="schemaTitle"
              placeholder="输入Schema标题"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Schema描述</label>
            <input
              v-model="schemaDescription"
              placeholder="输入Schema描述"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="flex items-center">
              <input v-model="includeRequired" type="checkbox" class="mr-2" />
              包含required字段
            </label>
          </div>
          <div>
            <label class="flex items-center">
              <input v-model="includeExamples" type="checkbox" class="mr-2" />
              包含示例值
            </label>
          </div>
          <div>
            <label class="flex items-center">
              <input v-model="strictMode" type="checkbox" class="mr-2" />
              严格模式
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- 示例数据 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">示例数据</h3>
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

    <!-- Schema验证 -->
    <div v-if="schemaOutput" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">Schema验证</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">测试JSON数据</label>
          <textarea
            v-model="testJson"
            placeholder="输入要验证的JSON数据..."
            class="w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
          ></textarea>
          <button
            @click="validateJson"
            class="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            验证JSON
          </button>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-700 mb-2">验证结果</div>
          <div class="p-4 rounded-lg" :class="validationResult.valid ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
            <div class="font-medium">{{ validationResult.valid ? '✓ 验证通过' : '✗ 验证失败' }}</div>
            <div v-if="validationResult.errors.length > 0" class="mt-2 text-sm">
              <div v-for="error in validationResult.errors" :key="error" class="mb-1">
                • {{ error }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-blue-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-blue-600">{{ jsonInput.length }}</div>
        <div class="text-sm text-gray-600">JSON字符数</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ schemaOutput.length }}</div>
        <div class="text-sm text-gray-600">Schema字符数</div>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-purple-600">{{ propertyCount }}</div>
        <div class="text-sm text-gray-600">属性数量</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-orange-600">{{ schemaLevel }}</div>
        <div class="text-sm text-gray-600">嵌套层级</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const jsonInput = ref('')
const schemaOutput = ref('')
const jsonError = ref('')
const schemaTitle = ref('Generated Schema')
const schemaDescription = ref('Auto-generated JSON Schema')
const includeRequired = ref(true)
const includeExamples = ref(true)
const strictMode = ref(false)
const testJson = ref('')
const validationResult = ref({ valid: true, errors: [] })

const examples = ref([
  {
    name: '用户对象',
    description: '包含基本用户信息的对象',
    json: '{"id": 1, "name": "张三", "email": "zhang@example.com", "age": 25, "active": true}'
  },
  {
    name: '产品列表',
    description: '包含产品数组的对象',
    json: '{"products": [{"id": 1, "name": "商品A", "price": 99.99, "inStock": true}, {"id": 2, "name": "商品B", "price": 149.99, "inStock": false}], "total": 2}'
  },
  {
    name: '嵌套配置',
    description: '包含嵌套配置的对象',
    json: '{"database": {"host": "localhost", "port": 5432, "credentials": {"username": "admin", "password": "secret"}}, "cache": {"enabled": true, "ttl": 3600}}'
  }
])

const propertyCount = computed(() => {
  try {
    const obj = JSON.parse(jsonInput.value)
    return countProperties(obj)
  } catch {
    return 0
  }
})

const schemaLevel = computed(() => {
  try {
    const obj = JSON.parse(jsonInput.value)
    return getMaxDepth(obj)
  } catch {
    return 0
  }
})

const generateSchema = () => {
  try {
    const obj = JSON.parse(jsonInput.value)
    const schema = generateJsonSchema(obj)
    schemaOutput.value = JSON.stringify(schema, null, 2)
    jsonError.value = ''
  } catch (e) {
    jsonError.value = 'JSON格式错误: ' + e.message
    schemaOutput.value = ''
  }
}

const generateJsonSchema = (obj, path = '') => {
  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: getJsonType(obj),
    title: schemaTitle.value || 'Generated Schema',
    description: schemaDescription.value || 'Auto-generated JSON Schema'
  }

  if (obj === null) {
    return { ...schema, type: 'null' }
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      schema.items = { type: 'string' }
    } else {
      const itemTypes = obj.map(item => getJsonType(item))
      const uniqueTypes = [...new Set(itemTypes)]
      
      if (uniqueTypes.length === 1) {
        schema.items = generateJsonSchema(obj[0], path + '[]')
      } else {
        schema.items = {
          oneOf: uniqueTypes.map(type => ({ type }))
        }
      }
    }
  } else if (typeof obj === 'object') {
    const properties = {}
    const required = []
    
    for (const [key, value] of Object.entries(obj)) {
      properties[key] = generateJsonSchema(value, path + '.' + key)
      
      if (includeRequired.value && value !== null && value !== undefined) {
        required.push(key)
      }
      
      if (includeExamples.value) {
        properties[key].examples = [value]
      }
    }
    
    schema.properties = properties
    if (includeRequired.value && required.length > 0) {
      schema.required = required
    }
  } else {
    if (includeExamples.value) {
      schema.examples = [obj]
    }
  }

  return schema
}

const getJsonType = (value) => {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'object') return 'object'
  if (typeof value === 'string') return 'string'
  if (typeof value === 'number') return Number.isInteger(value) ? 'integer' : 'number'
  if (typeof value === 'boolean') return 'boolean'
  return 'string'
}

const countProperties = (obj) => {
  if (typeof obj !== 'object' || obj === null) return 0
  if (Array.isArray(obj)) return obj.reduce((count, item) => count + countProperties(item), 0)
  return Object.keys(obj).length + Object.values(obj).reduce((count, value) => count + countProperties(value), 0)
}

const getMaxDepth = (obj, depth = 0) => {
  if (typeof obj !== 'object' || obj === null) return depth
  if (Array.isArray(obj)) {
    return Math.max(depth, ...obj.map(item => getMaxDepth(item, depth + 1)))
  }
  return Math.max(depth, ...Object.values(obj).map(value => getMaxDepth(value, depth + 1)))
}

const validateJson = () => {
  try {
    const testObj = JSON.parse(testJson.value)
    const schema = JSON.parse(schemaOutput.value)
    const result = validateAgainstSchema(testObj, schema)
    validationResult.value = result
  } catch (e) {
    validationResult.value = {
      valid: false,
      errors: ['JSON格式错误: ' + e.message]
    }
  }
}

const validateAgainstSchema = (data, schema) => {
  const errors = []
  
  // 简单的Schema验证（仅支持基本类型检查）
  if (schema.type && getJsonType(data) !== schema.type) {
    errors.push(`期望类型 ${schema.type}，实际类型 ${getJsonType(data)}`)
  }
  
  if (schema.required && typeof data === 'object' && data !== null) {
    for (const field of schema.required) {
      if (!(field in data)) {
        errors.push(`缺少必需字段: ${field}`)
      }
    }
  }
  
  if (schema.properties && typeof data === 'object' && data !== null) {
    for (const [key, value] of Object.entries(data)) {
      if (schema.properties[key]) {
        const fieldErrors = validateAgainstSchema(value, schema.properties[key])
        if (fieldErrors.errors.length > 0) {
          errors.push(`字段 ${key}: ${fieldErrors.errors.join(', ')}`)
        }
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

const loadExample = (example) => {
  jsonInput.value = example.json
  generateSchema()
}

const clearInput = () => {
  jsonInput.value = ''
  schemaOutput.value = ''
  jsonError.value = ''
  testJson.value = ''
  validationResult.value = { valid: true, errors: [] }
}

const copySchema = async () => {
  try {
    await navigator.clipboard.writeText(schemaOutput.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {{ t('apiMockGenerator.title') }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ t('apiMockGenerator.subtitle') }}
      </p>
    </div>

    <!-- API端点配置 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
        <span class="mr-2">🔗</span>
        {{ t('apiMockGenerator.apiEndpoint') }}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('apiMockGenerator.endpointLabel') }}
          </label>
          <input
            v-model="apiEndpoint"
            type="text"
            :placeholder="t('apiMockGenerator.endpointPlaceholder')"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('apiMockGenerator.httpMethod') }}
          </label>
          <select
            v-model="httpMethod"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 字段定义区域 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
          <span class="mr-2">📝</span>
          {{ t('apiMockGenerator.fieldDefinition') }}
        </h3>
        <button
          @click="addField"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>{{ t('apiMockGenerator.addField') }}</span>
        </button>
      </div>

      <div v-if="fields.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
        {{ t('apiMockGenerator.noFields') }}
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="(field, index) in fields"
          :key="field.id"
          class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
        >
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('apiMockGenerator.fieldName') }}
              </label>
              <input
                v-model="field.name"
                type="text"
                :placeholder="t('apiMockGenerator.fieldNamePlaceholder')"
                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-gray-100"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('apiMockGenerator.fieldType') }}
              </label>
              <select
                v-model="field.type"
                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-gray-100"
              >
                <option value="string">{{ t('apiMockGenerator.types.string') }}</option>
                <option value="number">{{ t('apiMockGenerator.types.number') }}</option>
                <option value="boolean">{{ t('apiMockGenerator.types.boolean') }}</option>
                <option value="array">{{ t('apiMockGenerator.types.array') }}</option>
                <option value="object">{{ t('apiMockGenerator.types.object') }}</option>
                <option value="email">{{ t('apiMockGenerator.types.email') }}</option>
                <option value="url">{{ t('apiMockGenerator.types.url') }}</option>
                <option value="date">{{ t('apiMockGenerator.types.date') }}</option>
                <option value="uuid">{{ t('apiMockGenerator.types.uuid') }}</option>
                <option value="phone">{{ t('apiMockGenerator.types.phone') }}</option>
                <option value="name">{{ t('apiMockGenerator.types.name') }}</option>
                <option value="address">{{ t('apiMockGenerator.types.address') }}</option>
                <option value="company">{{ t('apiMockGenerator.types.company') }}</option>
                <option value="lorem">{{ t('apiMockGenerator.types.lorem') }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ t('apiMockGenerator.fieldDescription') }}
              </label>
              <input
                v-model="field.description"
                type="text"
                :placeholder="t('apiMockGenerator.fieldDescriptionPlaceholder')"
                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:text-gray-100"
              />
            </div>
            <div class="flex items-end">
              <button
                @click="removeField(index)"
                class="w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-semibold transition-colors flex items-center justify-center space-x-1"
              >
                <span>🗑️</span>
                <span>{{ t('apiMockGenerator.removeField') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 网络延迟配置 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
        <span class="mr-2">⏱️</span>
        {{ t('apiMockGenerator.networkDelay') }}
      </h3>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('apiMockGenerator.delayLabel') }}: {{ networkDelay }}ms
          </label>
          <input
            v-model="networkDelay"
            type="range"
            min="0"
            max="5000"
            step="100"
            class="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        <div class="flex space-x-2">
          <button
            v-for="preset in delayPresets"
            :key="preset.value"
            @click="networkDelay = preset.value"
            :class="['px-3 py-1 rounded text-sm font-medium transition-colors',
                     networkDelay === preset.value ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600']"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <button
          @click="generateMockData"
          :disabled="fields.length === 0 || isGenerating"
          :class="['px-6 py-3 rounded-lg font-semibold text-white transition-colors flex items-center justify-center space-x-2',
                   (fields.length === 0 || isGenerating) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700']"
        >
          <span v-if="isGenerating">⏳</span>
          <span v-else>🚀</span>
          <span>{{ isGenerating ? t('apiMockGenerator.generating') : t('apiMockGenerator.generateMock') }}</span>
        </button>
        
        <button
          @click="clearAll"
          class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          <span>🗑️</span>
          <span>{{ t('apiMockGenerator.clearAll') }}</span>
        </button>

        <button
          @click="loadSampleData"
          class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          <span>📋</span>
          <span>{{ t('apiMockGenerator.loadSample') }}</span>
        </button>
      </div>
    </div>

    <!-- 结果展示区域 -->
    <div v-if="mockResult" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
          <span class="mr-2">📊</span>
          {{ t('apiMockGenerator.mockResult') }}
        </h3>
      </div>
      
      <div class="p-4">
        <!-- 选项卡 -->
        <div class="mb-4">
          <div class="border-b border-gray-200 dark:border-gray-600">
            <nav class="-mb-px flex space-x-8">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="['py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                         activeTab === tab.id 
                           ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                           : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300']"
              >
                {{ tab.label }}
              </button>
            </nav>
          </div>
        </div>

        <!-- 选项卡内容 -->
        <div class="space-y-4">
          <!-- JSON结果 -->
          <div v-if="activeTab === 'json'" class="space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-md font-semibold text-gray-900 dark:text-gray-100">
                {{ t('apiMockGenerator.generatedJson') }}
              </h4>
              <button
                @click="copyToClipboard(mockResult.json)"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <span>📋</span>
                <span>{{ t('apiMockGenerator.copyJson') }}</span>
              </button>
            </div>
            <pre class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ mockResult.json }}</pre>
          </div>

          <!-- cURL命令 -->
          <div v-if="activeTab === 'curl'" class="space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-md font-semibold text-gray-900 dark:text-gray-100">
                {{ t('apiMockGenerator.curlCommand') }}
              </h4>
              <button
                @click="copyToClipboard(mockResult.curl)"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <span>📋</span>
                <span>{{ t('apiMockGenerator.copyCurl') }}</span>
              </button>
            </div>
            <pre class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ mockResult.curl }}</pre>
          </div>

          <!-- JavaScript fetch -->
          <div v-if="activeTab === 'javascript'" class="space-y-4">
            <div class="flex items-center justify-between">
              <h4 class="text-md font-semibold text-gray-900 dark:text-gray-100">
                {{ t('apiMockGenerator.javascriptCode') }}
              </h4>
              <button
                @click="copyToClipboard(mockResult.javascript)"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <span>📋</span>
                <span>{{ t('apiMockGenerator.copyJs') }}</span>
              </button>
            </div>
            <pre class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ mockResult.javascript }}</pre>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用提示 -->
    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <div class="flex items-start space-x-2">
        <span class="text-blue-600 dark:text-blue-400 text-xl">💡</span>
        <div class="text-sm text-blue-800 dark:text-blue-200">
          <p class="font-medium">{{ t('apiMockGenerator.tips.title') }}</p>
          <p class="mt-1">{{ t('apiMockGenerator.tips.description') }}</p>
        </div>
      </div>
    </div>

    <!-- Toast 提示 -->
    <div 
      v-if="toastMessage"
      class="fixed top-4 right-4 z-50 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg transition-all duration-300"
      :class="{ 'opacity-0': !showToast }"
    >
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { faker } from '@faker-js/faker'

const { t } = useI18n()

// 响应式数据
const apiEndpoint = ref('/api/users')
const httpMethod = ref('GET')
const fields = ref([])
const networkDelay = ref(1000)
const mockResult = ref(null)
const isGenerating = ref(false)
const activeTab = ref('json')
const toastMessage = ref('')
const showToast = ref(false)

// 延迟预设
const delayPresets = [
  { label: '即时', value: 0 },
  { label: '快速', value: 500 },
  { label: '正常', value: 1000 },
  { label: '慢速', value: 2000 },
  { label: '很慢', value: 5000 }
]

// 选项卡配置
const tabs = [
  { id: 'json', label: 'JSON' },
  { id: 'curl', label: 'cURL' },
  { id: 'javascript', label: 'JavaScript' }
]

// 字段ID计数器
let fieldIdCounter = 0

// 方法
const addField = () => {
  fields.value.push({
    id: ++fieldIdCounter,
    name: '',
    type: 'string',
    description: ''
  })
}

const removeField = (index) => {
  fields.value.splice(index, 1)
}

const generateMockData = async () => {
  if (fields.value.length === 0) return

  isGenerating.value = true

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, networkDelay.value))

  try {
    // 生成Mock数据
    const mockData = generateMockDataFromFields(fields.value)
    
    // 生成cURL命令
    const curlCommand = generateCurlCommand()
    
    // 生成JavaScript代码
    const jsCode = generateJavaScriptCode()

    mockResult.value = {
      json: JSON.stringify(mockData, null, 2),
      curl: curlCommand,
      javascript: jsCode
    }

    showToastMessage(t('apiMockGenerator.success.generated'))
  } catch (error) {
    console.error('Generate mock data error:', error)
    showToastMessage(t('apiMockGenerator.errors.generationFailed'))
  } finally {
    isGenerating.value = false
  }
}

const generateMockDataFromFields = (fields) => {
  const result = {}
  
  fields.forEach(field => {
    if (!field.name) return
    
    switch (field.type) {
      case 'string':
        result[field.name] = faker.lorem.words(2)
        break
      case 'number':
        result[field.name] = faker.number.int({ min: 1, max: 1000 })
        break
      case 'boolean':
        result[field.name] = faker.datatype.boolean()
        break
      case 'array':
        result[field.name] = Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => 
          faker.lorem.word()
        )
        break
      case 'object':
        result[field.name] = {
          id: faker.number.int({ min: 1, max: 100 }),
          name: faker.person.fullName()
        }
        break
      case 'email':
        result[field.name] = faker.internet.email()
        break
      case 'url':
        result[field.name] = faker.internet.url()
        break
      case 'date':
        result[field.name] = faker.date.recent().toISOString()
        break
      case 'uuid':
        result[field.name] = faker.string.uuid()
        break
      case 'phone':
        result[field.name] = faker.phone.number()
        break
      case 'name':
        result[field.name] = faker.person.fullName()
        break
      case 'address':
        result[field.name] = faker.location.streetAddress()
        break
      case 'company':
        result[field.name] = faker.company.name()
        break
      case 'lorem':
        result[field.name] = faker.lorem.paragraph()
        break
      default:
        result[field.name] = faker.lorem.word()
    }
  })
  
  return result
}

const generateCurlCommand = () => {
  const method = httpMethod.value
  const endpoint = apiEndpoint.value
  
  if (method === 'GET') {
    return `curl -X GET "${window.location.origin}${endpoint}"`
  } else {
    return `curl -X ${method} "${window.location.origin}${endpoint}" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(mockResult.value ? JSON.parse(mockResult.value.json) : {})}'`
  }
}

const generateJavaScriptCode = () => {
  const method = httpMethod.value
  const endpoint = apiEndpoint.value
  
  if (method === 'GET') {
    return `fetch('${window.location.origin}${endpoint}')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`
  } else {
    return `fetch('${window.location.origin}${endpoint}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(${mockResult.value ? mockResult.value.json : '{}'})
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`
  }
}

const clearAll = () => {
  fields.value = []
  mockResult.value = null
  showToastMessage(t('apiMockGenerator.success.cleared'))
}

const loadSampleData = () => {
  fields.value = [
    { id: 1, name: 'id', type: 'number', description: '用户ID' },
    { id: 2, name: 'username', type: 'name', description: '用户名' },
    { id: 3, name: 'email', type: 'email', description: '邮箱地址' },
    { id: 4, name: 'phone', type: 'phone', description: '电话号码' },
    { id: 5, name: 'company', type: 'company', description: '公司名称' },
    { id: 6, name: 'address', type: 'address', description: '地址' },
    { id: 7, name: 'isActive', type: 'boolean', description: '是否激活' },
    { id: 8, name: 'createdAt', type: 'date', description: '创建时间' }
  ]
  fieldIdCounter = 8
  showToastMessage(t('apiMockGenerator.success.sampleLoaded'))
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    showToastMessage(t('apiMockGenerator.success.copied'))
  } catch (error) {
    console.error('Copy failed:', error)
    showToastMessage(t('apiMockGenerator.errors.copyFailed'))
  }
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
    setTimeout(() => {
      toastMessage.value = ''
    }, 300)
  }, 2000)
}

// 初始化
onMounted(() => {
  // 加载示例数据
  loadSampleData()
})
</script>

<style scoped>
/* 自定义滑块样式 */
.slider {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.slider::-webkit-slider-track {
  background: #e5e7eb;
  height: 8px;
  border-radius: 4px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: #3b82f6;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
}

.slider::-moz-range-track {
  background: #e5e7eb;
  height: 8px;
  border-radius: 4px;
  border: none;
}

.slider::-moz-range-thumb {
  background: #3b82f6;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .grid-cols-1.md\\:grid-cols-4 {
    grid-template-columns: 1fr;
  }
  
  .grid-cols-1.md\\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

/* 动画效果 */
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>

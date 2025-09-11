<template>
  <div class="space-y-6">
    <!-- UUID生成器 -->
    <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('uuidGenerator.title') }}</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('uuidGenerator.uuidVersion') }}</label>
            <select
              v-model="uuidVersion"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="v1">{{ t('uuidGenerator.v1Timestamp') }}</option>
              <option value="v4">{{ t('uuidGenerator.v4Random') }}</option>
              <option value="v5">{{ t('uuidGenerator.v5Namespace') }}</option>
            </select>
          </div>
          
          <div v-if="uuidVersion === 'v5'">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('uuidGenerator.namespace') }}</label>
            <input
              v-model="namespace"
              :placeholder="t('uuidGenerator.enterNamespace')"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('uuidGenerator.generateCount') }}</label>
            <input
              v-model.number="count"
              type="number"
              min="1"
              max="100"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('uuidGenerator.formatOptions') }}</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input v-model="uppercase" type="checkbox" class="mr-2" />
                {{ t('uuidGenerator.uppercase') }}
              </label>
              <label class="flex items-center">
                <input v-model="hyphens" type="checkbox" checked class="mr-2" />
                {{ t('uuidGenerator.includeHyphens') }}
              </label>
              <label class="flex items-center">
                <input v-model="braces" type="checkbox" class="mr-2" />
                {{ t('uuidGenerator.includeBraces') }}
              </label>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <button
              @click="generateUuids"
              class="flex-1 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              {{ t('uuidGenerator.generate') }}
            </button>
            <button
              @click="clearResults"
              class="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {{ t('uuidGenerator.clear') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 生成的UUID -->
    <div v-if="generatedUuids.length > 0" class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">{{ t('uuidGenerator.generatedUuids') }}</h3>
        <button
          @click="copyAll"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          {{ t('uuidGenerator.copyAll') }}
        </button>
      </div>
      
      <div class="space-y-2">
        <div
          v-for="(uuid, index) in generatedUuids"
          :key="index"
          class="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
        >
          <span class="font-mono text-sm">{{ uuid }}</span>
          <button
            @click="copyUuid(uuid)"
            class="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
          >
            {{ t('uuidGenerator.copy') }}
          </button>
        </div>
      </div>
    </div>

    <!-- UUID信息 -->
    <div v-if="generatedUuids.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('uuidGenerator.uuidInfo') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-purple-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-purple-600">{{ generatedUuids.length }}</div>
          <div class="text-sm text-gray-600">{{ t('uuidGenerator.generateCount') }}</div>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-blue-600">{{ uuidVersion.toUpperCase() }}</div>
          <div class="text-sm text-gray-600">{{ t('uuidGenerator.uuidVersion') }}</div>
        </div>
        <div class="bg-green-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-green-600">{{ averageLength }}</div>
          <div class="text-sm text-gray-600">{{ t('uuidGenerator.averageLength') }}</div>
        </div>
      </div>
    </div>

    <!-- 常用UUID格式 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('uuidGenerator.commonFormats') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="format in uuidFormats"
          :key="format.name"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="loadFormat(format)"
        >
          <div class="font-medium text-gray-900">{{ format.name }}</div>
          <div class="text-sm text-gray-600 mt-1">{{ format.description }}</div>
          <div class="text-xs text-gray-500 mt-2 font-mono">{{ format.example }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const uuidVersion = ref('v4')
const namespace = ref('')
const count = ref(1)
const uppercase = ref(false)
const hyphens = ref(true)
const braces = ref(false)
const generatedUuids = ref([])

const uuidFormats = computed(() => [
  {
    name: t('uuidGenerator.formats.standard'),
    description: t('uuidGenerator.formats.standardDesc'),
    example: '550e8400-e29b-41d4-a716-446655440000'
  },
  {
    name: t('uuidGenerator.formats.noHyphens'),
    description: t('uuidGenerator.formats.noHyphensDesc'),
    example: '550e8400e29b41d4a716446655440000'
  },
  {
    name: t('uuidGenerator.formats.withBraces'),
    description: t('uuidGenerator.formats.withBracesDesc'),
    example: '{550e8400-e29b-41d4-a716-446655440000}'
  },
  {
    name: t('uuidGenerator.formats.uppercase'),
    description: t('uuidGenerator.formats.uppercaseDesc'),
    example: '550E8400-E29B-41D4-A716-446655440000'
  }
])

const averageLength = computed(() => {
  if (generatedUuids.value.length === 0) return 0
  const totalLength = generatedUuids.value.reduce((sum, uuid) => sum + uuid.length, 0)
  return Math.round(totalLength / generatedUuids.value.length)
})

const generateUuids = () => {
  generatedUuids.value = []
  
  for (let i = 0; i < count.value; i++) {
    let uuid = ''
    
    if (uuidVersion.value === 'v1') {
      uuid = generateV1()
    } else if (uuidVersion.value === 'v4') {
      uuid = generateV4()
    } else if (uuidVersion.value === 'v5') {
      uuid = generateV5(namespace.value || 'default')
    }
    
    // 应用格式选项
    if (uppercase.value) {
      uuid = uuid.toUpperCase()
    }
    
    if (!hyphens.value) {
      uuid = uuid.replace(/-/g, '')
    }
    
    if (braces.value) {
      uuid = `{${uuid}}`
    }
    
    generatedUuids.value.push(uuid)
  }
}

const generateV1 = () => {
  // 简化的UUID v1生成（实际应该包含时间戳和MAC地址）
  const hex = '0123456789abcdef'
  let uuid = ''
  
  for (let i = 0; i < 32; i++) {
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    }
    uuid += hex[Math.floor(Math.random() * 16)]
  }
  
  // 设置版本位 (v1)
  uuid = uuid.substring(0, 13) + '1' + uuid.substring(14)
  
  return uuid
}

const generateV4 = () => {
  const hex = '0123456789abcdef'
  let uuid = ''
  
  for (let i = 0; i < 32; i++) {
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    }
    uuid += hex[Math.floor(Math.random() * 16)]
  }
  
  // 设置版本位 (v4)
  uuid = uuid.substring(0, 13) + '4' + uuid.substring(14)
  
  return uuid
}

const generateV5 = (namespace) => {
  // 简化的UUID v5生成（实际应该使用SHA-1哈希）
  const hex = '0123456789abcdef'
  let uuid = ''
  
  // 使用命名空间作为种子
  let seed = 0
  for (let i = 0; i < namespace.length; i++) {
    seed += namespace.charCodeAt(i)
  }
  
  for (let i = 0; i < 32; i++) {
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-'
    }
    seed = (seed * 9301 + 49297) % 233280
    uuid += hex[Math.floor(seed / 233280 * 16)]
  }
  
  // 设置版本位 (v5)
  uuid = uuid.substring(0, 13) + '5' + uuid.substring(14)
  
  return uuid
}

const loadFormat = (format) => {
  if (format.name === '无连字符') {
    hyphens.value = false
  } else if (format.name === '大括号格式') {
    braces.value = true
  } else if (format.name === '大写格式') {
    uppercase.value = true
  }
  generateUuids()
}

const clearResults = () => {
  generatedUuids.value = []
}

const copyUuid = async (uuid) => {
  try {
    await navigator.clipboard.writeText(uuid)
  } catch (e) {
    console.error('复制失败:', e)
  }
}

const copyAll = async () => {
  try {
    await navigator.clipboard.writeText(generatedUuids.value.join('\n'))
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

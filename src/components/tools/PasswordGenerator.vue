<template>
  <div class="space-y-6">
    <!-- 密码生成器 -->
    <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('passwordGenerator.title') }}</h3>
      
      <!-- 生成选项 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('passwordGenerator.length') }}</label>
            <input
              v-model="passwordLength"
              type="range"
              min="4"
              max="128"
              class="w-full"
            />
            <div class="text-center text-sm text-gray-600">{{ passwordLength }} {{ t('passwordGenerator.characters') }}</div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('passwordGenerator.includeTypes') }}</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input v-model="includeUppercase" type="checkbox" class="mr-2" />
                {{ t('passwordGenerator.uppercase') }} (A-Z)
              </label>
              <label class="flex items-center">
                <input v-model="includeLowercase" type="checkbox" class="mr-2" />
                {{ t('passwordGenerator.lowercase') }} (a-z)
              </label>
              <label class="flex items-center">
                <input v-model="includeNumbers" type="checkbox" class="mr-2" />
                {{ t('passwordGenerator.numbers') }} (0-9)
              </label>
              <label class="flex items-center">
                <input v-model="includeSymbols" type="checkbox" class="mr-2" />
                {{ t('passwordGenerator.symbols') }} (!@#$%^&*)
              </label>
            </div>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('passwordGenerator.excludeChars') }}</label>
            <input
              v-model="excludeChars"
              :placeholder="t('passwordGenerator.excludePlaceholder')"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label class="flex items-center">
              <input v-model="avoidSimilar" type="checkbox" class="mr-2" />
              {{ t('passwordGenerator.avoidSimilar') }} (0O1lI)
            </label>
          </div>
          
          <div>
            <label class="flex items-center">
              <input v-model="avoidAmbiguous" type="checkbox" class="mr-2" />
              {{ t('passwordGenerator.avoidAmbiguous') }}
            </label>
          </div>
        </div>
      </div>
      
      <!-- 生成按钮 -->
      <div class="mt-6 text-center">
        <button
          @click="generatePassword"
          class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          {{ t('passwordGenerator.generate') }}
        </button>
      </div>
    </div>

    <!-- 生成的密码 -->
    <div v-if="generatedPassword" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('passwordGenerator.generatedPassword') }}</h3>
      <div class="p-4 bg-gray-100 rounded-lg">
        <div class="font-mono text-lg break-all mb-4">{{ generatedPassword }}</div>
        <div class="flex space-x-2">
          <button
            @click="copyPassword"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {{ t('passwordGenerator.copyPassword') }}
          </button>
          <button
            @click="regeneratePassword"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {{ t('passwordGenerator.regenerate') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 密码强度分析 -->
    <div v-if="generatedPassword" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('passwordGenerator.strengthAnalysis') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 border border-gray-200 rounded-lg">
          <div class="text-sm text-gray-600">{{ t('passwordGenerator.strengthLevel') }}</div>
          <div :class="strengthClass" class="text-2xl font-bold">{{ strengthLevel }}</div>
        </div>
        <div class="p-4 border border-gray-200 rounded-lg">
          <div class="text-sm text-gray-600">{{ t('passwordGenerator.entropy') }}</div>
          <div class="text-2xl font-bold text-blue-600">{{ entropy }}</div>
        </div>
        <div class="p-4 border border-gray-200 rounded-lg">
          <div class="text-sm text-gray-600">{{ t('passwordGenerator.crackTime') }}</div>
          <div class="text-lg font-semibold text-purple-600">{{ crackTime }}</div>
        </div>
      </div>
    </div>

    <!-- 批量生成 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('passwordGenerator.batchGenerate') }}</h3>
      <div class="flex space-x-4">
        <input
          v-model="batchCount"
          type="number"
          min="1"
          max="50"
          :placeholder="t('passwordGenerator.generateCount')"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          @click="generateBatch"
          class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          {{ t('passwordGenerator.batchGenerate') }}
        </button>
      </div>
      
      <div v-if="batchPasswords.length > 0" class="space-y-2">
        <div
          v-for="(password, index) in batchPasswords"
          :key="index"
          class="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
        >
          <span class="font-mono text-sm">{{ password }}</span>
          <button
            @click="copyPassword(password)"
            class="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
          >
            复制
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const passwordLength = ref(12)
const includeUppercase = ref(true)
const includeLowercase = ref(true)
const includeNumbers = ref(true)
const includeSymbols = ref(true)
const excludeChars = ref('')
const avoidSimilar = ref(false)
const avoidAmbiguous = ref(false)
const generatedPassword = ref('')
const batchCount = ref(5)
const batchPasswords = ref([])

const strengthLevel = computed(() => {
  if (!generatedPassword.value) return '无'
  
  const password = generatedPassword.value
  let score = 0
  
  // 长度评分
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1
  
  // 字符类型评分
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^a-zA-Z0-9]/.test(password)) score += 1
  
  if (score <= 2) return '弱'
  if (score <= 4) return '中等'
  if (score <= 6) return '强'
  return '极强'
})

const strengthClass = computed(() => {
  const level = strengthLevel.value
  if (level === '弱') return 'text-red-600'
  if (level === '中等') return 'text-yellow-600'
  if (level === '强') return 'text-blue-600'
  return 'text-green-600'
})

const entropy = computed(() => {
  if (!generatedPassword.value) return 0
  
  const password = generatedPassword.value
  let charsetSize = 0
  
  if (/[a-z]/.test(password)) charsetSize += 26
  if (/[A-Z]/.test(password)) charsetSize += 26
  if (/[0-9]/.test(password)) charsetSize += 10
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32
  
  return Math.round(password.length * Math.log2(charsetSize))
})

const crackTime = computed(() => {
  const e = entropy.value
  if (e === 0) return '无法计算'
  
  const seconds = Math.pow(2, e) / 1000000000 // 假设每秒10亿次尝试
  
  if (seconds < 60) return `${Math.round(seconds)}秒`
  if (seconds < 3600) return `${Math.round(seconds / 60)}分钟`
  if (seconds < 86400) return `${Math.round(seconds / 3600)}小时`
  if (seconds < 31536000) return `${Math.round(seconds / 86400)}天`
  return `${Math.round(seconds / 31536000)}年`
})

const generatePassword = () => {
  let charset = ''
  if (includeLowercase.value) charset += 'abcdefghijklmnopqrstuvwxyz'
  if (includeUppercase.value) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (includeNumbers.value) charset += '0123456789'
  if (includeSymbols.value) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  // 排除字符
  if (excludeChars.value) {
    charset = charset.split('').filter(char => !excludeChars.value.includes(char)).join('')
  }
  
  // 避免相似字符
  if (avoidSimilar.value) {
    charset = charset.replace(/[0O1lI]/g, '')
  }
  
  // 避免歧义字符
  if (avoidAmbiguous.value) {
    charset = charset.replace(/[{}[\]()\/\\~,;.<>]/g, '')
  }
  
  if (charset.length === 0) {
    alert('请至少选择一种字符类型')
    return
  }
  
  let password = ''
  for (let i = 0; i < passwordLength.value; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  
  generatedPassword.value = password
}

const regeneratePassword = () => {
  generatePassword()
}

const generateBatch = () => {
  batchPasswords.value = []
  for (let i = 0; i < batchCount.value; i++) {
    generatePassword()
    batchPasswords.value.push(generatedPassword.value)
  }
}

const copyPassword = async (password = generatedPassword.value) => {
  try {
    await navigator.clipboard.writeText(password)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

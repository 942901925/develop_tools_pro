<template>
  <div class="space-y-6">
    <!-- 密码强度检测器 -->
    <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('passwordStrength.title') }}</h3>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('passwordStrength.passwordInput') }}</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="t('passwordStrength.enterPassword')"
              class="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <button
              @click="togglePasswordVisibility"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
        </div>
        
        <div class="flex space-x-2">
          <button
            @click="analyzePassword"
            class="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {{ t('passwordStrength.analyzePassword') }}
          </button>
          <button
            @click="clearPassword"
            class="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {{ t('passwordStrength.clear') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 密码强度显示 -->
    <div v-if="analysisResult" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('passwordStrength.analysis') }}</h3>
      
      <!-- 强度等级 -->
      <div class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-700">{{ t('passwordStrength.strengthLevel') }}</span>
          <span :class="strengthClass" class="text-lg font-bold">{{ strengthLevel }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="h-2 rounded-full transition-all duration-500"
            :class="strengthBarClass"
            :style="{ width: strengthPercentage + '%' }"
          ></div>
        </div>
      </div>
      
      <!-- 详细分析 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-3">
          <h4 class="text-md font-semibold text-gray-900">{{ t('passwordStrength.characterAnalysis') }}</h4>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>{{ t('passwordStrength.length') }}</span>
              <span class="font-mono">{{ analysisResult.length }}</span>
            </div>
            <div class="flex justify-between">
              <span>{{ t('passwordStrength.lowercase') }}</span>
              <span class="font-mono">{{ analysisResult.lowercase }}</span>
            </div>
            <div class="flex justify-between">
              <span>{{ t('passwordStrength.uppercase') }}</span>
              <span class="font-mono">{{ analysisResult.uppercase }}</span>
            </div>
            <div class="flex justify-between">
              <span>{{ t('passwordStrength.numbers') }}</span>
              <span class="font-mono">{{ analysisResult.numbers }}</span>
            </div>
            <div class="flex justify-between">
              <span>{{ t('passwordStrength.symbols') }}</span>
              <span class="font-mono">{{ analysisResult.specialChars }}</span>
            </div>
          </div>
        </div>
        
        <div class="space-y-3">
          <h4 class="text-md font-semibold text-gray-900">{{ t('passwordStrength.securityMetrics') }}</h4>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>{{ t('passwordStrength.entropy') }}</span>
              <span class="font-mono">{{ analysisResult.entropy }}</span>
            </div>
            <div class="flex justify-between">
              <span>{{ t('passwordStrength.crackTime') }}</span>
              <span class="font-mono text-sm">{{ analysisResult.crackTime }}</span>
            </div>
            <div class="flex justify-between">
              <span>{{ t('passwordStrength.charsetSize') }}</span>
              <span class="font-mono">{{ analysisResult.charsetSize }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 建议 -->
      <div v-if="analysisResult.suggestions.length > 0" class="space-y-2">
        <h4 class="text-md font-semibold text-gray-900">{{ t('passwordStrength.suggestions') }}</h4>
        <div class="space-y-1">
          <div
            v-for="suggestion in analysisResult.suggestions"
            :key="suggestion"
            class="text-sm text-yellow-700 bg-yellow-50 p-2 rounded"
          >
            • {{ suggestion }}
          </div>
        </div>
      </div>
    </div>

    <!-- 密码生成器 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('passwordStrength.passwordGenerator') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('passwordStrength.passwordLength') }}</label>
            <input
              v-model.number="generatorLength"
              type="range"
              min="8"
              max="64"
              class="w-full"
            />
            <div class="text-center text-sm text-gray-600">{{ generatorLength }} {{ t('passwordStrength.characters') }}</div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('passwordStrength.includeCharacters') }}</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input v-model="generatorOptions.lowercase" type="checkbox" class="mr-2" />
                {{ t('passwordStrength.lowercaseLetters') }} (a-z)
              </label>
              <label class="flex items-center">
                <input v-model="generatorOptions.uppercase" type="checkbox" class="mr-2" />
                {{ t('passwordStrength.uppercaseLetters') }} (A-Z)
              </label>
              <label class="flex items-center">
                <input v-model="generatorOptions.numbers" type="checkbox" class="mr-2" />
                {{ t('passwordStrength.numbers') }} (0-9)
              </label>
              <label class="flex items-center">
                <input v-model="generatorOptions.special" type="checkbox" class="mr-2" />
                {{ t('passwordStrength.specialCharacters') }} (!@#$%^&*)
              </label>
            </div>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('passwordStrength.generatedPassword') }}</label>
            <div class="p-3 bg-gray-100 rounded-lg font-mono text-sm break-all">
              {{ generatedPassword }}
            </div>
          </div>
          
          <div class="flex space-x-2">
            <button
              @click="generatePassword"
              class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {{ t('passwordStrength.generatePassword') }}
            </button>
            <button
              @click="copyGeneratedPassword"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {{ t('passwordStrength.copy') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 常用密码检测 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">常用密码检测</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="common in commonPasswords"
          :key="common"
          class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="testCommonPassword(common)"
        >
          <div class="font-mono text-sm">{{ common }}</div>
        </div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ password.length }}</div>
        <div class="text-sm text-gray-600">密码长度</div>
      </div>
      <div class="bg-blue-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-blue-600">{{ analysisResult ? analysisResult.score : 0 }}</div>
        <div class="text-sm text-gray-600">强度分数</div>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-purple-600">{{ analysisResult ? analysisResult.entropy : 0 }}</div>
        <div class="text-sm text-gray-600">熵值</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-orange-600">{{ strengthLevel }}</div>
        <div class="text-sm text-gray-600">强度等级</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const password = ref('')
const showPassword = ref(false)
const analysisResult = ref(null)
const generatorLength = ref(12)
const generatorOptions = ref({
  lowercase: true,
  uppercase: true,
  numbers: true,
  special: true
})
const generatedPassword = ref('')

const commonPasswords = ref([
  'password', '123456', '123456789', 'qwerty', 'abc123',
  'password123', 'admin', 'letmein', 'welcome', 'monkey',
  '1234567890', 'password1', 'qwerty123', 'dragon', 'master'
])

const strengthLevel = computed(() => {
  if (!analysisResult.value) return t('passwordStrength.none')
  const score = analysisResult.value.score
  if (score < 20) return t('passwordStrength.veryWeak')
  if (score < 40) return t('passwordStrength.weak')
  if (score < 60) return t('passwordStrength.medium')
  if (score < 80) return t('passwordStrength.strong')
  return t('passwordStrength.veryStrong')
})

const strengthClass = computed(() => {
  const level = strengthLevel.value
  if (level === t('passwordStrength.veryWeak')) return 'text-red-600'
  if (level === t('passwordStrength.weak')) return 'text-orange-600'
  if (level === t('passwordStrength.medium')) return 'text-yellow-600'
  if (level === t('passwordStrength.strong')) return 'text-blue-600'
  return 'text-green-600'
})

const strengthBarClass = computed(() => {
  const level = strengthLevel.value
  if (level === t('passwordStrength.veryWeak')) return 'bg-red-500'
  if (level === t('passwordStrength.weak')) return 'bg-orange-500'
  if (level === t('passwordStrength.medium')) return 'bg-yellow-500'
  if (level === t('passwordStrength.strong')) return 'bg-blue-500'
  return 'bg-green-500'
})

const strengthPercentage = computed(() => {
  if (!analysisResult.value) return 0
  return Math.min(100, analysisResult.value.score)
})

const analyzePassword = () => {
  if (!password.value) return
  
  const pwd = password.value
  let score = 0
  const suggestions = []
  
  // 长度分析
  if (pwd.length < 8) {
    suggestions.push(t('passwordStrength.suggestions.length'))
  } else if (pwd.length >= 12) {
    score += 20
  } else {
    score += 10
  }
  
  // 字符类型分析
  const hasLowercase = /[a-z]/.test(pwd)
  const hasUppercase = /[A-Z]/.test(pwd)
  const hasNumbers = /[0-9]/.test(pwd)
  const hasSpecial = /[^a-zA-Z0-9]/.test(pwd)
  
  if (hasLowercase) score += 10
  else suggestions.push(t('passwordStrength.suggestions.lowercase'))
  
  if (hasUppercase) score += 10
  else suggestions.push(t('passwordStrength.suggestions.uppercase'))
  
  if (hasNumbers) score += 10
  else suggestions.push(t('passwordStrength.suggestions.numbers'))
  
  if (hasSpecial) score += 15
  else suggestions.push(t('passwordStrength.suggestions.special'))
  
  // 复杂度分析
  const uniqueChars = new Set(pwd).size
  if (uniqueChars >= pwd.length * 0.8) score += 10
  else suggestions.push(t('passwordStrength.suggestions.unique'))
  
  // 常见模式检测
  if (/(.)\1{2,}/.test(pwd)) {
    score -= 10
    suggestions.push(t('passwordStrength.suggestions.repeat'))
  }
  
  if (/123|abc|qwe/i.test(pwd)) {
    score -= 5
    suggestions.push(t('passwordStrength.suggestions.sequential'))
  }
  
  // 熵值计算
  let charsetSize = 0
  if (hasLowercase) charsetSize += 26
  if (hasUppercase) charsetSize += 26
  if (hasNumbers) charsetSize += 10
  if (hasSpecial) charsetSize += 32
  
  const entropy = Math.log2(Math.pow(charsetSize, pwd.length))
  
  // 破解时间估算
  const crackTime = estimateCrackTime(entropy)
  
  analysisResult.value = {
    length: pwd.length,
    lowercase: (pwd.match(/[a-z]/g) || []).length,
    uppercase: (pwd.match(/[A-Z]/g) || []).length,
    numbers: (pwd.match(/[0-9]/g) || []).length,
    specialChars: (pwd.match(/[^a-zA-Z0-9]/g) || []).length,
    score: Math.max(0, Math.min(100, score)),
    entropy: Math.round(entropy * 10) / 10,
    crackTime,
    charsetSize,
    suggestions
  }
}

const estimateCrackTime = (entropy) => {
  const seconds = Math.pow(2, entropy) / 1000000000 // 假设每秒10亿次尝试
  
  if (seconds < 60) return `${Math.round(seconds)}秒`
  if (seconds < 3600) return `${Math.round(seconds / 60)}分钟`
  if (seconds < 86400) return `${Math.round(seconds / 3600)}小时`
  if (seconds < 31536000) return `${Math.round(seconds / 86400)}天`
  return `${Math.round(seconds / 31536000)}年`
}

const generatePassword = () => {
  let charset = ''
  if (generatorOptions.value.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
  if (generatorOptions.value.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (generatorOptions.value.numbers) charset += '0123456789'
  if (generatorOptions.value.special) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  if (charset.length === 0) {
    alert('请至少选择一种字符类型')
    return
  }
  
  let password = ''
  for (let i = 0; i < generatorLength.value; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  
  generatedPassword.value = password
}

const testCommonPassword = (commonPwd) => {
  password.value = commonPwd
  analyzePassword()
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const clearPassword = () => {
  password.value = ''
  analysisResult.value = null
}

const copyGeneratedPassword = async () => {
  try {
    await navigator.clipboard.writeText(generatedPassword.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

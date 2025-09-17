<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {{ t('privacyChecker.title') }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ t('privacyChecker.subtitle') }}
      </p>
    </div>

    <!-- 主要功能区域 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {{ t('privacyChecker.inputSection') }}
      </h3>
      
      <!-- 邮箱输入区域 -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('privacyChecker.emailLabel') }}
          </label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              :placeholder="t('privacyChecker.emailPlaceholder')"
              class="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              :disabled="isChecking"
              @keyup.enter="checkPrivacy"
            />
            <span class="absolute right-4 top-4 text-gray-400 dark:text-gray-500">@</span>
          </div>
        </div>

        <!-- 检查按钮 -->
        <button
          @click="checkPrivacy"
          :disabled="!email || isChecking"
          :class="['w-full px-6 py-4 rounded-lg font-semibold text-white transition-colors flex items-center justify-center space-x-2',
                   isChecking ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700']"
        >
          <div v-if="isChecking" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span v-if="!isChecking">{{ t('privacyChecker.checkButton') }}</span>
          <span v-else>{{ t('privacyChecker.checking') }}</span>
        </button>
      </div>

      <!-- 隐私安全提示 -->
      <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <div class="flex items-start space-x-2">
          <span class="text-green-600 dark:text-green-400 text-xl">🔒</span>
          <div class="text-sm text-green-800 dark:text-green-200">
            <p class="font-medium">{{ t('privacyChecker.privacyTitle') }}</p>
            <p class="mt-1">{{ t('privacyChecker.privacyDescription') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 查询结果 -->
    <div v-if="checkResult" class="space-y-6">
      <!-- 结果卡片 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {{ t('privacyChecker.resultSection') }}
        </h3>
        
        <!-- 安全状态 -->
        <div v-if="checkResult.isSafe" class="text-center py-8">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-green-600 dark:text-green-400 text-2xl">✅</span>
          </div>
          <h4 class="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
            {{ t('privacyChecker.safeTitle') }}
          </h4>
          <p class="text-gray-600 dark:text-gray-300">
            {{ t('privacyChecker.safeDescription') }}
          </p>
        </div>

        <!-- 泄露状态 -->
        <div v-else class="text-center py-8">
          <div class="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-red-600 dark:text-red-400 text-2xl">⚠️</span>
          </div>
          <h4 class="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            {{ t('privacyChecker.breachTitle') }}
          </h4>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ t('privacyChecker.breachDescription') }}
          </p>
          <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p class="text-red-800 dark:text-red-200 font-medium">
              {{ t('privacyChecker.breachCount', { count: checkResult.breachCount }) }}
            </p>
          </div>
        </div>
      </div>

      <!-- 技术细节 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {{ t('privacyChecker.technicalDetails') }}
        </h3>
        
        <div class="space-y-4">
          <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
            <span class="text-gray-600 dark:text-gray-300">{{ t('privacyChecker.hashPrefix') }}</span>
            <span class="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{{ checkResult.hashPrefix }}</span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
            <span class="text-gray-600 dark:text-gray-300">{{ t('privacyChecker.apiUsed') }}</span>
            <span class="text-sm text-blue-600 dark:text-blue-400">Have I Been Pwned API</span>
          </div>
          <div class="flex justify-between items-center py-2">
            <span class="text-gray-600 dark:text-gray-300">{{ t('privacyChecker.encryptionMethod') }}</span>
            <span class="text-sm text-green-600 dark:text-green-400">SHA-1</span>
          </div>
        </div>
      </div>

      <!-- 建议措施 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {{ t('privacyChecker.recommendations') }}
        </h3>
        
        <div v-if="checkResult.isSafe" class="space-y-3">
          <div class="flex items-start space-x-3">
            <span class="text-green-500 text-lg">✅</span>
            <p class="text-gray-700 dark:text-gray-300">{{ t('privacyChecker.safeRecommendation1') }}</p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="text-green-500 text-lg">✅</span>
            <p class="text-gray-700 dark:text-gray-300">{{ t('privacyChecker.safeRecommendation2') }}</p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="text-green-500 text-lg">✅</span>
            <p class="text-gray-700 dark:text-gray-300">{{ t('privacyChecker.safeRecommendation3') }}</p>
          </div>
        </div>
        
        <div v-else class="space-y-3">
          <div class="flex items-start space-x-3">
            <span class="text-red-500 text-lg">🔑</span>
            <p class="text-gray-700 dark:text-gray-300">{{ t('privacyChecker.breachRecommendation1') }}</p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="text-red-500 text-lg">🔒</span>
            <p class="text-gray-700 dark:text-gray-300">{{ t('privacyChecker.breachRecommendation2') }}</p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="text-red-500 text-lg">📧</span>
            <p class="text-gray-700 dark:text-gray-300">{{ t('privacyChecker.breachRecommendation3') }}</p>
          </div>
          <div class="flex items-start space-x-3">
            <span class="text-red-500 text-lg">👀</span>
            <p class="text-gray-700 dark:text-gray-300">{{ t('privacyChecker.breachRecommendation4') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用提示 -->
    <div v-if="!checkResult && !isChecking" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
      <div class="flex items-start space-x-2">
        <span class="text-yellow-600 dark:text-yellow-400">💡</span>
        <div class="text-sm text-yellow-800 dark:text-yellow-200">
          <p class="font-medium">{{ t('privacyChecker.tips.title') }}</p>
          <ul class="mt-1 space-y-1">
            <li>• {{ t('privacyChecker.tips.enterEmail') }}</li>
            <li>• {{ t('privacyChecker.tips.clickCheck') }}</li>
            <li>• {{ t('privacyChecker.tips.waitResult') }}</li>
            <li>• {{ t('privacyChecker.tips.privacySafe') }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="errorMessage" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
      <div class="flex items-start space-x-2">
        <span class="text-red-600 dark:text-red-400">❌</span>
        <div class="text-sm text-red-800 dark:text-red-200">
          <p class="font-medium">{{ t('privacyChecker.errorTitle') }}</p>
          <p class="mt-1">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 响应式数据
const email = ref('')
const isChecking = ref(false)
const checkResult = ref(null)
const errorMessage = ref('')

// 动态导入crypto-js
let CryptoJS = null

onMounted(async () => {
  try {
    CryptoJS = await import('crypto-js')
    console.log('Crypto-js loaded successfully')
  } catch (error) {
    console.error('Failed to load crypto-js:', error)
    errorMessage.value = t('privacyChecker.errors.loadFailed')
  }
})

// 检查隐私泄露
const checkPrivacy = async () => {
  if (!email.value || !CryptoJS) return

  isChecking.value = true
  checkResult.value = null
  errorMessage.value = ''

  try {
    // 1. 将邮箱转换为SHA-1哈希值
    const hash = CryptoJS.SHA1(email.value.toLowerCase().trim()).toString().toUpperCase()
    
    // 2. 取前5个字符作为前缀
    const prefix = hash.substring(0, 5)
    const suffix = hash.substring(5)
    
    console.log('Hash prefix:', prefix)
    console.log('Hash suffix:', suffix)

    // 3. 调用Have I Been Pwned API
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`)
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }
    
    const data = await response.text()
    
    // 4. 在前端匹配哈希后缀
    const lines = data.split('\n')
    let breachCount = 0
    let found = false
    
    for (const line of lines) {
      const [hashSuffix, count] = line.split(':')
      if (hashSuffix === suffix) {
        breachCount = parseInt(count, 10)
        found = true
        break
      }
    }
    
    // 5. 设置结果
    checkResult.value = {
      isSafe: !found,
      breachCount: breachCount,
      hashPrefix: prefix,
      email: email.value
    }
    
  } catch (error) {
    console.error('Privacy check failed:', error)
    errorMessage.value = t('privacyChecker.errors.checkFailed')
  } finally {
    isChecking.value = false
  }
}

// 重置检查
const resetCheck = () => {
  email.value = ''
  checkResult.value = null
  errorMessage.value = ''
}
</script>

<style scoped>
/* 自定义样式 */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .space-y-6 > * + * {
    margin-top: 1.5rem;
  }
}
</style>

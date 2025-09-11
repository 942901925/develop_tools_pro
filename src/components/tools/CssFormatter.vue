<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 输入区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('cssFormatter.cssInput') }}</h3>
          <div class="flex space-x-2">
            <button
              @click="formatCss"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {{ t('cssFormatter.format') }}
            </button>
            <button
              @click="minifyCss"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {{ t('cssFormatter.minify') }}
            </button>
            <button
              @click="clearInput"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {{ t('cssFormatter.clear') }}
            </button>
          </div>
        </div>
        <textarea
          v-model="inputCss"
          :placeholder="t('cssFormatter.enterCssCode')"
          class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
      </div>

      <!-- 输出区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('cssFormatter.formatResult') }}</h3>
          <button
            @click="copyResult"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            {{ t('cssFormatter.copyResult') }}
          </button>
        </div>
        <pre class="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto text-sm">{{ formattedCss }}</pre>
      </div>
    </div>

    <!-- CSS验证 -->
    <div v-if="validationResult" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('cssFormatter.cssValidation') }}</h3>
      <div class="p-4 rounded-lg" :class="validationResult.valid ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
        <div class="font-medium">
          {{ validationResult.valid ? t('cssFormatter.cssSyntaxCorrect') : t('cssFormatter.cssSyntaxError') }}
        </div>
        <div v-if="validationResult.errors.length > 0" class="mt-2 text-sm">
          <div v-for="error in validationResult.errors" :key="error" class="mb-1">
            • {{ error }}
          </div>
        </div>
      </div>
    </div>

    <!-- 示例CSS -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('cssFormatter.exampleCss') }}</h3>
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
        <div class="text-2xl font-bold text-blue-600">{{ inputCss.length }}</div>
        <div class="text-sm text-gray-600">原始字符</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ formattedCss.length }}</div>
        <div class="text-sm text-gray-600">格式化字符</div>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-purple-600">{{ ruleCount }}</div>
        <div class="text-sm text-gray-600">CSS规则</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-orange-600">{{ compressionRatio }}%</div>
        <div class="text-sm text-gray-600">压缩比</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const inputCss = ref('')
const formattedCss = ref('')
const error = ref('')
const validationResult = ref(null)

const examples = computed(() => [
  {
    name: t('cssFormatter.examples.basicStyle.name'),
    description: t('cssFormatter.examples.basicStyle.description'),
    css: '.container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 20px; } .button { background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }'
  },
  {
    name: t('cssFormatter.examples.responsiveDesign.name'),
    description: t('cssFormatter.examples.responsiveDesign.description'),
    css: '@media (max-width: 768px) { .container { padding: 10px; } .button { width: 100%; margin-bottom: 10px; } } @media (min-width: 769px) { .container { display: flex; justify-content: space-between; } }'
  },
  {
    name: t('cssFormatter.examples.animationEffect.name'),
    description: t('cssFormatter.examples.animationEffect.description'),
    css: '.fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .hover-effect { transition: all 0.3s ease; } .hover-effect:hover { transform: scale(1.05); }'
  }
])

const ruleCount = computed(() => {
  return (formattedCss.value.match(/\{[^}]*\}/g) || []).length
})

const compressionRatio = computed(() => {
  if (inputCss.value.length === 0) return 0
  return Math.round((formattedCss.value.length / inputCss.value.length) * 100)
})

const formatCss = () => {
  try {
    const css = inputCss.value.trim()
    if (!css) return
    
    let formatted = css
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*}\s*/g, '\n}\n')
      .replace(/\s*,\s*/g, ',\n  ')
      .replace(/\s*:\s*/g, ': ')
      .replace(/\n\s*\n/g, '\n')
      .trim()
    
    // 处理媒体查询
    formatted = formatted.replace(/@media[^{]+{/g, (match) => {
      return match.trim() + ' {\n  '
    })
    
    formattedCss.value = formatted
    error.value = ''
    validateCss()
  } catch (e) {
    error.value = t('cssFormatter.formatFailed') + ': ' + e.message
    formattedCss.value = ''
  }
}

const minifyCss = () => {
  try {
    const css = inputCss.value.trim()
    if (!css) return
    
    let minified = css
      .replace(/\/\*[\s\S]*?\*\//g, '') // 移除注释
      .replace(/\s+/g, ' ') // 压缩空白
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*,\s*/g, ',')
      .replace(/\s*:\s*/g, ':')
      .trim()
    
    formattedCss.value = minified
    error.value = ''
    validateCss()
  } catch (e) {
    error.value = '压缩失败: ' + e.message
    formattedCss.value = ''
  }
}

const validateCss = () => {
  const css = formattedCss.value
  const errors = []
  
  // 简单的CSS验证
  const openBraces = (css.match(/\{/g) || []).length
  const closeBraces = (css.match(/\}/g) || []).length
  
  if (openBraces !== closeBraces) {
    errors.push('大括号不匹配')
  }
  
  // 检查未闭合的引号
  const singleQuotes = (css.match(/'/g) || []).length
  const doubleQuotes = (css.match(/"/g) || []).length
  
  if (singleQuotes % 2 !== 0) {
    errors.push('单引号未闭合')
  }
  
  if (doubleQuotes % 2 !== 0) {
    errors.push('双引号未闭合')
  }
  
  validationResult.value = {
    valid: errors.length === 0,
    errors
  }
}

const loadExample = (example) => {
  inputCss.value = example.css
  formatCss()
}

const clearInput = () => {
  inputCss.value = ''
  formattedCss.value = ''
  error.value = ''
  validationResult.value = null
}

const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(formattedCss.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

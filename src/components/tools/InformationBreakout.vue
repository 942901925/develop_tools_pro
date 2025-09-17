<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {{ t('informationBreakout.title') }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ t('informationBreakout.subtitle') }}
      </p>
    </div>

    <!-- 输入区域 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {{ t('informationBreakout.inputSection') }}
      </h3>
      
      <div class="space-y-4">
        <!-- 关键词输入 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('informationBreakout.keywordLabel') }}
          </label>
          <input
            v-model="keyword"
            type="text"
            :placeholder="t('informationBreakout.keywordPlaceholder')"
            class="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            @keyup.enter="generateKeywords"
          />
        </div>

        <!-- 生成按钮 -->
        <button
          @click="generateKeywords"
          :disabled="!keyword.trim() || isGenerating"
          :class="['w-full px-6 py-4 rounded-lg font-semibold text-white transition-colors flex items-center justify-center space-x-2',
                   isGenerating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700']"
        >
          <div v-if="isGenerating" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span v-if="!isGenerating">{{ t('informationBreakout.generateButton') }}</span>
          <span v-else>{{ t('informationBreakout.generating') }}</span>
        </button>
      </div>

      <!-- 使用提示 -->
      <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div class="flex items-start space-x-2">
          <span class="text-blue-600 dark:text-blue-400 text-xl">💡</span>
          <div class="text-sm text-blue-800 dark:text-blue-200">
            <p class="font-medium">{{ t('informationBreakout.tips.title') }}</p>
            <p class="mt-1">{{ t('informationBreakout.tips.description') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 生成结果 -->
    <div v-if="generatedKeywords.length > 0" class="space-y-6">
      <!-- 结果标题 -->
      <div class="text-center">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {{ t('informationBreakout.resultTitle', { keyword: keyword }) }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          {{ t('informationBreakout.resultDescription') }}
        </p>
      </div>

      <!-- 关键词组展示 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(group, index) in generatedKeywords"
          :key="index"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <!-- 组标题 -->
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
              <span class="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-3">
                <span class="text-blue-600 dark:text-blue-400 text-sm">{{ getGroupIcon(group.perspective) }}</span>
              </span>
              {{ t(`informationBreakout.perspectives.${group.perspective}`) }}
            </h4>
            <button
              @click="copyGroupKeywords(group.keywords)"
              class="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md transition-colors flex items-center space-x-1"
            >
              <span>📋</span>
              <span>{{ t('informationBreakout.copyButton') }}</span>
            </button>
          </div>

          <!-- 关键词标签 -->
          <div class="space-y-3">
            <div
              v-for="(keyword, keywordIndex) in group.keywords"
              :key="keywordIndex"
              class="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
            >
              <span class="text-gray-800 dark:text-gray-200 font-medium">{{ keyword }}</span>
              <button
                @click="copySingleKeyword(keyword)"
                class="p-1.5 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                :title="t('informationBreakout.copySingle')"
              >
                <span class="text-sm">📋</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div class="flex items-start space-x-2">
          <span class="text-yellow-600 dark:text-yellow-400">⚠️</span>
          <div class="text-sm text-yellow-800 dark:text-yellow-200">
            <p class="font-medium">{{ t('informationBreakout.usageNote.title') }}</p>
            <p class="mt-1">{{ t('informationBreakout.usageNote.description') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态提示 -->
    <div v-if="!generatedKeywords.length && !isGenerating" class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
      <div class="text-4xl text-gray-400 dark:text-gray-500 mb-4">🔍</div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {{ t('informationBreakout.emptyState.title') }}
      </h3>
      <p class="text-gray-600 dark:text-gray-300">
        {{ t('informationBreakout.emptyState.description') }}
      </p>
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
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 响应式数据
const keyword = ref('')
const isGenerating = ref(false)
const generatedKeywords = ref([])
const toastMessage = ref('')
const showToast = ref(false)

// 视角模板配置
const perspectiveTemplates = {
  advantages: {
    icon: '✅',
    keywords: [
      '{keyword} 优势',
      '{keyword} 好处',
      '{keyword} 优点',
      '{keyword} 价值',
      '{keyword} 成功案例',
      '{keyword} 正面影响',
      '{keyword} 积极方面'
    ]
  },
  disadvantages: {
    icon: '❌',
    keywords: [
      '{keyword} 缺点',
      '{keyword} 问题',
      '{keyword} 风险',
      '{keyword} 挑战',
      '{keyword} 负面影响',
      '{keyword} 失败案例',
      '{keyword} 批评'
    ]
  },
  international: {
    icon: '🌍',
    keywords: [
      '{keyword} 国外观点',
      '{keyword} 海外分析',
      '{keyword} 国际对比',
      '{keyword} 全球趋势',
      '{keyword} 西方观点',
      '{keyword} 国际案例',
      '{keyword} 跨国研究'
    ]
  },
  industry: {
    icon: '🏭',
    keywords: [
      '{keyword} 行业分析',
      '{keyword} 市场趋势',
      '{keyword} 行业报告',
      '{keyword} 专业观点',
      '{keyword} 行业专家',
      '{keyword} 市场研究',
      '{keyword} 行业数据'
    ]
  },
  competitor: {
    icon: '⚔️',
    keywords: [
      '{keyword} 竞品对比',
      '{keyword} 竞争对手',
      '{keyword} 替代方案',
      '{keyword} 对比分析',
      '{keyword} 竞品研究',
      '{keyword} 市场定位',
      '{keyword} 差异化'
    ]
  },
  academic: {
    icon: '🎓',
    keywords: [
      '{keyword} 学术研究',
      '{keyword} 论文',
      '{keyword} 理论分析',
      '{keyword} 科学依据',
      '{keyword} 学术观点',
      '{keyword} 研究数据',
      '{keyword} 学术期刊'
    ]
  },
  user: {
    icon: '👥',
    keywords: [
      '{keyword} 用户评价',
      '{keyword} 用户体验',
      '{keyword} 用户反馈',
      '{keyword} 真实体验',
      '{keyword} 用户故事',
      '{keyword} 使用心得',
      '{keyword} 用户评论'
    ]
  },
  future: {
    icon: '🔮',
    keywords: [
      '{keyword} 未来趋势',
      '{keyword} 发展前景',
      '{keyword} 预测分析',
      '{keyword} 未来规划',
      '{keyword} 技术发展',
      '{keyword} 市场预测',
      '{keyword} 趋势分析'
    ]
  }
}

// 获取组图标
const getGroupIcon = (perspective) => {
  return perspectiveTemplates[perspective]?.icon || '📝'
}

// 生成关键词
const generateKeywords = async () => {
  if (!keyword.value.trim()) return

  isGenerating.value = true
  generatedKeywords.value = []

  // 模拟生成过程
  await new Promise(resolve => setTimeout(resolve, 1000))

  const results = []
  const baseKeyword = keyword.value.trim()

  // 为每个视角生成关键词
  Object.entries(perspectiveTemplates).forEach(([perspective, template]) => {
    const keywords = template.keywords.map(templateKeyword => 
      templateKeyword.replace('{keyword}', baseKeyword)
    )
    
    results.push({
      perspective,
      keywords
    })
  })

  generatedKeywords.value = results
  isGenerating.value = false
}

// 复制整组关键词
const copyGroupKeywords = async (keywords) => {
  const text = keywords.join(' ')
  try {
    await navigator.clipboard.writeText(text)
    showToastMessage(t('informationBreakout.success.copiedGroup'))
  } catch (error) {
    console.error('Copy failed:', error)
    showToastMessage(t('informationBreakout.errors.copyFailed'))
  }
}

// 复制单个关键词
const copySingleKeyword = async (keyword) => {
  try {
    await navigator.clipboard.writeText(keyword)
    showToastMessage(t('informationBreakout.success.copiedSingle'))
  } catch (error) {
    console.error('Copy failed:', error)
    showToastMessage(t('informationBreakout.errors.copyFailed'))
  }
}

// 显示Toast消息
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
  .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) {
  .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

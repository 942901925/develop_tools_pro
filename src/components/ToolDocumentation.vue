<template>
  <div v-if="doc" class="tool-documentation">
    <!-- 文档头部 -->
    <div class="doc-header">
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
          <BookOpen class="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {{ doc.title }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ $t('toolDocs.documentation') }}
          </p>
        </div>
      </div>
      
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
        {{ doc.description }}
      </p>
    </div>

    <!-- 功能特性 -->
    <div class="doc-section">
      <h3 class="section-title">
        <Star class="w-5 h-5" />
        {{ $t('toolDocs.features') }}
      </h3>
      <ul class="feature-list">
        <li v-for="feature in doc.features" :key="feature" class="feature-item">
          <Check class="w-4 h-4 text-green-500" />
          <span>{{ feature }}</span>
        </li>
      </ul>
    </div>

    <!-- 使用说明 -->
    <div class="doc-section">
      <h3 class="section-title">
        <Play class="w-5 h-5" />
        {{ $t('toolDocs.usage') }}
      </h3>
      <ol class="usage-list">
        <li v-for="(step, index) in doc.usage" :key="index" class="usage-item">
          <div class="step-number">{{ index + 1 }}</div>
          <span>{{ step }}</span>
        </li>
      </ol>
    </div>

    <!-- 使用示例 -->
    <div v-if="doc.examples && doc.examples.length > 0" class="doc-section">
      <h3 class="section-title">
        <Code class="w-5 h-5" />
        {{ $t('toolDocs.examples') }}
      </h3>
      <div class="examples-grid">
        <div v-for="(example, index) in doc.examples" :key="index" class="example-card">
          <h4 class="example-title">{{ example.title }}</h4>
          <div class="example-content">
            <div class="example-input">
              <div class="example-label">
                <ArrowDown class="w-4 h-4" />
                {{ $t('toolDocs.input') }}
              </div>
              <div class="code-block">
                <code>{{ example.input }}</code>
                <button 
                  @click="copyToClipboard(example.input)"
                  class="copy-btn"
                  :title="$t('toolDocs.copy')"
                >
                  <Copy class="w-4 h-4" />
                </button>
              </div>
            </div>
            <div class="example-output">
              <div class="example-label">
                <ArrowUp class="w-4 h-4" />
                {{ $t('toolDocs.output') }}
              </div>
              <div class="code-block">
                <code>{{ example.output }}</code>
                <button 
                  @click="copyToClipboard(example.output)"
                  class="copy-btn"
                  :title="$t('toolDocs.copy')"
                >
                  <Copy class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用技巧 -->
    <div v-if="doc.tips && doc.tips.length > 0" class="doc-section">
      <h3 class="section-title">
        <Lightbulb class="w-5 h-5" />
        {{ $t('toolDocs.tips') }}
      </h3>
      <div class="tips-grid">
        <div v-for="(tip, index) in doc.tips" :key="index" class="tip-card">
          <div class="tip-icon">
            <Info class="w-4 h-4" />
          </div>
          <span>{{ tip }}</span>
        </div>
      </div>
    </div>

    <!-- 成功提示 -->
    <div v-if="showCopySuccess" class="copy-success">
      <Check class="w-4 h-4" />
      <span>{{ $t('toolDocs.copied') }}</span>
    </div>
  </div>
  
  <!-- 无文档提示 -->
  <div v-else class="no-docs">
    <div class="no-docs-content">
      <BookOpen class="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        {{ $t('toolDocs.noDocumentation') }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        {{ $t('toolDocs.noDocumentationDesc') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  BookOpen, Star, Play, Code, Lightbulb, Check, ArrowDown, ArrowUp, 
  Copy, Info
} from 'lucide-vue-next'
import { getToolDoc } from '../data/toolDocs.js'
import { copyTextWithFeedback } from '../utils/clipboard.js'

const props = defineProps({
  toolId: {
    type: String,
    required: true
  }
})

const { t, locale } = useI18n()
const showCopySuccess = ref(false)

// 获取当前语言的工具文档
const doc = computed(() => {
  return getToolDoc(props.toolId, locale.value)
})

// 复制到剪贴板
const copyToClipboard = async (text) => {
  const success = await copyTextWithFeedback(text, t('toolDocs.content'))
  if (success) {
    showCopySuccess.value = true
    setTimeout(() => {
      showCopySuccess.value = false
    }, 2000)
  }
}
</script>

<style scoped>
.tool-documentation {
  @apply space-y-6;
}

.doc-header {
  @apply bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50;
}

.doc-section {
  @apply bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6;
}

.section-title {
  @apply flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4;
}

.feature-list {
  @apply space-y-3;
}

.feature-item {
  @apply flex items-start space-x-3 text-gray-700 dark:text-gray-300;
}

.usage-list {
  @apply space-y-4;
}

.usage-item {
  @apply flex items-start space-x-4 text-gray-700 dark:text-gray-300;
}

.step-number {
  @apply w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0;
}

.examples-grid {
  @apply space-y-6;
}

.example-card {
  @apply bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700;
}

.example-title {
  @apply text-base font-medium text-gray-900 dark:text-gray-100 mb-4;
}

.example-content {
  @apply space-y-4;
}

.example-input,
.example-output {
  @apply space-y-2;
}

.example-label {
  @apply flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-400;
}

.code-block {
  @apply relative bg-gray-900 dark:bg-gray-950 rounded-lg p-4 border border-gray-700 dark:border-gray-600;
}

.code-block code {
  @apply text-sm text-gray-100 font-mono break-all;
}

.copy-btn {
  @apply absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded transition-colors;
}

.tips-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4;
}

.tip-card {
  @apply flex items-start space-x-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/50;
}

.tip-icon {
  @apply w-6 h-6 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center flex-shrink-0;
}

.tip-card span {
  @apply text-sm text-amber-800 dark:text-amber-200;
}

.no-docs {
  @apply bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12;
}

.no-docs-content {
  @apply text-center;
}

.copy-success {
  @apply fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50;
  animation: slideInOut 2s ease-in-out;
}

@keyframes slideInOut {
  0% { transform: translateX(100%); opacity: 0; }
  10%, 90% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .doc-header,
  .doc-section {
    @apply p-4;
  }
  
  .tips-grid {
    @apply grid-cols-1;
  }
  
  .example-content {
    @apply space-y-3;
  }
  
  .code-block {
    @apply p-3;
  }
}
</style>

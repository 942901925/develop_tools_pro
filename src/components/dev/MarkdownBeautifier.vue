<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {{ t('markdownBeautifier.title') }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ t('markdownBeautifier.subtitle') }}
      </p>
    </div>

    <!-- 配置选项 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {{ t('markdownBeautifier.configuration') }}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 预设配置 -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ t('markdownBeautifier.preset') }}
          </label>
          <select
            v-model="selectedPreset"
            @change="applyPreset"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="strict">{{ t('markdownBeautifier.presets.strict') }}</option>
            <option value="loose">{{ t('markdownBeautifier.presets.loose') }}</option>
            <option value="custom">{{ t('markdownBeautifier.presets.custom') }}</option>
          </select>
        </div>

        <!-- 列表缩进 -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ t('markdownBeautifier.listIndent') }}
          </label>
          <select
            v-model="config.listIndent"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="2">{{ t('markdownBeautifier.indentOptions.two') }}</option>
            <option value="4">{{ t('markdownBeautifier.indentOptions.four') }}</option>
          </select>
        </div>

        <!-- 标题空格 -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ t('markdownBeautifier.headerSpacing') }}
          </label>
          <div class="flex items-center space-x-4">
            <label class="flex items-center">
              <input
                v-model="config.headerSpacing"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {{ t('markdownBeautifier.forceHeaderSpacing') }}
              </span>
            </label>
          </div>
        </div>

        <!-- 列表符号 -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ t('markdownBeautifier.listMarker') }}
          </label>
          <select
            v-model="config.listMarker"
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="*">{{ t('markdownBeautifier.markerOptions.asterisk') }}</option>
            <option value="-">{{ t('markdownBeautifier.markerOptions.dash') }}</option>
            <option value="+">{{ t('markdownBeautifier.markerOptions.plus') }}</option>
          </select>
        </div>

        <!-- 代码块语言 -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ t('markdownBeautifier.codeBlockLanguage') }}
          </label>
          <div class="flex items-center space-x-4">
            <label class="flex items-center">
              <input
                v-model="config.requireCodeBlockLanguage"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {{ t('markdownBeautifier.requireCodeBlockLanguage') }}
              </span>
            </label>
          </div>
        </div>

        <!-- 行尾空格 -->
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ t('markdownBeautifier.trailingWhitespace') }}
          </label>
          <div class="flex items-center space-x-4">
            <label class="flex items-center">
              <input
                v-model="config.removeTrailingWhitespace"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {{ t('markdownBeautifier.removeTrailingWhitespace') }}
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="mt-6 flex flex-col sm:flex-row gap-4">
        <button
          @click="formatMarkdown"
          :disabled="!markdownContent.trim()"
          :class="['px-6 py-3 rounded-lg font-semibold text-white transition-colors flex items-center justify-center space-x-2',
                   !markdownContent.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700']"
        >
          <span>✨</span>
          <span>{{ t('markdownBeautifier.formatButton') }}</span>
        </button>
        
        <button
          @click="clearContent"
          class="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          <span>🗑️</span>
          <span>{{ t('markdownBeautifier.clearButton') }}</span>
        </button>

        <button
          @click="copyFormatted"
          :disabled="!formattedContent"
          :class="['px-6 py-3 rounded-lg font-semibold text-white transition-colors flex items-center justify-center space-x-2',
                   !formattedContent ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700']"
        >
          <span>📋</span>
          <span>{{ t('markdownBeautifier.copyButton') }}</span>
        </button>
      </div>
    </div>

    <!-- 编辑器区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 左侧编辑器 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <span class="mr-2">📝</span>
            {{ t('markdownBeautifier.editor') }}
          </h3>
        </div>
        <div class="p-4">
          <textarea
            v-model="markdownContent"
            :placeholder="t('markdownBeautifier.editorPlaceholder')"
            class="w-full h-96 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 font-mono text-sm resize-none"
            @input="updatePreview"
          ></textarea>
        </div>
      </div>

      <!-- 右侧预览 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <span class="mr-2">👁️</span>
            {{ t('markdownBeautifier.preview') }}
          </h3>
        </div>
        <div class="p-4">
          <div 
            v-if="previewContent"
            v-html="previewContent"
            class="prose prose-sm max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800"
          ></div>
          <div v-else class="text-gray-500 dark:text-gray-400 text-center py-8">
            {{ t('markdownBeautifier.noPreview') }}
          </div>
        </div>
      </div>
    </div>

    <!-- 格式化结果 -->
    <div v-if="formattedContent" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
          <span class="mr-2">✨</span>
          {{ t('markdownBeautifier.formattedResult') }}
        </h3>
      </div>
      <div class="p-4">
        <pre class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{{ formattedContent }}</pre>
      </div>
    </div>

    <!-- 使用提示 -->
    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
      <div class="flex items-start space-x-2">
        <span class="text-blue-600 dark:text-blue-400 text-xl">💡</span>
        <div class="text-sm text-blue-800 dark:text-blue-200">
          <p class="font-medium">{{ t('markdownBeautifier.tips.title') }}</p>
          <p class="mt-1">{{ t('markdownBeautifier.tips.description') }}</p>
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
import { marked } from 'marked'

const { t } = useI18n()

// 响应式数据
const markdownContent = ref('')
const formattedContent = ref('')
const previewContent = ref('')
const selectedPreset = ref('strict')
const toastMessage = ref('')
const showToast = ref(false)

// 配置选项
const config = reactive({
  listIndent: '2',
  headerSpacing: true,
  listMarker: '*',
  requireCodeBlockLanguage: true,
  removeTrailingWhitespace: true
})

// 预设配置
const presets = {
  strict: {
    listIndent: '2',
    headerSpacing: true,
    listMarker: '*',
    requireCodeBlockLanguage: true,
    removeTrailingWhitespace: true
  },
  loose: {
    listIndent: '4',
    headerSpacing: false,
    listMarker: '-',
    requireCodeBlockLanguage: false,
    removeTrailingWhitespace: false
  }
}

// 计算属性
const hasContent = computed(() => markdownContent.value.trim().length > 0)

// 方法
const applyPreset = () => {
  if (selectedPreset.value !== 'custom') {
    Object.assign(config, presets[selectedPreset.value])
  }
}

const formatMarkdown = () => {
  if (!markdownContent.value.trim()) return

  let formatted = markdownContent.value

  // 应用格式化规则
  formatted = applyFormattingRules(formatted)
  
  formattedContent.value = formatted
  showToastMessage(t('markdownBeautifier.success.formatted'))
}

const applyFormattingRules = (content) => {
  let formatted = content

  // 1. 处理标题空格
  if (config.headerSpacing) {
    formatted = formatted.replace(/^(#{1,6})([^\s#])/gm, '$1 $2')
  }

  // 2. 处理列表缩进
  const indentSize = parseInt(config.listIndent)
  formatted = formatted.replace(/^(\s*)([-*+])\s/gm, (match, spaces, marker) => {
    const baseIndent = spaces.length
    const newIndent = Math.ceil(baseIndent / 2) * indentSize
    return ' '.repeat(newIndent) + marker + ' '
  })

  // 3. 统一列表符号
  if (config.listMarker) {
    formatted = formatted.replace(/^(\s*)([-*+])\s/gm, `$1${config.listMarker} `)
  }

  // 4. 处理代码块语言
  if (config.requireCodeBlockLanguage) {
    formatted = formatted.replace(/^```(\w*)$/gm, (match, lang) => {
      return lang ? match : '```text'
    })
  }

  // 5. 移除行尾空格
  if (config.removeTrailingWhitespace) {
    formatted = formatted.replace(/[ \t]+$/gm, '')
  }

  // 6. 标准化空行
  formatted = formatted.replace(/\n{3,}/g, '\n\n')

  // 7. 确保文件末尾有换行符
  if (formatted && !formatted.endsWith('\n')) {
    formatted += '\n'
  }

  return formatted
}

const updatePreview = () => {
  if (markdownContent.value.trim()) {
    try {
      previewContent.value = marked(markdownContent.value)
    } catch (error) {
      console.error('Preview error:', error)
      previewContent.value = '<p class="text-red-500">预览错误</p>'
    }
  } else {
    previewContent.value = ''
  }
}

const clearContent = () => {
  markdownContent.value = ''
  formattedContent.value = ''
  previewContent.value = ''
  showToastMessage(t('markdownBeautifier.success.cleared'))
}

const copyFormatted = async () => {
  if (!formattedContent.value) return

  try {
    await navigator.clipboard.writeText(formattedContent.value)
    showToastMessage(t('markdownBeautifier.success.copied'))
  } catch (error) {
    console.error('Copy failed:', error)
    showToastMessage(t('markdownBeautifier.errors.copyFailed'))
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
  // 设置示例内容
  markdownContent.value = `# Markdown 示例

这是一个**粗体**文本和*斜体*文本的示例。

## 列表示例

- 无序列表项 1
- 无序列表项 2
  - 嵌套列表项
  - 另一个嵌套项

1. 有序列表项 1
2. 有序列表项 2

## 代码示例

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## 链接和图片

[链接示例](https://example.com)

> 这是一个引用块
> 可以包含多行内容

---

**格式化后，这些内容将根据您的配置进行标准化。**`
  
  updatePreview()
})
</script>

<style scoped>
/* 自定义样式 */
.prose {
  @apply text-gray-800 dark:text-gray-200;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  @apply text-gray-900 dark:text-gray-100 font-bold;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm;
}

.prose pre {
  @apply bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto;
}

.prose blockquote {
  @apply border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic;
}

.prose ul, .prose ol {
  @apply pl-6;
}

.prose li {
  @apply mb-1;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .grid-cols-1.lg\\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

/* 动画效果 */
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>

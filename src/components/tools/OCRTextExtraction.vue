<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {{ t('ocrTextExtraction.title') }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ t('ocrTextExtraction.subtitle') }}
      </p>
    </div>

    <!-- 操作面板 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- 操作区 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {{ t('ocrTextExtraction.uploadSection') }}
        </h3>
        
        <!-- 文件上传区域 -->
        <div 
          class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
          :class="{ 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20': isDragOver }"
          @click="triggerFileInput"
          @dragover.prevent="isDragOver = true"
          @dragleave.prevent="isDragOver = false"
          @drop.prevent="handleFileDrop"
        >
          <div v-if="!selectedFile" class="space-y-4">
            <div class="text-4xl text-gray-400 dark:text-gray-500">
              📁
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              <p class="font-medium">{{ t('ocrTextExtraction.dragDropText') }}</p>
              <p class="text-sm mt-1">{{ t('ocrTextExtraction.supportedFormats') }}</p>
            </div>
            <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              {{ t('ocrTextExtraction.selectFile') }}
            </button>
          </div>
          <div v-else class="space-y-4">
            <div class="text-4xl text-green-500">
              ✅
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              <p class="font-medium">{{ selectedFile.name }}</p>
              <p class="text-sm text-gray-500">{{ formatFileSize(selectedFile.size) }}</p>
            </div>
            <button 
              @click.stop="clearFile"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              {{ t('ocrTextExtraction.removeFile') }}
            </button>
          </div>
        </div>

        <input 
          ref="fileInput"
          type="file" 
          accept=".jpg,.jpeg,.png,.webp"
          @change="handleFileSelect"
          class="hidden"
        />

        <!-- 语言选择 -->
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('ocrTextExtraction.language') }}
          </label>
          <select 
            v-model="selectedLanguage" 
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="chi_sim+eng">{{ t('ocrTextExtraction.languages.chineseEnglish') }}</option>
            <option value="chi_sim">{{ t('ocrTextExtraction.languages.chinese') }}</option>
            <option value="eng">{{ t('ocrTextExtraction.languages.english') }}</option>
          </select>
        </div>

        <!-- 操作按钮 -->
        <div class="mt-6 flex space-x-3">
          <button 
            @click="extractText"
            :disabled="!selectedFile || isProcessing"
            class="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <div v-if="isProcessing" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>{{ isProcessing ? t('ocrTextExtraction.processing') : t('ocrTextExtraction.extractText') }}</span>
          </button>
          <button 
            @click="clearAll"
            class="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {{ t('ocrTextExtraction.clear') }}
          </button>
        </div>
      </div>

      <!-- 预览区 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {{ t('ocrTextExtraction.previewSection') }}
        </h3>
        
        <div v-if="!selectedFile" class="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div class="text-center text-gray-500 dark:text-gray-400">
            <div class="text-4xl mb-2">🖼️</div>
            <p>{{ t('ocrTextExtraction.noImagePreview') }}</p>
          </div>
        </div>
        
        <div v-else class="space-y-4">
          <!-- 图片预览 -->
          <div class="relative">
            <img 
              :src="imagePreview" 
              :alt="t('ocrTextExtraction.imagePreview')"
              class="max-w-full max-h-96 mx-auto rounded-lg shadow-sm"
            />
          </div>
          
          <!-- 进度条 -->
          <div v-if="isProcessing" class="space-y-2">
            <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>{{ t('ocrTextExtraction.status') }}: {{ progressStatus }}</span>
              <span>{{ Math.round(progressPercentage) }}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                :style="{ width: progressPercentage + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结果面板 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {{ t('ocrTextExtraction.resultSection') }}
        </h3>
        <button 
          v-if="extractedText"
          @click="copyToClipboard"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
        >
          <span>📋</span>
          <span>{{ t('ocrTextExtraction.copyText') }}</span>
        </button>
      </div>
      
      <div class="relative">
        <textarea
          v-model="extractedText"
          :placeholder="t('ocrTextExtraction.resultPlaceholder')"
          class="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none"
          readonly
        ></textarea>
      </div>
      
      <!-- 识别提示 -->
      <div v-if="!extractedText && !isProcessing" class="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div class="flex items-start space-x-2">
          <span class="text-yellow-600 dark:text-yellow-400">💡</span>
          <div class="text-sm text-yellow-800 dark:text-yellow-200">
            <p class="font-medium">{{ t('ocrTextExtraction.tips.title') }}</p>
            <ul class="mt-1 space-y-1">
              <li>• {{ t('ocrTextExtraction.tips.clearImage') }}</li>
              <li>• {{ t('ocrTextExtraction.tips.standardFont') }}</li>
              <li>• {{ t('ocrTextExtraction.tips.goodContrast') }}</li>
            </ul>
          </div>
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
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 响应式数据
const selectedFile = ref(null)
const selectedLanguage = ref('chi_sim+eng')
const extractedText = ref('')
const isProcessing = ref(false)
const isDragOver = ref(false)
const progressStatus = ref('')
const progressPercentage = ref(0)
const toastMessage = ref('')
const showToast = ref(false)
const fileInput = ref(null)

// 计算属性
const imagePreview = computed(() => {
  if (selectedFile.value) {
    return URL.createObjectURL(selectedFile.value)
  }
  return null
})

// 方法
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file && isValidFile(file)) {
    selectedFile.value = file
  } else {
    showToastMessage(t('ocrTextExtraction.errors.invalidFile'))
  }
}

const handleFileDrop = (event) => {
  isDragOver.value = false
  const file = event.dataTransfer.files[0]
  if (file && isValidFile(file)) {
    selectedFile.value = file
  } else {
    showToastMessage(t('ocrTextExtraction.errors.invalidFile'))
  }
}

const isValidFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  return validTypes.includes(file.type)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const clearFile = () => {
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const clearAll = () => {
  clearFile()
  extractedText.value = ''
  progressStatus.value = ''
  progressPercentage.value = 0
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

const updateProgress = (message) => {
  if (message.status === 'loading tesseract core') {
    progressStatus.value = t('ocrTextExtraction.progress.loadingCore')
    progressPercentage.value = 10
  } else if (message.status === 'initializing tesseract') {
    progressStatus.value = t('ocrTextExtraction.progress.initializing')
    progressPercentage.value = 20
  } else if (message.status === 'loading language traineddata') {
    progressStatus.value = t('ocrTextExtraction.progress.loadingLanguage')
    progressPercentage.value = 40
  } else if (message.status === 'initializing api') {
    progressStatus.value = t('ocrTextExtraction.progress.initializingApi')
    progressPercentage.value = 60
  } else if (message.status === 'recognizing text') {
    progressStatus.value = t('ocrTextExtraction.progress.recognizing')
    progressPercentage.value = 80 + (message.progress || 0) * 0.2
  }
}

const extractText = async () => {
  if (!selectedFile.value) return

  isProcessing.value = true
  progressStatus.value = t('ocrTextExtraction.progress.starting')
  progressPercentage.value = 0

  try {
    // 动态导入 Tesseract.js
    const Tesseract = await import('tesseract.js')
    
    const result = await Tesseract.recognize(
      selectedFile.value,
      selectedLanguage.value,
      {
        logger: updateProgress
      }
    )

    extractedText.value = result.data.text
    progressStatus.value = t('ocrTextExtraction.progress.completed')
    progressPercentage.value = 100
    
    showToastMessage(t('ocrTextExtraction.success.extracted'))
  } catch (error) {
    console.error('OCR Error:', error)
    showToastMessage(t('ocrTextExtraction.errors.extractionFailed'))
    progressStatus.value = t('ocrTextExtraction.progress.failed')
  } finally {
    isProcessing.value = false
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(extractedText.value)
    showToastMessage(t('ocrTextExtraction.success.copied'))
  } catch (error) {
    console.error('Copy failed:', error)
    showToastMessage(t('ocrTextExtraction.errors.copyFailed'))
  }
}

// 清理资源
const cleanup = () => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
}

onMounted(() => {
  // 组件挂载时的初始化
})

// 组件卸载时清理资源
import { onUnmounted } from 'vue'
onUnmounted(() => {
  cleanup()
})
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

/* 拖拽区域样式 */
.border-dashed:hover {
  border-color: #3b82f6;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .grid-cols-1.lg\\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>

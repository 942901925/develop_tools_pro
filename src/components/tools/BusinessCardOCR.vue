<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {{ t('businessCardOCR.title') }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ t('businessCardOCR.subtitle') }}
      </p>
    </div>

    <!-- 主要内容区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 左侧：图片上传和预览区 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {{ t('businessCardOCR.uploadSection') }}
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
              📇
            </div>
            <div class="text-gray-600 dark:text-gray-300">
              <p class="font-medium">{{ t('businessCardOCR.dragDropText') }}</p>
              <p class="text-sm mt-1">{{ t('businessCardOCR.supportedFormats') }}</p>
            </div>
            <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              {{ t('businessCardOCR.selectFile') }}
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
              {{ t('businessCardOCR.removeFile') }}
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
            {{ t('businessCardOCR.language') }}
          </label>
          <select 
            v-model="selectedLanguage" 
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="chi_sim+eng">{{ t('businessCardOCR.languages.chineseEnglish') }}</option>
            <option value="chi_sim">{{ t('businessCardOCR.languages.chinese') }}</option>
            <option value="eng">{{ t('businessCardOCR.languages.english') }}</option>
          </select>
        </div>

        <!-- 操作按钮 -->
        <div class="mt-6 flex space-x-3">
          <button 
            @click="extractBusinessCardInfo"
            :disabled="!selectedFile || isProcessing"
            class="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <div v-if="isProcessing" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>{{ isProcessing ? t('businessCardOCR.processing') : t('businessCardOCR.extractInfo') }}</span>
          </button>
          <button 
            @click="clearAll"
            class="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {{ t('businessCardOCR.clear') }}
          </button>
        </div>

        <!-- 图片预览 -->
        <div v-if="selectedFile" class="mt-6">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('businessCardOCR.imagePreview') }}
          </h4>
          <div class="relative">
            <img 
              :src="imagePreview" 
              :alt="t('businessCardOCR.imagePreview')"
              class="max-w-full max-h-64 mx-auto rounded-lg shadow-sm"
            />
          </div>
          
          <!-- 进度条 -->
          <div v-if="isProcessing" class="mt-4 space-y-2">
            <div class="flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>{{ t('businessCardOCR.status') }}: {{ progressStatus }}</span>
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

      <!-- 右侧：结构化信息表单 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {{ t('businessCardOCR.resultSection') }}
          </h3>
          <div class="flex space-x-2">
            <button 
              v-if="hasExtractedData"
              @click="copyAllInfo"
              class="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-1 text-sm"
            >
              <span>📋</span>
              <span>{{ t('businessCardOCR.copyAll') }}</span>
            </button>
            <button 
              v-if="hasExtractedData"
              @click="downloadVCard"
              class="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-1 text-sm"
            >
              <span>📇</span>
              <span>{{ t('businessCardOCR.downloadVCard') }}</span>
            </button>
          </div>
        </div>
        
        <!-- 结构化信息表单 -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('businessCardOCR.fields.name') }}
            </label>
            <input
              v-model="extractedInfo.name"
              type="text"
              :placeholder="t('businessCardOCR.placeholders.name')"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('businessCardOCR.fields.company') }}
            </label>
            <input
              v-model="extractedInfo.company"
              type="text"
              :placeholder="t('businessCardOCR.placeholders.company')"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('businessCardOCR.fields.position') }}
            </label>
            <input
              v-model="extractedInfo.position"
              type="text"
              :placeholder="t('businessCardOCR.placeholders.position')"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('businessCardOCR.fields.phone') }}
            </label>
            <input
              v-model="extractedInfo.phone"
              type="tel"
              :placeholder="t('businessCardOCR.placeholders.phone')"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('businessCardOCR.fields.email') }}
            </label>
            <input
              v-model="extractedInfo.email"
              type="email"
              :placeholder="t('businessCardOCR.placeholders.email')"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('businessCardOCR.fields.website') }}
            </label>
            <input
              v-model="extractedInfo.website"
              type="url"
              :placeholder="t('businessCardOCR.placeholders.website')"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('businessCardOCR.fields.address') }}
            </label>
            <textarea
              v-model="extractedInfo.address"
              :placeholder="t('businessCardOCR.placeholders.address')"
              rows="3"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ t('businessCardOCR.fields.notes') }}
            </label>
            <textarea
              v-model="extractedInfo.notes"
              :placeholder="t('businessCardOCR.placeholders.notes')"
              rows="2"
              class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none"
            ></textarea>
          </div>
        </div>

        <!-- 原始识别文本 -->
        <div v-if="rawText" class="mt-6">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('businessCardOCR.rawText') }}
          </h4>
          <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{{ rawText }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用提示 -->
    <div v-if="!hasExtractedData && !isProcessing" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
      <div class="flex items-start space-x-2">
        <span class="text-yellow-600 dark:text-yellow-400">💡</span>
        <div class="text-sm text-yellow-800 dark:text-yellow-200">
          <p class="font-medium">{{ t('businessCardOCR.tips.title') }}</p>
          <ul class="mt-1 space-y-1">
            <li>• {{ t('businessCardOCR.tips.clearImage') }}</li>
            <li>• {{ t('businessCardOCR.tips.standardFont') }}</li>
            <li>• {{ t('businessCardOCR.tips.goodContrast') }}</li>
            <li>• {{ t('businessCardOCR.tips.flatSurface') }}</li>
          </ul>
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
const isProcessing = ref(false)
const isDragOver = ref(false)
const progressStatus = ref('')
const progressPercentage = ref(0)
const toastMessage = ref('')
const showToast = ref(false)
const fileInput = ref(null)
const rawText = ref('')

// 提取的信息
const extractedInfo = ref({
  name: '',
  company: '',
  position: '',
  phone: '',
  email: '',
  website: '',
  address: '',
  notes: ''
})

// 计算属性
const imagePreview = computed(() => {
  if (selectedFile.value) {
    return URL.createObjectURL(selectedFile.value)
  }
  return null
})

const hasExtractedData = computed(() => {
  return Object.values(extractedInfo.value).some(value => value.trim() !== '')
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
    showToastMessage(t('businessCardOCR.errors.invalidFile'))
  }
}

const handleFileDrop = (event) => {
  isDragOver.value = false
  const file = event.dataTransfer.files[0]
  if (file && isValidFile(file)) {
    selectedFile.value = file
  } else {
    showToastMessage(t('businessCardOCR.errors.invalidFile'))
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
  extractedInfo.value = {
    name: '',
    company: '',
    position: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    notes: ''
  }
  rawText.value = ''
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
    progressStatus.value = t('businessCardOCR.progress.loadingCore')
    progressPercentage.value = 10
  } else if (message.status === 'initializing tesseract') {
    progressStatus.value = t('businessCardOCR.progress.initializing')
    progressPercentage.value = 20
  } else if (message.status === 'loading language traineddata') {
    progressStatus.value = t('businessCardOCR.progress.loadingLanguage')
    progressPercentage.value = 40
  } else if (message.status === 'initializing api') {
    progressStatus.value = t('businessCardOCR.progress.initializingApi')
    progressPercentage.value = 60
  } else if (message.status === 'recognizing text') {
    progressStatus.value = t('businessCardOCR.progress.recognizing')
    progressPercentage.value = 80 + (message.progress || 0) * 0.2
  }
}

const extractBusinessCardInfo = async () => {
  if (!selectedFile.value) return

  isProcessing.value = true
  progressStatus.value = t('businessCardOCR.progress.starting')
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

    rawText.value = result.data.text
    progressStatus.value = t('businessCardOCR.progress.parsing')
    progressPercentage.value = 95
    
    // 解析名片信息
    await parseBusinessCardInfo(result.data.text)
    
    progressStatus.value = t('businessCardOCR.progress.completed')
    progressPercentage.value = 100
    
    showToastMessage(t('businessCardOCR.success.extracted'))
  } catch (error) {
    console.error('OCR Error:', error)
    showToastMessage(t('businessCardOCR.errors.extractionFailed'))
    progressStatus.value = t('businessCardOCR.progress.failed')
  } finally {
    isProcessing.value = false
  }
}

const parseBusinessCardInfo = async (text) => {
  // 简单的信息提取逻辑，可以根据需要优化
  const lines = text.split('\n').map(line => line.trim()).filter(line => line)
  
  // 提取邮箱
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  const emailMatch = text.match(emailRegex)
  if (emailMatch) {
    extractedInfo.value.email = emailMatch[0]
  }
  
  // 提取电话
  const phoneRegex = /(\+?[\d\s\-\(\)]{7,})/
  const phoneMatch = text.match(phoneRegex)
  if (phoneMatch) {
    extractedInfo.value.phone = phoneMatch[0].trim()
  }
  
  // 提取网址
  const websiteRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/
  const websiteMatch = text.match(websiteRegex)
  if (websiteMatch) {
    extractedInfo.value.website = websiteMatch[0]
  }
  
  // 简单的姓名提取（通常是第一行或包含常见姓名关键词的行）
  const nameKeywords = ['先生', '女士', '经理', '总监', '主任', 'Mr.', 'Ms.', 'Dr.', 'Prof.']
  const nameLine = lines.find(line => 
    nameKeywords.some(keyword => line.includes(keyword)) || 
    (line.length <= 10 && /[\u4e00-\u9fa5]/.test(line))
  )
  if (nameLine) {
    extractedInfo.value.name = nameLine.replace(/[先生女士经理总监主任Mr\.Ms\.Dr\.Prof\.]/g, '').trim()
  } else if (lines.length > 0) {
    extractedInfo.value.name = lines[0]
  }
  
  // 提取公司信息（通常包含公司、有限公司、集团等关键词）
  const companyKeywords = ['公司', '有限公司', '集团', '企业', '科技', '贸易', '投资', 'Co.', 'Ltd.', 'Inc.', 'Corp.']
  const companyLine = lines.find(line => 
    companyKeywords.some(keyword => line.includes(keyword))
  )
  if (companyLine) {
    extractedInfo.value.company = companyLine
  }
  
  // 提取职位信息
  const positionKeywords = ['经理', '总监', '主任', '主管', '工程师', '设计师', '销售', '市场', '财务', '人事', 'Manager', 'Director', 'Engineer', 'Designer']
  const positionLine = lines.find(line => 
    positionKeywords.some(keyword => line.includes(keyword))
  )
  if (positionLine) {
    extractedInfo.value.position = positionLine
  }
  
  // 提取地址信息（通常包含地址关键词）
  const addressKeywords = ['地址', '路', '街', '号', '区', '市', '省', 'Address', 'Road', 'Street', 'Ave', 'St']
  const addressLines = lines.filter(line => 
    addressKeywords.some(keyword => line.includes(keyword))
  )
  if (addressLines.length > 0) {
    extractedInfo.value.address = addressLines.join(' ')
  }
  
  // 将未分类的信息放入备注
  const usedLines = new Set([
    extractedInfo.value.name,
    extractedInfo.value.company,
    extractedInfo.value.position,
    extractedInfo.value.email,
    extractedInfo.value.phone,
    extractedInfo.value.website,
    ...extractedInfo.value.address.split(' ')
  ])
  
  const remainingLines = lines.filter(line => !usedLines.has(line))
  if (remainingLines.length > 0) {
    extractedInfo.value.notes = remainingLines.join('\n')
  }
}

const copyAllInfo = async () => {
  const infoText = Object.entries(extractedInfo.value)
    .filter(([key, value]) => value.trim() !== '')
    .map(([key, value]) => `${t(`businessCardOCR.fields.${key}`)}: ${value}`)
    .join('\n')
  
  try {
    await navigator.clipboard.writeText(infoText)
    showToastMessage(t('businessCardOCR.success.copied'))
  } catch (error) {
    console.error('Copy failed:', error)
    showToastMessage(t('businessCardOCR.errors.copyFailed'))
  }
}

const downloadVCard = () => {
  const vcard = generateVCard()
  const blob = new Blob([vcard], { type: 'text/vcard' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${extractedInfo.value.name || 'business_card'}.vcf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  showToastMessage(t('businessCardOCR.success.downloaded'))
}

const generateVCard = () => {
  const info = extractedInfo.value
  let vcard = 'BEGIN:VCARD\n'
  vcard += 'VERSION:3.0\n'
  
  if (info.name) {
    vcard += `FN:${info.name}\n`
    vcard += `N:${info.name};;;\n`
  }
  
  if (info.company) {
    vcard += `ORG:${info.company}\n`
  }
  
  if (info.position) {
    vcard += `TITLE:${info.position}\n`
  }
  
  if (info.phone) {
    vcard += `TEL:${info.phone}\n`
  }
  
  if (info.email) {
    vcard += `EMAIL:${info.email}\n`
  }
  
  if (info.website) {
    vcard += `URL:${info.website}\n`
  }
  
  if (info.address) {
    vcard += `ADR:;;${info.address};;;;\n`
  }
  
  if (info.notes) {
    vcard += `NOTE:${info.notes}\n`
  }
  
  vcard += 'END:VCARD'
  return vcard
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

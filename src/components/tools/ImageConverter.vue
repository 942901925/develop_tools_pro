<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 上传区域 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">{{ t('imageConverter.uploadImage') }}</h3>
        <div 
          @drop="handleDrop"
          @dragover.prevent
          @dragenter.prevent
          class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
          :class="{ 'border-blue-500 bg-blue-50': isDragOver }"
        >
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileSelect"
            class="hidden"
          />
          <div class="space-y-4">
            <div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <Image class="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p class="text-lg font-medium text-gray-900">{{ t('imageConverter.dragImageHere') }}</p>
              <p class="text-sm text-gray-500">{{ t('imageConverter.orClickToSelect') }}</p>
            </div>
            <button
              @click="$refs.fileInput.click()"
              class="btn-primary"
            >
              {{ t('imageConverter.selectImage') }}
            </button>
          </div>
        </div>
        
        <!-- 转换设置 -->
        <div v-if="selectedFile" class="space-y-4">
          <h4 class="font-medium text-gray-900">{{ t('imageConverter.conversionSettings') }}</h4>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('imageConverter.targetFormat') }}</label>
              <select v-model="targetFormat" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
                <option value="bmp">BMP</option>
                <option value="gif">GIF</option>
              </select>
            </div>
            <div v-if="targetFormat === 'jpeg'">
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('imageConverter.quality') }} ({{ quality }}%)</label>
              <input
                v-model="quality"
                type="range"
                min="10"
                max="100"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('imageConverter.scale') }} ({{ scale }}%)</label>
              <input
                v-model="scale"
                type="range"
                min="10"
                max="200"
                step="10"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          <button
            @click="convertImage"
            :disabled="isConverting"
            class="btn-primary w-full"
          >
            {{ isConverting ? t('imageConverter.converting') : t('imageConverter.startConversion') }}
          </button>
        </div>
      </div>
      
      <!-- 预览区域 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">{{ t('imageConverter.conversionResult') }}</h3>
        <div v-if="originalImage" class="space-y-4">
          <!-- 原图信息 -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-2">{{ t('imageConverter.originalImageInfo') }}</h4>
            <div class="text-sm text-gray-600 space-y-1">
              <p>{{ t('imageConverter.fileName') }}: {{ selectedFile.name }}</p>
              <p>{{ t('imageConverter.format') }}: {{ getFileExtension(selectedFile.name).toUpperCase() }}</p>
              <p>{{ t('imageConverter.size') }}: {{ formatFileSize(selectedFile.size) }}</p>
              <p>{{ t('imageConverter.dimensions') }}: {{ originalImage.width }} × {{ originalImage.height }}</p>
            </div>
            <div class="mt-3">
              <img :src="originalImage.src" class="max-w-full h-auto rounded border" />
            </div>
          </div>
          
          <!-- 转换后信息 -->
          <div v-if="convertedImage" class="bg-green-50 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-2">{{ t('imageConverter.convertedImageInfo') }}</h4>
            <div class="text-sm text-gray-600 space-y-1">
              <p>{{ t('imageConverter.format') }}: {{ targetFormat.toUpperCase() }}</p>
              <p>{{ t('imageConverter.size') }}: {{ formatFileSize(convertedImage.size) }}</p>
              <p>{{ t('imageConverter.dimensions') }}: {{ convertedImage.width }} × {{ convertedImage.height }}</p>
            </div>
            <div class="mt-3">
              <img :src="convertedImage.src" class="max-w-full h-auto rounded border" />
            </div>
            <div class="mt-3 flex space-x-2">
              <button
                @click="downloadConverted"
                class="btn-primary flex-1"
              >
                {{ t('imageConverter.downloadConverted') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Image } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const fileInput = ref(null)
const selectedFile = ref(null)
const originalImage = ref(null)
const convertedImage = ref(null)
const isDragOver = ref(false)
const isConverting = ref(false)

// 转换设置
const targetFormat = ref('jpeg')
const quality = ref(90)
const scale = ref(100)

// 处理文件选择
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    processFile(file)
  }
}

// 处理拖拽
const handleDrop = (event) => {
  isDragOver.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    processFile(file)
  }
}

// 处理文件
const processFile = (file) => {
  selectedFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      originalImage.value = {
        src: e.target.result,
        width: img.width,
        height: img.height
      }
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

// 转换图片
const convertImage = () => {
  if (!originalImage.value) return
  
  isConverting.value = true
  
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  
  img.onload = () => {
    // 计算新尺寸
    const newWidth = Math.round(img.width * scale.value / 100)
    const newHeight = Math.round(img.height * scale.value / 100)
    
    canvas.width = newWidth
    canvas.height = newHeight
    
    // 绘制转换后的图片
    ctx.drawImage(img, 0, 0, newWidth, newHeight)
    
    // 转换为指定格式
    const mimeType = getMimeType(targetFormat.value)
    const qualityValue = targetFormat.value === 'jpeg' ? quality.value / 100 : undefined
    
    canvas.toBlob((blob) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        convertedImage.value = {
          src: e.target.result,
          width: newWidth,
          height: newHeight,
          size: blob.size
        }
        isConverting.value = false
      }
      reader.readAsDataURL(blob)
    }, mimeType, qualityValue)
  }
  
  img.src = originalImage.value.src
}

// 获取MIME类型
const getMimeType = (format) => {
  const mimeTypes = {
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    bmp: 'image/bmp',
    gif: 'image/gif'
  }
  return mimeTypes[format] || 'image/jpeg'
}

// 获取文件扩展名
const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase()
}

// 下载转换图片
const downloadConverted = () => {
  if (!convertedImage.value) return
  
  const extension = targetFormat.value === 'jpeg' ? 'jpg' : targetFormat.value
  const link = document.createElement('a')
  link.download = `converted_${Date.now()}.${extension}`
  link.href = convertedImage.value.src
  link.click()
}

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

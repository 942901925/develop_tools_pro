<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 上传区域 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">上传图片</h3>
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
              <p class="text-lg font-medium text-gray-900">拖拽图片到此处</p>
              <p class="text-sm text-gray-500">或点击选择文件</p>
            </div>
            <button
              @click="$refs.fileInput.click()"
              class="btn-primary"
            >
              选择图片
            </button>
          </div>
        </div>
        
        <!-- 压缩设置 -->
        <div v-if="selectedFile" class="space-y-4">
          <h4 class="font-medium text-gray-900">压缩设置</h4>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">质量 ({{ quality }}%)</label>
              <input
                v-model="quality"
                type="range"
                min="10"
                max="100"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">最大宽度 ({{ maxWidth }}px)</label>
              <input
                v-model="maxWidth"
                type="range"
                min="100"
                max="2000"
                step="50"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">最大高度 ({{ maxHeight }}px)</label>
              <input
                v-model="maxHeight"
                type="range"
                min="100"
                max="2000"
                step="50"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          <button
            @click="compressImage"
            :disabled="isCompressing"
            class="btn-primary w-full"
          >
            {{ isCompressing ? '压缩中...' : '开始压缩' }}
          </button>
        </div>
      </div>
      
      <!-- 预览区域 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">预览结果</h3>
        <div v-if="originalImage" class="space-y-4">
          <!-- 原图信息 -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-2">原图信息</h4>
            <div class="text-sm text-gray-600 space-y-1">
              <p>文件名: {{ selectedFile.name }}</p>
              <p>大小: {{ formatFileSize(selectedFile.size) }}</p>
              <p>尺寸: {{ originalImage.width }} × {{ originalImage.height }}</p>
            </div>
            <div class="mt-3">
              <img :src="originalImage.src" class="max-w-full h-auto rounded border" />
            </div>
          </div>
          
          <!-- 压缩后信息 -->
          <div v-if="compressedImage" class="bg-green-50 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-2">压缩后信息</h4>
            <div class="text-sm text-gray-600 space-y-1">
              <p>大小: {{ formatFileSize(compressedImage.size) }}</p>
              <p>尺寸: {{ compressedImage.width }} × {{ compressedImage.height }}</p>
              <p>压缩率: {{ compressionRatio }}%</p>
            </div>
            <div class="mt-3">
              <img :src="compressedImage.src" class="max-w-full h-auto rounded border" />
            </div>
            <div class="mt-3 flex space-x-2">
              <button
                @click="downloadCompressed"
                class="btn-primary flex-1"
              >
                下载压缩图片
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Image } from 'lucide-vue-next'

const fileInput = ref(null)
const selectedFile = ref(null)
const originalImage = ref(null)
const compressedImage = ref(null)
const isDragOver = ref(false)
const isCompressing = ref(false)

// 压缩设置
const quality = ref(80)
const maxWidth = ref(800)
const maxHeight = ref(600)

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

// 压缩图片
const compressImage = () => {
  if (!originalImage.value) return
  
  isCompressing.value = true
  
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  
  img.onload = () => {
    // 计算新尺寸
    let { width, height } = calculateNewDimensions(img.width, img.height)
    
    canvas.width = width
    canvas.height = height
    
    // 绘制压缩后的图片
    ctx.drawImage(img, 0, 0, width, height)
    
    // 转换为blob
    canvas.toBlob((blob) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        compressedImage.value = {
          src: e.target.result,
          width,
          height,
          size: blob.size
        }
        isCompressing.value = false
      }
      reader.readAsDataURL(blob)
    }, 'image/jpeg', quality.value / 100)
  }
  
  img.src = originalImage.value.src
}

// 计算新尺寸
const calculateNewDimensions = (originalWidth, originalHeight) => {
  let width = originalWidth
  let height = originalHeight
  
  // 按比例缩放
  if (width > maxWidth.value) {
    height = (height * maxWidth.value) / width
    width = maxWidth.value
  }
  
  if (height > maxHeight.value) {
    width = (width * maxHeight.value) / height
    height = maxHeight.value
  }
  
  return { width: Math.round(width), height: Math.round(height) }
}

// 下载压缩图片
const downloadCompressed = () => {
  if (!compressedImage.value) return
  
  const link = document.createElement('a')
  link.download = `compressed_${selectedFile.value.name}`
  link.href = compressedImage.value.src
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

// 计算压缩率
const compressionRatio = computed(() => {
  if (!originalImage.value || !compressedImage.value) return 0
  return Math.round((1 - compressedImage.value.size / selectedFile.value.size) * 100)
})
</script>

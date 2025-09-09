<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 输入区域 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">生成二维码</h3>
        
        <!-- 内容输入 -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">内容类型</label>
          <select v-model="contentType" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="text">文本</option>
            <option value="url">网址</option>
            <option value="email">邮箱</option>
            <option value="phone">电话</option>
            <option value="sms">短信</option>
            <option value="wifi">WiFi</option>
            <option value="vcard">名片</option>
          </select>
        </div>
        
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">内容</label>
          <textarea
            v-model="content"
            :placeholder="getPlaceholder()"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        
        <!-- WiFi 特殊设置 -->
        <div v-if="contentType === 'wifi'" class="space-y-3 p-4 bg-gray-50 rounded-lg">
          <h4 class="font-medium text-gray-900">WiFi 设置</h4>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">网络名称 (SSID)</label>
              <input
                v-model="wifiConfig.ssid"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <input
                v-model="wifiConfig.password"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">加密类型</label>
              <select v-model="wifiConfig.security" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">无密码</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">是否隐藏</label>
              <select v-model="wifiConfig.hidden" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="false">否</option>
                <option value="true">是</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- 二维码设置 -->
        <div class="space-y-3">
          <h4 class="font-medium text-gray-900">二维码设置</h4>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">尺寸 ({{ size }}px)</label>
              <input
                v-model="size"
                type="range"
                min="100"
                max="500"
                step="50"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">容错级别</label>
              <select v-model="errorCorrectionLevel" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="L">低 (7%)</option>
                <option value="M">中 (15%)</option>
                <option value="Q">较高 (25%)</option>
                <option value="H">高 (30%)</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">前景色</label>
              <input
                v-model="foregroundColor"
                type="color"
                class="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">背景色</label>
              <input
                v-model="backgroundColor"
                type="color"
                class="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
              />
            </div>
          </div>
        </div>
        
        <button
          @click="generateQRCode"
          :disabled="!canGenerate"
          class="btn-primary w-full"
        >
          生成二维码
        </button>
      </div>
      
      <!-- 预览区域 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">二维码预览</h3>
        <div class="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <div v-if="qrCodeDataUrl" class="space-y-4">
            <div class="flex justify-center">
              <img :src="qrCodeDataUrl" :alt="content" class="border border-gray-200 rounded" />
            </div>
            <div class="text-sm text-gray-600">
              <p>尺寸: {{ size }} × {{ size }} 像素</p>
              <p>容错级别: {{ errorCorrectionLevel }}</p>
            </div>
            <div class="flex space-x-2">
              <button
                @click="downloadQRCode"
                class="btn-primary flex-1"
              >
                下载二维码
              </button>
              <button
                @click="copyQRCode"
                class="btn-secondary flex-1"
              >
                复制图片
              </button>
            </div>
          </div>
          <div v-else class="py-12 text-gray-500">
            <QrCode class="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>输入内容后点击生成二维码</p>
          </div>
        </div>
        
        <!-- 使用说明 -->
        <div class="bg-blue-50 rounded-lg p-4">
          <h4 class="font-medium text-blue-900 mb-2">使用说明</h4>
          <ul class="text-sm text-blue-800 space-y-1">
            <li>• 支持文本、网址、邮箱、电话等多种内容类型</li>
            <li>• WiFi 二维码可直接扫码连接网络</li>
            <li>• 容错级别越高，二维码越复杂但越不容易损坏</li>
            <li>• 可自定义颜色和尺寸</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { QrCode } from 'lucide-vue-next'
import QRCode from 'qrcode'

const contentType = ref('text')
const content = ref('')
const size = ref(200)
const errorCorrectionLevel = ref('M')
const foregroundColor = ref('#000000')
const backgroundColor = ref('#ffffff')
const qrCodeDataUrl = ref('')

// WiFi 配置
const wifiConfig = ref({
  ssid: '',
  password: '',
  security: 'WPA',
  hidden: 'false'
})

// 是否可以生成
const canGenerate = computed(() => {
  if (contentType.value === 'wifi') {
    return wifiConfig.value.ssid.trim() !== ''
  }
  return content.value.trim() !== ''
})

// 获取占位符文本
const getPlaceholder = () => {
  const placeholders = {
    text: '输入要生成二维码的文本内容...',
    url: 'https://example.com',
    email: 'example@email.com',
    phone: '+86 138 0013 8000',
    sms: '短信内容',
    wifi: 'WiFi 信息将通过下方设置生成',
    vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:姓名\nTEL:电话\nEMAIL:邮箱\nEND:VCARD'
  }
  return placeholders[contentType.value] || ''
}

// 生成二维码
const generateQRCode = async () => {
  try {
    let qrContent = content.value.trim()
    
    // 根据内容类型格式化
    if (contentType.value === 'url' && !qrContent.startsWith('http')) {
      qrContent = 'https://' + qrContent
    } else if (contentType.value === 'email') {
      qrContent = 'mailto:' + qrContent
    } else if (contentType.value === 'phone') {
      qrContent = 'tel:' + qrContent
    } else if (contentType.value === 'sms') {
      qrContent = 'sms:' + qrContent
    } else if (contentType.value === 'wifi') {
      qrContent = generateWifiQRContent()
    }
    
    const options = {
      width: size.value,
      margin: 2,
      color: {
        dark: foregroundColor.value,
        light: backgroundColor.value
      },
      errorCorrectionLevel: errorCorrectionLevel.value
    }
    
    qrCodeDataUrl.value = await QRCode.toDataURL(qrContent, options)
  } catch (error) {
    console.error('生成二维码失败:', error)
    alert('生成二维码失败，请检查输入内容')
  }
}

// 生成 WiFi 二维码内容
const generateWifiQRContent = () => {
  const { ssid, password, security, hidden } = wifiConfig.value
  return `WIFI:T:${security};S:${ssid};P:${password};H:${hidden};;`
}

// 下载二维码
const downloadQRCode = () => {
  if (!qrCodeDataUrl.value) return
  
  const link = document.createElement('a')
  link.download = `qrcode_${Date.now()}.png`
  link.href = qrCodeDataUrl.value
  link.click()
}

// 复制二维码
const copyQRCode = async () => {
  if (!qrCodeDataUrl.value) return
  
  try {
    const response = await fetch(qrCodeDataUrl.value)
    const blob = await response.blob()
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ])
    alert('二维码已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
    alert('复制失败，请尝试下载')
  }
}
</script>

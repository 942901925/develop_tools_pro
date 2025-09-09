<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 输入区域 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">User-Agent 解析</h3>
        
        <!-- User-Agent 输入 -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">User-Agent 字符串</label>
          <textarea
            v-model="userAgent"
            rows="4"
            placeholder="粘贴 User-Agent 字符串..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          ></textarea>
        </div>
        
        <!-- 快速选择 -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">快速选择</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              @click="getMyUserAgent"
              class="btn-secondary text-sm"
            >
              我的 User-Agent
            </button>
            <button
              @click="clearInput"
              class="btn-secondary text-sm"
            >
              清空
            </button>
          </div>
        </div>
        
        <!-- 解析按钮 -->
        <button
          @click="parseUserAgent"
          :disabled="!userAgent.trim()"
          class="btn-primary w-full"
        >
          解析 User-Agent
        </button>
        
        <!-- 历史记录 -->
        <div v-if="searchHistory.length > 0" class="space-y-3">
          <h4 class="font-medium text-gray-900">解析历史</h4>
          <div class="space-y-2 max-h-40 overflow-y-auto">
            <button
              v-for="(item, index) in searchHistory.slice(0, 5)"
              :key="index"
              @click="selectFromHistory(item)"
              class="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-xs text-gray-700 transition-colors"
            >
              <div class="truncate">{{ item.browser }} {{ item.browserVersion }} on {{ item.os }}</div>
            </button>
          </div>
          <button
            @click="clearHistory"
            class="text-sm text-red-600 hover:text-red-700"
          >
            清空历史
          </button>
        </div>
      </div>
      
      <!-- 结果区域 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">解析结果</h3>
        
        <div v-if="parsedInfo" class="space-y-4">
          <!-- 浏览器信息 -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-3">浏览器信息</h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span class="text-gray-500">浏览器:</span>
                <span class="ml-2">{{ parsedInfo.browser || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">版本:</span>
                <span class="ml-2">{{ parsedInfo.browserVersion || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">引擎:</span>
                <span class="ml-2">{{ parsedInfo.engine || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">引擎版本:</span>
                <span class="ml-2">{{ parsedInfo.engineVersion || '未知' }}</span>
              </div>
            </div>
          </div>
          
          <!-- 操作系统信息 -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-3">操作系统信息</h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span class="text-gray-500">操作系统:</span>
                <span class="ml-2">{{ parsedInfo.os || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">版本:</span>
                <span class="ml-2">{{ parsedInfo.osVersion || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">架构:</span>
                <span class="ml-2">{{ parsedInfo.architecture || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">设备类型:</span>
                <span class="ml-2">{{ parsedInfo.deviceType || '未知' }}</span>
              </div>
            </div>
          </div>
          
          <!-- 设备信息 -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-3">设备信息</h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span class="text-gray-500">设备:</span>
                <span class="ml-2">{{ parsedInfo.device || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">制造商:</span>
                <span class="ml-2">{{ parsedInfo.manufacturer || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">移动设备:</span>
                <span class="ml-2">{{ parsedInfo.isMobile ? '是' : '否' }}</span>
              </div>
              <div>
                <span class="text-gray-500">平板设备:</span>
                <span class="ml-2">{{ parsedInfo.isTablet ? '是' : '否' }}</span>
              </div>
            </div>
          </div>
          
          <!-- 原始 User-Agent -->
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-3">原始 User-Agent</h4>
            <div class="bg-white p-3 rounded border font-mono text-xs text-gray-700 break-all">
              {{ userAgent }}
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex space-x-2">
            <button
              @click="copyParsedInfo"
              class="btn-secondary flex-1"
            >
              复制信息
            </button>
            <button
              @click="copyUserAgent"
              class="btn-primary flex-1"
            >
              复制 User-Agent
            </button>
          </div>
        </div>
        
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center">
            <AlertCircle class="w-5 h-5 text-red-500 mr-2" />
            <span class="text-red-700">{{ error }}</span>
          </div>
        </div>
        
        <div v-else class="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <Monitor class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">输入 User-Agent 字符串开始解析</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Monitor, AlertCircle } from 'lucide-vue-next'

const userAgent = ref('')
const parsedInfo = ref(null)
const error = ref('')
const searchHistory = ref([])

// 获取我的 User-Agent
const getMyUserAgent = () => {
  userAgent.value = navigator.userAgent
}

// 清空输入
const clearInput = () => {
  userAgent.value = ''
  parsedInfo.value = null
  error.value = ''
}

// 解析 User-Agent
const parseUserAgent = () => {
  if (!userAgent.value.trim()) return
  
  error.value = ''
  parsedInfo.value = null
  
  try {
    const ua = userAgent.value.trim()
    const parsed = parseUserAgentString(ua)
    
    parsedInfo.value = parsed
    
    // 添加到历史记录
    addToHistory(parsed)
    
  } catch (err) {
    error.value = '解析 User-Agent 失败'
  }
}

// 解析 User-Agent 字符串
const parseUserAgentString = (ua) => {
  const result = {
    browser: '未知',
    browserVersion: '未知',
    engine: '未知',
    engineVersion: '未知',
    os: '未知',
    osVersion: '未知',
    device: '未知',
    deviceType: '未知',
    manufacturer: '未知',
    architecture: '未知',
    isMobile: false,
    isTablet: false
  }
  
  // 检测浏览器
  if (ua.includes('Chrome/')) {
    result.browser = 'Chrome'
    const match = ua.match(/Chrome\/(\d+\.\d+)/)
    if (match) result.browserVersion = match[1]
  } else if (ua.includes('Firefox/')) {
    result.browser = 'Firefox'
    const match = ua.match(/Firefox\/(\d+\.\d+)/)
    if (match) result.browserVersion = match[1]
  } else if (ua.includes('Safari/') && !ua.includes('Chrome/')) {
    result.browser = 'Safari'
    const match = ua.match(/Version\/(\d+\.\d+)/)
    if (match) result.browserVersion = match[1]
  } else if (ua.includes('Edge/')) {
    result.browser = 'Edge'
    const match = ua.match(/Edge\/(\d+\.\d+)/)
    if (match) result.browserVersion = match[1]
  } else if (ua.includes('Opera/') || ua.includes('OPR/')) {
    result.browser = 'Opera'
    const match = ua.match(/(?:Opera|OPR)\/(\d+\.\d+)/)
    if (match) result.browserVersion = match[1]
  }
  
  // 检测引擎
  if (ua.includes('WebKit/')) {
    result.engine = 'WebKit'
    const match = ua.match(/WebKit\/(\d+\.\d+)/)
    if (match) result.engineVersion = match[1]
  } else if (ua.includes('Gecko/')) {
    result.engine = 'Gecko'
    const match = ua.match(/Gecko\/(\d+)/)
    if (match) result.engineVersion = match[1]
  }
  
  // 检测操作系统
  if (ua.includes('Windows NT')) {
    result.os = 'Windows'
    if (ua.includes('Windows NT 10.0')) result.osVersion = '10'
    else if (ua.includes('Windows NT 6.3')) result.osVersion = '8.1'
    else if (ua.includes('Windows NT 6.2')) result.osVersion = '8'
    else if (ua.includes('Windows NT 6.1')) result.osVersion = '7'
    else if (ua.includes('Windows NT 6.0')) result.osVersion = 'Vista'
    else if (ua.includes('Windows NT 5.1')) result.osVersion = 'XP'
  } else if (ua.includes('Mac OS X')) {
    result.os = 'macOS'
    const match = ua.match(/Mac OS X (\d+[._]\d+)/)
    if (match) result.osVersion = match[1].replace('_', '.')
  } else if (ua.includes('Linux')) {
    result.os = 'Linux'
    if (ua.includes('Android')) {
      result.os = 'Android'
      const match = ua.match(/Android (\d+\.\d+)/)
      if (match) result.osVersion = match[1]
    } else if (ua.includes('Ubuntu')) {
      result.osVersion = 'Ubuntu'
    }
  } else if (ua.includes('iPhone OS') || ua.includes('iOS')) {
    result.os = 'iOS'
    const match = ua.match(/OS (\d+[._]\d+)/)
    if (match) result.osVersion = match[1].replace('_', '.')
  }
  
  // 检测设备类型
  result.isMobile = /Mobile|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  result.isTablet = /iPad|Android(?!.*Mobile)/i.test(ua)
  
  if (result.isMobile || result.isTablet) {
    result.deviceType = result.isTablet ? '平板' : '手机'
  } else {
    result.deviceType = '桌面'
  }
  
  // 检测设备制造商
  if (ua.includes('iPhone')) result.manufacturer = 'Apple'
  else if (ua.includes('iPad')) result.manufacturer = 'Apple'
  else if (ua.includes('Samsung')) result.manufacturer = 'Samsung'
  else if (ua.includes('Huawei')) result.manufacturer = 'Huawei'
  else if (ua.includes('Xiaomi')) result.manufacturer = 'Xiaomi'
  else if (ua.includes('OnePlus')) result.manufacturer = 'OnePlus'
  else if (ua.includes('Google')) result.manufacturer = 'Google'
  
  // 检测架构
  if (ua.includes('x64') || ua.includes('Win64')) result.architecture = 'x64'
  else if (ua.includes('x86') || ua.includes('WOW64')) result.architecture = 'x86'
  else if (ua.includes('ARM64')) result.architecture = 'ARM64'
  else if (ua.includes('ARM')) result.architecture = 'ARM'
  
  return result
}

// 添加到历史记录
const addToHistory = (item) => {
  const historyItem = {
    ...item,
    timestamp: Date.now()
  }
  
  // 移除重复项
  searchHistory.value = searchHistory.value.filter(h => h.browser !== item.browser || h.os !== item.os)
  // 添加到开头
  searchHistory.value.unshift(historyItem)
  // 限制历史记录数量
  if (searchHistory.value.length > 10) {
    searchHistory.value = searchHistory.value.slice(0, 10)
  }
  // 保存到本地存储
  localStorage.setItem('user-agent-history', JSON.stringify(searchHistory.value))
}

// 从历史记录选择
const selectFromHistory = (item) => {
  // 这里需要重新构造 User-Agent，但比较复杂，所以只显示信息
  parsedInfo.value = item
}

// 清空历史记录
const clearHistory = () => {
  searchHistory.value = []
  localStorage.removeItem('user-agent-history')
}

// 复制解析信息
const copyParsedInfo = () => {
  if (!parsedInfo.value) return
  
  const info = `浏览器: ${parsedInfo.value.browser} ${parsedInfo.value.browserVersion}
操作系统: ${parsedInfo.value.os} ${parsedInfo.value.osVersion}
设备类型: ${parsedInfo.value.deviceType}
引擎: ${parsedInfo.value.engine} ${parsedInfo.value.engineVersion}
架构: ${parsedInfo.value.architecture}
移动设备: ${parsedInfo.value.isMobile ? '是' : '否'}`
  
  navigator.clipboard.writeText(info).then(() => {
    alert('解析信息已复制到剪贴板')
  }).catch(() => {
    alert('复制失败')
  })
}

// 复制 User-Agent
const copyUserAgent = () => {
  if (!userAgent.value) return
  
  navigator.clipboard.writeText(userAgent.value).then(() => {
    alert('User-Agent 已复制到剪贴板')
  }).catch(() => {
    alert('复制失败')
  })
}

// 加载历史记录
const loadHistory = () => {
  try {
    const saved = localStorage.getItem('user-agent-history')
    if (saved) {
      searchHistory.value = JSON.parse(saved)
    }
  } catch (err) {
    console.warn('加载历史记录失败:', err)
  }
}

// 初始化
loadHistory()
</script>

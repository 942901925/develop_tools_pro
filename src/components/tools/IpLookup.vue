<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 输入区域 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">IP 地址查询</h3>
        
        <!-- IP 输入 -->
        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">IP 地址</label>
          <div class="flex space-x-2">
            <input
              v-model="ipAddress"
              type="text"
              placeholder="输入 IP 地址，如: 8.8.8.8"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              @click="getMyIP"
              :disabled="isLoading"
              class="btn-secondary whitespace-nowrap"
            >
              {{ isLoading ? '查询中...' : '我的IP' }}
            </button>
          </div>
        </div>
        
        <!-- 查询按钮 -->
        <button
          @click="lookupIP"
          :disabled="!isValidIP || isLoading"
          class="btn-primary w-full"
        >
          {{ isLoading ? '查询中...' : '查询 IP 信息' }}
        </button>
        
        <!-- 历史记录 -->
        <div v-if="searchHistory.length > 0" class="space-y-3">
          <h4 class="font-medium text-gray-900">查询历史</h4>
          <div class="space-y-2">
            <button
              v-for="(item, index) in searchHistory.slice(0, 5)"
              :key="index"
              @click="selectFromHistory(item)"
              class="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md text-sm text-gray-700 transition-colors"
            >
              {{ item.ip }} - {{ item.location || '未知位置' }}
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
        <h3 class="text-lg font-semibold text-gray-900">查询结果</h3>
        
        <div v-if="ipInfo" class="space-y-4">
          <!-- 基本信息 -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-3">基本信息</h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span class="text-gray-500">IP 地址:</span>
                <span class="ml-2 font-mono">{{ ipInfo.ip }}</span>
              </div>
              <div>
                <span class="text-gray-500">类型:</span>
                <span class="ml-2">{{ ipInfo.type || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">版本:</span>
                <span class="ml-2">{{ ipInfo.version || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">主机名:</span>
                <span class="ml-2 font-mono">{{ ipInfo.hostname || '无' }}</span>
              </div>
            </div>
          </div>
          
          <!-- 地理位置 -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-3">地理位置</h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span class="text-gray-500">国家:</span>
                <span class="ml-2">{{ ipInfo.country || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">地区:</span>
                <span class="ml-2">{{ ipInfo.region || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">城市:</span>
                <span class="ml-2">{{ ipInfo.city || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">邮编:</span>
                <span class="ml-2">{{ ipInfo.postal || '未知' }}</span>
              </div>
              <div class="col-span-2">
                <span class="text-gray-500">坐标:</span>
                <span class="ml-2 font-mono">{{ ipInfo.loc || '未知' }}</span>
              </div>
            </div>
          </div>
          
          <!-- 网络信息 -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-3">网络信息</h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span class="text-gray-500">ISP:</span>
                <span class="ml-2">{{ ipInfo.org || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">ASN:</span>
                <span class="ml-2 font-mono">{{ ipInfo.asn || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">时区:</span>
                <span class="ml-2">{{ ipInfo.timezone || '未知' }}</span>
              </div>
              <div>
                <span class="text-gray-500">UTC:</span>
                <span class="ml-2">{{ ipInfo.utc_offset || '未知' }}</span>
              </div>
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="flex space-x-2">
            <button
              @click="copyIPInfo"
              class="btn-secondary flex-1"
            >
              复制信息
            </button>
            <button
              @click="viewOnMap"
              :disabled="!ipInfo.loc"
              class="btn-primary flex-1"
            >
              在地图上查看
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
          <Globe class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p class="text-gray-500">输入 IP 地址开始查询</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Globe, AlertCircle } from 'lucide-vue-next'
import logger from '../../utils/logger.js'
import { apiRequest } from '../../utils/requestManager.js'

const ipAddress = ref('')
const ipInfo = ref(null)
const error = ref('')
const isLoading = ref(false)
const searchHistory = ref([])

// 验证 IP 地址格式
const isValidIP = computed(() => {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return ipRegex.test(ipAddress.value)
})

// 获取我的 IP
const getMyIP = async () => {
  isLoading.value = true
  error.value = ''
  
  try {
    const response = await apiRequest('https://api.ipify.org?format=json')
    const data = await response.json()
    ipAddress.value = data.ip
  } catch (err) {
    error.value = '获取本机 IP 失败'
    logger.error('获取IP失败:', err)
  } finally {
    isLoading.value = false
  }
}

// 查询 IP 信息
const lookupIP = async () => {
  if (!isValidIP.value) return
  
  isLoading.value = true
  error.value = ''
  ipInfo.value = null
  
  try {
    // 使用 ipapi.co 服务
    const response = await apiRequest(`https://ipapi.co/${ipAddress.value}/json/`)
    const data = await response.json()
    
    if (data.error) {
      throw new Error(data.reason || '查询失败')
    }
    
    ipInfo.value = data
    
    // 添加到历史记录
    addToHistory({
      ip: ipAddress.value,
      location: `${data.city || ''} ${data.region || ''} ${data.country || ''}`.trim()
    })
    
  } catch (err) {
    error.value = err.message || '查询 IP 信息失败'
    logger.error('IP查询失败:', err)
  } finally {
    isLoading.value = false
  }
}

// 添加到历史记录
const addToHistory = (item) => {
  // 移除重复项
  searchHistory.value = searchHistory.value.filter(h => h.ip !== item.ip)
  // 添加到开头
  searchHistory.value.unshift(item)
  // 限制历史记录数量
  if (searchHistory.value.length > 10) {
    searchHistory.value = searchHistory.value.slice(0, 10)
  }
  // 保存到本地存储
  localStorage.setItem('ip-lookup-history', JSON.stringify(searchHistory.value))
}

// 从历史记录选择
const selectFromHistory = (item) => {
  ipAddress.value = item.ip
}

// 清空历史记录
const clearHistory = () => {
  searchHistory.value = []
  localStorage.removeItem('ip-lookup-history')
}

// 复制 IP 信息
const copyIPInfo = () => {
  if (!ipInfo.value) return
  
  const info = `IP: ${ipInfo.value.ip}
国家: ${ipInfo.value.country || '未知'}
地区: ${ipInfo.value.region || '未知'}
城市: ${ipInfo.value.city || '未知'}
ISP: ${ipInfo.value.org || '未知'}
坐标: ${ipInfo.value.loc || '未知'}`
  
  navigator.clipboard.writeText(info).then(() => {
    alert('IP 信息已复制到剪贴板')
  }).catch(() => {
    alert('复制失败')
  })
}

// 在地图上查看
const viewOnMap = () => {
  if (!ipInfo.value?.loc) return
  
  const [lat, lon] = ipInfo.value.loc.split(',')
  const url = `https://www.google.com/maps?q=${lat},${lon}`
  window.open(url, '_blank')
}

// 加载历史记录
const loadHistory = () => {
  try {
    const saved = localStorage.getItem('ip-lookup-history')
    if (saved) {
      searchHistory.value = JSON.parse(saved)
    }
  } catch (err) {
    logger.warn('加载历史记录失败:', err)
  }
}

// 初始化
loadHistory()
</script>

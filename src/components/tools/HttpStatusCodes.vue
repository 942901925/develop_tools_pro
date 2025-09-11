<template>
  <div class="space-y-6">
    <!-- 搜索区域 -->
    <div class="bg-white border border-gray-200 rounded-lg p-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('httpStatusCodes.searchPlaceholder')"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="selectedCategory"
            class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{{ t('httpStatusCodes.allCategories') }}</option>
            <option value="1xx">{{ t('httpStatusCodes.categories.informational') }}</option>
            <option value="2xx">{{ t('httpStatusCodes.categories.success') }}</option>
            <option value="3xx">{{ t('httpStatusCodes.categories.redirection') }}</option>
            <option value="4xx">{{ t('httpStatusCodes.categories.clientError') }}</option>
            <option value="5xx">{{ t('httpStatusCodes.categories.serverError') }}</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- 状态码列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="statusCode in filteredStatusCodes"
        :key="statusCode.code"
        class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
        @click="selectStatusCode(statusCode)"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center space-x-2">
            <span 
              :class="getStatusCodeClass(statusCode.code)"
              class="px-2 py-1 rounded text-sm font-mono font-bold"
            >
              {{ statusCode.code }}
            </span>
            <span class="text-sm text-gray-500">{{ statusCode.category }}</span>
          </div>
          <button
            @click.stop="copyStatusCode(statusCode)"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Copy class="w-4 h-4" />
          </button>
        </div>
        
        <h3 class="font-medium text-gray-900 mb-2">{{ statusCode.name }}</h3>
        <p class="text-sm text-gray-600 mb-3">{{ statusCode.description }}</p>
        
        <div v-if="statusCode.commonUse" class="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {{ t('httpStatusCodes.common') }}
        </div>
      </div>
    </div>
    
    <!-- 详情面板 -->
    <div v-if="selectedCode" class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <div class="flex items-center space-x-3 mb-2">
            <span 
              :class="getStatusCodeClass(selectedCode.code)"
              class="px-3 py-1 rounded text-lg font-mono font-bold"
            >
              {{ selectedCode.code }}
            </span>
            <h2 class="text-xl font-semibold text-gray-900">{{ selectedCode.name }}</h2>
          </div>
          <p class="text-gray-600">{{ selectedCode.description }}</p>
        </div>
        <button
          @click="selectedCode = null"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 基本信息 -->
        <div class="space-y-4">
          <h3 class="font-medium text-gray-900">{{ t('httpStatusCodes.basicInfo') }}</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">{{ t('httpStatusCodes.statusCode') }}:</span>
              <span class="font-mono">{{ selectedCode.code }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">{{ t('httpStatusCodes.category') }}:</span>
              <span>{{ selectedCode.category }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">{{ t('httpStatusCodes.standard') }}:</span>
              <span>{{ selectedCode.standard }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">{{ t('httpStatusCodes.commonUsage') }}:</span>
              <span>{{ selectedCode.commonUse ? t('httpStatusCodes.common') : t('httpStatusCodes.uncommon') }}</span>
            </div>
          </div>
        </div>
        
        <!-- 使用场景 -->
        <div class="space-y-4">
          <h3 class="font-medium text-gray-900">{{ t('httpStatusCodes.usageScenarios') }}</h3>
          <div class="space-y-2 text-sm">
            <div v-if="selectedCode.whenToUse">
              <span class="text-gray-500 block mb-1">{{ t('httpStatusCodes.whenToUse') }}:</span>
              <p class="text-gray-700">{{ selectedCode.whenToUse }}</p>
            </div>
            <div v-if="selectedCode.example">
              <span class="text-gray-500 block mb-1">{{ t('httpStatusCodes.example') }}:</span>
              <p class="text-gray-700 font-mono text-xs bg-gray-50 p-2 rounded">{{ selectedCode.example }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 相关状态码 -->
      <div v-if="selectedCode.related && selectedCode.related.length > 0" class="mt-6">
        <h3 class="font-medium text-gray-900 mb-3">{{ t('httpStatusCodes.relatedStatusCodes') }}</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="relatedCode in selectedCode.related"
            :key="relatedCode"
            @click="selectStatusCodeByCode(relatedCode)"
            class="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors"
          >
            {{ relatedCode }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
import { Copy, X } from 'lucide-vue-next'

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedCode = ref(null)

// HTTP 状态码数据
const statusCodes = ref([
  // 1xx - 信息响应
  { code: 100, name: 'Continue', description: '继续', category: '1xx', standard: 'HTTP/1.1', commonUse: false, whenToUse: '客户端应继续其请求', example: 'Expect: 100-continue' },
  { code: 101, name: 'Switching Protocols', description: '切换协议', category: '1xx', standard: 'HTTP/1.1', commonUse: false, whenToUse: '服务器根据客户端的请求切换协议', example: 'Upgrade: websocket' },
  { code: 102, name: 'Processing', description: '处理中', category: '1xx', standard: 'WebDAV', commonUse: false, whenToUse: '服务器已收到并正在处理请求，但无响应可用', example: 'WebDAV 操作' },
  
  // 2xx - 成功响应
  { code: 200, name: 'OK', description: '请求成功', category: '2xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '请求已成功处理', example: 'GET /api/users', related: [201, 204] },
  { code: 201, name: 'Created', description: '已创建', category: '2xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '请求成功并且服务器创建了新的资源', example: 'POST /api/users', related: [200, 202] },
  { code: 202, name: 'Accepted', description: '已接受', category: '2xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '服务器已接受请求，但尚未处理', example: '异步处理请求', related: [201, 204] },
  { code: 204, name: 'No Content', description: '无内容', category: '2xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '服务器成功处理了请求，但没有返回任何内容', example: 'DELETE /api/users/123', related: [200, 202] },
  { code: 206, name: 'Partial Content', description: '部分内容', category: '2xx', standard: 'HTTP/1.1', commonUse: false, whenToUse: '服务器成功处理了部分GET请求', example: 'Range: bytes=0-1023' },
  
  // 3xx - 重定向
  { code: 301, name: 'Moved Permanently', description: '永久移动', category: '3xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '请求的资源已被永久移动到新位置', example: 'Location: /new-url', related: [302, 308] },
  { code: 302, name: 'Found', description: '临时移动', category: '3xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '请求的资源临时从不同的位置响应', example: 'Location: /temp-url', related: [301, 307] },
  { code: 304, name: 'Not Modified', description: '未修改', category: '3xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '资源未修改，可以使用缓存的版本', example: 'If-Modified-Since', related: [200] },
  { code: 307, name: 'Temporary Redirect', description: '临时重定向', category: '3xx', standard: 'HTTP/1.1', commonUse: true, whenToUse: '请求的资源临时从不同的位置响应，保持原始请求方法', example: 'POST 重定向', related: [302, 308] },
  { code: 308, name: 'Permanent Redirect', description: '永久重定向', category: '3xx', standard: 'HTTP/1.1', commonUse: false, whenToUse: '请求的资源已被永久移动到新位置，保持原始请求方法', example: 'POST 永久重定向', related: [301, 307] },
  
  // 4xx - 客户端错误
  { code: 400, name: 'Bad Request', description: '错误请求', category: '4xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '服务器无法理解请求的语法', example: '请求格式错误', related: [401, 422] },
  { code: 401, name: 'Unauthorized', description: '未授权', category: '4xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '请求需要身份验证', example: 'WWW-Authenticate: Basic', related: [400, 403] },
  { code: 403, name: 'Forbidden', description: '禁止访问', category: '4xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '服务器理解请求但拒绝执行', example: '权限不足', related: [401, 404] },
  { code: 404, name: 'Not Found', description: '未找到', category: '4xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '服务器找不到请求的资源', example: 'GET /api/nonexistent', related: [403, 410] },
  { code: 405, name: 'Method Not Allowed', description: '方法不允许', category: '4xx', standard: 'HTTP/1.1', commonUse: true, whenToUse: '请求方法不被目标资源支持', example: 'POST /api/readonly', related: [404] },
  { code: 408, name: 'Request Timeout', description: '请求超时', category: '4xx', standard: 'HTTP/1.1', commonUse: false, whenToUse: '服务器等待请求时超时', example: '请求处理时间过长' },
  { code: 409, name: 'Conflict', description: '冲突', category: '4xx', standard: 'HTTP/1.1', commonUse: true, whenToUse: '请求与服务器当前状态冲突', example: '资源已存在', related: [400, 422] },
  { code: 410, name: 'Gone', description: '已删除', category: '4xx', standard: 'HTTP/1.1', commonUse: false, whenToUse: '请求的资源已永久删除', example: '资源不再可用', related: [404] },
  { code: 422, name: 'Unprocessable Entity', description: '无法处理的实体', category: '4xx', standard: 'WebDAV', commonUse: true, whenToUse: '请求格式正确但包含语义错误', example: '验证失败', related: [400, 409] },
  { code: 429, name: 'Too Many Requests', description: '请求过多', category: '4xx', standard: 'RFC 6585', commonUse: true, whenToUse: '用户在给定的时间内发送了太多请求', example: 'Rate limiting', related: [503] },
  
  // 5xx - 服务器错误
  { code: 500, name: 'Internal Server Error', description: '内部服务器错误', category: '5xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '服务器遇到错误，无法完成请求', example: '服务器内部错误', related: [502, 503] },
  { code: 501, name: 'Not Implemented', description: '未实现', category: '5xx', standard: 'HTTP/1.0', commonUse: false, whenToUse: '服务器不支持请求的功能', example: '不支持的方法', related: [500] },
  { code: 502, name: 'Bad Gateway', description: '错误网关', category: '5xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '作为网关或代理的服务器从上游服务器收到无效响应', example: '网关错误', related: [500, 503] },
  { code: 503, name: 'Service Unavailable', description: '服务不可用', category: '5xx', standard: 'HTTP/1.0', commonUse: true, whenToUse: '服务器暂时过载或维护中', example: 'Retry-After: 3600', related: [500, 502] },
  { code: 504, name: 'Gateway Timeout', description: '网关超时', category: '5xx', standard: 'HTTP/1.1', commonUse: true, whenToUse: '作为网关或代理的服务器没有及时从上游服务器收到请求', example: '网关超时', related: [502, 503] },
  { code: 505, name: 'HTTP Version Not Supported', description: 'HTTP版本不支持', category: '5xx', standard: 'HTTP/1.1', commonUse: false, whenToUse: '服务器不支持请求中使用的HTTP协议版本', example: 'HTTP/2.0 不支持', related: [501] }
])

// 过滤后的状态码
const filteredStatusCodes = computed(() => {
  let filtered = statusCodes.value
  
  // 按分类过滤
  if (selectedCategory.value) {
    filtered = filtered.filter(code => code.category === selectedCategory.value)
  }
  
  // 按搜索查询过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(code => 
      code.code.toString().includes(query) ||
      code.name.toLowerCase().includes(query) ||
      code.description.toLowerCase().includes(query)
    )
  }
  
  return filtered
})

// 获取状态码样式类
const getStatusCodeClass = (code) => {
  if (code >= 200 && code < 300) return 'bg-green-100 text-green-800'
  if (code >= 300 && code < 400) return 'bg-blue-100 text-blue-800'
  if (code >= 400 && code < 500) return 'bg-yellow-100 text-yellow-800'
  if (code >= 500) return 'bg-red-100 text-red-800'
  return 'bg-gray-100 text-gray-800'
}

// 选择状态码
const selectStatusCode = (statusCode) => {
  selectedCode.value = statusCode
}

// 根据代码选择状态码
const selectStatusCodeByCode = (code) => {
  const statusCode = statusCodes.value.find(sc => sc.code === code)
  if (statusCode) {
    selectedCode.value = statusCode
  }
}

// 复制状态码信息
const copyStatusCode = (statusCode) => {
  const info = `${statusCode.code} ${statusCode.name} - ${statusCode.description}`
  navigator.clipboard.writeText(info).then(() => {
    alert('状态码信息已复制到剪贴板')
  }).catch(() => {
    alert('复制失败')
  })
}
</script>

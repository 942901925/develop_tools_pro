<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 编码区域 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">URL 编码</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">原始URL</label>
            <textarea
              v-model="inputUrl"
              placeholder="请输入要编码的URL..."
              class="w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <button
            @click="encodeUrl"
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            编码
          </button>
          <div v-if="encodedUrl" class="p-4 bg-gray-100 rounded-lg">
            <div class="text-sm text-gray-600 mb-2">编码结果:</div>
            <div class="font-mono text-sm break-all">{{ encodedUrl }}</div>
            <button
              @click="copyEncoded"
              class="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
            >
              复制
            </button>
          </div>
        </div>
      </div>

      <!-- 解码区域 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">URL 解码</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">编码URL</label>
            <textarea
              v-model="decodeInput"
              placeholder="请输入要解码的URL..."
              class="w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>
          <button
            @click="decodeUrl"
            class="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            解码
          </button>
          <div v-if="decodedUrl" class="p-4 bg-gray-100 rounded-lg">
            <div class="text-sm text-gray-600 mb-2">解码结果:</div>
            <div class="font-mono text-sm break-all">{{ decodedUrl }}</div>
            <button
              @click="copyDecoded"
              class="mt-2 px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
            >
              复制
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 常用URL示例 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">常用URL示例</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="example in urlExamples"
          :key="example.name"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="setExample(example.url)"
        >
          <div class="font-medium text-gray-900">{{ example.name }}</div>
          <div class="text-sm text-gray-600 mt-1">{{ example.url }}</div>
        </div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-blue-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600">原始字符数</div>
        <div class="text-2xl font-bold text-blue-600">{{ inputUrl.length }}</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600">编码后字符数</div>
        <div class="text-2xl font-bold text-green-600">{{ encodedUrl.length }}</div>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600">编码比</div>
        <div class="text-2xl font-bold text-purple-600">{{ encodingRatio }}%</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600">特殊字符</div>
        <div class="text-2xl font-bold text-orange-600">{{ specialCharCount }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputUrl = ref('')
const encodedUrl = ref('')
const decodeInput = ref('')
const decodedUrl = ref('')

const urlExamples = ref([
  { name: 'Google搜索', url: 'https://www.google.com/search?q=hello world&hl=zh-CN' },
  { name: 'GitHub仓库', url: 'https://github.com/user/repo/blob/main/src/components/App.vue' },
  { name: 'API接口', url: 'https://api.example.com/users?name=张三&age=25&city=北京' },
  { name: '文件路径', url: 'https://example.com/files/我的文档/项目报告.pdf' }
])

const encodingRatio = computed(() => {
  if (inputUrl.value.length === 0) return 0
  return Math.round((encodedUrl.value.length / inputUrl.value.length) * 100)
})

const specialCharCount = computed(() => {
  return (inputUrl.value.match(/[^\w\-\.~]/g) || []).length
})

const encodeUrl = () => {
  try {
    encodedUrl.value = encodeURIComponent(inputUrl.value)
  } catch (e) {
    console.error('编码失败:', e)
  }
}

const decodeUrl = () => {
  try {
    decodedUrl.value = decodeURIComponent(decodeInput.value)
  } catch (e) {
    console.error('解码失败:', e)
  }
}

const setExample = (url) => {
  inputUrl.value = url
  encodeUrl()
}

const copyEncoded = async () => {
  try {
    await navigator.clipboard.writeText(encodedUrl.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}

const copyDecoded = async () => {
  try {
    await navigator.clipboard.writeText(decodedUrl.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- 正则表达式输入 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">正则表达式测试</h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">正则表达式</label>
            <div class="flex space-x-2">
              <input
                v-model="regexPattern"
                placeholder="输入正则表达式..."
                class="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                @click="testRegex"
                class="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                测试
              </button>
            </div>
            <div v-if="regexError" class="text-red-600 text-sm mt-2">{{ regexError }}</div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">测试文本</label>
            <textarea
              v-model="testText"
              placeholder="输入要测试的文本..."
              class="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">标志选项</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input v-model="flags.global" type="checkbox" class="mr-2" />
                全局匹配 (g)
              </label>
              <label class="flex items-center">
                <input v-model="flags.ignoreCase" type="checkbox" class="mr-2" />
                忽略大小写 (i)
              </label>
              <label class="flex items-center">
                <input v-model="flags.multiline" type="checkbox" class="mr-2" />
                多行模式 (m)
              </label>
              <label class="flex items-center">
                <input v-model="flags.dotAll" type="checkbox" class="mr-2" />
                点号匹配换行 (s)
              </label>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">替换文本</label>
            <input
              v-model="replaceText"
              placeholder="输入替换文本..."
              class="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              @click="replaceText"
              class="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              替换
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 匹配结果 -->
    <div v-if="matchResult" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">匹配结果</h3>
      
      <!-- 匹配统计 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-blue-600">{{ matchResult.matches.length }}</div>
          <div class="text-sm text-gray-600">匹配次数</div>
        </div>
        <div class="bg-green-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-green-600">{{ matchResult.groups.length }}</div>
          <div class="text-sm text-gray-600">捕获组</div>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-purple-600">{{ matchResult.index }}</div>
          <div class="text-sm text-gray-600">首次匹配位置</div>
        </div>
        <div class="bg-orange-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-orange-600">{{ matchResult.input.length }}</div>
          <div class="text-sm text-gray-600">输入长度</div>
        </div>
      </div>
      
      <!-- 匹配详情 -->
      <div class="space-y-4">
        <div v-if="matchResult.matches.length > 0">
          <h4 class="text-md font-semibold text-gray-900">匹配的文本</h4>
          <div class="bg-gray-900 text-white p-4 rounded-lg overflow-auto">
            <div class="font-mono text-sm whitespace-pre-wrap">{{ highlightedText }}</div>
          </div>
        </div>
        
        <div v-if="matchResult.groups.length > 0">
          <h4 class="text-md font-semibold text-gray-900">捕获组</h4>
          <div class="space-y-2">
            <div
              v-for="(group, index) in matchResult.groups"
              :key="index"
              class="p-3 bg-gray-50 rounded-lg"
            >
              <div class="text-sm font-medium text-gray-700">组 {{ index }}:</div>
              <div class="font-mono text-sm">{{ group }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 替换结果 -->
    <div v-if="replaceResult" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">替换结果</h3>
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600 mb-2">替换后的文本:</div>
        <div class="font-mono text-sm whitespace-pre-wrap">{{ replaceResult }}</div>
      </div>
    </div>

    <!-- 常用正则表达式 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">常用正则表达式</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="pattern in commonPatterns"
          :key="pattern.name"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="loadPattern(pattern)"
        >
          <div class="font-medium text-gray-900">{{ pattern.name }}</div>
          <div class="text-sm text-gray-600 mt-1">{{ pattern.description }}</div>
          <div class="text-xs text-gray-500 mt-2 font-mono">{{ pattern.pattern }}</div>
        </div>
      </div>
    </div>

    <!-- 示例文本 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">示例文本</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="example in examples"
          :key="example.name"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="loadExample(example)"
        >
          <div class="font-medium text-gray-900">{{ example.name }}</div>
          <div class="text-sm text-gray-600 mt-1">{{ example.description }}</div>
          <div class="text-xs text-gray-500 mt-2 font-mono">{{ example.text.substring(0, 50) }}...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const regexPattern = ref('')
const testText = ref('')
const replaceText = ref('')
const regexError = ref('')
const matchResult = ref(null)
const replaceResult = ref('')

const flags = ref({
  global: true,
  ignoreCase: false,
  multiline: false,
  dotAll: false
})

const commonPatterns = ref([
  { name: '邮箱地址', description: '匹配邮箱地址', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' },
  { name: '手机号码', description: '匹配中国手机号', pattern: '^1[3-9]\\d{9}$' },
  { name: 'IP地址', description: '匹配IPv4地址', pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$' },
  { name: 'URL地址', description: '匹配HTTP/HTTPS URL', pattern: '^https?://[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?$' },
  { name: '日期格式', description: '匹配YYYY-MM-DD格式', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
  { name: '时间格式', description: '匹配HH:MM:SS格式', pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$' },
  { name: '中文字符', description: '匹配中文字符', pattern: '[\\u4e00-\\u9fa5]' },
  { name: '数字', description: '匹配整数和小数', pattern: '^-?\\d+(\\.\\d+)?$' },
  { name: 'HTML标签', description: '匹配HTML标签', pattern: '<[^>]+>' },
  { name: '空白字符', description: '匹配空白字符', pattern: '\\s+' }
])

const examples = ref([
  {
    name: '邮箱列表',
    description: '包含多个邮箱地址的文本',
    text: '联系邮箱: john@example.com, mary@test.org, admin@company.com.cn'
  },
  {
    name: '手机号码',
    description: '包含手机号码的文本',
    text: '联系电话: 13812345678, 15987654321, 18612345678'
  },
  {
    name: 'HTML内容',
    description: '包含HTML标签的文本',
    text: '<div class="container"><h1>标题</h1><p>这是一个段落</p></div>'
  },
  {
    name: '日期时间',
    description: '包含日期和时间的文本',
    text: '创建时间: 2024-01-15 14:30:25, 更新时间: 2024-01-16 09:15:10'
  }
])

const highlightedText = computed(() => {
  if (!matchResult.value || !testText.value) return testText.value
  
  let highlighted = testText.value
  const matches = matchResult.value.matches
  
  // 从后往前替换，避免位置偏移
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i]
    const start = match.index
    const end = start + match[0].length
    const before = highlighted.substring(0, start)
    const matched = highlighted.substring(start, end)
    const after = highlighted.substring(end)
    highlighted = before + `\x1b[32m${matched}\x1b[0m` + after
  }
  
  return highlighted
})

const testRegex = () => {
  if (!regexPattern.value || !testText.value) return
  
  try {
    const flagString = Object.entries(flags.value)
      .filter(([_, enabled]) => enabled)
      .map(([key, _]) => {
        const flagMap = {
          global: 'g',
          ignoreCase: 'i',
          multiline: 'm',
          dotAll: 's'
        }
        return flagMap[key]
      })
      .join('')
    
    const regex = new RegExp(regexPattern.value, flagString)
    const matches = [...testText.value.matchAll(regex)]
    
    matchResult.value = {
      matches: matches,
      groups: matches.length > 0 ? matches[0].slice(1) : [],
      index: matches.length > 0 ? matches[0].index : -1,
      input: testText.value
    }
    
    regexError.value = ''
  } catch (e) {
    regexError.value = '正则表达式错误: ' + e.message
    matchResult.value = null
  }
}

const replaceText = () => {
  if (!regexPattern.value || !testText.value || !replaceText.value) return
  
  try {
    const flagString = Object.entries(flags.value)
      .filter(([_, enabled]) => enabled)
      .map(([key, _]) => {
        const flagMap = {
          global: 'g',
          ignoreCase: 'i',
          multiline: 'm',
          dotAll: 's'
        }
        return flagMap[key]
      })
      .join('')
    
    const regex = new RegExp(regexPattern.value, flagString)
    replaceResult.value = testText.value.replace(regex, replaceText.value)
  } catch (e) {
    console.error('替换失败:', e)
  }
}

const loadPattern = (pattern) => {
  regexPattern.value = pattern.pattern
  testRegex()
}

const loadExample = (example) => {
  testText.value = example.text
  testRegex()
}
</script>

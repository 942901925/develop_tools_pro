<template>
  <div class="space-y-6">
    <!-- 正则表达式输入 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('regexTester.title') }}</h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('regexTester.regexPattern') }}</label>
            <div class="flex space-x-2">
              <input
                v-model="regexPattern"
                :placeholder="t('regexTester.enterRegexPattern')"
                class="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                @click="testRegex"
                class="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {{ t('regexTester.test') }}
              </button>
            </div>
            <div v-if="regexError" class="text-red-600 text-sm mt-2">{{ regexError }}</div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('regexTester.testText') }}</label>
            <textarea
              v-model="testText"
              :placeholder="t('regexTester.enterTestText')"
              class="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('regexTester.flags') }}</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input v-model="flags.global" type="checkbox" class="mr-2" />
                {{ t('regexTester.globalMatch') }} (g)
              </label>
              <label class="flex items-center">
                <input v-model="flags.ignoreCase" type="checkbox" class="mr-2" />
                {{ t('regexTester.ignoreCase') }} (i)
              </label>
              <label class="flex items-center">
                <input v-model="flags.multiline" type="checkbox" class="mr-2" />
                {{ t('regexTester.multiline') }} (m)
              </label>
              <label class="flex items-center">
                <input v-model="flags.dotAll" type="checkbox" class="mr-2" />
                {{ t('regexTester.dotAll') }} (s)
              </label>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('regexTester.replaceText') }}</label>
            <input
              v-model="replaceText"
              :placeholder="t('regexTester.enterReplaceText')"
              class="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              @click="replaceTextFunction"
              class="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              {{ t('regexTester.replace') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 匹配结果 -->
    <div v-if="matchResult" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('regexTester.matchResult') }}</h3>
      
      <!-- 匹配统计 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-blue-600">{{ matchResult.matches.length }}</div>
          <div class="text-sm text-gray-600">{{ t('regexTester.matchCount') }}</div>
        </div>
        <div class="bg-green-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-green-600">{{ matchResult.groups.length }}</div>
          <div class="text-sm text-gray-600">{{ t('regexTester.captureGroups') }}</div>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-purple-600">{{ matchResult.index }}</div>
          <div class="text-sm text-gray-600">{{ t('regexTester.firstMatchPosition') }}</div>
        </div>
        <div class="bg-orange-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-orange-600">{{ matchResult.input.length }}</div>
          <div class="text-sm text-gray-600">{{ t('regexTester.inputLength') }}</div>
        </div>
      </div>
      
      <!-- 匹配详情 -->
      <div class="space-y-4">
        <div v-if="matchResult.matches.length > 0">
          <h4 class="text-md font-semibold text-gray-900">{{ t('regexTester.matchedText') }}</h4>
          <div class="bg-gray-900 text-white p-4 rounded-lg overflow-auto">
            <div class="font-mono text-sm whitespace-pre-wrap">{{ highlightedText }}</div>
          </div>
        </div>
        
        <div v-if="matchResult.groups.length > 0">
          <h4 class="text-md font-semibold text-gray-900">{{ t('regexTester.captureGroups') }}</h4>
          <div class="space-y-2">
            <div
              v-for="(group, index) in matchResult.groups"
              :key="index"
              class="p-3 bg-gray-50 rounded-lg"
            >
              <div class="text-sm font-medium text-gray-700">{{ t('regexTester.group') }} {{ index }}:</div>
              <div class="font-mono text-sm">{{ group }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 替换结果 -->
    <div v-if="replaceResult" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('regexTester.replaceResult') }}</h3>
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600 mb-2">{{ t('regexTester.replacedText') }}:</div>
        <div class="font-mono text-sm whitespace-pre-wrap">{{ replaceResult }}</div>
      </div>
    </div>

    <!-- 常用正则表达式 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('regexTester.commonPatterns') }}</h3>
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
      <h3 class="text-lg font-semibold text-gray-900">{{ t('regexTester.exampleText') }}</h3>
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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

const commonPatterns = computed(() => [
  { name: t('regexTester.patterns.email.name'), description: t('regexTester.patterns.email.description'), pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' },
  { name: t('regexTester.patterns.phone.name'), description: t('regexTester.patterns.phone.description'), pattern: '^1[3-9]\\d{9}$' },
  { name: t('regexTester.patterns.ipAddress.name'), description: t('regexTester.patterns.ipAddress.description'), pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$' },
  { name: t('regexTester.patterns.url.name'), description: t('regexTester.patterns.url.description'), pattern: '^https?://[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?$' },
  { name: t('regexTester.patterns.date.name'), description: t('regexTester.patterns.date.description'), pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
  { name: t('regexTester.patterns.time.name'), description: t('regexTester.patterns.time.description'), pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$' },
  { name: t('regexTester.patterns.chinese.name'), description: t('regexTester.patterns.chinese.description'), pattern: '[\\u4e00-\\u9fa5]' },
  { name: t('regexTester.patterns.number.name'), description: t('regexTester.patterns.number.description'), pattern: '^-?\\d+(\\.\\d+)?$' },
  { name: t('regexTester.patterns.htmlTag.name'), description: t('regexTester.patterns.htmlTag.description'), pattern: '<[^>]+>' },
  { name: t('regexTester.patterns.whitespace.name'), description: t('regexTester.patterns.whitespace.description'), pattern: '\\s+' }
])

const examples = computed(() => [
  {
    name: t('regexTester.examples.emailList.name'),
    description: t('regexTester.examples.emailList.description'),
    text: '联系邮箱: john@example.com, mary@test.org, admin@company.com.cn'
  },
  {
    name: t('regexTester.examples.phoneNumbers.name'),
    description: t('regexTester.examples.phoneNumbers.description'),
    text: '联系电话: 13812345678, 15987654321, 18612345678'
  },
  {
    name: t('regexTester.examples.htmlContent.name'),
    description: t('regexTester.examples.htmlContent.description'),
    text: '<div class="container"><h1>标题</h1><p>这是一个段落</p></div>'
  },
  {
    name: t('regexTester.examples.dateTime.name'),
    description: t('regexTester.examples.dateTime.description'),
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

  const replaceTextFunction = () => {
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

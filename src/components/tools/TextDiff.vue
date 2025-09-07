<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 原始文本 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">原始文本</h3>
          <div class="flex space-x-2">
            <button
              @click="clearText1"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              清空
            </button>
            <button
              @click="loadSample1"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              示例1
            </button>
          </div>
        </div>
        <textarea
          v-model="text1"
          placeholder="输入第一段文本..."
          class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <div class="text-sm text-gray-600">
          字符数: {{ text1.length }} | 行数: {{ text1.split('\n').length }}
        </div>
      </div>

      <!-- 对比文本 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">对比文本</h3>
          <div class="flex space-x-2">
            <button
              @click="clearText2"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              清空
            </button>
            <button
              @click="loadSample2"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              示例2
            </button>
          </div>
        </div>
        <textarea
          v-model="text2"
          placeholder="输入第二段文本..."
          class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        ></textarea>
        <div class="text-sm text-gray-600">
          字符数: {{ text2.length }} | 行数: {{ text2.split('\n').length }}
        </div>
      </div>
    </div>

    <!-- 对比按钮 -->
    <div class="text-center">
      <button
        @click="compareTexts"
        :disabled="!text1 || !text2"
        class="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
      >
        开始对比
      </button>
    </div>

    <!-- 对比结果 -->
    <div v-if="diffResult" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">对比结果</h3>
      
      <!-- 统计信息 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-red-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-red-600">{{ diffResult.deletions }}</div>
          <div class="text-sm text-gray-600">删除行</div>
        </div>
        <div class="bg-green-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-green-600">{{ diffResult.additions }}</div>
          <div class="text-sm text-gray-600">新增行</div>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-blue-600">{{ diffResult.changes }}</div>
          <div class="text-sm text-gray-600">修改行</div>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-purple-600">{{ diffResult.similarity }}%</div>
          <div class="text-sm text-gray-600">相似度</div>
        </div>
      </div>

      <!-- 差异显示 -->
      <div class="bg-gray-900 text-white p-4 rounded-lg overflow-auto">
        <div class="font-mono text-sm whitespace-pre-wrap">{{ diffResult.display }}</div>
      </div>
    </div>

    <!-- 逐行对比 -->
    <div v-if="lineDiffResult.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">逐行对比</h3>
      <div class="space-y-2">
        <div
          v-for="(line, index) in lineDiffResult"
          :key="index"
          class="p-3 rounded-lg"
          :class="getLineClass(line.type)"
        >
          <div class="flex items-start space-x-4">
            <div class="text-sm font-mono text-gray-500 w-8 flex-shrink-0">
              {{ line.lineNumber }}
            </div>
            <div class="text-sm font-mono flex-1">
              <span v-if="line.type === 'deleted'" class="text-red-300 bg-red-900/50 px-1 rounded">
                - {{ line.content }}
              </span>
              <span v-else-if="line.type === 'added'" class="text-green-300 bg-green-900/50 px-1 rounded">
                + {{ line.content }}
              </span>
              <span v-else-if="line.type === 'modified'" class="text-yellow-300 bg-yellow-900/50 px-1 rounded">
                ~ {{ line.content }}
              </span>
              <span v-else class="text-gray-300">
                {{ line.content }}
              </span>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const text1 = ref('')
const text2 = ref('')
const diffResult = ref(null)
const lineDiffResult = ref([])

const examples = ref([
  {
    name: '代码对比',
    description: '两段相似的代码',
    text1: 'function add(a, b) {\n  return a + b;\n}',
    text2: 'function add(a, b) {\n  const result = a + b;\n  return result;\n}'
  },
  {
    name: '文档对比',
    description: '文档内容的变化',
    text1: '这是一个简单的文档。\n它包含一些基本内容。',
    text2: '这是一个更新的文档。\n它包含一些修改后的内容。\n还添加了新的段落。'
  },
  {
    name: '配置对比',
    description: '配置文件的变化',
    text1: 'server {\n  port: 3000\n  host: localhost\n}',
    text2: 'server {\n  port: 8080\n  host: 0.0.0.0\n  ssl: true\n}'
  }
])

const compareTexts = () => {
  if (!text1.value || !text2.value) return
  
  const lines1 = text1.value.split('\n')
  const lines2 = text2.value.split('\n')
  
  const diff = computeDiff(lines1, lines2)
  const lineDiff = computeLineDiff(lines1, lines2)
  
  diffResult.value = diff
  lineDiffResult.value = lineDiff
}

const computeDiff = (lines1, lines2) => {
  const maxLines = Math.max(lines1.length, lines2.length)
  let deletions = 0
  let additions = 0
  let changes = 0
  
  let display = ''
  
  for (let i = 0; i < maxLines; i++) {
    const line1 = lines1[i] || ''
    const line2 = lines2[i] || ''
    
    if (i >= lines1.length) {
      // 新增行
      display += `+ ${line2}\n`
      additions++
    } else if (i >= lines2.length) {
      // 删除行
      display += `- ${line1}\n`
      deletions++
    } else if (line1 === line2) {
      // 相同行
      display += `  ${line1}\n`
    } else {
      // 修改行
      display += `- ${line1}\n`
      display += `+ ${line2}\n`
      changes++
    }
  }
  
  const totalLines = Math.max(lines1.length, lines2.length)
  const similarLines = totalLines - deletions - additions - changes
  const similarity = totalLines > 0 ? Math.round((similarLines / totalLines) * 100) : 100
  
  return {
    deletions,
    additions,
    changes,
    similarity,
    display: display.trim()
  }
}

const computeLineDiff = (lines1, lines2) => {
  const result = []
  const maxLines = Math.max(lines1.length, lines2.length)
  
  for (let i = 0; i < maxLines; i++) {
    const line1 = lines1[i] || ''
    const line2 = lines2[i] || ''
    
    if (i >= lines1.length) {
      result.push({
        lineNumber: i + 1,
        type: 'added',
        content: line2
      })
    } else if (i >= lines2.length) {
      result.push({
        lineNumber: i + 1,
        type: 'deleted',
        content: line1
      })
    } else if (line1 === line2) {
      result.push({
        lineNumber: i + 1,
        type: 'unchanged',
        content: line1
      })
    } else {
      result.push({
        lineNumber: i + 1,
        type: 'modified',
        content: `${line1} → ${line2}`
      })
    }
  }
  
  return result
}

const getLineClass = (type) => {
  const classes = {
    deleted: 'bg-red-50 border-l-4 border-red-400',
    added: 'bg-green-50 border-l-4 border-green-400',
    modified: 'bg-yellow-50 border-l-4 border-yellow-400',
    unchanged: 'bg-gray-50'
  }
  return classes[type] || 'bg-gray-50'
}

const loadExample = (example) => {
  text1.value = example.text1
  text2.value = example.text2
  compareTexts()
}

const loadSample1 = () => {
  text1.value = '这是第一段文本。\n它包含一些内容。\n用于测试对比功能。'
}

const loadSample2 = () => {
  text2.value = '这是第二段文本。\n它包含修改后的内容。\n用于测试对比功能。\n还添加了新的行。'
}

const clearText1 = () => {
  text1.value = ''
  diffResult.value = null
  lineDiffResult.value = []
}

const clearText2 = () => {
  text2.value = ''
  diffResult.value = null
  lineDiffResult.value = []
}
</script>

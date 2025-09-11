<template>
  <div class="space-y-6">
    <!-- 代码高亮器 -->
    <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('codeHighlighter.title') }}</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('codeHighlighter.programmingLanguage') }}</label>
            <select
              v-model="selectedLanguage"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option v-for="lang in languages" :key="lang.value" :value="lang.value">
                {{ lang.label }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('codeHighlighter.theme') }}</label>
            <select
              v-model="selectedTheme"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option v-for="theme in themes" :key="theme.value" :value="theme.value">
                {{ theme.label }}
              </option>
            </select>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('codeHighlighter.options') }}</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input v-model="showLineNumbers" type="checkbox" class="mr-2" />
                {{ t('codeHighlighter.showLineNumbers') }}
              </label>
              <label class="flex items-center">
                <input v-model="wrapLines" type="checkbox" class="mr-2" />
                {{ t('codeHighlighter.wrapLines') }}
              </label>
              <label class="flex items-center">
                <input v-model="copyButton" type="checkbox" class="mr-2" />
                {{ t('codeHighlighter.showCopyButton') }}
              </label>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <button
              @click="highlightCode"
              class="flex-1 px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              {{ t('codeHighlighter.highlightCode') }}
            </button>
            <button
              @click="clearCode"
              class="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {{ t('codeHighlighter.clear') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 代码输入 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('codeHighlighter.codeInput') }}</h3>
      <textarea
        v-model="inputCode"
        :placeholder="t('codeHighlighter.enterCodeToHighlight')"
        class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      ></textarea>
    </div>

    <!-- 高亮结果 -->
    <div v-if="highlightedCode" class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">{{ t('codeHighlighter.highlightResult') }}</h3>
        <button
          @click="copyCode"
          class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          {{ t('codeHighlighter.copyCode') }}
        </button>
      </div>
      
      <div class="bg-gray-900 text-white p-4 rounded-lg overflow-auto">
        <pre :class="getThemeClass()"><code v-html="highlightedCode"></code></pre>
      </div>
    </div>

    <!-- 示例代码 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('codeHighlighter.exampleCode') }}</h3>
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

    <!-- 统计信息 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-indigo-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-indigo-600">{{ inputCode.length }}</div>
        <div class="text-sm text-gray-600">代码字符</div>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-purple-600">{{ lineCount }}</div>
        <div class="text-sm text-gray-600">代码行数</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ selectedLanguage.toUpperCase() }}</div>
        <div class="text-sm text-gray-600">语言</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-orange-600">{{ selectedTheme }}</div>
        <div class="text-sm text-gray-600">主题</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const inputCode = ref('')
const selectedLanguage = ref('javascript')
const selectedTheme = ref('dark')
const showLineNumbers = ref(true)
const wrapLines = ref(false)
const copyButton = ref(true)
const highlightedCode = ref('')

const languages = ref([
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'json', label: 'JSON' },
  { value: 'xml', label: 'XML' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' }
])

const themes = computed(() => [
  { value: 'dark', label: t('codeHighlighter.themes.dark') },
  { value: 'light', label: t('codeHighlighter.themes.light') },
  { value: 'monokai', label: 'Monokai' },
  { value: 'github', label: 'GitHub' },
  { value: 'vs', label: 'Visual Studio' }
])

const examples = computed(() => [
  {
    name: t('codeHighlighter.examples.javascriptFunction.name'),
    description: t('codeHighlighter.examples.javascriptFunction.description'),
    code: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(fibonacci(10));',
    language: 'javascript'
  },
  {
    name: t('codeHighlighter.examples.pythonClass.name'),
    description: t('codeHighlighter.examples.pythonClass.description'),
    code: 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f"Hello, I\'m {self.name}"',
    language: 'python'
  },
  {
    name: t('codeHighlighter.examples.htmlStructure.name'),
    description: t('codeHighlighter.examples.htmlStructure.description'),
    code: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>',
    language: 'html'
  },
  {
    name: t('codeHighlighter.examples.cssStyle.name'),
    description: t('codeHighlighter.examples.cssStyle.description'),
    code: '.container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    height: 100vh;\n}',
    language: 'css'
  }
])

const lineCount = computed(() => {
  return inputCode.value.split('\n').length
})

const getThemeClass = () => {
  const classes = {
    dark: 'bg-gray-900 text-gray-100',
    light: 'bg-white text-gray-900',
    monokai: 'bg-gray-900 text-gray-100',
    github: 'bg-white text-gray-900',
    vs: 'bg-white text-gray-900'
  }
  return classes[selectedTheme.value] || classes.dark
}

const highlightCode = () => {
  if (!inputCode.value) return
  
  // 简单的语法高亮实现
  let highlighted = inputCode.value
  
  // 根据语言进行高亮
  if (selectedLanguage.value === 'javascript') {
    highlighted = highlightJavaScript(highlighted)
  } else if (selectedLanguage.value === 'python') {
    highlighted = highlightPython(highlighted)
  } else if (selectedLanguage.value === 'html') {
    highlighted = highlightHTML(highlighted)
  } else if (selectedLanguage.value === 'css') {
    highlighted = highlightCSS(highlighted)
  } else {
    highlighted = highlightGeneric(highlighted)
  }
  
  // 添加行号
  if (showLineNumbers.value) {
    const lines = highlighted.split('\n')
    highlighted = lines.map((line, index) => 
      `<span class="line-number">${(index + 1).toString().padStart(3, ' ')}</span> ${line}`
    ).join('\n')
  }
  
  highlightedCode.value = highlighted
}

const highlightJavaScript = (code) => {
  return code
    .replace(/\b(function|const|let|var|if|else|for|while|return|class|import|export)\b/g, '<span class="keyword">$1</span>')
    .replace(/\b(true|false|null|undefined)\b/g, '<span class="literal">$1</span>')
    .replace(/\b\d+\b/g, '<span class="number">$1</span>')
    .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
    .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
    .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
}

const highlightPython = (code) => {
  return code
    .replace(/\b(def|class|if|else|elif|for|while|return|import|from|as|try|except|finally|with|lambda)\b/g, '<span class="keyword">$1</span>')
    .replace(/\b(True|False|None)\b/g, '<span class="literal">$1</span>')
    .replace(/\b\d+\b/g, '<span class="number">$1</span>')
    .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
    .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
    .replace(/(#.*$)/gm, '<span class="comment">$1</span>')
}

const highlightHTML = (code) => {
  return code
    .replace(/&lt;(\w+)/g, '<span class="tag">&lt;$1</span>')
    .replace(/(\w+)&gt;/g, '<span class="tag">$1&gt;</span>')
    .replace(/&lt;\/\w+&gt;/g, '<span class="tag">$&</span>')
    .replace(/(\w+)=/g, '<span class="attribute">$1</span>=')
    .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
}

const highlightCSS = (code) => {
  return code
    .replace(/([.#]?\w+)\s*{/g, '<span class="selector">$1</span> {')
    .replace(/(\w+):/g, '<span class="property">$1</span>:')
    .replace(/(\d+px|\d+%|\d+em|\d+rem)/g, '<span class="value">$1</span>')
    .replace(/(#[0-9a-fA-F]{3,6})/g, '<span class="value">$1</span>')
    .replace(/(rgb\([^)]+\))/g, '<span class="value">$1</span>')
}

const highlightGeneric = (code) => {
  return code
    .replace(/\b\d+\b/g, '<span class="number">$1</span>')
    .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
    .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
}

const loadExample = (example) => {
  inputCode.value = example.code
  selectedLanguage.value = example.language
  highlightCode()
}

const clearCode = () => {
  inputCode.value = ''
  highlightedCode.value = ''
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(inputCode.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

<style scoped>
.keyword { color: #569cd6; font-weight: bold; }
.literal { color: #569cd6; }
.number { color: #b5cea8; }
.string { color: #ce9178; }
.comment { color: #6a9955; font-style: italic; }
.tag { color: #569cd6; }
.attribute { color: #92c5f8; }
.selector { color: #d7ba7d; }
.property { color: #9cdcfe; }
.value { color: #ce9178; }
.line-number { color: #6a9955; margin-right: 1rem; }
</style>

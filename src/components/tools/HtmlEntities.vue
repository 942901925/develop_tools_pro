<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 编码区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">HTML 实体编码</h3>
          <div class="flex space-x-2">
            <button
              @click="encodeHtml"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              编码
            </button>
            <button
              @click="clearInput"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              清空
            </button>
          </div>
        </div>
        <textarea
          v-model="inputText"
          placeholder="请输入要编码的HTML文本..."
          class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <div class="text-sm text-gray-600">
          字符数: {{ inputText.length }} | 行数: {{ inputText.split('\n').length }}
        </div>
      </div>

      <!-- 编码结果 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">编码结果</h3>
          <button
            @click="copyEncoded"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            复制结果
          </button>
        </div>
        <textarea
          v-model="encodedText"
          readonly
          class="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg font-mono text-sm"
        ></textarea>
        <div class="text-sm text-gray-600">
          编码后字符数: {{ encodedText.length }} | 编码比: {{ encodingRatio }}%
        </div>
      </div>
    </div>

    <!-- 解码区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 解码输入 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">HTML 实体解码</h3>
          <div class="flex space-x-2">
            <button
              @click="decodeHtml"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              解码
            </button>
            <button
              @click="clearDecodeInput"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              清空
            </button>
          </div>
        </div>
        <textarea
          v-model="decodeInput"
          placeholder="请输入要解码的HTML实体..."
          class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        ></textarea>
        <div v-if="decodeError" class="text-red-600 text-sm">{{ decodeError }}</div>
      </div>

      <!-- 解码结果 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">解码结果</h3>
          <button
            @click="copyDecoded"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            复制结果
          </button>
        </div>
        <textarea
          v-model="decodedText"
          readonly
          class="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg font-mono text-sm"
        ></textarea>
        <div class="text-sm text-gray-600">
          解码后字符数: {{ decodedText.length }}
        </div>
      </div>
    </div>

    <!-- 常用HTML实体 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">常用HTML实体</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="entity in commonEntities"
          :key="entity.entity"
          class="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="insertEntity(entity)"
        >
          <div class="flex justify-between items-center">
            <div>
              <div class="font-mono text-sm">{{ entity.entity }}</div>
              <div class="text-xs text-gray-600">{{ entity.description }}</div>
            </div>
            <div class="text-lg">{{ entity.character }}</div>
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
          <div class="text-xs text-gray-500 mt-2 font-mono">{{ example.text.substring(0, 50) }}...</div>
        </div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-blue-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-blue-600">{{ inputText.length }}</div>
        <div class="text-sm text-gray-600">原始字符</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ encodedText.length }}</div>
        <div class="text-sm text-gray-600">编码字符</div>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-purple-600">{{ entityCount }}</div>
        <div class="text-sm text-gray-600">实体数量</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-orange-600">{{ encodingRatio }}%</div>
        <div class="text-sm text-gray-600">编码比</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputText = ref('')
const encodedText = ref('')
const decodeInput = ref('')
const decodedText = ref('')
const decodeError = ref('')

const commonEntities = ref([
  { entity: '&lt;', character: '<', description: '小于号' },
  { entity: '&gt;', character: '>', description: '大于号' },
  { entity: '&amp;', character: '&', description: '和号' },
  { entity: '&quot;', character: '"', description: '双引号' },
  { entity: '&#39;', character: "'", description: '单引号' },
  { entity: '&nbsp;', character: ' ', description: '不间断空格' },
  { entity: '&copy;', character: '©', description: '版权符号' },
  { entity: '&reg;', character: '®', description: '注册商标' },
  { entity: '&trade;', character: '™', description: '商标符号' },
  { entity: '&euro;', character: '€', description: '欧元符号' },
  { entity: '&pound;', character: '£', description: '英镑符号' },
  { entity: '&yen;', character: '¥', description: '日元符号' },
  { entity: '&sect;', character: '§', description: '节符号' },
  { entity: '&para;', character: '¶', description: '段落符号' },
  { entity: '&middot;', character: '·', description: '中点' },
  { entity: '&hellip;', character: '…', description: '省略号' },
  { entity: '&ndash;', character: '–', description: '短横线' },
  { entity: '&mdash;', character: '—', description: '长横线' },
  { entity: '&lsquo;', character: ''', description: '左单引号' },
  { entity: '&rsquo;', character: ''', description: '右单引号' },
  { entity: '&ldquo;', character: '"', description: '左双引号' },
  { entity: '&rdquo;', character: '"', description: '右双引号' }
])

const examples = ref([
  {
    name: 'HTML标签',
    description: '包含HTML标签的文本',
    text: '<div class="container"><h1>标题</h1><p>这是一个段落 & 包含特殊字符</p></div>'
  },
  {
    name: '数学公式',
    description: '包含数学符号的文本',
    text: 'x < y & z > 0, 当 x ≠ 0 时，x² + y² = z²'
  },
  {
    name: '版权信息',
    description: '包含版权和商标符号',
    text: '© 2024 公司名称™ 版权所有，保留所有权利。'
  },
  {
    name: '引号文本',
    description: '包含各种引号的文本',
    text: '他说："这是一个'测试'文本，包含'单引号'和"双引号"。'
  }
])

const encodingRatio = computed(() => {
  if (inputText.value.length === 0) return 0
  return Math.round((encodedText.value.length / inputText.value.length) * 100)
})

const entityCount = computed(() => {
  return (encodedText.value.match(/&[a-zA-Z0-9#]+;/g) || []).length
})

const encodeHtml = () => {
  let encoded = inputText.value
  
  // 编码特殊字符
  encoded = encoded.replace(/&/g, '&amp;')
  encoded = encoded.replace(/</g, '&lt;')
  encoded = encoded.replace(/>/g, '&gt;')
  encoded = encoded.replace(/"/g, '&quot;')
  encoded = encoded.replace(/'/g, '&#39;')
  
  // 编码其他特殊字符
  encoded = encoded.replace(/©/g, '&copy;')
  encoded = encoded.replace(/®/g, '&reg;')
  encoded = encoded.replace(/™/g, '&trade;')
  encoded = encoded.replace(/€/g, '&euro;')
  encoded = encoded.replace(/£/g, '&pound;')
  encoded = encoded.replace(/¥/g, '&yen;')
  encoded = encoded.replace(/§/g, '&sect;')
  encoded = encoded.replace(/¶/g, '&para;')
  encoded = encoded.replace(/·/g, '&middot;')
  encoded = encoded.replace(/…/g, '&hellip;')
  encoded = encoded.replace(/–/g, '&ndash;')
  encoded = encoded.replace(/—/g, '&mdash;')
  encoded = encoded.replace(/'/g, '&lsquo;')
  encoded = encoded.replace(/'/g, '&rsquo;')
  encoded = encoded.replace(/"/g, '&ldquo;')
  encoded = encoded.replace(/"/g, '&rdquo;')
  
  encodedText.value = encoded
}

const decodeHtml = () => {
  try {
    let decoded = decodeInput.value
    
    // 解码HTML实体
    const entityMap = {
      '&lt;': '<',
      '&gt;': '>',
      '&amp;': '&',
      '&quot;': '"',
      '&#39;': "'",
      '&nbsp;': ' ',
      '&copy;': '©',
      '&reg;': '®',
      '&trade;': '™',
      '&euro;': '€',
      '&pound;': '£',
      '&yen;': '¥',
      '&sect;': '§',
      '&para;': '¶',
      '&middot;': '·',
      '&hellip;': '…',
      '&ndash;': '–',
      '&mdash;': '—',
      '&lsquo;': ''',
      '&rsquo;': ''',
      '&ldquo;': '"',
      '&rdquo;': '"'
    }
    
    // 替换命名实体
    for (const [entity, char] of Object.entries(entityMap)) {
      decoded = decoded.replace(new RegExp(entity, 'g'), char)
    }
    
    // 解码数字实体 &#123; 或 &#x1A;
    decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(parseInt(dec, 10))
    })
    
    decoded = decoded.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16))
    })
    
    decodedText.value = decoded
    decodeError.value = ''
  } catch (e) {
    decodeError.value = '解码失败: ' + e.message
    decodedText.value = ''
  }
}

const insertEntity = (entity) => {
  inputText.value += entity.entity
}

const loadExample = (example) => {
  inputText.value = example.text
  encodeHtml()
}

const clearInput = () => {
  inputText.value = ''
  encodedText.value = ''
}

const clearDecodeInput = () => {
  decodeInput.value = ''
  decodedText.value = ''
  decodeError.value = ''
}

const copyEncoded = async () => {
  try {
    await navigator.clipboard.writeText(encodedText.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}

const copyDecoded = async () => {
  try {
    await navigator.clipboard.writeText(decodedText.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

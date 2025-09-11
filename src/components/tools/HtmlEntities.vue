<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 编码区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('htmlEntities.htmlEntityEncoding') }}</h3>
          <div class="flex space-x-2">
            <button
              @click="encodeHtml"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {{ t('htmlEntities.encode') }}
            </button>
            <button
              @click="clearInput"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {{ t('htmlEntities.clear') }}
            </button>
          </div>
        </div>
        <textarea
          v-model="inputText"
          :placeholder="t('htmlEntities.enterHtmlTextToEncode')"
          class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <div class="text-sm text-gray-600">
          {{ t('htmlEntities.charCount') }}: {{ inputText.length }} | {{ t('htmlEntities.lineCount') }}: {{ inputText.split('\n').length }}
        </div>
      </div>

      <!-- 编码结果 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('htmlEntities.encodingResult') }}</h3>
          <button
            @click="copyEncoded"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            {{ t('htmlEntities.copyResult') }}
          </button>
        </div>
        <textarea
          v-model="encodedText"
          readonly
          class="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg font-mono text-sm"
        ></textarea>
        <div class="text-sm text-gray-600">
          {{ t('htmlEntities.encodedCharCount') }}: {{ encodedText.length }} | {{ t('htmlEntities.encodingRatio') }}: {{ encodingRatio }}%
        </div>
      </div>
    </div>

    <!-- 解码区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 解码输入 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('htmlEntities.htmlEntityDecoding') }}</h3>
          <div class="flex space-x-2">
            <button
              @click="decodeHtml"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {{ t('htmlEntities.decode') }}
            </button>
            <button
              @click="clearDecodeInput"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {{ t('htmlEntities.clear') }}
            </button>
          </div>
        </div>
        <textarea
          v-model="decodeInput"
          :placeholder="t('htmlEntities.enterHtmlEntitiesToDecode')"
          class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        ></textarea>
        <div v-if="decodeError" class="text-red-600 text-sm">{{ decodeError }}</div>
      </div>

      <!-- 解码结果 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('htmlEntities.decodingResult') }}</h3>
          <button
            @click="copyDecoded"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            {{ t('htmlEntities.copyResult') }}
          </button>
        </div>
        <textarea
          v-model="decodedText"
          readonly
          class="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg font-mono text-sm"
        ></textarea>
        <div class="text-sm text-gray-600">
          {{ t('htmlEntities.decodedCharCount') }}: {{ decodedText.length }}
        </div>
      </div>
    </div>

    <!-- 常用HTML实体 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('htmlEntities.commonHtmlEntities') }}</h3>
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
      <h3 class="text-lg font-semibold text-gray-900">{{ t('htmlEntities.exampleText') }}</h3>
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
        <div class="text-sm text-gray-600">{{ t('htmlEntities.originalChars') }}</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ encodedText.length }}</div>
        <div class="text-sm text-gray-600">{{ t('htmlEntities.encodedChars') }}</div>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-purple-600">{{ entityCount }}</div>
        <div class="text-sm text-gray-600">{{ t('htmlEntities.entityCount') }}</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-orange-600">{{ encodingRatio }}%</div>
        <div class="text-sm text-gray-600">{{ t('htmlEntities.encodingRatio') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const inputText = ref('')
const encodedText = ref('')
const decodeInput = ref('')
const decodedText = ref('')
const decodeError = ref('')

const commonEntities = computed(() => [
  { entity: '&lt;', character: '<', description: t('htmlEntities.entities.lessThan') },
  { entity: '&gt;', character: '>', description: t('htmlEntities.entities.greaterThan') },
  { entity: '&amp;', character: '&', description: t('htmlEntities.entities.ampersand') },
  { entity: '&quot;', character: '"', description: t('htmlEntities.entities.doubleQuote') },
  { entity: '&#39;', character: "'", description: t('htmlEntities.entities.singleQuote') },
  { entity: '&nbsp;', character: ' ', description: t('htmlEntities.entities.nonBreakingSpace') },
  { entity: '&copy;', character: '©', description: t('htmlEntities.entities.copyright') },
  { entity: '&reg;', character: '®', description: t('htmlEntities.entities.registered') },
  { entity: '&trade;', character: '™', description: t('htmlEntities.entities.trademark') },
  { entity: '&euro;', character: '€', description: t('htmlEntities.entities.euro') },
  { entity: '&pound;', character: '£', description: t('htmlEntities.entities.pound') },
  { entity: '&yen;', character: '¥', description: t('htmlEntities.entities.yen') },
  { entity: '&sect;', character: '§', description: t('htmlEntities.entities.section') },
  { entity: '&para;', character: '¶', description: t('htmlEntities.entities.paragraph') },
  { entity: '&middot;', character: '·', description: t('htmlEntities.entities.middleDot') },
  { entity: '&hellip;', character: '…', description: t('htmlEntities.entities.ellipsis') },
  { entity: '&ndash;', character: '–', description: t('htmlEntities.entities.enDash') },
  { entity: '&mdash;', character: '—', description: t('htmlEntities.entities.emDash') },
  { entity: '&lsquo;', character: '\u2018', description: t('htmlEntities.entities.leftSingleQuote') },
  { entity: '&rsquo;', character: '\u2019', description: t('htmlEntities.entities.rightSingleQuote') },
  { entity: '&ldquo;', character: '\u201C', description: t('htmlEntities.entities.leftDoubleQuote') },
  { entity: '&rdquo;', character: '\u201D', description: t('htmlEntities.entities.rightDoubleQuote') }
])

const examples = computed(() => [
  {
    name: t('htmlEntities.examples.htmlTags.name'),
    description: t('htmlEntities.examples.htmlTags.description'),
    text: '<div class="container"><h1>标题</h1><p>这是一个段落 & 包含特殊字符</p></div>'
  },
  {
    name: t('htmlEntities.examples.mathFormula.name'),
    description: t('htmlEntities.examples.mathFormula.description'),
    text: 'x < y & z > 0, 当 x ≠ 0 时，x² + y² = z²'
  },
  {
    name: t('htmlEntities.examples.copyrightInfo.name'),
    description: t('htmlEntities.examples.copyrightInfo.description'),
    text: '© 2024 公司名称™ 版权所有，保留所有权利。'
  },
  {
    name: t('htmlEntities.examples.quotedText.name'),
    description: t('htmlEntities.examples.quotedText.description'),
    text: '他说："这是一个测试文本，包含单引号和双引号。"'
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
      '&lsquo;': '\u2018',
      '&rsquo;': '\u2019',
      '&ldquo;': '\u201C',
      '&rdquo;': '\u201D'
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

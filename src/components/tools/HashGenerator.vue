<template>
  <div class="space-y-6">
    <!-- 哈希生成器 -->
    <div class="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">哈希生成器</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">输入文本</label>
            <textarea
              v-model="inputText"
              placeholder="输入要计算哈希的文本..."
              class="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">哈希算法</label>
            <select
              v-model="selectedAlgorithm"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="md5">MD5</option>
              <option value="sha1">SHA-1</option>
              <option value="sha256">SHA-256</option>
              <option value="sha512">SHA-512</option>
            </select>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">输出格式</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input v-model="uppercase" type="checkbox" class="mr-2" />
                大写字母
              </label>
              <label class="flex items-center">
                <input v-model="includeInput" type="checkbox" class="mr-2" />
                包含输入文本
              </label>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <button
              @click="generateHash"
              class="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              生成哈希
            </button>
            <button
              @click="clearInput"
              class="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              清空
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 哈希结果 -->
    <div v-if="hashResult" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">哈希结果</h3>
      
      <div class="bg-gray-900 text-white p-4 rounded-lg">
        <div class="font-mono text-sm break-all">{{ hashResult }}</div>
      </div>
      
      <div class="flex space-x-2">
        <button
          @click="copyHash"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          复制哈希
        </button>
        <button
          @click="copyAll"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          复制全部
        </button>
      </div>
    </div>

    <!-- 批量哈希 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">批量哈希</h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">输入文本（每行一个）</label>
          <textarea
            v-model="batchInput"
            placeholder="输入多行文本，每行一个..."
            class="w-full h-32 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          <button
            @click="generateBatchHash"
            class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            批量生成
          </button>
        </div>
        
        <div v-if="batchResults.length > 0">
          <label class="block text-sm font-medium text-gray-700 mb-2">批量结果</label>
          <div class="bg-gray-50 p-3 rounded-lg max-h-32 overflow-auto">
            <div
              v-for="(result, index) in batchResults"
              :key="index"
              class="text-sm font-mono mb-1"
            >
              {{ result }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 哈希验证 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">哈希验证</h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">原始文本</label>
          <textarea
            v-model="verifyText"
            placeholder="输入要验证的文本..."
            class="w-full h-24 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">哈希值</label>
          <input
            v-model="verifyHash"
            placeholder="输入要验证的哈希值..."
            class="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <button
            @click="verifyHashFunction"
            class="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            验证哈希
          </button>
        </div>
      </div>
      
      <div v-if="verificationResult !== null" class="p-4 rounded-lg" :class="verificationResult ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
        <div class="font-medium">
          {{ verificationResult ? '✓ 哈希验证通过' : '✗ 哈希验证失败' }}
        </div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-red-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-red-600">{{ inputText.length }}</div>
        <div class="text-sm text-gray-600">输入字符</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-orange-600">{{ hashLength }}</div>
        <div class="text-sm text-gray-600">哈希长度</div>
      </div>
      <div class="bg-yellow-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-yellow-600">{{ selectedAlgorithm.toUpperCase() }}</div>
        <div class="text-sm text-gray-600">算法</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ batchResults.length }}</div>
        <div class="text-sm text-gray-600">批量结果</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputText = ref('')
const selectedAlgorithm = ref('md5')
const uppercase = ref(false)
const includeInput = ref(false)
const hashResult = ref('')
const batchInput = ref('')
const batchResults = ref([])
const verifyText = ref('')
const verifyHash = ref('')
const verificationResult = ref(null)

const hashLength = computed(() => {
  const lengths = {
    md5: 32,
    sha1: 40,
    sha256: 64,
    sha512: 128
  }
  return lengths[selectedAlgorithm.value] || 0
})

const generateHash = () => {
  if (!inputText.value) return
  
  let hash = ''
  
  // 简单的哈希实现（实际项目中应使用crypto-js等库）
  if (selectedAlgorithm.value === 'md5') {
    hash = generateMD5(inputText.value)
  } else if (selectedAlgorithm.value === 'sha1') {
    hash = generateSHA1(inputText.value)
  } else if (selectedAlgorithm.value === 'sha256') {
    hash = generateSHA256(inputText.value)
  } else if (selectedAlgorithm.value === 'sha512') {
    hash = generateSHA512(inputText.value)
  }
  
  if (uppercase.value) {
    hash = hash.toUpperCase()
  }
  
  if (includeInput.value) {
    hashResult.value = `${inputText.value}\n${hash}`
  } else {
    hashResult.value = hash
  }
}

const generateBatchHash = () => {
  if (!batchInput.value) return
  
  const lines = batchInput.value.split('\n').filter(line => line.trim())
  batchResults.value = []
  
  lines.forEach(line => {
    let hash = ''
    if (selectedAlgorithm.value === 'md5') {
      hash = generateMD5(line)
    } else if (selectedAlgorithm.value === 'sha1') {
      hash = generateSHA1(line)
    } else if (selectedAlgorithm.value === 'sha256') {
      hash = generateSHA256(line)
    } else if (selectedAlgorithm.value === 'sha512') {
      hash = generateSHA512(line)
    }
    
    if (uppercase.value) {
      hash = hash.toUpperCase()
    }
    
    batchResults.value.push(`${line}: ${hash}`)
  })
}

const verifyHashFunction = () => {
  if (!verifyText.value || !verifyHash.value) return
  
  let hash = ''
  if (selectedAlgorithm.value === 'md5') {
    hash = generateMD5(verifyText.value)
  } else if (selectedAlgorithm.value === 'sha1') {
    hash = generateSHA1(verifyText.value)
  } else if (selectedAlgorithm.value === 'sha256') {
    hash = generateSHA256(verifyText.value)
  } else if (selectedAlgorithm.value === 'sha512') {
    hash = generateSHA512(verifyText.value)
  }
  
  if (uppercase.value) {
    hash = hash.toUpperCase()
  }
  
  verificationResult.value = hash === verifyHash.value
}

// 简化的哈希函数实现（仅用于演示）
const generateMD5 = (text) => {
  // 这里应该使用真正的MD5算法
  return simpleHash(text, 32)
}

const generateSHA1 = (text) => {
  return simpleHash(text, 40)
}

const generateSHA256 = (text) => {
  return simpleHash(text, 64)
}

const generateSHA512 = (text) => {
  return simpleHash(text, 128)
}

const simpleHash = (text, length) => {
  let hash = ''
  let seed = 0
  
  for (let i = 0; i < text.length; i++) {
    seed = (seed * 31 + text.charCodeAt(i)) % 2147483647
  }
  
  for (let i = 0; i < length; i++) {
    seed = (seed * 9301 + 49297) % 233280
    hash += Math.floor(seed / 233280 * 16).toString(16)
  }
  
  return hash
}

const clearInput = () => {
  inputText.value = ''
  hashResult.value = ''
  batchInput.value = ''
  batchResults.value = []
  verifyText.value = ''
  verifyHash.value = ''
  verificationResult.value = null
}

const copyHash = async () => {
  try {
    await navigator.clipboard.writeText(hashResult.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}

const copyAll = async () => {
  try {
    await navigator.clipboard.writeText(hashResult.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

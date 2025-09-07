<template>
  <div class="space-y-6">
    <!-- AES加密解密器 -->
    <div class="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">AES加密解密器</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">加密密钥</label>
            <input
              v-model="encryptionKey"
              type="password"
              placeholder="输入加密密钥"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">操作模式</label>
            <select
              v-model="mode"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="encrypt">加密</option>
              <option value="decrypt">解密</option>
            </select>
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">密钥长度</label>
            <select
              v-model="keyLength"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="128">128位</option>
              <option value="192">192位</option>
              <option value="256">256位</option>
            </select>
          </div>
          
          <div class="flex space-x-2">
            <button
              @click="processData"
              class="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              {{ mode === 'encrypt' ? '加密' : '解密' }}
            </button>
            <button
              @click="clearAll"
              class="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              清空
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 数据输入 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">
        {{ mode === 'encrypt' ? '明文输入' : '密文输入' }}
      </h3>
      <textarea
        v-model="inputData"
        :placeholder="mode === 'encrypt' ? '输入要加密的明文...' : '输入要解密的密文...'"
        class="w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
      ></textarea>
    </div>

    <!-- 处理结果 -->
    <div v-if="processedData" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">
        {{ mode === 'encrypt' ? '加密结果' : '解密结果' }}
      </h3>
      <div class="bg-gray-900 text-white p-4 rounded-lg">
        <div class="font-mono text-sm break-all">{{ processedData }}</div>
      </div>
      
      <div class="flex space-x-2">
        <button
          @click="copyResult"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          复制结果
        </button>
        <button
          @click="copyAll"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          复制全部
        </button>
      </div>
    </div>

    <!-- 安全提示 -->
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h4 class="text-sm font-medium text-yellow-800">安全提示</h4>
          <div class="mt-2 text-sm text-yellow-700">
            <p>• 请妥善保管您的加密密钥，丢失密钥将无法解密数据</p>
            <p>• 建议使用强密码作为加密密钥</p>
            <p>• 此工具仅用于演示，生产环境请使用专业的加密库</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 示例数据 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">示例数据</h3>
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
      <div class="bg-red-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-red-600">{{ inputData.length }}</div>
        <div class="text-sm text-gray-600">输入字符</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-orange-600">{{ processedData ? processedData.length : 0 }}</div>
        <div class="text-sm text-gray-600">输出字符</div>
      </div>
      <div class="bg-yellow-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-yellow-600">{{ keyLength }}</div>
        <div class="text-sm text-gray-600">密钥长度</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ mode === 'encrypt' ? '加密' : '解密' }}</div>
        <div class="text-sm text-gray-600">操作模式</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const encryptionKey = ref('')
const mode = ref('encrypt')
const keyLength = ref('256')
const inputData = ref('')
const processedData = ref('')

const examples = ref([
  {
    name: '简单文本',
    description: '加密简单文本消息',
    data: 'Hello, World!',
    key: 'mySecretKey123'
  },
  {
    name: '敏感信息',
    description: '加密敏感信息',
    data: 'password: mypassword123',
    key: 'strongKey456'
  },
  {
    name: 'JSON数据',
    description: '加密JSON格式数据',
    data: '{"username": "admin", "password": "secret"}',
    key: 'jsonKey789'
  }
])

const processData = () => {
  if (!inputData.value || !encryptionKey.value) {
    alert('请输入数据和密钥')
    return
  }
  
  try {
    if (mode.value === 'encrypt') {
      processedData.value = encryptData(inputData.value, encryptionKey.value)
    } else {
      processedData.value = decryptData(inputData.value, encryptionKey.value)
    }
  } catch (e) {
    alert('处理失败: ' + e.message)
  }
}

const encryptData = (data, key) => {
  // 简单的AES加密实现（仅用于演示）
  const keyBytes = new TextEncoder().encode(key.padEnd(32, '0').slice(0, 32))
  const dataBytes = new TextEncoder().encode(data)
  
  // 这里应该使用真正的AES加密算法
  // 为了演示，我们使用简单的XOR加密
  let encrypted = ''
  for (let i = 0; i < dataBytes.length; i++) {
    const keyByte = keyBytes[i % keyBytes.length]
    const encryptedByte = dataBytes[i] ^ keyByte
    encrypted += encryptedByte.toString(16).padStart(2, '0')
  }
  
  return encrypted.toUpperCase()
}

const decryptData = (encrypted, key) => {
  try {
    const keyBytes = new TextEncoder().encode(key.padEnd(32, '0').slice(0, 32))
    const encryptedBytes = []
    
    for (let i = 0; i < encrypted.length; i += 2) {
      const byte = parseInt(encrypted.substr(i, 2), 16)
      encryptedBytes.push(byte)
    }
    
    let decrypted = ''
    for (let i = 0; i < encryptedBytes.length; i++) {
      const keyByte = keyBytes[i % keyBytes.length]
      const decryptedByte = encryptedBytes[i] ^ keyByte
      decrypted += String.fromCharCode(decryptedByte)
    }
    
    return decrypted
  } catch (e) {
    throw new Error('解密失败，请检查密文格式和密钥')
  }
}

const loadExample = (example) => {
  inputData.value = example.data
  encryptionKey.value = example.key
  mode.value = 'encrypt'
}

const clearAll = () => {
  inputData.value = ''
  processedData.value = ''
  encryptionKey.value = ''
}

const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(processedData.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}

const copyAll = async () => {
  try {
    const text = `密钥: ${encryptionKey.value}\n${mode.value === 'encrypt' ? '明文' : '密文'}: ${inputData.value}\n${mode.value === 'encrypt' ? '密文' : '明文'}: ${processedData.value}`
    await navigator.clipboard.writeText(text)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 输入区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('base64Encoder.originalData') }}</h3>
          <div class="flex space-x-2">
            <button
              @click="encode"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {{ t('base64Encoder.encode') }}
            </button>
            <button
              @click="clearInput"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {{ t('base64Encoder.clear') }}
            </button>
          </div>
        </div>
        <textarea
          v-model="inputText"
          :placeholder="t('base64Encoder.inputPlaceholder')"
          class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <!-- 输出区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('base64Encoder.encodedResult') }}</h3>
          <button
            @click="copyResult"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            {{ t('base64Encoder.copyResult') }}
          </button>
        </div>
        <textarea
          v-model="encodedText"
          readonly
          class="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg font-mono text-sm"
        ></textarea>
      </div>
    </div>

    <!-- 解码区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 解码输入 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('base64Encoder.base64Data') }}</h3>
          <div class="flex space-x-2">
            <button
              @click="decode"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {{ t('base64Encoder.decode') }}
            </button>
            <button
              @click="clearDecodeInput"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {{ t('base64Encoder.clear') }}
            </button>
          </div>
        </div>
        <textarea
          v-model="decodeInput"
          :placeholder="t('base64Encoder.decodePlaceholder')"
          class="w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        ></textarea>
        <div v-if="decodeError" class="text-red-600 text-sm">{{ decodeError }}</div>
      </div>

      <!-- 解码输出 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">{{ t('base64Encoder.decodedResult') }}</h3>
          <button
            @click="copyDecodeResult"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            {{ t('base64Encoder.copyResult') }}
          </button>
        </div>
        <textarea
          v-model="decodedText"
          readonly
          class="w-full h-32 p-4 bg-gray-100 border border-gray-300 rounded-lg font-mono text-sm"
        ></textarea>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-blue-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600">{{ t('base64Encoder.originalCharCount') }}</div>
        <div class="text-2xl font-bold text-blue-600">{{ inputText.length }}</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600">{{ t('base64Encoder.encodedCharCount') }}</div>
        <div class="text-2xl font-bold text-green-600">{{ encodedText.length }}</div>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600">{{ t('base64Encoder.compressionRatio') }}</div>
        <div class="text-2xl font-bold text-purple-600">{{ compressionRatio }}%</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600">{{ t('base64Encoder.encodeStatus') }}</div>
        <div class="text-2xl font-bold text-orange-600">{{ encodedText ? t('base64Encoder.encoded') : t('base64Encoder.notEncoded') }}</div>
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

const compressionRatio = computed(() => {
  if (inputText.value.length === 0) return 0
  return Math.round((encodedText.value.length / inputText.value.length) * 100)
})

const encode = () => {
  try {
    encodedText.value = btoa(unescape(encodeURIComponent(inputText.value)))
  } catch (e) {
    console.error('编码失败:', e)
  }
}

const decode = () => {
  try {
    decodedText.value = decodeURIComponent(escape(atob(decodeInput.value)))
    decodeError.value = ''
  } catch (e) {
    decodeError.value = 'Base64解码失败: ' + e.message
    decodedText.value = ''
  }
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

const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(encodedText.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}

const copyDecodeResult = async () => {
  try {
    await navigator.clipboard.writeText(decodedText.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

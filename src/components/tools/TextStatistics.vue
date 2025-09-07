<template>
  <div class="space-y-6">
    <!-- 输入区域 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">文本输入</h3>
      <textarea
        v-model="inputText"
        placeholder="请输入要分析的文本..."
        class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
    </div>

    <!-- 统计结果 -->
    <div v-if="inputText" class="space-y-6">
      <!-- 基础统计 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-blue-600">{{ statistics.characters }}</div>
          <div class="text-sm text-gray-600">字符数</div>
        </div>
        <div class="bg-green-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-green-600">{{ statistics.words }}</div>
          <div class="text-sm text-gray-600">单词数</div>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-purple-600">{{ statistics.lines }}</div>
          <div class="text-sm text-gray-600">行数</div>
        </div>
        <div class="bg-orange-50 p-4 rounded-lg text-center">
          <div class="text-2xl font-bold text-orange-600">{{ statistics.paragraphs }}</div>
          <div class="text-sm text-gray-600">段落数</div>
        </div>
      </div>

      <!-- 详细统计 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 字符类型统计 -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-900">字符类型统计</h4>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>字母</span>
              <span class="font-mono">{{ statistics.letters }}</span>
            </div>
            <div class="flex justify-between">
              <span>数字</span>
              <span class="font-mono">{{ statistics.digits }}</span>
            </div>
            <div class="flex justify-between">
              <span>空格</span>
              <span class="font-mono">{{ statistics.spaces }}</span>
            </div>
            <div class="flex justify-between">
              <span>标点符号</span>
              <span class="font-mono">{{ statistics.punctuation }}</span>
            </div>
            <div class="flex justify-between">
              <span>特殊字符</span>
              <span class="font-mono">{{ statistics.specialChars }}</span>
            </div>
          </div>
        </div>

        <!-- 单词统计 -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-gray-900">单词统计</h4>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>平均单词长度</span>
              <span class="font-mono">{{ statistics.avgWordLength }}</span>
            </div>
            <div class="flex justify-between">
              <span>最长单词</span>
              <span class="font-mono text-sm">{{ statistics.longestWord }}</span>
            </div>
            <div class="flex justify-between">
              <span>最短单词</span>
              <span class="font-mono text-sm">{{ statistics.shortestWord }}</span>
            </div>
            <div class="flex justify-between">
              <span>唯一单词</span>
              <span class="font-mono">{{ statistics.uniqueWords }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 最常用单词 -->
      <div v-if="topWords.length > 0" class="space-y-4">
        <h4 class="text-lg font-semibold text-gray-900">最常用单词 (前10个)</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div
            v-for="(word, index) in topWords"
            :key="word.word"
            class="flex justify-between items-center p-2 bg-gray-50 rounded"
          >
            <span class="font-mono">{{ word.word }}</span>
            <span class="text-sm text-gray-600">{{ word.count }}次</span>
          </div>
        </div>
      </div>

      <!-- 文本预览 -->
      <div class="space-y-4">
        <h4 class="text-lg font-semibold text-gray-900">文本预览</h4>
        <div class="p-4 bg-gray-100 rounded-lg">
          <div class="text-sm text-gray-600 mb-2">前100个字符:</div>
          <div class="font-mono text-sm">{{ preview }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputText = ref('')

const statistics = computed(() => {
  const text = inputText.value
  if (!text) {
    return {
      characters: 0,
      words: 0,
      lines: 0,
      paragraphs: 0,
      letters: 0,
      digits: 0,
      spaces: 0,
      punctuation: 0,
      specialChars: 0,
      avgWordLength: 0,
      longestWord: '',
      shortestWord: '',
      uniqueWords: 0
    }
  }

  const characters = text.length
  const words = text.trim().split(/\s+/).filter(word => word.length > 0).length
  const lines = text.split('\n').length
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length
  
  const letters = (text.match(/[a-zA-Z]/g) || []).length
  const digits = (text.match(/[0-9]/g) || []).length
  const spaces = (text.match(/\s/g) || []).length
  const punctuation = (text.match(/[.,!?;:]/g) || []).length
  const specialChars = characters - letters - digits - spaces - punctuation

  const wordList = text.toLowerCase().match(/[a-zA-Z]+/g) || []
  const avgWordLength = wordList.length > 0 ? Math.round(wordList.reduce((sum, word) => sum + word.length, 0) / wordList.length * 10) / 10 : 0
  
  const longestWord = wordList.reduce((longest, word) => word.length > longest.length ? word : longest, '')
  const shortestWord = wordList.reduce((shortest, word) => word.length < shortest.length ? word : shortest, wordList[0] || '')
  
  const uniqueWords = new Set(wordList).size

  return {
    characters,
    words,
    lines,
    paragraphs,
    letters,
    digits,
    spaces,
    punctuation,
    specialChars,
    avgWordLength,
    longestWord,
    shortestWord,
    uniqueWords
  }
})

const topWords = computed(() => {
  const text = inputText.value
  if (!text) return []

  const words = text.toLowerCase().match(/[a-zA-Z]+/g) || []
  const wordCount = {}
  
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1
  })

  return Object.entries(wordCount)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})

const preview = computed(() => {
  return inputText.value.substring(0, 100) + (inputText.value.length > 100 ? '...' : '')
})
</script>

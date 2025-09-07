<template>
  <div class="space-y-6">
    <!-- 倒计时设置 -->
    <div class="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">倒计时设置</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">目标时间</label>
            <input
              v-model="targetDateTime"
              type="datetime-local"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">倒计时标题</label>
            <input
              v-model="timerTitle"
              placeholder="输入倒计时标题"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">快速设置</label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="preset in timePresets"
                :key="preset.name"
                @click="setPresetTime(preset)"
                class="p-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {{ preset.name }}
              </button>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <button
              @click="startTimer"
              :disabled="!targetDateTime || isRunning"
              class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {{ isRunning ? '运行中...' : '开始倒计时' }}
            </button>
            <button
              @click="stopTimer"
              :disabled="!isRunning"
              class="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              停止
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 倒计时显示 -->
    <div v-if="isRunning || timeRemaining" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ timerTitle || '倒计时' }}</h3>
      
      <div class="bg-gray-900 text-white p-8 rounded-lg text-center">
        <div v-if="timeRemaining > 0" class="space-y-4">
          <div class="text-6xl font-bold font-mono">{{ formatTime(timeRemaining) }}</div>
          <div class="text-lg text-gray-300">{{ formatDateTime(targetDateTime) }}</div>
        </div>
        <div v-else class="space-y-4">
          <div class="text-6xl font-bold text-red-400">时间到！</div>
          <div class="text-lg text-gray-300">倒计时已结束</div>
        </div>
      </div>
      
      <!-- 进度条 -->
      <div class="space-y-2">
        <div class="flex justify-between text-sm text-gray-600">
          <span>开始时间: {{ formatDateTime(startTime) }}</span>
          <span>剩余时间: {{ Math.max(0, Math.ceil(timeRemaining / 1000)) }}秒</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-red-500 h-2 rounded-full transition-all duration-1000"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- 预设倒计时 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">预设倒计时</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="preset in countdownPresets"
          :key="preset.name"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="setPresetCountdown(preset)"
        >
          <div class="font-medium text-gray-900">{{ preset.name }}</div>
          <div class="text-sm text-gray-600">{{ preset.description }}</div>
          <div class="text-xs text-gray-500 mt-1">{{ preset.duration }}</div>
        </div>
      </div>
    </div>

    <!-- 历史记录 -->
    <div v-if="history.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">历史记录</h3>
      <div class="space-y-2">
        <div
          v-for="(record, index) in history"
          :key="index"
          class="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
        >
          <div>
            <div class="font-medium">{{ record.title }}</div>
            <div class="text-sm text-gray-600">{{ record.duration }}</div>
          </div>
          <div class="text-sm text-gray-500">{{ record.date }}</div>
        </div>
      </div>
      <button
        @click="clearHistory"
        class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        清空历史
      </button>
    </div>

    <!-- 统计信息 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-red-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-red-600">{{ totalTimers }}</div>
        <div class="text-sm text-gray-600">总倒计时</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-orange-600">{{ completedTimers }}</div>
        <div class="text-sm text-gray-600">已完成</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ totalTime }}</div>
        <div class="text-sm text-gray-600">总时长(小时)</div>
      </div>
      <div class="bg-blue-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-blue-600">{{ isRunning ? '运行中' : '已停止' }}</div>
        <div class="text-sm text-gray-600">当前状态</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const targetDateTime = ref('')
const timerTitle = ref('')
const isRunning = ref(false)
const timeRemaining = ref(0)
const startTime = ref('')
const history = ref([])

const timePresets = ref([
  { name: '5分钟', minutes: 5 },
  { name: '10分钟', minutes: 10 },
  { name: '30分钟', minutes: 30 },
  { name: '1小时', minutes: 60 },
  { name: '2小时', minutes: 120 },
  { name: '1天', minutes: 1440 }
])

const countdownPresets = ref([
  { name: '工作休息', description: '25分钟专注工作', duration: '25分钟', minutes: 25 },
  { name: '短休息', description: '5分钟短暂休息', duration: '5分钟', minutes: 5 },
  { name: '长休息', description: '15分钟长休息', duration: '15分钟', minutes: 15 },
  { name: '运动时间', description: '30分钟运动', duration: '30分钟', minutes: 30 },
  { name: '学习时间', description: '45分钟学习', duration: '45分钟', minutes: 45 },
  { name: '会议时间', description: '1小时会议', duration: '1小时', minutes: 60 }
])

let timer = null

const progressPercentage = computed(() => {
  if (!startTime.value || !targetDateTime.value) return 0
  const total = new Date(targetDateTime.value).getTime() - new Date(startTime.value).getTime()
  const remaining = timeRemaining.value
  return Math.max(0, Math.min(100, ((total - remaining) / total) * 100))
})

const totalTimers = computed(() => history.value.length)
const completedTimers = computed(() => history.value.filter(r => r.completed).length)
const totalTime = computed(() => {
  return Math.round(history.value.reduce((sum, r) => sum + r.durationMinutes, 0) / 60 * 10) / 10
})

const startTimer = () => {
  if (!targetDateTime.value) {
    alert('请选择目标时间')
    return
  }
  
  const target = new Date(targetDateTime.value)
  const now = new Date()
  
  if (target <= now) {
    alert('目标时间必须大于当前时间')
    return
  }
  
  startTime.value = now.toISOString().slice(0, 16)
  isRunning.value = true
  timeRemaining.value = target.getTime() - now.getTime()
  
  timer = setInterval(() => {
    const now = new Date()
    const target = new Date(targetDateTime.value)
    timeRemaining.value = target.getTime() - now.getTime()
    
    if (timeRemaining.value <= 0) {
      stopTimer()
      addToHistory(true)
    }
  }, 1000)
}

const stopTimer = () => {
  isRunning.value = false
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  
  if (timeRemaining.value > 0) {
    addToHistory(false)
  }
}

const setPresetTime = (preset) => {
  const now = new Date()
  const target = new Date(now.getTime() + preset.minutes * 60 * 1000)
  targetDateTime.value = target.toISOString().slice(0, 16)
}

const setPresetCountdown = (preset) => {
  timerTitle.value = preset.name
  setPresetTime(preset)
}

const formatTime = (milliseconds) => {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000))
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  
  if (days > 0) {
    return `${days}天 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  } else {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
}

const formatDateTime = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const addToHistory = (completed) => {
  const duration = Math.ceil((new Date(targetDateTime.value).getTime() - new Date(startTime.value).getTime()) / 60000)
  history.value.unshift({
    title: timerTitle.value || '倒计时',
    duration: `${duration}分钟`,
    durationMinutes: duration,
    completed,
    date: new Date().toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  })
  
  // 只保留最近20条记录
  if (history.value.length > 20) {
    history.value = history.value.slice(0, 20)
  }
}

const clearHistory = () => {
  history.value = []
}

onMounted(() => {
  // 从localStorage加载历史记录
  const savedHistory = localStorage.getItem('countdownHistory')
  if (savedHistory) {
    try {
      history.value = JSON.parse(savedHistory)
    } catch (e) {
      console.error('Failed to load history:', e)
    }
  }
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
  
  // 保存历史记录到localStorage
  localStorage.setItem('countdownHistory', JSON.stringify(history.value))
})
</script>

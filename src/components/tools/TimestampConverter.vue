<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 时间戳转日期 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">时间戳转日期</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">时间戳</label>
            <input
              v-model="timestampInput"
              type="number"
              placeholder="输入Unix时间戳（秒）"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            @click="convertTimestamp"
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            转换
          </button>
          <div v-if="timestampResult" class="p-4 bg-gray-100 rounded-lg">
            <div class="space-y-2">
              <div><strong>本地时间:</strong> {{ timestampResult.local }}</div>
              <div><strong>UTC时间:</strong> {{ timestampResult.utc }}</div>
              <div><strong>ISO格式:</strong> {{ timestampResult.iso }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 日期转时间戳 -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">日期转时间戳</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">日期时间</label>
            <input
              v-model="dateInput"
              type="datetime-local"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            @click="convertDate"
            class="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            转换
          </button>
          <div v-if="dateResult" class="p-4 bg-gray-100 rounded-lg">
            <div class="space-y-2">
              <div><strong>Unix时间戳:</strong> {{ dateResult.timestamp }}</div>
              <div><strong>毫秒时间戳:</strong> {{ dateResult.timestampMs }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 当前时间 -->
    <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">当前时间</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-sm text-gray-600">当前时间戳</div>
          <div class="text-2xl font-bold text-purple-600">{{ currentTimestamp }}</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600">当前日期</div>
          <div class="text-lg font-semibold text-blue-600">{{ currentDate }}</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600">时区</div>
          <div class="text-lg font-semibold text-green-600">{{ timezone }}</div>
        </div>
      </div>
      <button
        @click="refreshCurrentTime"
        class="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
      >
        刷新时间
      </button>
    </div>

    <!-- 常用时间戳 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">常用时间戳</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="common in commonTimestamps"
          :key="common.name"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="setTimestamp(common.timestamp)"
        >
          <div class="font-medium text-gray-900">{{ common.name }}</div>
          <div class="text-sm text-gray-600">{{ common.timestamp }}</div>
          <div class="text-xs text-gray-500">{{ common.date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const timestampInput = ref('')
const timestampResult = ref(null)
const dateInput = ref('')
const dateResult = ref(null)
const currentTimestamp = ref(0)
const currentDate = ref('')
const timezone = ref('')

let timer = null

const commonTimestamps = ref([
  { name: 'Unix纪元', timestamp: 0, date: '1970-01-01 00:00:00 UTC' },
  { name: '2000年', timestamp: 946684800, date: '2000-01-01 00:00:00 UTC' },
  { name: '2010年', timestamp: 1262304000, date: '2010-01-01 00:00:00 UTC' },
  { name: '2020年', timestamp: 1577836800, date: '2020-01-01 00:00:00 UTC' },
  { name: '2030年', timestamp: 1893456000, date: '2030-01-01 00:00:00 UTC' },
  { name: '2100年', timestamp: 4102444800, date: '2100-01-01 00:00:00 UTC' }
])

const convertTimestamp = () => {
  if (!timestampInput.value) return
  
  const timestamp = parseInt(timestampInput.value)
  if (isNaN(timestamp)) return
  
  const date = new Date(timestamp * 1000)
  
  timestampResult.value = {
    local: date.toLocaleString(),
    utc: date.toUTCString(),
    iso: date.toISOString()
  }
}

const convertDate = () => {
  if (!dateInput.value) return
  
  const date = new Date(dateInput.value)
  if (isNaN(date.getTime())) return
  
  dateResult.value = {
    timestamp: Math.floor(date.getTime() / 1000),
    timestampMs: date.getTime()
  }
}

const setTimestamp = (timestamp) => {
  timestampInput.value = timestamp
  convertTimestamp()
}

const refreshCurrentTime = () => {
  const now = new Date()
  currentTimestamp.value = Math.floor(now.getTime() / 1000)
  currentDate.value = now.toLocaleString()
  timezone.value = Intl.DateTimeFormat().resolvedOptions().timeZone
}

const updateCurrentTime = () => {
  refreshCurrentTime()
}

onMounted(() => {
  refreshCurrentTime()
  timer = setInterval(updateCurrentTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
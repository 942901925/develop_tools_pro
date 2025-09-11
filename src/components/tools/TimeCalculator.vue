<template>
  <div class="space-y-6">
    <!-- 时间计算器 -->
    <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('timeCalculator.title') }}</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 基础日期 -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('timeCalculator.baseDate') }}</label>
            <input
              v-model="baseDate"
              type="datetime-local"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('timeCalculator.operationType') }}</label>
            <select
              v-model="operation"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="add">{{ t('timeCalculator.addTime') }}</option>
              <option value="subtract">{{ t('timeCalculator.subtractTime') }}</option>
              <option value="diff">{{ t('timeCalculator.timeDiff') }}</option>
            </select>
          </div>
        </div>
        
        <!-- 时间偏移 -->
        <div class="space-y-4">
          <div v-if="operation !== 'diff'">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('timeCalculator.timeOffset') }}</label>
            <div class="grid grid-cols-2 gap-2">
              <input
                v-model.number="offsetValue"
                type="number"
                :placeholder="t('timeCalculator.value')"
                class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                v-model="offsetUnit"
                class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="seconds">{{ t('timeCalculator.seconds') }}</option>
                <option value="minutes">{{ t('timeCalculator.minutes') }}</option>
                <option value="hours">{{ t('timeCalculator.hours') }}</option>
                <option value="days">{{ t('timeCalculator.days') }}</option>
                <option value="weeks">{{ t('timeCalculator.weeks') }}</option>
                <option value="months">{{ t('timeCalculator.months') }}</option>
                <option value="years">{{ t('timeCalculator.years') }}</option>
              </select>
            </div>
          </div>
          
          <div v-if="operation === 'diff'">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('timeCalculator.compareDate') }}</label>
            <input
              v-model="compareDate"
              type="datetime-local"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      
      <div class="mt-6 text-center">
        <button
          @click="calculate"
          class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          {{ t('timeCalculator.calculate') }}
        </button>
      </div>
    </div>

    <!-- 计算结果 -->
    <div v-if="result" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('timeCalculator.result') }}</h3>
      <div class="bg-gray-50 p-6 rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div class="text-sm text-gray-600">{{ t('timeCalculator.baseTime') }}</div>
            <div class="text-lg font-mono">{{ formatDateTime(baseDate) }}</div>
          </div>
          <div v-if="operation === 'diff'">
            <div class="text-sm text-gray-600">{{ t('timeCalculator.compareTime') }}</div>
            <div class="text-lg font-mono">{{ formatDateTime(compareDate) }}</div>
          </div>
          <div v-else>
            <div class="text-sm text-gray-600">{{ t('timeCalculator.operation') }}</div>
            <div class="text-lg font-mono">
              {{ operation === 'add' ? '+' : '-' }}{{ offsetValue }} {{ getUnitName(offsetUnit) }}
            </div>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="text-sm text-gray-600">{{ t('timeCalculator.resultTime') }}</div>
          <div class="text-2xl font-bold text-blue-600 font-mono">{{ result }}</div>
        </div>
      </div>
    </div>

    <!-- 时区转换 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('timeCalculator.timezoneConversion') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('timeCalculator.sourceTimezone') }}</label>
          <select
            v-model="sourceTimezone"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="UTC">UTC</option>
            <option value="Asia/Shanghai">北京时间 (UTC+8)</option>
            <option value="America/New_York">纽约时间 (UTC-5)</option>
            <option value="Europe/London">伦敦时间 (UTC+0)</option>
            <option value="Asia/Tokyo">东京时间 (UTC+9)</option>
            <option value="Australia/Sydney">悉尼时间 (UTC+10)</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('timeCalculator.targetTimezone') }}</label>
          <select
            v-model="targetTimezone"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="UTC">UTC</option>
            <option value="Asia/Shanghai">北京时间 (UTC+8)</option>
            <option value="America/New_York">纽约时间 (UTC-5)</option>
            <option value="Europe/London">伦敦时间 (UTC+0)</option>
            <option value="Asia/Tokyo">东京时间 (UTC+9)</option>
            <option value="Australia/Sydney">悉尼时间 (UTC+10)</option>
          </select>
        </div>
        <div class="flex items-end">
          <button
            @click="convertTimezone"
            class="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {{ t('timeCalculator.convertTimezone') }}
          </button>
        </div>
      </div>
      
      <div v-if="timezoneResult" class="bg-gray-50 p-4 rounded-lg">
        <div class="text-sm text-gray-600">{{ t('timeCalculator.conversionResult') }}</div>
        <div class="text-lg font-mono">{{ timezoneResult }}</div>
      </div>
    </div>

    <!-- 常用时间计算 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('timeCalculator.commonCalculations') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="preset in timePresets"
          :key="preset.name"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="applyPreset(preset)"
        >
          <div class="font-medium text-gray-900">{{ preset.name }}</div>
          <div class="text-sm text-gray-600">{{ preset.description }}</div>
        </div>
      </div>
    </div>

    <!-- 当前时间信息 -->
    <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('timeCalculator.currentTimeInfo') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-sm text-gray-600">{{ t('timeCalculator.localTime') }}</div>
          <div class="text-lg font-bold text-purple-600">{{ currentTime.local }}</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600">{{ t('timeCalculator.utcTime') }}</div>
          <div class="text-lg font-bold text-blue-600">{{ currentTime.utc }}</div>
        </div>
        <div class="text-center">
          <div class="text-sm text-gray-600">{{ t('timeCalculator.timestamp') }}</div>
          <div class="text-lg font-bold text-green-600">{{ currentTime.timestamp }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const baseDate = ref('')
const operation = ref('add')
const offsetValue = ref(1)
const offsetUnit = ref('days')
const compareDate = ref('')
const result = ref('')
const sourceTimezone = ref('UTC')
const targetTimezone = ref('Asia/Shanghai')
const timezoneResult = ref('')
const currentTime = ref({
  local: '',
  utc: '',
  timestamp: 0
})

const timePresets = computed(() => [
  { name: t('timeCalculator.presets.oneHourLater'), description: t('timeCalculator.presets.oneHourLaterDesc'), value: 1, unit: 'hours' },
  { name: t('timeCalculator.presets.oneDayLater'), description: t('timeCalculator.presets.oneDayLaterDesc'), value: 1, unit: 'days' },
  { name: t('timeCalculator.presets.oneWeekLater'), description: t('timeCalculator.presets.oneWeekLaterDesc'), value: 1, unit: 'weeks' },
  { name: t('timeCalculator.presets.oneMonthAgo'), description: t('timeCalculator.presets.oneMonthAgoDesc'), value: -1, unit: 'months' },
  { name: t('timeCalculator.presets.oneYearAgo'), description: t('timeCalculator.presets.oneYearAgoDesc'), value: -1, unit: 'years' },
  { name: t('timeCalculator.presets.workday'), description: t('timeCalculator.presets.workdayDesc'), value: 1, unit: 'weekdays' }
])

let timer = null

const getUnitName = (unit) => {
  const names = {
    seconds: t('timeCalculator.seconds'),
    minutes: t('timeCalculator.minutes'),
    hours: t('timeCalculator.hours'),
    days: t('timeCalculator.days'),
    weeks: t('timeCalculator.weeks'),
    months: t('timeCalculator.months'),
    years: t('timeCalculator.years')
  }
  return names[unit] || unit
}

const calculate = () => {
  if (!baseDate.value) {
    alert(t('timeCalculator.selectBaseDate'))
    return
  }

  const base = new Date(baseDate.value)
  
  if (operation.value === 'diff') {
    if (!compareDate.value) {
      alert(t('timeCalculator.selectCompareDate'))
      return
    }
    const compare = new Date(compareDate.value)
    const diff = Math.abs(compare - base)
    result.value = formatTimeDifference(diff)
  } else {
    const offset = calculateOffset(offsetValue.value, offsetUnit.value)
    const newDate = new Date(base.getTime() + (operation.value === 'add' ? offset : -offset))
    result.value = formatDateTime(newDate.toISOString().slice(0, 16))
  }
}

const calculateOffset = (value, unit) => {
  const multipliers = {
    seconds: 1000,
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,
    weeks: 7 * 24 * 60 * 60 * 1000,
    months: 30 * 24 * 60 * 60 * 1000, // 近似值
    years: 365 * 24 * 60 * 60 * 1000 // 近似值
  }
  return value * (multipliers[unit] || 0)
}

const formatTimeDifference = (diffMs) => {
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000))
  const hours = Math.floor((diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  const minutes = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000))
  const seconds = Math.floor((diffMs % (60 * 1000)) / 1000)
  
  const parts = []
  if (days > 0) parts.push(`${days}天`)
  if (hours > 0) parts.push(`${hours}小时`)
  if (minutes > 0) parts.push(`${minutes}分钟`)
  if (seconds > 0) parts.push(`${seconds}秒`)
  
  return parts.join(' ') || '0秒'
}

const convertTimezone = () => {
  if (!baseDate.value) {
    alert('请先选择基础日期')
    return
  }
  
  const date = new Date(baseDate.value)
  const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000)
  
  // 简单的时区偏移计算
  const timezoneOffsets = {
    'UTC': 0,
    'Asia/Shanghai': 8,
    'America/New_York': -5,
    'Europe/London': 0,
    'Asia/Tokyo': 9,
    'Australia/Sydney': 10
  }
  
  const sourceOffset = timezoneOffsets[sourceTimezone.value] || 0
  const targetOffset = timezoneOffsets[targetTimezone.value] || 0
  const offsetDiff = (targetOffset - sourceOffset) * 60 * 60 * 1000
  
  const convertedDate = new Date(utcTime + offsetDiff)
  timezoneResult.value = formatDateTime(convertedDate.toISOString().slice(0, 16))
}

const applyPreset = (preset) => {
  const now = new Date()
  baseDate.value = now.toISOString().slice(0, 16)
  
  if (preset.unit === 'weekdays') {
    // 计算下一个工作日
    const nextWeekday = new Date(now)
    nextWeekday.setDate(now.getDate() + 1)
    while (nextWeekday.getDay() === 0 || nextWeekday.getDay() === 6) {
      nextWeekday.setDate(nextWeekday.getDate() + 1)
    }
    baseDate.value = nextWeekday.toISOString().slice(0, 16)
    operation.value = 'add'
    offsetValue.value = 0
    offsetUnit.value = 'days'
  } else {
    operation.value = preset.value > 0 ? 'add' : 'subtract'
    offsetValue.value = Math.abs(preset.value)
    offsetUnit.value = preset.unit
  }
  
  calculate()
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const updateCurrentTime = () => {
  const now = new Date()
  currentTime.value = {
    local: now.toLocaleString('zh-CN'),
    utc: now.toUTCString(),
    timestamp: Math.floor(now.getTime() / 1000)
  }
}

onMounted(() => {
  updateCurrentTime()
  timer = setInterval(updateCurrentTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

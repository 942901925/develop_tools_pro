<template>
  <div class="space-y-6">
    <!-- 假期计算器 -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('vacationCalculator.title') }}</h3>
      
      <!-- 输入区域 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <!-- 可用假期天数 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('vacationCalculator.availableDays') }}</label>
          <div class="relative">
            <input
              v-model.number="availableDays"
              type="number"
              :placeholder="t('vacationCalculator.enterAvailableDays')"
              class="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              max="365"
            />
            <span class="absolute right-3 top-3 text-gray-500">{{ t('vacationCalculator.days') }}</span>
          </div>
        </div>

        <!-- 起始日期 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('vacationCalculator.startDate') }}</label>
          <input
            v-model="startDate"
            type="date"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- 结束日期 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('vacationCalculator.endDate') }}</label>
          <input
            v-model="endDate"
            type="date"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- 所在地区 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('vacationCalculator.region') }}</label>
          <select
            v-model="selectedRegion"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="china">{{ t('vacationCalculator.regions.china') }}</option>
            <option value="usa">{{ t('vacationCalculator.regions.usa') }}</option>
            <option value="japan">{{ t('vacationCalculator.regions.japan') }}</option>
            <option value="uk">{{ t('vacationCalculator.regions.uk') }}</option>
            <option value="germany">{{ t('vacationCalculator.regions.germany') }}</option>
          </select>
        </div>
      </div>

      <!-- 个人重要日期 -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('vacationCalculator.importantDates') }}</label>
        <div class="space-y-2">
          <div v-for="(date, index) in importantDates" :key="index" class="flex items-center space-x-2">
            <input
              v-model="date.date"
              type="date"
              class="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              v-model="date.description"
              type="text"
              :placeholder="t('vacationCalculator.dateDescription')"
              class="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              @click="removeImportantDate(index)"
              class="p-2 text-red-500 hover:text-red-700"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
          <button
            @click="addImportantDate"
            class="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <Plus class="w-4 h-4" />
            <span>{{ t('vacationCalculator.addImportantDate') }}</span>
          </button>
        </div>
      </div>

      <!-- 计算说明 -->
      <div class="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div class="text-sm text-blue-800">
          <div class="font-medium mb-1">{{ t('vacationCalculator.calculationNote') }}</div>
          <div>{{ t('vacationCalculator.smartOptimization') }}</div>
        </div>
      </div>

      <!-- 计算按钮 -->
      <div class="flex justify-center">
        <button
          @click="calculateVacation"
          :disabled="!canCalculate"
          class="btn-primary px-8 py-3 text-lg font-medium"
        >
          {{ t('vacationCalculator.calculate') }}
        </button>
      </div>
    </div>

    <!-- 结果显示 -->
    <div v-if="calculationResult" class="space-y-6">
      <!-- 数据面板 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-lg shadow-sm border">
          <div class="text-sm text-gray-500">{{ t('vacationCalculator.availableDays') }}</div>
          <div class="text-2xl font-bold text-blue-600">{{ availableDays }}</div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border">
          <div class="text-sm text-gray-500">{{ t('vacationCalculator.usedDays') }}</div>
          <div class="text-2xl font-bold text-green-600">{{ calculationResult.usedDays }}</div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border">
          <div class="text-sm text-gray-500">{{ t('vacationCalculator.totalRestDays') }}</div>
          <div class="text-2xl font-bold text-purple-600">{{ calculationResult.totalRestDays }}</div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border">
          <div class="text-sm text-gray-500">{{ t('vacationCalculator.savedDays') }}</div>
          <div class="text-2xl font-bold text-orange-600">{{ calculationResult.savedDays }}</div>
        </div>
      </div>

      <!-- 最优方案 -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">{{ t('vacationCalculator.optimalPlan') }}</h4>
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-2">{{ t('vacationCalculator.planPeriod') }}</div>
          <div class="text-lg font-medium text-gray-900">
            {{ formatDate(calculationResult.optimalPlan.startDate) }} - {{ formatDate(calculationResult.optimalPlan.endDate) }}
          </div>
        </div>
        <div class="mb-4">
          <div class="text-sm text-gray-500 mb-2">{{ t('vacationCalculator.planRating') }}</div>
          <div class="text-lg font-medium" :class="getRatingColor(calculationResult.planRating)">
            {{ calculationResult.planRating }}
          </div>
        </div>
        <div class="flex space-x-4">
          <button
            @click="savePlan"
            class="btn-secondary"
          >
            {{ t('vacationCalculator.savePlan') }}
          </button>
          <button
            @click="exportCalendar"
            class="btn-secondary"
          >
            {{ t('vacationCalculator.exportCalendar') }}
          </button>
        </div>
      </div>

      <!-- 日历可视化 -->
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">{{ t('vacationCalculator.calendarView') }}</h4>
        <div class="calendar-container">
          <div class="grid grid-cols-7 gap-1 mb-2">
            <div v-for="day in weekDays" :key="day" class="text-center text-sm font-medium text-gray-500 p-2">
              {{ day }}
            </div>
          </div>
          <div class="grid grid-cols-7 gap-1">
            <div
              v-for="day in fullCalendarDays"
              :key="day.date"
              :class="getDayClass(day)"
              class="aspect-square flex items-center justify-center text-sm border rounded cursor-pointer hover:bg-gray-50"
              :title="getDayTooltip(day)"
            >
              {{ day.day }}
            </div>
          </div>
        </div>
        <div class="mt-4 flex flex-wrap gap-4 text-sm">
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span>{{ t('vacationCalculator.legend.workday') }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <span>{{ t('vacationCalculator.legend.weekend') }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span>{{ t('vacationCalculator.legend.holiday') }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span>{{ t('vacationCalculator.legend.important') }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
            <span>{{ t('vacationCalculator.legend.vacation') }}</span>
          </div>
        </div>
      </div>

      <!-- 方案对比 -->
      <div v-if="savedPlans.length > 0" class="bg-white p-6 rounded-lg shadow-sm border">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">{{ t('vacationCalculator.planComparison') }}</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b">
                <th class="text-left p-2">{{ t('vacationCalculator.planName') }}</th>
                <th class="text-left p-2">{{ t('vacationCalculator.period') }}</th>
                <th class="text-left p-2">{{ t('vacationCalculator.usedDays') }}</th>
                <th class="text-left p-2">{{ t('vacationCalculator.totalRestDays') }}</th>
                <th class="text-left p-2">{{ t('vacationCalculator.savedDays') }}</th>
                <th class="text-left p-2">{{ t('vacationCalculator.rating') }}</th>
                <th class="text-left p-2">{{ t('vacationCalculator.actions') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(plan, index) in savedPlans" :key="index" class="border-b">
                <td class="p-2">{{ plan.name }}</td>
                <td class="p-2">{{ formatDate(plan.startDate) }} - {{ formatDate(plan.endDate) }}</td>
                <td class="p-2">{{ plan.usedDays }}</td>
                <td class="p-2">{{ plan.totalRestDays }}</td>
                <td class="p-2">{{ plan.savedDays || 0 }}</td>
                <td class="p-2" :class="getRatingColor(plan.rating)">{{ plan.rating }}</td>
                <td class="p-2">
                  <button
                    @click="deletePlan(index)"
                    class="text-red-500 hover:text-red-700"
                  >
                    {{ t('vacationCalculator.delete') }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Plus, Trash2 } from 'lucide-vue-next'

const { t } = useI18n()

// 基础数据
const availableDays = ref(0)
const startDate = ref('')
const endDate = ref('')
const selectedRegion = ref('china')
const importantDates = ref([])

// 计算结果
const calculationResult = ref(null)
const savedPlans = ref([])

// 完整日历数据
const fullCalendarDays = computed(() => {
  if (!startDate.value || !endDate.value) return []
  
  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  const year = start.getFullYear()
  const month = start.getMonth()
  
  // 获取月份的第一天和最后一天
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // 获取第一天是星期几（0=周日，1=周一...）
  const firstDayOfWeek = firstDay.getDay()
  
  // 获取上个月的最后几天
  const prevMonth = new Date(year, month, 0)
  const prevMonthDays = prevMonth.getDate()
  
  const calendarDays = []
  
  // 添加上个月的末尾几天
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthDays - i
    const date = new Date(year, month - 1, day)
    calendarDays.push({
      date: date.toISOString().split('T')[0],
      day: day,
      isCurrentMonth: false,
      isWorkday: false,
      isWeekend: true,
      isHoliday: false,
      isImportant: false,
      isVacation: false
    })
  }
  
  // 添加当前月的所有天数
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day)
    const dateStr = date.toISOString().split('T')[0]
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    
    // 检查是否是假期
    const holidays = getHolidays(selectedRegion.value, year)
    const holidayDates = new Set(holidays.map(h => h.date))
    const isHoliday = holidayDates.has(dateStr)
    
    // 检查是否是重要日期
    const isImportant = importantDates.value.some(id => id.date === dateStr)
    
    // 检查是否是假期安排
    const isVacation = calculationResult.value && 
      dateStr >= calculationResult.value.optimalPlan.startDate && 
      dateStr <= calculationResult.value.optimalPlan.endDate
    
    calendarDays.push({
      date: dateStr,
      day: day,
      isCurrentMonth: true,
      isWorkday: !isWeekend && !isHoliday,
      isWeekend: isWeekend,
      isHoliday: isHoliday,
      isImportant: isImportant,
      isVacation: isVacation
    })
  }
  
  // 添加下个月的开头几天，使日历完整
  const remainingDays = 42 - calendarDays.length // 6行 x 7天 = 42天
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day)
    calendarDays.push({
      date: date.toISOString().split('T')[0],
      day: day,
      isCurrentMonth: false,
      isWorkday: false,
      isWeekend: true,
      isHoliday: false,
      isImportant: false,
      isVacation: false
    })
  }
  
  return calendarDays
})

// 周几标签
const weekDays = computed(() => [
  t('vacationCalculator.weekDays.mon'),
  t('vacationCalculator.weekDays.tue'),
  t('vacationCalculator.weekDays.wed'),
  t('vacationCalculator.weekDays.thu'),
  t('vacationCalculator.weekDays.fri'),
  t('vacationCalculator.weekDays.sat'),
  t('vacationCalculator.weekDays.sun')
])

// 计算条件
const canCalculate = computed(() => {
  return availableDays.value > 0 && startDate.value && endDate.value
})

// 添加重要日期
const addImportantDate = () => {
  importantDates.value.push({
    date: '',
    description: ''
  })
}

// 删除重要日期
const removeImportantDate = (index) => {
  importantDates.value.splice(index, 1)
}

// 获取中国节假日数据
const getChinaHolidays = (year) => {
  const holidays = []
  
  // 元旦（固定日期）
  holidays.push({ date: `${year}-01-01`, name: t('vacationCalculator.holidays.newYear') })
  
  // 春节（农历新年，需要根据年份计算）
  const springFestivalDates = getSpringFestivalDates(year)
  springFestivalDates.forEach(date => {
    holidays.push({ date, name: t('vacationCalculator.holidays.springFestival') })
  })
  
  // 清明节（固定日期）
  holidays.push({ date: `${year}-04-05`, name: t('vacationCalculator.holidays.qingming') })
  
  // 劳动节（固定日期）
  holidays.push({ date: `${year}-05-01`, name: t('vacationCalculator.holidays.laborDay') })
  
  // 端午节（农历五月初五，需要根据年份计算）
  const dragonBoatDates = getDragonBoatDates(year)
  dragonBoatDates.forEach(date => {
    holidays.push({ date, name: t('vacationCalculator.holidays.dragonBoat') })
  })
  
  // 中秋节（农历八月十五，需要根据年份计算）
  const midAutumnDates = getMidAutumnDates(year)
  midAutumnDates.forEach(date => {
    holidays.push({ date, name: t('vacationCalculator.holidays.midAutumn') })
  })
  
  // 国庆节（根据年份确定假期天数）
  const nationalDayDates = getNationalDayDates(year)
  nationalDayDates.forEach(date => {
    holidays.push({ date, name: t('vacationCalculator.holidays.nationalDay') })
  })
  
  return holidays
}

// 获取春节日期（农历新年）
const getSpringFestivalDates = (year) => {
  // 春节日期表（2020-2030年）
  const springFestivalMap = {
    2020: ['2020-01-25', '2020-01-26', '2020-01-27', '2020-01-28', '2020-01-29', '2020-01-30', '2020-01-31'],
    2021: ['2021-02-12', '2021-02-13', '2021-02-14', '2021-02-15', '2021-02-16', '2021-02-17', '2021-02-18'],
    2022: ['2022-02-01', '2022-02-02', '2022-02-03', '2022-02-04', '2022-02-05', '2022-02-06', '2022-02-07'],
    2023: ['2023-01-22', '2023-01-23', '2023-01-24', '2023-01-25', '2023-01-26', '2023-01-27', '2023-01-28'],
    2024: ['2024-02-10', '2024-02-11', '2024-02-12', '2024-02-13', '2024-02-14', '2024-02-15', '2024-02-16'],
    2025: ['2025-01-29', '2025-01-30', '2025-01-31', '2025-02-01', '2025-02-02', '2025-02-03', '2025-02-04'],
    2026: ['2026-02-17', '2026-02-18', '2026-02-19', '2026-02-20', '2026-02-21', '2026-02-22', '2026-02-23'],
    2027: ['2027-02-06', '2027-02-07', '2027-02-08', '2027-02-09', '2027-02-10', '2027-02-11', '2027-02-12'],
    2028: ['2028-01-26', '2028-01-27', '2028-01-28', '2028-01-29', '2028-01-30', '2028-01-31', '2028-02-01'],
    2029: ['2029-02-13', '2029-02-14', '2029-02-15', '2029-02-16', '2029-02-17', '2029-02-18', '2029-02-19'],
    2030: ['2030-02-03', '2030-02-04', '2030-02-05', '2030-02-06', '2030-02-07', '2030-02-08', '2030-02-09']
  }
  
  return springFestivalMap[year] || []
}

// 获取端午节日期（农历五月初五）
const getDragonBoatDates = (year) => {
  // 端午节日期表（2020-2030年）
  const dragonBoatMap = {
    2020: ['2020-06-25'],
    2021: ['2021-06-14'],
    2022: ['2022-06-03'],
    2023: ['2023-06-22'],
    2024: ['2024-06-10'],
    2025: ['2025-05-31'],
    2026: ['2026-06-19'],
    2027: ['2027-06-09'],
    2028: ['2028-05-28'],
    2029: ['2029-06-16'],
    2030: ['2030-06-05']
  }
  
  return dragonBoatMap[year] || []
}

// 获取中秋节日期（农历八月十五）
const getMidAutumnDates = (year) => {
  // 中秋节日期表（2020-2030年）
  const midAutumnMap = {
    2020: ['2020-10-01'],
    2021: ['2021-09-21'],
    2022: ['2022-09-10'],
    2023: ['2023-09-29'],
    2024: ['2024-09-17'],
    2025: ['2025-10-06'],
    2026: ['2026-09-25'],
    2027: ['2027-09-15'],
    2028: ['2028-10-03'],
    2029: ['2029-09-22'],
    2030: ['2030-09-12']
  }
  
  return midAutumnMap[year] || []
}

// 获取国庆节日期
const getNationalDayDates = (year) => {
  // 国庆节日期表（2020-2030年）
  const nationalDayMap = {
    2020: ['2020-10-01', '2020-10-02', '2020-10-03', '2020-10-04', '2020-10-05', '2020-10-06', '2020-10-07', '2020-10-08'],
    2021: ['2021-10-01', '2021-10-02', '2021-10-03', '2021-10-04', '2021-10-05', '2021-10-06', '2021-10-07'],
    2022: ['2022-10-01', '2022-10-02', '2022-10-03', '2022-10-04', '2022-10-05', '2022-10-06', '2022-10-07'],
    2023: ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04', '2023-10-05', '2023-10-06', '2023-10-07', '2023-10-08'],
    2024: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05', '2024-10-06', '2024-10-07'],
    2025: ['2025-10-01', '2025-10-02', '2025-10-03', '2025-10-04', '2025-10-05', '2025-10-06', '2025-10-07', '2025-10-08'],
    2026: ['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04', '2026-10-05', '2026-10-06', '2026-10-07'],
    2027: ['2027-10-01', '2027-10-02', '2027-10-03', '2027-10-04', '2027-10-05', '2027-10-06', '2027-10-07', '2027-10-08'],
    2028: ['2028-10-01', '2028-10-02', '2028-10-03', '2028-10-04', '2028-10-05', '2028-10-06', '2028-10-07'],
    2029: ['2029-10-01', '2029-10-02', '2029-10-03', '2029-10-04', '2029-10-05', '2029-10-06', '2029-10-07'],
    2030: ['2030-10-01', '2030-10-02', '2030-10-03', '2030-10-04', '2030-10-05', '2030-10-06', '2030-10-07', '2030-10-08']
  }
  
  return nationalDayMap[year] || ['2020-10-01', '2020-10-02', '2020-10-03'] // 默认3天
}

// 获取地区假期数据
const getHolidays = (region, year) => {
  const holidays = {
    china: getChinaHolidays(year),
    usa: [
      { date: `${year}-01-01`, name: t('vacationCalculator.holidays.newYear') },
      { date: `${year}-01-15`, name: t('vacationCalculator.holidays.mlkDay') },
      { date: `${year}-02-19`, name: t('vacationCalculator.holidays.presidentsDay') },
      { date: `${year}-05-27`, name: t('vacationCalculator.holidays.memorialDay') },
      { date: `${year}-06-19`, name: t('vacationCalculator.holidays.juneteenth') },
      { date: `${year}-07-04`, name: t('vacationCalculator.holidays.independenceDay') },
      { date: `${year}-09-02`, name: t('vacationCalculator.holidays.laborDay') },
      { date: `${year}-10-14`, name: t('vacationCalculator.holidays.columbusDay') },
      { date: `${year}-11-11`, name: t('vacationCalculator.holidays.veteransDay') },
      { date: `${year}-11-28`, name: t('vacationCalculator.holidays.thanksgiving') },
      { date: `${year}-12-25`, name: t('vacationCalculator.holidays.christmas') }
    ],
    japan: [
      { date: `${year}-01-01`, name: t('vacationCalculator.holidays.newYear') },
      { date: `${year}-01-08`, name: t('vacationCalculator.holidays.comingOfAge') },
      { date: `${year}-02-11`, name: t('vacationCalculator.holidays.nationalFoundation') },
      { date: `${year}-02-12`, name: t('vacationCalculator.holidays.nationalFoundation') },
      { date: `${year}-02-23`, name: t('vacationCalculator.holidays.emperorsBirthday') },
      { date: `${year}-03-20`, name: t('vacationCalculator.holidays.springEquinox') },
      { date: `${year}-04-29`, name: t('vacationCalculator.holidays.showaDay') },
      { date: `${year}-05-03`, name: t('vacationCalculator.holidays.constitutionDay') },
      { date: `${year}-05-04`, name: t('vacationCalculator.holidays.greeneryDay') },
      { date: `${year}-05-05`, name: t('vacationCalculator.holidays.childrensDay') },
      { date: `${year}-07-15`, name: t('vacationCalculator.holidays.marineDay') },
      { date: `${year}-08-11`, name: t('vacationCalculator.holidays.mountainDay') },
      { date: `${year}-08-12`, name: t('vacationCalculator.holidays.mountainDay') },
      { date: `${year}-09-16`, name: t('vacationCalculator.holidays.respectForAged') },
      { date: `${year}-09-22`, name: t('vacationCalculator.holidays.autumnEquinox') },
      { date: `${year}-10-14`, name: t('vacationCalculator.holidays.sportsDay') },
      { date: `${year}-11-03`, name: t('vacationCalculator.holidays.cultureDay') },
      { date: `${year}-11-23`, name: t('vacationCalculator.holidays.laborThanksgiving') },
      { date: `${year}-12-23`, name: t('vacationCalculator.holidays.emperorsBirthday') }
    ]
  }
  return holidays[region] || []
}

// 计算假期
const calculateVacation = () => {
  if (!canCalculate.value) return

  const start = new Date(startDate.value)
  const end = new Date(endDate.value)
  const year = start.getFullYear()
  
  // 获取假期数据
  const holidays = getHolidays(selectedRegion.value, year)
  const holidayDates = new Set(holidays.map(h => h.date))
  
  // 生成日期范围
  const dateRange = []
  const current = new Date(start)
  while (current <= end) {
    const dateStr = current.toISOString().split('T')[0]
    const dayOfWeek = current.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const isHoliday = holidayDates.has(dateStr)
    const isImportant = importantDates.value.some(id => id.date === dateStr)
    
    dateRange.push({
      date: dateStr,
      day: current.getDate(),
      dayOfWeek,
      isWeekend,
      isHoliday,
      isImportant,
      isWorkday: !isWeekend && !isHoliday
    })
    
    current.setDate(current.getDate() + 1)
  }
  
  // 寻找最优方案
  const optimalPlan = findOptimalPlan(dateRange, availableDays.value)
  
  // 计算统计信息
  const usedDays = optimalPlan.usedVacationDays
  const totalRestDays = optimalPlan.workdays + optimalPlan.weekends + optimalPlan.holidays
  const savedDays = totalRestDays - usedDays
  
  // 计算评级
  const rating = calculateRating(savedDays, usedDays)
  
  calculationResult.value = {
    optimalPlan,
    usedDays,
    totalRestDays,
    savedDays,
    planRating: rating,
    calendarDays: dateRange
  }
}

// 寻找最优方案
const findOptimalPlan = (dateRange, availableDays) => {
  let bestPlan = null
  let maxTotalRestDays = 0
  
  // 遍历所有可能的连续日期段，长度从availableDays到dateRange.length
  for (let length = availableDays; length <= Math.min(availableDays * 2, dateRange.length); length++) {
    for (let i = 0; i <= dateRange.length - length; i++) {
      const plan = {
        startDate: dateRange[i].date,
        endDate: dateRange[i + length - 1].date,
        workdays: 0,
        weekends: 0,
        holidays: 0,
        totalDays: length,
        usedVacationDays: 0
      }
      
      // 计算这个方案中的工作日、周末、假期
      for (let j = i; j < i + length; j++) {
        const day = dateRange[j]
        if (day.isWorkday) {
          plan.workdays++
        } else if (day.isWeekend) {
          plan.weekends++
        } else if (day.isHoliday) {
          plan.holidays++
        }
      }
      
      // 计算实际使用的假期天数（只计算工作日）
      plan.usedVacationDays = plan.workdays
      
      // 如果实际使用的假期天数超过可用天数，跳过这个方案
      if (plan.usedVacationDays > availableDays) {
        continue
      }
      
      // 计算总休息天数（实际假期 + 包含的周末和节假日）
      const totalRestDays = plan.workdays + plan.weekends + plan.holidays
      
      // 选择总休息天数最多的方案
      if (totalRestDays > maxTotalRestDays) {
        maxTotalRestDays = totalRestDays
        bestPlan = plan
      }
    }
  }
  
  return bestPlan || {
    startDate: dateRange[0].date,
    endDate: dateRange[availableDays - 1].date,
    workdays: availableDays,
    weekends: 0,
    holidays: 0,
    totalDays: availableDays,
    usedVacationDays: availableDays
  }
}

// 计算评级
const calculateRating = (savedDays, usedDays) => {
  const ratio = savedDays / usedDays
  if (ratio >= 1.0) return 'A+'  // 节省天数 >= 使用天数
  if (ratio >= 0.7) return 'A'   // 节省天数 >= 70%使用天数
  if (ratio >= 0.5) return 'B+'  // 节省天数 >= 50%使用天数
  if (ratio >= 0.3) return 'B'   // 节省天数 >= 30%使用天数
  if (ratio >= 0.1) return 'C+'  // 节省天数 >= 10%使用天数
  return 'C'
}

// 获取评级颜色
const getRatingColor = (rating) => {
  const colors = {
    'A+': 'text-green-600',
    'A': 'text-green-500',
    'B+': 'text-blue-500',
    'B': 'text-yellow-500',
    'C+': 'text-orange-500',
    'C': 'text-red-500'
  }
  return colors[rating] || 'text-gray-500'
}

// 获取日期样式
const getDayClass = (day) => {
  const classes = ['text-center', 'p-2', 'transition-all', 'duration-200']
  
  // 非当前月份的日期样式
  if (!day.isCurrentMonth) {
    classes.push('text-gray-300', 'bg-gray-50')
    return classes.join(' ')
  }
  
  // 假期安排（最高优先级）
  if (day.isVacation) {
    classes.push('bg-purple-100', 'border-purple-300', 'text-purple-800', 'font-bold', 'ring-2', 'ring-purple-400')
  }
  // 重要日期
  else if (day.isImportant) {
    classes.push('bg-yellow-100', 'border-yellow-300', 'text-yellow-800', 'font-medium')
  }
  // 节假日
  else if (day.isHoliday) {
    classes.push('bg-red-100', 'border-red-300', 'text-red-800', 'font-medium')
  }
  // 周末
  else if (day.isWeekend) {
    classes.push('bg-blue-100', 'border-blue-300', 'text-blue-800')
  }
  // 工作日
  else if (day.isWorkday) {
    classes.push('bg-gray-100', 'border-gray-300', 'text-gray-800')
  }
  
  return classes.join(' ')
}

// 获取日期提示信息
const getDayTooltip = (day) => {
  if (!day.isCurrentMonth) return ''
  
  const tooltips = []
  
  if (day.isVacation) {
    tooltips.push(t('vacationCalculator.legend.vacation'))
  }
  if (day.isImportant) {
    tooltips.push(t('vacationCalculator.legend.important'))
  }
  if (day.isHoliday) {
    tooltips.push(t('vacationCalculator.legend.holiday'))
  }
  if (day.isWeekend) {
    tooltips.push(t('vacationCalculator.legend.weekend'))
  }
  if (day.isWorkday) {
    tooltips.push(t('vacationCalculator.legend.workday'))
  }
  
  return tooltips.join(', ')
}

// 格式化日期
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}

// 保存方案
const savePlan = () => {
  if (!calculationResult.value) return
  
  const plan = {
    name: `方案 ${savedPlans.value.length + 1}`,
    startDate: calculationResult.value.optimalPlan.startDate,
    endDate: calculationResult.value.optimalPlan.endDate,
    usedDays: calculationResult.value.usedDays,
    totalRestDays: calculationResult.value.totalRestDays,
    savedDays: calculationResult.value.savedDays,
    rating: calculationResult.value.planRating
  }
  
  savedPlans.value.push(plan)
  localStorage.setItem('vacationPlans', JSON.stringify(savedPlans.value))
}

// 删除方案
const deletePlan = (index) => {
  savedPlans.value.splice(index, 1)
  localStorage.setItem('vacationPlans', JSON.stringify(savedPlans.value))
}

// 导出日历
const exportCalendar = () => {
  if (!calculationResult.value) return
  
  const plan = calculationResult.value.optimalPlan
  const start = new Date(plan.startDate)
  const end = new Date(plan.endDate)
  
  // 生成ICS格式的日历文件
  const icsContent = generateICS(plan.startDate, plan.endDate, t('vacationCalculator.vacationTitle'))
  
  const blob = new Blob([icsContent], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `vacation-${plan.startDate}-${plan.endDate}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

// 生成ICS格式
const generateICS = (startDate, endDate, title) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  end.setDate(end.getDate() + 1) // 包含结束日期
  
  const formatICSDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vacation Calculator//EN
BEGIN:VEVENT
UID:${Date.now()}@vacation-calculator.com
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${title}
DESCRIPTION:${t('vacationCalculator.vacationDescription')}
END:VEVENT
END:VCALENDAR`
}

// 初始化
onMounted(() => {
  const saved = localStorage.getItem('vacationPlans')
  if (saved) {
    savedPlans.value = JSON.parse(saved)
  }
  
  // 设置默认日期
  const today = new Date()
  startDate.value = today.toISOString().split('T')[0]
  const nextMonth = new Date(today)
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  endDate.value = nextMonth.toISOString().split('T')[0]
})
</script>

<style scoped>
.calendar-container {
  max-width: 100%;
  overflow-x: auto;
}

.calendar-container .grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.calendar-container .aspect-square {
  aspect-ratio: 1;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.calendar-container .aspect-square:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.btn-primary {
  @apply bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200;
}

/* 日历图例样式 */
.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid;
}
</style>

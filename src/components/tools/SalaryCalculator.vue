<template>
  <div class="space-y-6">
    <!-- 薪酬计算器 -->
    <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-6">{{ t('salaryCalculator.title') }}</h3>
      
      <!-- 输入参数区域 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('salaryCalculator.monthlySalary') }}</label>
          <div class="flex space-x-2">
            <div class="relative flex-1">
              <input
                v-model.number="monthlySalary"
                type="number"
                :placeholder="t('salaryCalculator.enterMonthlySalary')"
                class="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                @input="calculateCurrentPackage"
              />
              <span class="absolute right-3 top-3 text-gray-500">{{ salaryUnit }}</span>
            </div>
            <select
              v-model="salaryUnit"
              class="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              @change="calculateCurrentPackage"
            >
              <option value="元">{{ t('salaryCalculator.yuan') }}</option>
              <option value="万">{{ t('salaryCalculator.wan') }}</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('salaryCalculator.payFrequency') }}</label>
          <select
            v-model="payFrequency"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            @change="calculateCurrentPackage"
          >
            <option value="12">12{{ t('salaryCalculator.salary') }}</option>
            <option value="13">13{{ t('salaryCalculator.salary') }}</option>
            <option value="14">14{{ t('salaryCalculator.salary') }}</option>
            <option value="15">15{{ t('salaryCalculator.salary') }}</option>
            <option value="16">16{{ t('salaryCalculator.salary') }}</option>
            <option value="17">17{{ t('salaryCalculator.salary') }}</option>
            <option value="18">18{{ t('salaryCalculator.salary') }}</option>
            <option value="19">19{{ t('salaryCalculator.salary') }}</option>
            <option value="20">20{{ t('salaryCalculator.salary') }}</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('salaryCalculator.workHoursPerDay') }}</label>
          <input
            v-model.number="workHoursPerDay"
            type="number"
            min="1"
            max="24"
            :placeholder="t('salaryCalculator.enterWorkHours')"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            @input="calculateCurrentPackage"
          />
        </div>
      </div>
      
      <!-- 年终奖和股票期权区域 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <!-- 年终奖 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('salaryCalculator.yearEndBonus') }}</label>
          <select
            v-model="yearEndBonusType"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2"
            @change="calculateCurrentPackage"
          >
            <option value="none">{{ t('salaryCalculator.none') }}</option>
            <option value="fixed">{{ t('salaryCalculator.fixedAmount') }}</option>
            <option value="coefficient">{{ t('salaryCalculator.floatingCoefficient') }}</option>
          </select>
          
          <!-- 固定金额输入 -->
          <div v-if="yearEndBonusType === 'fixed'" class="relative">
            <input
              v-model.number="yearEndBonusFixed"
              type="number"
              :placeholder="t('salaryCalculator.enterFixedAmount')"
              class="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              @input="calculateCurrentPackage"
            />
            <span class="absolute right-3 top-3 text-gray-500">{{ salaryUnit }}</span>
          </div>
          
          <!-- 浮动系数输入 -->
          <div v-if="yearEndBonusType === 'coefficient'" class="relative">
            <input
              v-model.number="yearEndBonusCoefficient"
              type="number"
              step="0.1"
              min="0"
              :placeholder="t('salaryCalculator.enterCoefficient')"
              class="w-full p-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              @input="calculateCurrentPackage"
            />
            <span class="absolute right-3 top-3 text-gray-500">×</span>
          </div>
        </div>
        
        <!-- 股票期权 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('salaryCalculator.stockOptions') }}</label>
          <select
            v-model="stockOptionsType"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2"
            @change="calculateCurrentPackage"
          >
            <option value="none">{{ t('salaryCalculator.none') }}</option>
            <option value="has">{{ t('salaryCalculator.has') }}</option>
          </select>
          
          <!-- 股票期权金额输入 -->
          <div v-if="stockOptionsType === 'has'" class="relative">
            <input
              v-model.number="stockOptionsAmount"
              type="number"
              :placeholder="t('salaryCalculator.enterStockAmount')"
              class="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              @input="calculateCurrentPackage"
            />
            <span class="absolute right-3 top-3 text-gray-500">{{ salaryUnit }}</span>
          </div>
        </div>
      </div>
      
      <!-- 涨幅设置区域 -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('salaryCalculator.raisePercentage') }}</label>
        <div class="flex items-center space-x-4">
          <div class="relative flex-1 max-w-xs">
            <input
              v-model.number="raisePercentage"
              type="number"
              step="0.1"
              min="0"
              max="100"
              :placeholder="t('salaryCalculator.enterRaisePercentage')"
              class="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              @input="calculateNewPackage"
            />
            <span class="absolute right-3 top-3 text-gray-500">%</span>
          </div>
          <div class="flex space-x-2">
            <button
              v-for="percentage in quickRaiseOptions"
              :key="percentage"
              @click="setQuickRaise(percentage)"
              class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              +{{ percentage }}%
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 薪酬对比区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 左侧：当前薪酬 -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div class="bg-blue-500 text-white p-4">
          <h3 class="text-lg font-semibold">{{ t('salaryCalculator.currentPackage') }}</h3>
        </div>
        <div class="p-6">
          <div v-if="currentPackage.totalPackage > 0" class="space-y-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600 mb-2">{{ formatCurrency(currentPackage.totalPackage) }}</div>
              <div class="text-sm text-gray-600">{{ t('salaryCalculator.totalPackage') }}</div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-xl font-bold text-blue-600">{{ formatCurrency(currentPackage.monthlySalary) }}</div>
                <div class="text-xs text-gray-600">{{ t('salaryCalculator.monthlySalary') }}</div>
              </div>
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-xl font-bold text-blue-600">{{ formatCurrency(currentPackage.hourlyRate) }}</div>
                <div class="text-xs text-gray-600">{{ t('salaryCalculator.hourlyRate') }}</div>
              </div>
            </div>
            
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">{{ t('salaryCalculator.workDaysPerMonth') }}</span>
                <span class="font-mono">{{ workDaysPerMonth }} {{ t('salaryCalculator.days') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">{{ t('salaryCalculator.totalWorkHoursPerMonth') }}</span>
                <span class="font-mono">{{ totalWorkHoursPerMonth }} {{ t('salaryCalculator.hours') }}</span>
              </div>
              <div v-if="currentPackage.yearEndBonus > 0" class="flex justify-between">
                <span class="text-gray-600">{{ t('salaryCalculator.yearEndBonus') }}</span>
                <span class="font-mono">{{ formatCurrency(currentPackage.yearEndBonus) }}</span>
              </div>
              <div v-if="currentPackage.stockOptions > 0" class="flex justify-between">
                <span class="text-gray-600">{{ t('salaryCalculator.stockOptions') }}</span>
                <span class="font-mono">{{ formatCurrency(currentPackage.stockOptions) }}</span>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <div class="text-sm">{{ t('salaryCalculator.enterBasicInfo') }}</div>
          </div>
        </div>
      </div>

      <!-- 右侧：新薪酬 -->
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div class="bg-green-500 text-white p-4">
          <h3 class="text-lg font-semibold">{{ t('salaryCalculator.newPackage') }}</h3>
        </div>
        <div class="p-6">
          <div v-if="newPackage.totalPackage > 0" class="space-y-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">{{ formatCurrency(newPackage.totalPackage) }}</div>
              <div class="text-sm text-gray-600">{{ t('salaryCalculator.totalPackage') }}</div>
              <div class="text-xs text-green-500 mt-1">+{{ formatCurrency(newPackage.totalPackage - currentPackage.totalPackage) }}</div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-xl font-bold text-green-600">{{ formatCurrency(newPackage.monthlySalary) }}</div>
                <div class="text-xs text-gray-600">{{ t('salaryCalculator.monthlySalary') }}</div>
                <div class="text-xs text-green-500 mt-1">+{{ formatCurrency(newPackage.monthlySalary - currentPackage.monthlySalary) }}</div>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-xl font-bold text-green-600">{{ formatCurrency(newPackage.hourlyRate) }}</div>
                <div class="text-xs text-gray-600">{{ t('salaryCalculator.hourlyRate') }}</div>
                <div class="text-xs text-green-500 mt-1">+{{ formatCurrency(newPackage.hourlyRate - currentPackage.hourlyRate) }}</div>
              </div>
            </div>
            
            <div class="text-center p-4 bg-green-50 rounded-lg">
              <div class="text-lg font-bold text-green-600">+{{ raisePercentage }}%</div>
              <div class="text-xs text-gray-600">{{ t('salaryCalculator.raisePercentage') }}</div>
            </div>
            
            <div v-if="newPackage.yearEndBonus > 0 || newPackage.stockOptions > 0" class="space-y-2 text-sm">
              <div v-if="newPackage.yearEndBonus > 0" class="flex justify-between">
                <span class="text-gray-600">{{ t('salaryCalculator.yearEndBonus') }}</span>
                <span class="font-mono text-green-600">{{ formatCurrency(newPackage.yearEndBonus) }}</span>
              </div>
              <div v-if="newPackage.stockOptions > 0" class="flex justify-between">
                <span class="text-gray-600">{{ t('salaryCalculator.stockOptions') }}</span>
                <span class="font-mono text-green-600">{{ formatCurrency(newPackage.stockOptions) }}</span>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            <div class="text-sm">{{ t('salaryCalculator.enterRaisePercentage') }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 详细对比表格 -->
    <div v-if="currentPackage.totalPackage > 0 && newPackage.totalPackage > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('salaryCalculator.detailedComparison') }}</h3>
      <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 px-4 font-medium text-gray-700">{{ t('salaryCalculator.item') }}</th>
                <th class="text-right py-3 px-4 font-medium text-gray-700">{{ t('salaryCalculator.current') }}</th>
                <th class="text-right py-3 px-4 font-medium text-gray-700">{{ t('salaryCalculator.new') }}</th>
                <th class="text-right py-3 px-4 font-medium text-gray-700">{{ t('salaryCalculator.difference') }}</th>
                <th class="text-right py-3 px-4 font-medium text-gray-700">{{ t('salaryCalculator.percentage') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="py-3 px-4 font-medium text-gray-700">{{ t('salaryCalculator.totalPackage') }}</td>
                <td class="py-3 px-4 text-right font-mono">{{ formatCurrency(currentPackage.totalPackage) }}</td>
                <td class="py-3 px-4 text-right font-mono">{{ formatCurrency(newPackage.totalPackage) }}</td>
                <td class="py-3 px-4 text-right font-mono text-green-600">+{{ formatCurrency(newPackage.totalPackage - currentPackage.totalPackage) }}</td>
                <td class="py-3 px-4 text-right font-mono text-green-600">+{{ raisePercentage }}%</td>
              </tr>
              <tr>
                <td class="py-3 px-4 font-medium text-gray-700">{{ t('salaryCalculator.monthlySalary') }}</td>
                <td class="py-3 px-4 text-right font-mono">{{ formatCurrency(currentPackage.monthlySalary) }}</td>
                <td class="py-3 px-4 text-right font-mono">{{ formatCurrency(newPackage.monthlySalary) }}</td>
                <td class="py-3 px-4 text-right font-mono text-blue-600">+{{ formatCurrency(newPackage.monthlySalary - currentPackage.monthlySalary) }}</td>
                <td class="py-3 px-4 text-right font-mono text-blue-600">+{{ raisePercentage }}%</td>
              </tr>
              <tr>
                <td class="py-3 px-4 font-medium text-gray-700">{{ t('salaryCalculator.hourlyRate') }}</td>
                <td class="py-3 px-4 text-right font-mono">{{ formatCurrency(currentPackage.hourlyRate) }}</td>
                <td class="py-3 px-4 text-right font-mono">{{ formatCurrency(newPackage.hourlyRate) }}</td>
                <td class="py-3 px-4 text-right font-mono text-purple-600">+{{ formatCurrency(newPackage.hourlyRate - currentPackage.hourlyRate) }}</td>
                <td class="py-3 px-4 text-right font-mono text-purple-600">+{{ raisePercentage }}%</td>
              </tr>
              <tr v-if="currentPackage.yearEndBonus > 0 || newPackage.yearEndBonus > 0">
                <td class="py-3 px-4 font-medium text-gray-700">{{ t('salaryCalculator.yearEndBonus') }}</td>
                <td class="py-3 px-4 text-right font-mono">{{ formatCurrency(currentPackage.yearEndBonus) }}</td>
                <td class="py-3 px-4 text-right font-mono">{{ formatCurrency(newPackage.yearEndBonus) }}</td>
                <td class="py-3 px-4 text-right font-mono text-green-600">+{{ formatCurrency(newPackage.yearEndBonus - currentPackage.yearEndBonus) }}</td>
                <td class="py-3 px-4 text-right font-mono text-green-600">+{{ raisePercentage }}%</td>
              </tr>
              <tr v-if="currentPackage.stockOptions > 0 || newPackage.stockOptions > 0">
                <td class="py-3 px-4 font-medium text-gray-700">{{ t('salaryCalculator.stockOptions') }}</td>
                <td class="py-3 px-4 text-right font-mono">{{ formatCurrency(currentPackage.stockOptions) }}</td>
                <td class="py-3 px-4 text-right font-mono">{{ formatCurrency(newPackage.stockOptions) }}</td>
                <td class="py-3 px-4 text-right font-mono text-green-600">+{{ formatCurrency(newPackage.stockOptions - currentPackage.stockOptions) }}</td>
                <td class="py-3 px-4 text-right font-mono text-green-600">+{{ raisePercentage }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 基础数据
const monthlySalary = ref(0)
const salaryUnit = ref('元')
const payFrequency = ref(12)
const workHoursPerDay = ref(8)
const raisePercentage = ref(0)

// 年终奖数据
const yearEndBonusType = ref('none')
const yearEndBonusFixed = ref(0)
const yearEndBonusCoefficient = ref(0)

// 股票期权数据
const stockOptionsType = ref('none')
const stockOptionsAmount = ref(0)

// 快速涨幅选项
const quickRaiseOptions = [5, 10, 15, 20, 25, 30, 50]

// 计算结果
const currentPackage = ref({
  totalPackage: 0,
  monthlySalary: 0,
  hourlyRate: 0
})

const newPackage = ref({
  totalPackage: 0,
  monthlySalary: 0,
  hourlyRate: 0
})

// 计算属性
const workDaysPerMonth = computed(() => 22) // 假设每月工作22天
const totalWorkHoursPerMonth = computed(() => workDaysPerMonth.value * workHoursPerDay.value)
const totalWorkHoursPerYear = computed(() => totalWorkHoursPerMonth.value * 12)
const monthlyBonus = computed(() => {
  const extraMonths = payFrequency.value - 12
  return extraMonths > 0 ? (monthlySalary.value * extraMonths) / 12 : 0
})
const yearlyBonus = computed(() => monthlyBonus.value * 12)
const bonusPercentage = computed(() => {
  if (payFrequency.value <= 12) return 0
  return ((payFrequency.value - 12) / 12 * 100).toFixed(1)
})

// 计算方法
const calculateCurrentPackage = () => {
  if (!monthlySalary.value || !workHoursPerDay.value) return
  
  // 转换月薪为元
  const monthlySalaryInYuan = salaryUnit.value === '万' ? monthlySalary.value * 10000 : monthlySalary.value
  
  // 计算年终奖
  let yearEndBonus = 0
  if (yearEndBonusType.value === 'fixed') {
    yearEndBonus = salaryUnit.value === '万' ? yearEndBonusFixed.value * 10000 : yearEndBonusFixed.value
  } else if (yearEndBonusType.value === 'coefficient') {
    yearEndBonus = monthlySalaryInYuan * yearEndBonusCoefficient.value
  }
  
  // 计算股票期权
  const stockOptions = stockOptionsType.value === 'has' 
    ? (salaryUnit.value === '万' ? stockOptionsAmount.value * 10000 : stockOptionsAmount.value)
    : 0
  
  const totalPackage = monthlySalaryInYuan * payFrequency.value + yearEndBonus + stockOptions
  const hourlyRate = monthlySalaryInYuan / totalWorkHoursPerMonth.value
  
  currentPackage.value = {
    totalPackage,
    monthlySalary: monthlySalaryInYuan,
    hourlyRate,
    yearEndBonus,
    stockOptions
  }
}

const calculateNewPackage = () => {
  if (!currentPackage.value.totalPackage || !raisePercentage.value) return
  
  const multiplier = 1 + (raisePercentage.value / 100)
  const newTotalPackage = currentPackage.value.totalPackage * multiplier
  const newMonthlySalary = currentPackage.value.monthlySalary * multiplier
  const newHourlyRate = currentPackage.value.hourlyRate * multiplier
  const newYearEndBonus = currentPackage.value.yearEndBonus * multiplier
  const newStockOptions = currentPackage.value.stockOptions * multiplier
  
  newPackage.value = {
    totalPackage: newTotalPackage,
    monthlySalary: newMonthlySalary,
    hourlyRate: newHourlyRate,
    yearEndBonus: newYearEndBonus,
    stockOptions: newStockOptions
  }
}

const calculateAll = () => {
  calculateCurrentPackage()
  calculateNewPackage()
}

const setQuickRaise = (percentage) => {
  raisePercentage.value = percentage
  calculateNewPackage()
}

// 格式化货币
const formatCurrency = (amount) => {
  if (!amount) return '0'
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// 监听数据变化
watch([monthlySalary, salaryUnit, payFrequency, workHoursPerDay, yearEndBonusType, yearEndBonusFixed, yearEndBonusCoefficient, stockOptionsType, stockOptionsAmount], calculateCurrentPackage)
watch([raisePercentage], calculateNewPackage)
</script>

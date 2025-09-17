<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {{ t('socialSecurityCalculator.title') }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ t('socialSecurityCalculator.subtitle') }}
      </p>
    </div>

    <!-- 输入区域 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {{ t('socialSecurityCalculator.inputSection') }}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 城市选择 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('socialSecurityCalculator.city') }}
          </label>
          <select 
            v-model="selectedCity" 
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            @change="calculateSocialSecurity"
          >
            <option value="">{{ t('socialSecurityCalculator.selectCity') }}</option>
            <option v-for="city in cities" :key="city.code" :value="city.code">
              {{ city.name }}
            </option>
          </select>
        </div>

        <!-- 工资输入 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('socialSecurityCalculator.salary') }}
          </label>
          <div class="relative">
            <input
              v-model.number="salary"
              type="number"
              :placeholder="t('socialSecurityCalculator.enterSalary')"
              class="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              @input="calculateSocialSecurity"
            />
            <span class="absolute right-3 top-3 text-gray-500 dark:text-gray-400">元</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 计算结果 -->
    <div v-if="calculationResult" class="space-y-6">
      <!-- 总览卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- 个人缴纳总额 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                {{ t('socialSecurityCalculator.personalTotal') }}
              </p>
              <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ¥{{ formatNumber(calculationResult.personalTotal) }}
              </p>
            </div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <span class="text-blue-600 dark:text-blue-400 text-xl">👤</span>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                :style="{ width: Math.min(getPersonalPercentage(), 100) + '%' }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {{ getPersonalPercentage().toFixed(1) }}% {{ t('socialSecurityCalculator.ofSalary') }}
            </p>
          </div>
        </div>

        <!-- 公司缴纳总额 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                {{ t('socialSecurityCalculator.companyTotal') }}
              </p>
              <p class="text-2xl font-bold text-green-600 dark:text-green-400">
                ¥{{ formatNumber(calculationResult.companyTotal) }}
              </p>
            </div>
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <span class="text-green-600 dark:text-green-400 text-xl">🏢</span>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                class="bg-green-500 h-2 rounded-full transition-all duration-300"
                :style="{ width: Math.min(getCompanyPercentage(), 100) + '%' }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {{ getCompanyPercentage().toFixed(1) }}% {{ t('socialSecurityCalculator.ofSalary') }}
            </p>
          </div>
        </div>

        <!-- 个人税后收入 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                {{ t('socialSecurityCalculator.afterTaxIncome') }}
              </p>
              <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                ¥{{ formatNumber(calculationResult.afterTaxIncome) }}
              </p>
            </div>
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <span class="text-purple-600 dark:text-purple-400 text-xl">💰</span>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                class="bg-purple-500 h-2 rounded-full transition-all duration-300"
                :style="{ width: Math.min(getAfterTaxPercentage(), 100) + '%' }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {{ getAfterTaxPercentage().toFixed(1) }}% {{ t('socialSecurityCalculator.ofSalary') }}
            </p>
          </div>
        </div>

        <!-- 公司总支出 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                {{ t('socialSecurityCalculator.companyTotalCost') }}
              </p>
              <p class="text-2xl font-bold text-orange-600 dark:text-orange-400">
                ¥{{ formatNumber(calculationResult.companyTotalCost) }}
              </p>
            </div>
            <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <span class="text-orange-600 dark:text-orange-400 text-xl">📊</span>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                class="bg-orange-500 h-2 rounded-full transition-all duration-300"
                :style="{ width: Math.min(getCompanyCostPercentage(), 100) + '%' }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {{ getCompanyCostPercentage().toFixed(1) }}% {{ t('socialSecurityCalculator.ofSalary') }}
            </p>
          </div>
        </div>
      </div>

      <!-- 详细明细表格 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 个人缴纳明细 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <span class="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-3">
              <span class="text-blue-600 dark:text-blue-400 text-sm">👤</span>
            </span>
            {{ t('socialSecurityCalculator.personalDetails') }}
          </h4>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    {{ t('socialSecurityCalculator.item') }}
                  </th>
                  <th class="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    {{ t('socialSecurityCalculator.rate') }}
                  </th>
                  <th class="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    {{ t('socialSecurityCalculator.amount') }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="item in calculationResult.personalDetails" :key="item.name">
                  <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    {{ t(`socialSecurityCalculator.items.${item.name}`) }}
                  </td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">
                    {{ item.rate }}%
                  </td>
                  <td class="py-3 px-4 text-right font-mono text-blue-600 dark:text-blue-400">
                    ¥{{ formatNumber(item.amount) }}
                  </td>
                </tr>
                <tr class="border-t-2 border-gray-300 dark:border-gray-600">
                  <td class="py-3 px-4 font-bold text-gray-900 dark:text-gray-100">
                    {{ t('socialSecurityCalculator.total') }}
                  </td>
                  <td class="py-3 px-4 text-right font-bold text-gray-900 dark:text-gray-100">
                    {{ calculationResult.personalTotalRate }}%
                  </td>
                  <td class="py-3 px-4 text-right font-mono font-bold text-blue-600 dark:text-blue-400">
                    ¥{{ formatNumber(calculationResult.personalTotal) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 公司缴纳明细 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <span class="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-3">
              <span class="text-green-600 dark:text-green-400 text-sm">🏢</span>
            </span>
            {{ t('socialSecurityCalculator.companyDetails') }}
          </h4>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    {{ t('socialSecurityCalculator.item') }}
                  </th>
                  <th class="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    {{ t('socialSecurityCalculator.rate') }}
                  </th>
                  <th class="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    {{ t('socialSecurityCalculator.amount') }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="item in calculationResult.companyDetails" :key="item.name">
                  <td class="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    {{ t(`socialSecurityCalculator.items.${item.name}`) }}
                  </td>
                  <td class="py-3 px-4 text-right text-gray-600 dark:text-gray-400">
                    {{ item.rate }}%
                  </td>
                  <td class="py-3 px-4 text-right font-mono text-green-600 dark:text-green-400">
                    ¥{{ formatNumber(item.amount) }}
                  </td>
                </tr>
                <tr class="border-t-2 border-gray-300 dark:border-gray-600">
                  <td class="py-3 px-4 font-bold text-gray-900 dark:text-gray-100">
                    {{ t('socialSecurityCalculator.total') }}
                  </td>
                  <td class="py-3 px-4 text-right font-bold text-gray-900 dark:text-gray-100">
                    {{ calculationResult.companyTotalRate }}%
                  </td>
                  <td class="py-3 px-4 text-right font-mono font-bold text-green-600 dark:text-green-400">
                    ¥{{ formatNumber(calculationResult.companyTotal) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用提示 -->
    <div v-if="!calculationResult" class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
      <div class="flex items-start space-x-2">
        <span class="text-yellow-600 dark:text-yellow-400">💡</span>
        <div class="text-sm text-yellow-800 dark:text-yellow-200">
          <p class="font-medium">{{ t('socialSecurityCalculator.tips.title') }}</p>
          <ul class="mt-1 space-y-1">
            <li>• {{ t('socialSecurityCalculator.tips.selectCity') }}</li>
            <li>• {{ t('socialSecurityCalculator.tips.enterSalary') }}</li>
            <li>• {{ t('socialSecurityCalculator.tips.autoCalculate') }}</li>
            <li>• {{ t('socialSecurityCalculator.tips.referenceOnly') }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 免责声明 -->
    <div v-if="calculationResult" class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div class="flex items-start space-x-2">
        <span class="text-gray-500 dark:text-gray-400">⚠️</span>
        <div class="text-sm text-gray-600 dark:text-gray-300">
          <p class="font-medium">{{ t('socialSecurityCalculator.disclaimer.title') }}</p>
          <p class="mt-1">{{ t('socialSecurityCalculator.disclaimer.content') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 响应式数据
const selectedCity = ref('')
const salary = ref(0)
const calculationResult = ref(null)

// 城市数据
const cities = ref([
  { code: 'beijing', name: '北京' },
  { code: 'shanghai', name: '上海' },
  { code: 'guangzhou', name: '广州' },
  { code: 'shenzhen', name: '深圳' },
  { code: 'hangzhou', name: '杭州' },
  { code: 'nanjing', name: '南京' },
  { code: 'wuhan', name: '武汉' },
  { code: 'chengdu', name: '成都' },
  { code: 'xian', name: '西安' },
  { code: 'qingdao', name: '青岛' },
  { code: 'dalian', name: '大连' },
  { code: 'suzhou', name: '苏州' },
  { code: 'ningbo', name: '宁波' },
  { code: 'xiamen', name: '厦门' },
  { code: 'chongqing', name: '重庆' },
  { code: 'tianjin', name: '天津' },
  { code: 'changsha', name: '长沙' },
  { code: 'zhengzhou', name: '郑州' },
  { code: 'jinan', name: '济南' },
  { code: 'hefei', name: '合肥' }
])

// 社保公积金比例数据
const socialSecurityRates = {
  beijing: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 9 },
    unemployment: { personal: 0.2, company: 0.8 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.8 },
    housingFund: { personal: 12, company: 12 }
  },
  shanghai: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 9.5 },
    unemployment: { personal: 0.5, company: 0.5 },
    workInjury: { personal: 0, company: 0.16 },
    maternity: { personal: 0, company: 1 },
    housingFund: { personal: 7, company: 7 }
  },
  guangzhou: {
    pension: { personal: 8, company: 14 },
    medical: { personal: 2, company: 6.5 },
    unemployment: { personal: 0.2, company: 0.48 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.85 },
    housingFund: { personal: 5, company: 5 }
  },
  shenzhen: {
    pension: { personal: 8, company: 13 },
    medical: { personal: 2, company: 6.2 },
    unemployment: { personal: 0.3, company: 0.7 },
    workInjury: { personal: 0, company: 0.14 },
    maternity: { personal: 0, company: 0.45 },
    housingFund: { personal: 5, company: 5 }
  },
  hangzhou: {
    pension: { personal: 8, company: 14 },
    medical: { personal: 2, company: 9.5 },
    unemployment: { personal: 0.5, company: 0.5 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 1.2 },
    housingFund: { personal: 12, company: 12 }
  },
  nanjing: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 9 },
    unemployment: { personal: 0.5, company: 0.5 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.8 },
    housingFund: { personal: 8, company: 8 }
  },
  wuhan: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 8 },
    unemployment: { personal: 0.3, company: 0.7 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.7 },
    housingFund: { personal: 12, company: 12 }
  },
  chengdu: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 7.5 },
    unemployment: { personal: 0.4, company: 0.6 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.6 },
    housingFund: { personal: 12, company: 12 }
  },
  xian: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 7 },
    unemployment: { personal: 0.3, company: 0.7 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.5 },
    housingFund: { personal: 12, company: 12 }
  },
  qingdao: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 8.5 },
    unemployment: { personal: 0.3, company: 0.7 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 1 },
    housingFund: { personal: 12, company: 12 }
  },
  dalian: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 8 },
    unemployment: { personal: 0.5, company: 0.5 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.8 },
    housingFund: { personal: 12, company: 12 }
  },
  suzhou: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 8 },
    unemployment: { personal: 0.5, company: 0.5 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.8 },
    housingFund: { personal: 12, company: 12 }
  },
  ningbo: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 9 },
    unemployment: { personal: 0.5, company: 0.5 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.8 },
    housingFund: { personal: 12, company: 12 }
  },
  xiamen: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 8 },
    unemployment: { personal: 0.5, company: 0.5 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.8 },
    housingFund: { personal: 12, company: 12 }
  },
  chongqing: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 8.5 },
    unemployment: { personal: 0.5, company: 0.5 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.7 },
    housingFund: { personal: 12, company: 12 }
  },
  tianjin: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 10 },
    unemployment: { personal: 0.5, company: 0.5 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.5 },
    housingFund: { personal: 12, company: 12 }
  },
  changsha: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 8 },
    unemployment: { personal: 0.3, company: 0.7 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.7 },
    housingFund: { personal: 12, company: 12 }
  },
  zhengzhou: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 8 },
    unemployment: { personal: 0.3, company: 0.7 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 1 },
    housingFund: { personal: 12, company: 12 }
  },
  jinan: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 8 },
    unemployment: { personal: 0.3, company: 0.7 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.8 },
    housingFund: { personal: 12, company: 12 }
  },
  hefei: {
    pension: { personal: 8, company: 16 },
    medical: { personal: 2, company: 8 },
    unemployment: { personal: 0.5, company: 0.5 },
    workInjury: { personal: 0, company: 0.2 },
    maternity: { personal: 0, company: 0.8 },
    housingFund: { personal: 12, company: 12 }
  }
}

// 计算社保公积金
const calculateSocialSecurity = () => {
  if (!selectedCity.value || !salary.value || salary.value <= 0) {
    calculationResult.value = null
    return
  }

  const rates = socialSecurityRates[selectedCity.value]
  if (!rates) {
    calculationResult.value = null
    return
  }

  const personalDetails = []
  const companyDetails = []
  let personalTotal = 0
  let companyTotal = 0

  // 计算各项明细
  Object.entries(rates).forEach(([key, rate]) => {
    const personalAmount = (salary.value * rate.personal / 100)
    const companyAmount = (salary.value * rate.company / 100)
    
    personalDetails.push({
      name: key,
      rate: rate.personal,
      amount: personalAmount
    })
    
    companyDetails.push({
      name: key,
      rate: rate.company,
      amount: companyAmount
    })
    
    personalTotal += personalAmount
    companyTotal += companyAmount
  })

  const personalTotalRate = personalDetails.reduce((sum, item) => sum + item.rate, 0)
  const companyTotalRate = companyDetails.reduce((sum, item) => sum + item.rate, 0)
  const afterTaxIncome = salary.value - personalTotal
  const companyTotalCost = salary.value + companyTotal

  calculationResult.value = {
    personalDetails,
    companyDetails,
    personalTotal,
    companyTotal,
    personalTotalRate,
    companyTotalRate,
    afterTaxIncome,
    companyTotalCost
  }
}

// 计算百分比
const getPersonalPercentage = () => {
  if (!calculationResult.value || !salary.value) return 0
  return (calculationResult.value.personalTotal / salary.value) * 100
}

const getCompanyPercentage = () => {
  if (!calculationResult.value || !salary.value) return 0
  return (calculationResult.value.companyTotal / salary.value) * 100
}

const getAfterTaxPercentage = () => {
  if (!calculationResult.value || !salary.value) return 0
  return (calculationResult.value.afterTaxIncome / salary.value) * 100
}

const getCompanyCostPercentage = () => {
  if (!calculationResult.value || !salary.value) return 0
  return (calculationResult.value.companyTotalCost / salary.value) * 100
}

// 格式化数字
const formatNumber = (num) => {
  return Math.round(num).toLocaleString()
}

// 监听变化
watch([selectedCity, salary], calculateSocialSecurity)
</script>

<style scoped>
/* 自定义样式 */
.transition-all {
  transition: all 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .grid-cols-1.md\\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) {
  .grid-cols-1.lg\\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>

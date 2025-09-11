<template>
  <div class="space-y-6">
    <!-- 单位转换器 -->
    <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('unitConverter.title') }}</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('unitConverter.conversionType') }}</label>
            <select
              v-model="conversionType"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="length">{{ t('unitConverter.types.length') }}</option>
              <option value="weight">{{ t('unitConverter.types.weight') }}</option>
              <option value="temperature">{{ t('unitConverter.types.temperature') }}</option>
              <option value="area">{{ t('unitConverter.types.area') }}</option>
              <option value="volume">{{ t('unitConverter.types.volume') }}</option>
              <option value="time">{{ t('unitConverter.types.time') }}</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('unitConverter.inputValue') }}</label>
            <input
              v-model.number="inputValue"
              type="number"
              step="any"
              :placeholder="t('unitConverter.enterValue')"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('unitConverter.fromUnit') }}</label>
            <select
              v-model="fromUnit"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option v-for="unit in getUnits(conversionType)" :key="unit.value" :value="unit.value">
                {{ unit.label }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('unitConverter.toUnit') }}</label>
            <select
              v-model="toUnit"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option v-for="unit in getUnits(conversionType)" :key="unit.value" :value="unit.value">
                {{ unit.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="mt-6 text-center">
        <button
          @click="convert"
          class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          {{ t('unitConverter.convert') }}
        </button>
      </div>
    </div>

    <!-- 转换结果 -->
    <div v-if="conversionResult !== null" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('unitConverter.conversionResult') }}</h3>
      <div class="bg-gray-50 p-6 rounded-lg">
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">{{ conversionResult }}</div>
          <div class="text-lg text-gray-600">
            {{ inputValue }} {{ getUnitLabel(fromUnit) }} = {{ conversionResult }} {{ getUnitLabel(toUnit) }}
          </div>
        </div>
      </div>
    </div>

    <!-- 快速转换 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ t('unitConverter.quickConversions') }}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="quick in quickConversions"
          :key="quick.name"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="loadQuickConversion(quick)"
        >
          <div class="font-medium text-gray-900">{{ quick.name }}</div>
          <div class="text-sm text-gray-600 mt-1">{{ quick.description }}</div>
        </div>
      </div>
    </div>

    <!-- 转换历史 -->
    <div v-if="conversionHistory.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">转换历史</h3>
      <div class="space-y-2">
        <div
          v-for="(record, index) in conversionHistory"
          :key="index"
          class="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
        >
          <div>
            <div class="font-medium">{{ record.input }} {{ record.fromUnit }} = {{ record.result }} {{ record.toUnit }}</div>
            <div class="text-sm text-gray-600">{{ record.type }}</div>
          </div>
          <button
            @click="removeHistory(index)"
            class="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const conversionType = ref('length')
const inputValue = ref(1)
const fromUnit = ref('meter')
const toUnit = ref('kilometer')
const conversionResult = ref(null)
const conversionHistory = ref([])

const units = computed(() => ({
  length: [
    { value: 'millimeter', label: t('unitConverter.units.millimeter'), factor: 0.001 },
    { value: 'centimeter', label: t('unitConverter.units.centimeter'), factor: 0.01 },
    { value: 'meter', label: t('unitConverter.units.meter'), factor: 1 },
    { value: 'kilometer', label: t('unitConverter.units.kilometer'), factor: 1000 },
    { value: 'inch', label: t('unitConverter.units.inch'), factor: 0.0254 },
    { value: 'foot', label: t('unitConverter.units.foot'), factor: 0.3048 },
    { value: 'yard', label: t('unitConverter.units.yard'), factor: 0.9144 },
    { value: 'mile', label: t('unitConverter.units.mile'), factor: 1609.344 }
  ],
  weight: [
    { value: 'gram', label: t('unitConverter.units.gram'), factor: 1 },
    { value: 'kilogram', label: t('unitConverter.units.kilogram'), factor: 1000 },
    { value: 'pound', label: t('unitConverter.units.pound'), factor: 453.592 },
    { value: 'ounce', label: t('unitConverter.units.ounce'), factor: 28.3495 },
    { value: 'ton', label: t('unitConverter.units.ton'), factor: 1000000 }
  ],
  temperature: [
    { value: 'celsius', label: t('unitConverter.units.celsius'), factor: 1 },
    { value: 'fahrenheit', label: t('unitConverter.units.fahrenheit'), factor: 1 },
    { value: 'kelvin', label: t('unitConverter.units.kelvin'), factor: 1 }
  ],
  area: [
    { value: 'square_meter', label: t('unitConverter.units.squareMeter'), factor: 1 },
    { value: 'square_kilometer', label: t('unitConverter.units.squareKilometer'), factor: 1000000 },
    { value: 'square_foot', label: t('unitConverter.units.squareFoot'), factor: 0.092903 },
    { value: 'acre', label: t('unitConverter.units.acre'), factor: 4046.86 },
    { value: 'hectare', label: t('unitConverter.units.hectare'), factor: 10000 }
  ],
  volume: [
    { value: 'milliliter', label: t('unitConverter.units.milliliter'), factor: 0.001 },
    { value: 'liter', label: t('unitConverter.units.liter'), factor: 1 },
    { value: 'cubic_meter', label: t('unitConverter.units.cubicMeter'), factor: 1000 },
    { value: 'gallon', label: t('unitConverter.units.gallon'), factor: 3.78541 },
    { value: 'quart', label: t('unitConverter.units.quart'), factor: 0.946353 }
  ],
  time: [
    { value: 'second', label: t('unitConverter.units.second'), factor: 1 },
    { value: 'minute', label: t('unitConverter.units.minute'), factor: 60 },
    { value: 'hour', label: t('unitConverter.units.hour'), factor: 3600 },
    { value: 'day', label: t('unitConverter.units.day'), factor: 86400 },
    { value: 'week', label: t('unitConverter.units.week'), factor: 604800 },
    { value: 'month', label: t('unitConverter.units.month'), factor: 2628000 },
    { value: 'year', label: t('unitConverter.units.year'), factor: 31536000 }
  ]
}))

const quickConversions = computed(() => [
  { name: t('unitConverter.quickConversions.meterToFoot'), type: 'length', from: 'meter', to: 'foot', value: 1 },
  { name: t('unitConverter.quickConversions.kilogramToPound'), type: 'weight', from: 'kilogram', to: 'pound', value: 1 },
  { name: t('unitConverter.quickConversions.celsiusToFahrenheit'), type: 'temperature', from: 'celsius', to: 'fahrenheit', value: 100 },
  { name: t('unitConverter.quickConversions.literToGallon'), type: 'volume', from: 'liter', to: 'gallon', value: 1 },
  { name: t('unitConverter.quickConversions.hourToMinute'), type: 'time', from: 'hour', to: 'minute', value: 1 }
])

const getUnits = (type) => {
  return units.value[type] || []
}

const getUnitLabel = (unitValue) => {
  const unit = getUnits(conversionType.value).find(u => u.value === unitValue)
  return unit ? unit.label.split(' ')[0] : unitValue
}

const convert = () => {
  if (conversionType.value === 'temperature') {
    conversionResult.value = convertTemperature(inputValue.value, fromUnit.value, toUnit.value)
  } else {
    const fromFactor = getUnits(conversionType.value).find(u => u.value === fromUnit.value)?.factor || 1
    const toFactor = getUnits(conversionType.value).find(u => u.value === toUnit.value)?.factor || 1
    conversionResult.value = ((inputValue.value * fromFactor) / toFactor).toFixed(6)
  }
  
  // 添加到历史记录
  addToHistory()
}

const convertTemperature = (value, from, to) => {
  let celsius = value
  
  if (from === 'fahrenheit') {
    celsius = (value - 32) * 5/9
  } else if (from === 'kelvin') {
    celsius = value - 273.15
  }
  
  if (to === 'fahrenheit') {
    return (celsius * 9/5 + 32).toFixed(2)
  } else if (to === 'kelvin') {
    return (celsius + 273.15).toFixed(2)
  } else {
    return celsius.toFixed(2)
  }
}

const addToHistory = () => {
  const record = {
    input: inputValue.value,
    fromUnit: getUnitLabel(fromUnit.value),
    result: conversionResult.value,
    toUnit: getUnitLabel(toUnit.value),
    type: getUnits(conversionType.value)[0]?.label.split(' ')[0] || conversionType.value
  }
  
  conversionHistory.value.unshift(record)
  if (conversionHistory.value.length > 10) {
    conversionHistory.value = conversionHistory.value.slice(0, 10)
  }
}

const loadQuickConversion = (quick) => {
  conversionType.value = quick.type
  inputValue.value = quick.value
  fromUnit.value = quick.from
  toUnit.value = quick.to
  convert()
}

const removeHistory = (index) => {
  conversionHistory.value.splice(index, 1)
}
</script>

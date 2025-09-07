<template>
  <div class="space-y-6">
    <!-- 单位转换器 -->
    <div class="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">单位转换器</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">转换类型</label>
            <select
              v-model="conversionType"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="length">长度</option>
              <option value="weight">重量</option>
              <option value="temperature">温度</option>
              <option value="area">面积</option>
              <option value="volume">体积</option>
              <option value="time">时间</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">输入值</label>
            <input
              v-model.number="inputValue"
              type="number"
              step="any"
              placeholder="输入数值"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">从单位</label>
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
            <label class="block text-sm font-medium text-gray-700 mb-2">到单位</label>
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
          转换
        </button>
      </div>
    </div>

    <!-- 转换结果 -->
    <div v-if="conversionResult !== null" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">转换结果</h3>
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
      <h3 class="text-lg font-semibold text-gray-900">快速转换</h3>
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

const conversionType = ref('length')
const inputValue = ref(1)
const fromUnit = ref('meter')
const toUnit = ref('kilometer')
const conversionResult = ref(null)
const conversionHistory = ref([])

const units = {
  length: [
    { value: 'millimeter', label: '毫米 (mm)', factor: 0.001 },
    { value: 'centimeter', label: '厘米 (cm)', factor: 0.01 },
    { value: 'meter', label: '米 (m)', factor: 1 },
    { value: 'kilometer', label: '千米 (km)', factor: 1000 },
    { value: 'inch', label: '英寸 (in)', factor: 0.0254 },
    { value: 'foot', label: '英尺 (ft)', factor: 0.3048 },
    { value: 'yard', label: '码 (yd)', factor: 0.9144 },
    { value: 'mile', label: '英里 (mi)', factor: 1609.344 }
  ],
  weight: [
    { value: 'gram', label: '克 (g)', factor: 1 },
    { value: 'kilogram', label: '千克 (kg)', factor: 1000 },
    { value: 'pound', label: '磅 (lb)', factor: 453.592 },
    { value: 'ounce', label: '盎司 (oz)', factor: 28.3495 },
    { value: 'ton', label: '吨 (t)', factor: 1000000 }
  ],
  temperature: [
    { value: 'celsius', label: '摄氏度 (°C)', factor: 1 },
    { value: 'fahrenheit', label: '华氏度 (°F)', factor: 1 },
    { value: 'kelvin', label: '开尔文 (K)', factor: 1 }
  ],
  area: [
    { value: 'square_meter', label: '平方米 (m²)', factor: 1 },
    { value: 'square_kilometer', label: '平方千米 (km²)', factor: 1000000 },
    { value: 'square_foot', label: '平方英尺 (ft²)', factor: 0.092903 },
    { value: 'acre', label: '英亩 (ac)', factor: 4046.86 },
    { value: 'hectare', label: '公顷 (ha)', factor: 10000 }
  ],
  volume: [
    { value: 'milliliter', label: '毫升 (ml)', factor: 0.001 },
    { value: 'liter', label: '升 (l)', factor: 1 },
    { value: 'cubic_meter', label: '立方米 (m³)', factor: 1000 },
    { value: 'gallon', label: '加仑 (gal)', factor: 3.78541 },
    { value: 'quart', label: '夸脱 (qt)', factor: 0.946353 }
  ],
  time: [
    { value: 'second', label: '秒 (s)', factor: 1 },
    { value: 'minute', label: '分钟 (min)', factor: 60 },
    { value: 'hour', label: '小时 (h)', factor: 3600 },
    { value: 'day', label: '天 (d)', factor: 86400 },
    { value: 'week', label: '周 (w)', factor: 604800 },
    { value: 'month', label: '月 (m)', factor: 2628000 },
    { value: 'year', label: '年 (y)', factor: 31536000 }
  ]
}

const quickConversions = ref([
  { name: '1米转英尺', type: 'length', from: 'meter', to: 'foot', value: 1 },
  { name: '1千克转磅', type: 'weight', from: 'kilogram', to: 'pound', value: 1 },
  { name: '100°C转°F', type: 'temperature', from: 'celsius', to: 'fahrenheit', value: 100 },
  { name: '1升转加仑', type: 'volume', from: 'liter', to: 'gallon', value: 1 },
  { name: '1小时转分钟', type: 'time', from: 'hour', to: 'minute', value: 1 }
])

const getUnits = (type) => {
  return units[type] || []
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

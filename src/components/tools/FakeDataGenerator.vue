<template>
  <div class="space-y-6">
    <!-- 假数据生成器 -->
    <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('fakeDataGenerator.title') }}</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('fakeDataGenerator.dataTypes') }}</label>
            <div class="space-y-2">
              <label v-for="type in dataTypes" :key="type.id" class="flex items-center">
                <input v-model="selectedTypes" :value="type.id" type="checkbox" class="mr-2" />
                {{ type.name }}
              </label>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('fakeDataGenerator.generateCount') }}</label>
            <input
              v-model.number="count"
              type="number"
              min="1"
              max="1000"
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('fakeDataGenerator.formatOptions') }}</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input v-model="includeHeaders" type="checkbox" class="mr-2" />
                {{ t('fakeDataGenerator.includeHeaders') }}
              </label>
              <label class="flex items-center">
                <input v-model="jsonFormat" type="checkbox" class="mr-2" />
                {{ t('fakeDataGenerator.jsonFormat') }}
              </label>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <button
              @click="generateData"
              class="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {{ t('fakeDataGenerator.generateData') }}
            </button>
            <button
              @click="clearResults"
              class="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {{ t('fakeDataGenerator.clear') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 生成的数据 -->
    <div v-if="generatedData.length > 0" class="space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">{{ t('fakeDataGenerator.generatedData') }}</h3>
        <button
          @click="copyData"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {{ t('fakeDataGenerator.copyData') }}
        </button>
      </div>
      
      <div class="bg-gray-50 p-4 rounded-lg overflow-auto">
        <pre class="text-sm font-mono whitespace-pre-wrap">{{ formattedData }}</pre>
      </div>
    </div>

    <!-- 统计信息 -->
    <div v-if="generatedData.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ generatedData.length }}</div>
        <div class="text-sm text-gray-600">生成条数</div>
      </div>
      <div class="bg-blue-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-blue-600">{{ selectedTypes.length }}</div>
        <div class="text-sm text-gray-600">数据类型</div>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-purple-600">{{ dataSize }}</div>
        <div class="text-sm text-gray-600">数据大小(KB)</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-orange-600">{{ formatType }}</div>
        <div class="text-sm text-gray-600">输出格式</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const selectedTypes = ref(['name', 'email'])
const count = ref(10)
const includeHeaders = ref(true)
const jsonFormat = ref(false)
const generatedData = ref([])

const dataTypes = computed(() => [
  { id: 'name', name: t('fakeDataGenerator.types.name'), generator: generateName },
  { id: 'email', name: t('fakeDataGenerator.types.email'), generator: generateEmail },
  { id: 'phone', name: t('fakeDataGenerator.types.phone'), generator: generatePhone },
  { id: 'address', name: t('fakeDataGenerator.types.address'), generator: generateAddress },
  { id: 'company', name: t('fakeDataGenerator.types.company'), generator: generateCompany },
  { id: 'job', name: t('fakeDataGenerator.types.job'), generator: generateJob },
  { id: 'website', name: t('fakeDataGenerator.types.website'), generator: generateWebsite },
  { id: 'date', name: t('fakeDataGenerator.types.date'), generator: generateDate },
  { id: 'age', name: t('fakeDataGenerator.types.age'), generator: generateAge },
  { id: 'id', name: t('fakeDataGenerator.types.id'), generator: generateId }
])

const formattedData = computed(() => {
  if (generatedData.value.length === 0) return ''
  
  if (jsonFormat.value) {
    return JSON.stringify(generatedData.value, null, 2)
  } else {
    if (includeHeaders.value && generatedData.value.length > 0) {
      const headers = selectedTypes.value.join('\t')
      const rows = generatedData.value.map(row => 
        selectedTypes.value.map(type => row[type] || '').join('\t')
      )
      return [headers, ...rows].join('\n')
    } else {
      return generatedData.value.map(row => 
        selectedTypes.value.map(type => row[type] || '').join('\t')
      ).join('\n')
    }
  }
})

const dataSize = computed(() => {
  return Math.round(JSON.stringify(generatedData.value).length / 1024 * 10) / 10
})

const formatType = computed(() => {
  return jsonFormat.value ? 'JSON' : 'TSV'
})

const generateData = () => {
  if (selectedTypes.value.length === 0) {
    alert(t('fakeDataGenerator.selectAtLeastOne'))
    return
  }
  
  generatedData.value = []
  
  for (let i = 0; i < count.value; i++) {
    const row = {}
    selectedTypes.value.forEach(type => {
      const generator = dataTypes.value.find(t => t.id === type)?.generator
      if (generator) {
        row[type] = generator()
      }
    })
    generatedData.value.push(row)
  }
}

const generateName = () => {
  const surnames = ['王', '李', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴']
  const names = ['伟', '芳', '娜', '秀英', '敏', '静', '丽', '强', '磊', '军']
  const surname = surnames[Math.floor(Math.random() * surnames.length)]
  const name = names[Math.floor(Math.random() * names.length)]
  return surname + name
}

const generateEmail = () => {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', '163.com', 'qq.com']
  const names = ['john', 'jane', 'mike', 'sarah', 'david', 'lisa', 'tom', 'mary']
  const name = names[Math.floor(Math.random() * names.length)]
  const domain = domains[Math.floor(Math.random() * domains.length)]
  return `${name}${Math.floor(Math.random() * 1000)}@${domain}`
}

const generatePhone = () => {
  const prefixes = ['138', '139', '158', '159', '188', '189']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  let phone = prefix
  for (let i = 0; i < 8; i++) {
    phone += Math.floor(Math.random() * 10)
  }
  return phone
}

const generateAddress = () => {
  const provinces = ['北京市', '上海市', '广东省', '江苏省', '浙江省', '山东省']
  const cities = ['北京市', '上海市', '广州市', '深圳市', '杭州市', '南京市']
  const districts = ['朝阳区', '海淀区', '西城区', '东城区', '丰台区', '石景山区']
  const streets = ['建国路', '长安街', '王府井', '西单', '东单', '三里屯']
  
  const province = provinces[Math.floor(Math.random() * provinces.length)]
  const city = cities[Math.floor(Math.random() * cities.length)]
  const district = districts[Math.floor(Math.random() * districts.length)]
  const street = streets[Math.floor(Math.random() * streets.length)]
  const number = Math.floor(Math.random() * 999) + 1
  
  return `${province}${city}${district}${street}${number}号`
}

const generateCompany = () => {
  const prefixes = ['北京', '上海', '深圳', '杭州', '广州', '南京']
  const suffixes = ['科技有限公司', '信息技术有限公司', '网络科技有限公司', '数据科技有限公司']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
  return `${prefix}${suffix}`
}

const generateJob = () => {
  const jobs = ['软件工程师', '产品经理', 'UI设计师', '数据分析师', '运营专员', '销售经理', '人事专员', '财务经理']
  return jobs[Math.floor(Math.random() * jobs.length)]
}

const generateWebsite = () => {
  const domains = ['example.com', 'test.com', 'demo.org', 'sample.net', 'mock.cn']
  const domain = domains[Math.floor(Math.random() * domains.length)]
  return `https://www.${domain}`
}

const generateDate = () => {
  const start = new Date(2020, 0, 1)
  const end = new Date()
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime())
  return new Date(randomTime).toISOString().split('T')[0]
}

const generateAge = () => {
  return Math.floor(Math.random() * 50) + 18
}

const generateId = () => {
  return Math.floor(Math.random() * 1000000) + 1
}

const clearResults = () => {
  generatedData.value = []
}

const copyData = async () => {
  try {
    await navigator.clipboard.writeText(formattedData.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

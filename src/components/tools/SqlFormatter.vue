<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 输入区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">SQL 输入</h3>
          <div class="flex space-x-2">
            <button
              @click="formatSql"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              格式化
            </button>
            <button
              @click="minifySql"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              压缩
            </button>
            <button
              @click="clearInput"
              class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              清空
            </button>
          </div>
        </div>
        <textarea
          v-model="inputSql"
          placeholder="请输入SQL语句..."
          class="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
      </div>

      <!-- 输出区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">格式化结果</h3>
          <button
            @click="copyResult"
            class="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            复制结果
          </button>
        </div>
        <pre class="w-full h-64 p-4 bg-gray-100 border border-gray-300 rounded-lg overflow-auto text-sm">{{ formattedSql }}</pre>
      </div>
    </div>

    <!-- SQL验证 -->
    <div v-if="validationResult" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">SQL验证</h3>
      <div class="p-4 rounded-lg" :class="validationResult.valid ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
        <div class="font-medium">
          {{ validationResult.valid ? '✓ SQL语法正确' : '✗ SQL语法错误' }}
        </div>
        <div v-if="validationResult.errors.length > 0" class="mt-2 text-sm">
          <div v-for="error in validationResult.errors" :key="error" class="mb-1">
            • {{ error }}
          </div>
        </div>
      </div>
    </div>

    <!-- 示例SQL -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">示例SQL</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="example in examples"
          :key="example.name"
          class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          @click="loadExample(example)"
        >
          <div class="font-medium text-gray-900">{{ example.name }}</div>
          <div class="text-sm text-gray-600 mt-1">{{ example.description }}</div>
        </div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-blue-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-blue-600">{{ inputSql.length }}</div>
        <div class="text-sm text-gray-600">原始字符</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-green-600">{{ formattedSql.length }}</div>
        <div class="text-sm text-gray-600">格式化字符</div>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-purple-600">{{ queryCount }}</div>
        <div class="text-sm text-gray-600">查询数量</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-2xl font-bold text-orange-600">{{ compressionRatio }}%</div>
        <div class="text-sm text-gray-600">压缩比</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const inputSql = ref('')
const formattedSql = ref('')
const error = ref('')
const validationResult = ref(null)

const examples = ref([
  {
    name: 'SELECT查询',
    description: '基本的SELECT查询语句',
    sql: 'SELECT id, name, email FROM users WHERE age > 18 ORDER BY name ASC LIMIT 10;'
  },
  {
    name: 'JOIN查询',
    description: '多表关联查询',
    sql: 'SELECT u.name, p.title FROM users u JOIN posts p ON u.id = p.user_id WHERE u.active = 1;'
  },
  {
    name: '复杂查询',
    description: '包含子查询和聚合函数',
    sql: 'SELECT department, COUNT(*) as employee_count FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) GROUP BY department HAVING COUNT(*) > 5 ORDER BY employee_count DESC;'
  },
  {
    name: 'INSERT语句',
    description: '插入数据语句',
    sql: 'INSERT INTO users (name, email, age) VALUES ("John Doe", "john@example.com", 25), ("Jane Smith", "jane@example.com", 30);'
  }
])

const queryCount = computed(() => {
  return (formattedSql.value.match(/SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER/gi) || []).length
})

const compressionRatio = computed(() => {
  if (inputSql.value.length === 0) return 0
  return Math.round((formattedSql.value.length / inputSql.value.length) * 100)
})

const formatSql = () => {
  try {
    const sql = inputSql.value.trim()
    if (!sql) return
    
    let formatted = sql
      .replace(/\s+/g, ' ') // 压缩多余空白
      .replace(/\s*,\s*/g, ',\n  ') // 逗号后换行
      .replace(/\s*FROM\s+/gi, '\nFROM ')
      .replace(/\s*WHERE\s+/gi, '\nWHERE ')
      .replace(/\s*JOIN\s+/gi, '\nJOIN ')
      .replace(/\s*LEFT JOIN\s+/gi, '\nLEFT JOIN ')
      .replace(/\s*RIGHT JOIN\s+/gi, '\nRIGHT JOIN ')
      .replace(/\s*INNER JOIN\s+/gi, '\nINNER JOIN ')
      .replace(/\s*GROUP BY\s+/gi, '\nGROUP BY ')
      .replace(/\s*HAVING\s+/gi, '\nHAVING ')
      .replace(/\s*ORDER BY\s+/gi, '\nORDER BY ')
      .replace(/\s*LIMIT\s+/gi, '\nLIMIT ')
      .replace(/\s*UNION\s+/gi, '\nUNION ')
      .replace(/\s*AND\s+/gi, '\n  AND ')
      .replace(/\s*OR\s+/gi, '\n  OR ')
      .replace(/\s*IN\s*\(/gi, ' IN (')
      .replace(/\s*NOT IN\s*\(/gi, ' NOT IN (')
      .replace(/\s*BETWEEN\s+/gi, ' BETWEEN ')
      .replace(/\s*LIKE\s+/gi, ' LIKE ')
      .replace(/\s*IS NULL\b/gi, ' IS NULL')
      .replace(/\s*IS NOT NULL\b/gi, ' IS NOT NULL')
      .replace(/\s*;\s*/g, ';\n') // 分号后换行
      .trim()
    
    formattedCss.value = formatted
    error.value = ''
    validateSql()
  } catch (e) {
    error.value = '格式化失败: ' + e.message
    formattedCss.value = ''
  }
}

const minifySql = () => {
  try {
    const sql = inputSql.value.trim()
    if (!sql) return
    
    let minified = sql
      .replace(/\/\*[\s\S]*?\*\//g, '') // 移除注释
      .replace(/\s+/g, ' ') // 压缩空白
      .replace(/\s*,\s*/g, ',')
      .replace(/\s*;\s*/g, ';')
      .trim()
    
    formattedCss.value = minified
    error.value = ''
    validateSql()
  } catch (e) {
    error.value = '压缩失败: ' + e.message
    formattedCss.value = ''
  }
}

const validateSql = () => {
  const sql = formattedCss.value
  const errors = []
  
  // 简单的SQL验证
  const openParens = (sql.match(/\(/g) || []).length
  const closeParens = (sql.match(/\)/g) || []).length
  
  if (openParens !== closeParens) {
    errors.push('括号不匹配')
  }
  
  // 检查引号
  const singleQuotes = (sql.match(/'/g) || []).length
  const doubleQuotes = (sql.match(/"/g) || []).length
  
  if (singleQuotes % 2 !== 0) {
    errors.push('单引号未闭合')
  }
  
  if (doubleQuotes % 2 !== 0) {
    errors.push('双引号未闭合')
  }
  
  validationResult.value = {
    valid: errors.length === 0,
    errors
  }
}

const loadExample = (example) => {
  inputSql.value = example.sql
  formatSql()
}

const clearInput = () => {
  inputSql.value = ''
  formattedCss.value = ''
  error.value = ''
  validationResult.value = null
}

const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(formattedCss.value)
  } catch (e) {
    console.error('复制失败:', e)
  }
}
</script>

<template>
  <div class="p-4 bg-gray-100 rounded-lg">
    <h3 class="text-lg font-semibold mb-4">语言测试组件</h3>
    <div class="space-y-2">
      <p><strong>当前语言:</strong> {{ currentLocale }}</p>
      <p><strong>标题:</strong> {{ $t('home.title') }}</p>
      <p><strong>搜索占位符:</strong> {{ $t('nav.searchPlaceholder') }}</p>
      <p><strong>JSON格式化工具:</strong> {{ $t('tools.json-formatter.name') }}</p>
      <p><strong>分类:</strong> {{ $t('home.categories.json') }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentLocale = computed(() => locale.value)
</script>


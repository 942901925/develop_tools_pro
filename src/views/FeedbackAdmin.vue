<template>
  <div class="feedback-admin">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 页面头部 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {{ $t('feedbackAdmin.title') }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {{ $t('feedbackAdmin.subtitle') }}
        </p>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <MessageCircle class="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                {{ $t('feedbackAdmin.stats.total') }}
              </p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {{ stats.total }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Clock class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                {{ $t('feedbackAdmin.stats.pending') }}
              </p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {{ stats.pending }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle class="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                {{ $t('feedbackAdmin.stats.reviewed') }}
              </p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {{ stats.reviewed }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Star class="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                {{ $t('feedbackAdmin.stats.avgRating') }}
              </p>
              <p class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {{ averageRating }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 过滤和操作栏 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div class="p-6">
          <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <!-- 过滤器 -->
            <div class="flex flex-wrap gap-4">
              <select
                v-model="statusFilter"
                class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">{{ $t('feedbackAdmin.filters.allStatus') }}</option>
                <option value="pending">{{ $t('feedbackAdmin.filters.pending') }}</option>
                <option value="reviewed">{{ $t('feedbackAdmin.filters.reviewed') }}</option>
                <option value="resolved">{{ $t('feedbackAdmin.filters.resolved') }}</option>
              </select>

              <select
                v-model="typeFilter"
                class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">{{ $t('feedbackAdmin.filters.allTypes') }}</option>
                <option value="suggestion">{{ $t('feedbackAdmin.filters.suggestion') }}</option>
                <option value="bug">{{ $t('feedbackAdmin.filters.bug') }}</option>
                <option value="feature">{{ $t('feedbackAdmin.filters.feature') }}</option>
                <option value="other">{{ $t('feedbackAdmin.filters.other') }}</option>
              </select>
            </div>

            <!-- 操作按钮 -->
            <div class="flex gap-2">
              <button
                @click="exportFeedback"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download class="w-4 h-4" />
                {{ $t('feedbackAdmin.actions.export') }}
              </button>
              <button
                @click="clearAllFeedback"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 class="w-4 h-4" />
                {{ $t('feedbackAdmin.actions.clear') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 反馈列表 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div class="p-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {{ $t('feedbackAdmin.feedbackList') }}
          </h2>

          <div v-if="filteredFeedback.length === 0" class="text-center py-12">
            <MessageCircle class="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-500 dark:text-gray-400">
              {{ $t('feedbackAdmin.noFeedback') }}
            </p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="feedback in filteredFeedback"
              :key="feedback.id"
              class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <!-- 反馈头部 -->
                  <div class="flex items-center gap-3 mb-2">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-medium',
                        getTypeClass(feedback.type)
                      ]"
                    >
                      {{ $t(`feedback.types.${feedback.type}`) }}
                    </span>
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-medium',
                        getStatusClass(feedback.status)
                      ]"
                    >
                      {{ $t(`feedbackAdmin.status.${feedback.status}`) }}
                    </span>
                    <div v-if="feedback.rating" class="flex items-center gap-1">
                      <Star class="w-4 h-4 text-yellow-400 fill-current" />
                      <span class="text-sm text-gray-600 dark:text-gray-400">
                        {{ feedback.rating }}/5
                      </span>
                    </div>
                  </div>

                  <!-- 反馈内容 -->
                  <p class="text-gray-900 dark:text-gray-100 mb-3">
                    {{ feedback.content }}
                  </p>

                  <!-- 反馈信息 -->
                  <div class="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      <Clock class="w-4 h-4 inline mr-1" />
                      {{ formatDate(feedback.timestamp) }}
                    </span>
                    <span>
                      <Globe class="w-4 h-4 inline mr-1" />
                      {{ getDomain(feedback.url) }}
                    </span>
                    <span>
                      <User class="w-4 h-4 inline mr-1" />
                      {{ getBrowserInfo(feedback.userAgent) }}
                    </span>
                  </div>
                </div>

                <!-- 操作按钮 -->
                <div class="flex gap-2 ml-4">
                  <button
                    v-if="feedback.status === 'pending'"
                    @click="updateStatus(feedback.id, 'reviewed')"
                    class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    {{ $t('feedbackAdmin.actions.markReviewed') }}
                  </button>
                  <button
                    v-if="feedback.status === 'reviewed'"
                    @click="updateStatus(feedback.id, 'resolved')"
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    {{ $t('feedbackAdmin.actions.markResolved') }}
                  </button>
                  <button
                    @click="deleteFeedback(feedback.id)"
                    class="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    {{ $t('feedbackAdmin.actions.delete') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  MessageCircle, Clock, CheckCircle, Star, Download, Trash2,
  Globe, User
} from 'lucide-vue-next'
import feedbackStorage from '../utils/feedbackStorage.js'

const { t } = useI18n()

// 响应式数据
const feedback = ref([])
const statusFilter = ref('')
const typeFilter = ref('')

// 计算属性
const stats = computed(() => feedbackStorage.getFeedbackStats())

const averageRating = computed(() => {
  const ratedFeedback = feedback.value.filter(f => f.rating)
  if (ratedFeedback.length === 0) return '0.0'
  const sum = ratedFeedback.reduce((acc, f) => acc + f.rating, 0)
  return (sum / ratedFeedback.length).toFixed(1)
})

const filteredFeedback = computed(() => {
  let result = feedback.value

  if (statusFilter.value) {
    result = result.filter(f => f.status === statusFilter.value)
  }

  if (typeFilter.value) {
    result = result.filter(f => f.type === typeFilter.value)
  }

  return result
})

// 方法
const loadFeedback = () => {
  feedback.value = feedbackStorage.getAllFeedback()
}

const updateStatus = (id, status) => {
  if (feedbackStorage.updateFeedbackStatus(id, status)) {
    loadFeedback()
  }
}

const deleteFeedback = (id) => {
  if (confirm(t('feedbackAdmin.confirmDelete'))) {
    if (feedbackStorage.deleteFeedback(id)) {
      loadFeedback()
    }
  }
}

const exportFeedback = () => {
  feedbackStorage.exportFeedback()
}

const clearAllFeedback = () => {
  if (confirm(t('feedbackAdmin.confirmClear'))) {
    feedbackStorage.clearAllFeedback()
    loadFeedback()
  }
}

const getTypeClass = (type) => {
  const classes = {
    suggestion: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
    bug: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
    feature: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
    other: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
  }
  return classes[type] || classes.other
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300',
    reviewed: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    resolved: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
  }
  return classes[status] || classes.pending
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}

const getDomain = (url) => {
  try {
    return new URL(url).hostname
  } catch {
    return 'Unknown'
  }
}

const getBrowserInfo = (userAgent) => {
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  return 'Unknown'
}

// 生命周期
onMounted(() => {
  loadFeedback()
})
</script>

<style scoped>
.feedback-admin {
  min-height: 100vh;
  background: #F9FAFB;
}

@media (prefers-color-scheme: dark) {
  .feedback-admin {
    background: #111827;
  }
}
</style>

<template>
  <div class="feedback-container">
    <!-- 悬浮按钮 -->
    <button
      v-if="!showForm"
      @click="toggleForm"
      class="feedback-button"
      :class="{ 'feedback-button--pulse': hasNewFeedback }"
      :title="$t('feedback.openFeedback')"
    >
      <MessageCircle class="feedback-icon" />
    </button>

    <!-- 反馈表单 -->
    <div v-if="showForm" class="feedback-form-container">
      <div class="feedback-form">
        <!-- 表单头部 -->
        <div class="feedback-form-header">
          <h3 class="feedback-form-title">{{ $t('feedback.title') }}</h3>
          <button @click="closeForm" class="feedback-close-btn">
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- 反馈类型选择 -->
        <div class="feedback-type-selector">
          <label class="feedback-type-label">{{ $t('feedback.type') }}:</label>
          <div class="feedback-type-options">
            <button
              v-for="type in feedbackTypes"
              :key="type.value"
              @click="selectedType = type.value"
              :class="[
                'feedback-type-btn',
                { 'feedback-type-btn--active': selectedType === type.value }
              ]"
            >
              <component :is="type.icon" class="w-4 h-4" />
              {{ $t(type.label) }}
            </button>
          </div>
        </div>

        <!-- 评分 -->
        <div class="feedback-rating">
          <label class="feedback-rating-label">{{ $t('feedback.rating') }}:</label>
          <div class="feedback-stars">
            <button
              v-for="star in 5"
              :key="star"
              @click="rating = star"
              :class="[
                'feedback-star',
                { 'feedback-star--active': star <= rating }
              ]"
            >
              <Star :fill="star <= rating ? 'currentColor' : 'none'" />
            </button>
          </div>
        </div>

        <!-- 反馈内容 -->
        <div class="feedback-content">
          <label class="feedback-content-label">{{ $t('feedback.content') }}:</label>
          <textarea
            v-model="feedbackContent"
            :placeholder="$t('feedback.placeholder')"
            class="feedback-textarea"
            rows="4"
            maxlength="1000"
          ></textarea>
          <div class="feedback-char-count">
            {{ feedbackContent.length }}/1000
          </div>
        </div>

        <!-- 提交按钮 -->
        <div class="feedback-actions">
          <button
            @click="submitFeedback"
            :disabled="!feedbackContent.trim() || isSubmitting"
            class="feedback-submit-btn"
          >
            <Loader2 v-if="isSubmitting" class="w-4 h-4 animate-spin" />
            <Send v-else class="w-4 h-4" />
            {{ isSubmitting ? $t('feedback.submitting') : $t('feedback.submit') }}
          </button>
          <button @click="closeForm" class="feedback-cancel-btn">
            {{ $t('feedback.cancel') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 成功提示 -->
    <div v-if="showSuccess" class="feedback-success">
      <CheckCircle class="w-5 h-5" />
      {{ $t('feedback.success') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  MessageCircle, X, Star, Send, Loader2, CheckCircle,
  Bug, Lightbulb, Heart, AlertTriangle
} from 'lucide-vue-next'
import feedbackStorage from '../utils/feedbackStorage.js'

const { t } = useI18n()

// 响应式数据
const showForm = ref(false)
const showSuccess = ref(false)
const isSubmitting = ref(false)
const feedbackContent = ref('')
const selectedType = ref('suggestion')
const rating = ref(0)

// 反馈类型配置
const feedbackTypes = [
  { value: 'suggestion', label: 'feedback.types.suggestion', icon: Lightbulb },
  { value: 'bug', label: 'feedback.types.bug', icon: Bug },
  { value: 'feature', label: 'feedback.types.feature', icon: Heart },
  { value: 'other', label: 'feedback.types.other', icon: AlertTriangle }
]

// 计算属性
const hasNewFeedback = computed(() => false)

// 方法
const toggleForm = () => {
  showForm.value = !showForm.value
  if (showForm.value) {
    // 重置表单
    feedbackContent.value = ''
    selectedType.value = 'suggestion'
    rating.value = 0
  }
}

const closeForm = () => {
  showForm.value = false
}

const submitFeedback = async () => {
  if (!feedbackContent.value.trim()) return

  isSubmitting.value = true

  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 保存反馈
    const feedbackData = {
      content: feedbackContent.value.trim(),
      type: selectedType.value,
      rating: rating.value || null
    }

    feedbackStorage.addFeedback(feedbackData)

    // 显示成功提示
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)

    // 关闭表单
    closeForm()

    // 重置表单
    feedbackContent.value = ''
    selectedType.value = 'suggestion'
    rating.value = 0

  } catch (error) {
    console.error('提交反馈失败:', error)
  } finally {
    isSubmitting.value = false
  }
}

// 生命周期
onMounted(() => {
  // 组件挂载时的初始化逻辑
})
</script>

<style scoped>
.feedback-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.feedback-button {
  position: relative;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #8B5CF6, #3B82F6);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6);
}

.feedback-button--pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4); }
  50% { box-shadow: 0 4px 12px rgba(139, 92, 246, 0.8), 0 0 0 10px rgba(139, 92, 246, 0.1); }
  100% { box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4); }
}

.feedback-icon {
  width: 24px;
  height: 24px;
}


.feedback-form-container {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 400px;
  max-width: calc(100vw - 40px);
}

.feedback-form {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.feedback-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.feedback-form-title {
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
}

.feedback-close-btn {
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.feedback-close-btn:hover {
  background: #F3F4F6;
  color: #374151;
}

.feedback-type-selector {
  margin-bottom: 16px;
}

.feedback-type-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.feedback-type-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.feedback-type-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: white;
  color: #6B7280;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.feedback-type-btn:hover {
  border-color: #8B5CF6;
  color: #8B5CF6;
}

.feedback-type-btn--active {
  border-color: #8B5CF6;
  background: #8B5CF6;
  color: white;
}

.feedback-rating {
  margin-bottom: 16px;
}

.feedback-rating-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.feedback-stars {
  display: flex;
  gap: 4px;
}

.feedback-star {
  background: none;
  border: none;
  color: #D1D5DB;
  cursor: pointer;
  padding: 2px;
  transition: color 0.2s ease;
}

.feedback-star:hover,
.feedback-star--active {
  color: #F59E0B;
}

.feedback-content {
  margin-bottom: 20px;
}

.feedback-content-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.feedback-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s ease;
}

.feedback-textarea:focus {
  outline: none;
  border-color: #8B5CF6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.feedback-char-count {
  text-align: right;
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
}

.feedback-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.feedback-submit-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: #8B5CF6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.feedback-submit-btn:hover:not(:disabled) {
  background: #7C3AED;
}

.feedback-submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.feedback-cancel-btn {
  padding: 10px 16px;
  background: white;
  color: #6B7280;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.feedback-cancel-btn:hover {
  background: #F9FAFB;
  border-color: #9CA3AF;
}

.feedback-success {
  position: absolute;
  bottom: 70px;
  right: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #10B981;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 移动端适配 */
@media (max-width: 480px) {
  .feedback-container {
    bottom: 16px;
    right: 16px;
  }
  
  .feedback-form-container {
    width: calc(100vw - 32px);
    right: -16px;
  }
  
  .feedback-type-options {
    grid-template-columns: 1fr;
  }
}
</style>

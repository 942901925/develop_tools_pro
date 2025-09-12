<template>
  <div class="share-container">
    <!-- 分享按钮 -->
    <button
      v-if="!showShareOptions"
      @click="toggleShareOptions"
      class="share-button"
      :title="$t('share.shareWebsite')"
    >
      <Share2 class="share-icon" />
    </button>

    <!-- 分享选项面板 -->
    <div v-if="showShareOptions" class="share-panel">
      <div class="share-panel-header">
        <h3 class="share-panel-title">{{ $t('share.shareWebsite') }}</h3>
        <button @click="closeSharePanel" class="share-close-btn">
          <X class="w-4 h-4" />
        </button>
      </div>

      <div class="share-options">
        <!-- 复制链接 -->
        <button @click="copyLink" class="share-option">
          <Copy class="share-option-icon" />
          <span>{{ $t('share.copyLink') }}</span>
        </button>

        <!-- 微信分享 -->
        <button @click="shareToWeChat" class="share-option">
          <MessageCircle class="share-option-icon" />
          <span>{{ $t('share.wechat') }}</span>
        </button>

        <!-- QQ分享 -->
        <button @click="shareToQQ" class="share-option">
          <MessageSquare class="share-option-icon" />
          <span>{{ $t('share.qq') }}</span>
        </button>

        <!-- 微博分享 -->
        <button @click="shareToWeibo" class="share-option">
          <Twitter class="share-option-icon" />
          <span>{{ $t('share.weibo') }}</span>
        </button>

        <!-- 朋友圈分享 -->
        <button @click="shareToMoments" class="share-option">
          <Users class="share-option-icon" />
          <span>{{ $t('share.moments') }}</span>
        </button>

        <!-- 二维码分享 -->
        <button @click="showQRCode" class="share-option">
          <QrCode class="share-option-icon" />
          <span>{{ $t('share.qrCode') }}</span>
        </button>
      </div>

      <!-- 分享统计 -->
      <div class="share-stats">
        <div class="share-stat">
          <span class="share-stat-label">{{ $t('share.totalShares') }}:</span>
          <span class="share-stat-value">{{ totalShares }}</span>
        </div>
      </div>
    </div>

    <!-- 二维码模态框 -->
    <div v-if="showQRModal" class="qr-modal" @click="closeQRModal">
      <div class="qr-modal-content" @click.stop>
        <div class="qr-modal-header">
          <h3 class="qr-modal-title">{{ $t('share.qrCode') }}</h3>
          <button @click="closeQRModal" class="qr-close-btn">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="qr-content">
          <div ref="qrCodeRef" class="qr-code"></div>
          <p class="qr-tip">{{ $t('share.qrTip') }}</p>
        </div>
      </div>
    </div>

    <!-- 成功提示 -->
    <div v-if="showSuccess" class="share-success">
      <Check class="w-4 h-4" />
      <span>{{ successMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  Share2, 
  X, 
  Copy, 
  MessageCircle, 
  MessageSquare, 
  Twitter, 
  Users, 
  QrCode, 
  Check 
} from 'lucide-vue-next'
import QRCode from 'qrcode'

const { t } = useI18n()

// 响应式数据
const showShareOptions = ref(false)
const showQRModal = ref(false)
const showSuccess = ref(false)
const successMessage = ref('')
const qrCodeRef = ref(null)
const totalShares = ref(0)

// 计算属性
const currentUrl = computed(() => window.location.href)
const shareTitle = computed(() => 'Develop Tools Pro - 开发者工具集合')
const shareDescription = computed(() => '专业的在线开发者工具平台，提供JSON格式化、密码生成、颜色选择等30+实用工具')

// 方法
const toggleShareOptions = () => {
  showShareOptions.value = !showShareOptions.value
}

const closeSharePanel = () => {
  showShareOptions.value = false
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl.value)
    showSuccessMessage(t('share.copySuccess'))
    incrementShareCount()
  } catch (error) {
    console.error('复制失败:', error)
    showSuccessMessage(t('share.copyFailed'))
  }
}

const shareToWeChat = () => {
  const url = `https://web.wechat.com/?url=${encodeURIComponent(currentUrl.value)}`
  openShareWindow(url)
  incrementShareCount()
}

const shareToQQ = () => {
  const url = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(currentUrl.value)}&title=${encodeURIComponent(shareTitle.value)}&summary=${encodeURIComponent(shareDescription.value)}`
  openShareWindow(url)
  incrementShareCount()
}

const shareToWeibo = () => {
  const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(currentUrl.value)}&title=${encodeURIComponent(shareTitle.value)}`
  openShareWindow(url)
  incrementShareCount()
}

const shareToMoments = () => {
  // 朋友圈分享通常需要微信客户端，这里提供复制链接的方式
  copyLink()
  showSuccessMessage(t('share.momentsTip'))
}

const showQRCode = async () => {
  showQRModal.value = true
  await nextTick()
  generateQRCode()
}

const closeQRModal = () => {
  showQRModal.value = false
}

const generateQRCode = async () => {
  try {
    const canvas = await QRCode.toCanvas(qrCodeRef.value, currentUrl.value, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
  } catch (error) {
    console.error('生成二维码失败:', error)
  }
}

const openShareWindow = (url) => {
  window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes')
}

const showSuccessMessage = (message) => {
  successMessage.value = message
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

const incrementShareCount = () => {
  totalShares.value += 1
  localStorage.setItem('shareCount', totalShares.value.toString())
}

// 生命周期
onMounted(() => {
  const savedCount = localStorage.getItem('shareCount')
  if (savedCount) {
    totalShares.value = parseInt(savedCount, 10)
  }
})
</script>

<style scoped>
.share-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
}

.share-button {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #10B981, #059669);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.share-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
}

.share-icon {
  width: 24px;
  height: 24px;
}

.share-panel {
  position: absolute;
  bottom: 70px;
  left: 0;
  width: 280px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.share-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.share-panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.share-close-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.share-close-btn:hover {
  background-color: #f0f0f0;
}

.share-options {
  padding: 12px;
}

.share-option {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: left;
  margin-bottom: 4px;
}

.share-option:hover {
  background-color: #f8f9fa;
}

.share-option-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  color: #666;
}

.share-option span {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.share-stats {
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.share-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.share-stat-label {
  font-size: 12px;
  color: #666;
}

.share-stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #10B981;
}

.qr-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.qr-modal-content {
  background: white;
  border-radius: 12px;
  padding: 0;
  max-width: 320px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.qr-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.qr-modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.qr-close-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.qr-close-btn:hover {
  background-color: #f0f0f0;
}

.qr-content {
  padding: 24px;
  text-align: center;
}

.qr-code {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.qr-tip {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.share-success {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #10B981;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  z-index: 3000;
  animation: fadeInOut 3s ease;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
  10%, 90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .share-panel {
    background: #1f2937;
    border-color: #374151;
  }
  
  .share-panel-header {
    background: #111827;
    border-color: #374151;
  }
  
  .share-panel-title {
    color: #f9fafb;
  }
  
  .share-close-btn {
    color: #9ca3af;
  }
  
  .share-close-btn:hover {
    background-color: #374151;
  }
  
  .share-option:hover {
    background-color: #374151;
  }
  
  .share-option span {
    color: #f9fafb;
  }
  
  .share-option-icon {
    color: #9ca3af;
  }
  
  .share-stats {
    background: #111827;
    border-color: #374151;
  }
  
  .share-stat-label {
    color: #9ca3af;
  }
  
  .qr-modal-content {
    background: #1f2937;
  }
  
  .qr-modal-header {
    border-color: #374151;
  }
  
  .qr-modal-title {
    color: #f9fafb;
  }
  
  .qr-close-btn {
    color: #9ca3af;
  }
  
  .qr-close-btn:hover {
    background-color: #374151;
  }
  
  .qr-tip {
    color: #9ca3af;
  }
}
</style>

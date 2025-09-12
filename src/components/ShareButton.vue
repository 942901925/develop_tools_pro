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
        <div class="share-header-content">
          <div class="share-icon-wrapper">
            <Share2 class="share-header-icon" />
          </div>
          <div class="share-header-text">
            <h3 class="share-panel-title">{{ $t('share.shareWebsite') }}</h3>
            <p class="share-panel-subtitle">分享给更多开发者</p>
          </div>
        </div>
        <button @click="closeSharePanel" class="share-close-btn">
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="share-options">
        <!-- 复制链接 -->
        <button @click="copyLink" class="share-option share-option-primary">
          <div class="share-option-icon-wrapper">
            <Copy class="share-option-icon" />
          </div>
          <div class="share-option-content">
            <span class="share-option-title">{{ $t('share.copyLink') }}</span>
            <span class="share-option-desc">复制链接到剪贴板</span>
          </div>
        </button>

        <!-- 社交媒体分享 -->
        <div class="share-social-grid">
          <!-- 微信分享 -->
          <button @click="shareToWeChat" class="share-social-btn share-wechat">
            <MessageCircle class="share-social-icon" />
            <span class="share-social-label">{{ $t('share.wechat') }}</span>
          </button>

          <!-- QQ分享 -->
          <button @click="shareToQQ" class="share-social-btn share-qq">
            <MessageSquare class="share-social-icon" />
            <span class="share-social-label">{{ $t('share.qq') }}</span>
          </button>

          <!-- 微博分享 -->
          <button @click="shareToWeibo" class="share-social-btn share-weibo">
            <Twitter class="share-social-icon" />
            <span class="share-social-label">{{ $t('share.weibo') }}</span>
          </button>

          <!-- 朋友圈分享 -->
          <button @click="shareToMoments" class="share-social-btn share-moments">
            <Users class="share-social-icon" />
            <span class="share-social-label">{{ $t('share.moments') }}</span>
          </button>
        </div>

        <!-- 二维码分享 -->
        <button @click="showQRCode" class="share-option share-option-secondary">
          <div class="share-option-icon-wrapper">
            <QrCode class="share-option-icon" />
          </div>
          <div class="share-option-content">
            <span class="share-option-title">{{ $t('share.qrCode') }}</span>
            <span class="share-option-desc">生成二维码分享</span>
          </div>
        </button>
      </div>

      <!-- 分享统计 -->
      <div class="share-stats">
        <div class="share-stats-content">
          <div class="share-stat-item">
            <div class="share-stat-icon">
              <Share2 class="w-4 h-4" />
            </div>
            <div class="share-stat-info">
              <span class="share-stat-value">{{ totalShares }}</span>
              <span class="share-stat-label">{{ $t('share.totalShares') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 二维码模态框 -->
    <div v-if="showQRModal" class="qr-modal" @click="closeQRModal">
      <div class="qr-modal-content" @click.stop>
        <div class="qr-modal-header">
          <div class="qr-header-content">
            <div class="qr-icon-wrapper">
              <QrCode class="qr-header-icon" />
            </div>
            <div class="qr-header-text">
              <h3 class="qr-modal-title">{{ $t('share.qrCode') }}</h3>
              <p class="qr-modal-subtitle">扫描二维码访问网站</p>
            </div>
          </div>
          <button @click="closeQRModal" class="qr-close-btn">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="qr-content">
          <div class="qr-code-container">
            <div ref="qrCodeRef" class="qr-code"></div>
            <div class="qr-code-border"></div>
          </div>
          <div class="qr-info">
            <p class="qr-tip">{{ $t('share.qrTip') }}</p>
            <div class="qr-url">
              <span class="qr-url-text">{{ currentUrl }}</span>
              <button @click="copyLink" class="qr-copy-btn">
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>
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
  backdrop-filter: blur(10px);
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
  width: 320px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.share-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.8);
}

.share-header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.share-icon-wrapper {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #10B981, #059669);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.share-header-icon {
  width: 20px;
  height: 20px;
  color: white;
}

.share-header-text {
  flex: 1;
}

.share-panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.2;
}

.share-panel-subtitle {
  font-size: 12px;
  color: #6b7280;
  margin: 2px 0 0 0;
  line-height: 1.2;
}

.share-close-btn {
  background: rgba(0, 0, 0, 0.05);
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.share-close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #374151;
}

.share-options {
  padding: 20px 24px;
}

.share-option {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  margin-bottom: 12px;
  backdrop-filter: blur(10px);
}

.share-option:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(16, 185, 129, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.share-option-primary {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
  border-color: rgba(16, 185, 129, 0.2);
}

.share-option-secondary {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1));
  border-color: rgba(139, 92, 246, 0.2);
}

.share-option-icon-wrapper {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

.share-option-icon {
  width: 20px;
  height: 20px;
  color: #374151;
}

.share-option-content {
  flex: 1;
}

.share-option-title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2px;
}

.share-option-desc {
  display: block;
  font-size: 12px;
  color: #6b7280;
}

.share-social-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
}

.share-social-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 12px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.share-social-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.share-social-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 8px;
}

.share-social-label {
  font-size: 12px;
  font-weight: 500;
  color: #374151;
}

.share-wechat .share-social-icon {
  color: #07c160;
}

.share-qq .share-social-icon {
  color: #12b7f5;
}

.share-weibo .share-social-icon {
  color: #e6162d;
}

.share-moments .share-social-icon {
  color: #07c160;
}

.share-stats {
  padding: 16px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.8);
}

.share-stats-content {
  display: flex;
  justify-content: center;
}

.share-stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.share-stat-icon {
  width: 24px;
  height: 24px;
  background: #10B981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.share-stat-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.share-stat-value {
  font-size: 16px;
  font-weight: 700;
  color: #10B981;
  line-height: 1;
}

.share-stat-label {
  font-size: 10px;
  color: #6b7280;
  line-height: 1;
  margin-top: 2px;
}

.qr-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.qr-modal-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 0;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.qr-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.8);
}

.qr-header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.qr-icon-wrapper {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #8B5CF6, #7C3AED);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-header-icon {
  width: 20px;
  height: 20px;
  color: white;
}

.qr-header-text {
  flex: 1;
}

.qr-modal-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.2;
}

.qr-modal-subtitle {
  font-size: 12px;
  color: #6b7280;
  margin: 2px 0 0 0;
  line-height: 1.2;
}

.qr-close-btn {
  background: rgba(0, 0, 0, 0.05);
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #374151;
}

.qr-content {
  padding: 24px;
  text-align: center;
}

.qr-code-container {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.qr-code {
  display: flex;
  justify-content: center;
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.qr-code-border {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #10B981, #8B5CF6, #F59E0B, #EF4444);
  border-radius: 14px;
  z-index: -1;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.qr-info {
  text-align: center;
}

.qr-tip {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 16px 0;
}

.qr-url {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.qr-url-text {
  flex: 1;
  font-size: 12px;
  color: #374151;
  font-family: monospace;
  word-break: break-all;
  text-align: left;
}

.qr-copy-btn {
  background: #10B981;
  border: none;
  color: white;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  flex-shrink: 0;
}

.qr-copy-btn:hover {
  background: #059669;
}

.share-success {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  z-index: 3000;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
  backdrop-filter: blur(10px);
  animation: successInOut 3s ease;
}

@keyframes successInOut {
  0%, 100% { 
    opacity: 0; 
    transform: translate(-50%, -50%) scale(0.9); 
  }
  10%, 90% { 
    opacity: 1; 
    transform: translate(-50%, -50%) scale(1); 
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .share-panel {
    background: rgba(31, 41, 55, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .share-panel-header {
    background: rgba(17, 24, 39, 0.8);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .share-panel-title {
    color: #f9fafb;
  }
  
  .share-panel-subtitle {
    color: #9ca3af;
  }
  
  .share-close-btn {
    background: rgba(255, 255, 255, 0.1);
    color: #9ca3af;
  }
  
  .share-close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #d1d5db;
  }
  
  .share-option {
    background: rgba(31, 41, 55, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .share-option:hover {
    background: rgba(31, 41, 55, 0.8);
    border-color: rgba(16, 185, 129, 0.3);
  }
  
  .share-option-icon-wrapper {
    background: rgba(17, 24, 39, 0.8);
  }
  
  .share-option-icon {
    color: #d1d5db;
  }
  
  .share-option-title {
    color: #f9fafb;
  }
  
  .share-option-desc {
    color: #9ca3af;
  }
  
  .share-social-btn {
    background: rgba(31, 41, 55, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .share-social-btn:hover {
    background: rgba(31, 41, 55, 0.8);
  }
  
  .share-social-label {
    color: #d1d5db;
  }
  
  .share-stats {
    background: rgba(17, 24, 39, 0.8);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .qr-modal-content {
    background: rgba(31, 41, 55, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .qr-modal-header {
    background: rgba(17, 24, 39, 0.8);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .qr-modal-title {
    color: #f9fafb;
  }
  
  .qr-modal-subtitle {
    color: #9ca3af;
  }
  
  .qr-close-btn {
    background: rgba(255, 255, 255, 0.1);
    color: #9ca3af;
  }
  
  .qr-close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #d1d5db;
  }
  
  .qr-code {
    background: #1f2937;
  }
  
  .qr-tip {
    color: #9ca3af;
  }
  
  .qr-url {
    background: rgba(17, 24, 39, 0.8);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .qr-url-text {
    color: #d1d5db;
  }
}
</style>

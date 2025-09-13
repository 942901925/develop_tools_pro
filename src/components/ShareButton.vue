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
        <div class="share-social-section">
          <h4 class="share-section-title">{{ $t('share.socialMedia') }}</h4>
          
          <!-- 社交媒体图标网格 -->
          <div class="share-social-icons-grid">
            <!-- 国际平台 -->
            <div class="share-social-group">
              <div class="share-social-icons-row">
                <!-- X (Twitter) -->
                <div class="share-social-tooltip-wrapper">
                  <button @click="shareToX" class="share-social-icon-btn share-x">
                    <svg class="share-social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </button>
                  <div class="share-social-tooltip">{{ $t('share.x') }}</div>
                </div>

                <!-- Facebook -->
                <div class="share-social-tooltip-wrapper">
                  <button @click="shareToFacebook" class="share-social-icon-btn share-facebook">
                    <svg class="share-social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <div class="share-social-tooltip">{{ $t('share.facebook') }}</div>
                </div>

                <!-- LinkedIn -->
                <div class="share-social-tooltip-wrapper">
                  <button @click="shareToLinkedIn" class="share-social-icon-btn share-linkedin">
                    <svg class="share-social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <div class="share-social-tooltip">{{ $t('share.linkedin') }}</div>
                </div>

                <!-- Instagram -->
                <div class="share-social-tooltip-wrapper">
                  <button @click="shareToInstagram" class="share-social-icon-btn share-instagram">
                    <svg class="share-social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </button>
                  <div class="share-social-tooltip">{{ $t('share.instagram') }}</div>
                </div>

                <!-- TikTok -->
                <div class="share-social-tooltip-wrapper">
                  <button @click="shareToTikTok" class="share-social-icon-btn share-tiktok">
                    <svg class="share-social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </button>
                  <div class="share-social-tooltip">{{ $t('share.tiktok') }}</div>
                </div>

                <!-- Reddit -->
                <div class="share-social-tooltip-wrapper">
                  <button @click="shareToReddit" class="share-social-icon-btn share-reddit">
                    <svg class="share-social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                    </svg>
                  </button>
                  <div class="share-social-tooltip">{{ $t('share.reddit') }}</div>
                </div>

                <!-- Discord -->
                <div class="share-social-tooltip-wrapper">
                  <button @click="shareToDiscord" class="share-social-icon-btn share-discord">
                    <svg class="share-social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </button>
                  <div class="share-social-tooltip">{{ $t('share.discord') }}</div>
                </div>

                <!-- Telegram -->
                <div class="share-social-tooltip-wrapper">
                  <button @click="shareToTelegram" class="share-social-icon-btn share-telegram">
                    <svg class="share-social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </button>
                  <div class="share-social-tooltip">{{ $t('share.telegram') }}</div>
                </div>
              </div>
            </div>

            <!-- 国内平台 -->
            <div class="share-social-group share-social-group-china">
              <div class="share-social-icons-row">
                <!-- 微信分享 -->
                <div class="share-social-tooltip-wrapper">
                  <button @click="shareToWeChat" class="share-social-icon-btn share-wechat">
                    <MessageCircle class="share-social-icon" />
                  </button>
                  <div class="share-social-tooltip">{{ $t('share.wechat') }}</div>
                </div>

                <!-- QQ分享 -->
                <div class="share-social-tooltip-wrapper">
                  <button @click="shareToQQ" class="share-social-icon-btn share-qq">
                    <MessageSquare class="share-social-icon" />
                  </button>
                  <div class="share-social-tooltip">{{ $t('share.qq') }}</div>
                </div>

                <!-- 微博分享 -->
                <div class="share-social-tooltip-wrapper">
                  <button @click="shareToWeibo" class="share-social-icon-btn share-weibo">
                    <Twitter class="share-social-icon" />
                  </button>
                  <div class="share-social-tooltip">{{ $t('share.weibo') }}</div>
                </div>

                <!-- 朋友圈分享 -->
                <div class="share-social-tooltip-wrapper">
                  <button @click="shareToMoments" class="share-social-icon-btn share-moments">
                    <Users class="share-social-icon" />
                  </button>
                  <div class="share-social-tooltip">{{ $t('share.moments') }}</div>
                </div>
              </div>
            </div>
          </div>
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

// 国际平台分享方法
const shareToX = () => {
  const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl.value)}&text=${encodeURIComponent(shareTitle.value)}`
  openShareWindow(url)
  incrementShareCount()
}

const shareToFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl.value)}`
  openShareWindow(url)
  incrementShareCount()
}

const shareToLinkedIn = () => {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl.value)}`
  openShareWindow(url)
  incrementShareCount()
}

const shareToInstagram = () => {
  // Instagram 不支持直接分享链接，提供复制功能
  copyLink()
  showSuccessMessage(t('share.instagramTip'))
}

const shareToTikTok = () => {
  // TikTok 不支持直接分享链接，提供复制功能
  copyLink()
  showSuccessMessage(t('share.tiktokTip'))
}

const shareToReddit = () => {
  const url = `https://reddit.com/submit?url=${encodeURIComponent(currentUrl.value)}&title=${encodeURIComponent(shareTitle.value)}`
  openShareWindow(url)
  incrementShareCount()
}

const shareToDiscord = () => {
  // Discord 不支持直接分享链接，提供复制功能
  copyLink()
  showSuccessMessage(t('share.discordTip'))
}

const shareToTelegram = () => {
  const url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl.value)}&text=${encodeURIComponent(shareTitle.value)}`
  openShareWindow(url)
  incrementShareCount()
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

.share-social-section {
  margin: 16px 0;
}

.share-section-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
  text-align: center;
}

/* 社交媒体图标网格 */
.share-social-icons-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.share-social-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.share-social-group-china {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-top: 16px;
}

.share-social-icons-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.share-social-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.share-social-icon-btn:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.share-social-icon-btn:active {
  transform: translateY(0) scale(0.95);
}

.share-social-icon {
  width: 20px;
  height: 20px;
  transition: all 0.2s ease;
}

.share-social-icon-btn:hover .share-social-icon {
  transform: scale(1.1);
}

/* Tooltip 样式 */
.share-social-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.share-social-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 1000;
  margin-bottom: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.share-social-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.9);
}

.share-social-tooltip-wrapper:hover .share-social-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(-2px);
}

/* 社交媒体图标颜色 */
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

/* 国际平台颜色 */
.share-x .share-social-icon {
  color: #000000;
}

.share-facebook .share-social-icon {
  color: #1877f2;
}

.share-linkedin .share-social-icon {
  color: #0a66c2;
}

.share-instagram .share-social-icon {
  color: #e4405f;
}

.share-tiktok .share-social-icon {
  color: #000000;
}

.share-reddit .share-social-icon {
  color: #ff4500;
}

.share-discord .share-social-icon {
  color: #5865f2;
}

.share-telegram .share-social-icon {
  color: #0088cc;
}

/* 社交媒体按钮悬停效果 */
.share-wechat:hover {
  background: rgba(7, 193, 96, 0.1);
  border-color: rgba(7, 193, 96, 0.3);
}

.share-qq:hover {
  background: rgba(18, 183, 245, 0.1);
  border-color: rgba(18, 183, 245, 0.3);
}

.share-weibo:hover {
  background: rgba(230, 22, 45, 0.1);
  border-color: rgba(230, 22, 45, 0.3);
}

.share-moments:hover {
  background: rgba(7, 193, 96, 0.1);
  border-color: rgba(7, 193, 96, 0.3);
}

.share-x:hover {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.3);
}

.share-facebook:hover {
  background: rgba(24, 119, 242, 0.1);
  border-color: rgba(24, 119, 242, 0.3);
}

.share-linkedin:hover {
  background: rgba(10, 102, 194, 0.1);
  border-color: rgba(10, 102, 194, 0.3);
}

.share-instagram:hover {
  background: rgba(228, 64, 95, 0.1);
  border-color: rgba(228, 64, 95, 0.3);
}

.share-tiktok:hover {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.3);
}

.share-reddit:hover {
  background: rgba(255, 69, 0, 0.1);
  border-color: rgba(255, 69, 0, 0.3);
}

.share-discord:hover {
  background: rgba(88, 101, 242, 0.1);
  border-color: rgba(88, 101, 242, 0.3);
}

.share-telegram:hover {
  background: rgba(0, 136, 204, 0.1);
  border-color: rgba(0, 136, 204, 0.3);
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
  
  .share-social-icon-btn {
    background: rgba(31, 41, 55, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .share-social-icon-btn:hover {
    background: rgba(31, 41, 55, 0.8);
  }

  .share-social-tooltip {
    background: rgba(17, 24, 39, 0.95);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .share-social-tooltip::after {
    border-top-color: rgba(17, 24, 39, 0.95);
  }

  .share-section-title {
    color: #d1d5db;
  }

  .share-social-grid-china {
    border-color: rgba(255, 255, 255, 0.1);
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

/* 响应式设计 */
@media (max-width: 480px) {
  .share-panel {
    width: 280px;
    left: -10px;
  }
  
  .share-social-icons-row {
    gap: 6px;
  }
  
  .share-social-icon-btn {
    width: 36px;
    height: 36px;
  }
  
  .share-social-icon {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 360px) {
  .share-panel {
    width: 260px;
    left: -20px;
  }
  
  .share-social-icon-btn {
    width: 32px;
    height: 32px;
  }
  
  .share-social-icon {
    width: 16px;
    height: 16px;
  }
}

/* 超小屏幕优化 */
@media (max-width: 320px) {
  .share-panel {
    width: 240px;
    left: -30px;
  }
  
  .share-social-icons-row {
    gap: 4px;
  }
  
  .share-social-icon-btn {
    width: 30px;
    height: 30px;
  }
  
  .share-social-icon {
    width: 14px;
    height: 14px;
  }
}
</style>

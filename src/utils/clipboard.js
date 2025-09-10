/**
 * 剪贴板工具函数
 * 提供跨浏览器兼容的剪贴板操作
 */

import logger from './logger.js'

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} - 是否复制成功
 */
export const copyText = async (text) => {
  try {
    // 优先使用现代 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
    
    // 降级方案：使用传统方法
    return fallbackCopyText(text)
  } catch (error) {
    logger.error('复制文本失败:', error)
    
    // 尝试降级方案
    try {
      return fallbackCopyText(text)
    } catch (fallbackError) {
      logger.error('降级复制也失败:', fallbackError)
      return false
    }
  }
}

/**
 * 降级复制方案
 * @param {string} text - 要复制的文本
 * @returns {boolean} - 是否复制成功
 */
const fallbackCopyText = (text) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  
  // 设置样式，使其不可见
  textArea.style.position = 'fixed'
  textArea.style.left = '-999999px'
  textArea.style.top = '-999999px'
  textArea.style.opacity = '0'
  textArea.style.pointerEvents = 'none'
  textArea.style.zIndex = '-1'
  
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  
  try {
    const successful = document.execCommand('copy')
    document.body.removeChild(textArea)
    return successful
  } catch (error) {
    document.body.removeChild(textArea)
    throw error
  }
}

/**
 * 复制图片到剪贴板
 * @param {string} dataUrl - 图片的 data URL
 * @returns {Promise<boolean>} - 是否复制成功
 */
export const copyImage = async (dataUrl) => {
  try {
    if (!navigator.clipboard || !window.isSecureContext) {
      throw new Error('Clipboard API not available')
    }
    
    const response = await fetch(dataUrl)
    const blob = await response.blob()
    
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ])
    
    return true
  } catch (error) {
    logger.error('复制图片失败:', error)
    return false
  }
}

/**
 * 检查剪贴板API是否可用
 * @returns {boolean} - 是否可用
 */
export const isClipboardAvailable = () => {
  return !!(navigator.clipboard && window.isSecureContext)
}

/**
 * 显示复制结果提示
 * @param {boolean} success - 是否成功
 * @param {string} type - 复制类型（文本/图片）
 */
export const showCopyResult = (success, type = '内容') => {
  if (success) {
    // 可以集成到通知系统
    logger.log(`${type}已复制到剪贴板`)
  } else {
    logger.error(`复制${type}失败`)
  }
}

/**
 * 带提示的复制文本
 * @param {string} text - 要复制的文本
 * @param {string} type - 复制类型描述
 * @returns {Promise<boolean>} - 是否复制成功
 */
export const copyTextWithFeedback = async (text, type = '内容') => {
  const success = await copyText(text)
  showCopyResult(success, type)
  return success
}

/**
 * 带提示的复制图片
 * @param {string} dataUrl - 图片的 data URL
 * @param {string} type - 复制类型描述
 * @returns {Promise<boolean>} - 是否复制成功
 */
export const copyImageWithFeedback = async (dataUrl, type = '图片') => {
  const success = await copyImage(dataUrl)
  showCopyResult(success, type)
  return success
}

export default {
  copyText,
  copyImage,
  isClipboardAvailable,
  showCopyResult,
  copyTextWithFeedback,
  copyImageWithFeedback
}

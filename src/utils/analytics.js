/**
 * Google Analytics 工具函数
 * 用于跟踪页面浏览和自定义事件
 */

// 检查Google Analytics是否可用
const isGAAvailable = () => {
  return typeof gtag !== 'undefined' && typeof window !== 'undefined'
}

// 跟踪页面浏览
export const trackPageView = (path, title) => {
  if (isGAAvailable()) {
    gtag('config', 'G-LC13BPKH3G', {
      page_path: path,
      page_title: title || document.title
    })
  }
}

// 跟踪自定义事件
export const trackEvent = (action, category, label, value) => {
  if (isGAAvailable()) {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
  }
}

// 跟踪工具使用
export const trackToolUsage = (toolId, toolName, category) => {
  trackEvent('tool_used', 'tools', `${toolName} (${toolId})`, 1)
}

// 跟踪搜索行为
export const trackSearch = (searchTerm, resultCount) => {
  trackEvent('search', 'search', searchTerm, resultCount)
}

// 跟踪用户交互
export const trackUserInteraction = (action, element) => {
  trackEvent('user_interaction', 'engagement', `${action}_${element}`, 1)
}

// 跟踪错误
export const trackError = (error, context) => {
  if (isGAAvailable()) {
    gtag('event', 'exception', {
      description: error.message || error,
      fatal: false,
      custom_map: {
        context: context
      }
    })
  }
}

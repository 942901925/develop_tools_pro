// 反馈数据存储工具
class FeedbackStorage {
  constructor() {
    this.storageKey = 'devtools_feedback'
    this.feedback = this.loadFeedback()
  }

  // 加载反馈数据
  loadFeedback() {
    try {
      const data = localStorage.getItem(this.storageKey)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('加载反馈数据失败:', error)
      return []
    }
  }

  // 保存反馈数据
  saveFeedback() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.feedback))
      return true
    } catch (error) {
      console.error('保存反馈数据失败:', error)
      return false
    }
  }

  // 添加新反馈
  addFeedback(feedbackData) {
    const newFeedback = {
      id: this.generateId(),
      content: feedbackData.content,
      type: feedbackData.type || 'suggestion',
      status: 'pending',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      rating: feedbackData.rating || null
    }

    this.feedback.unshift(newFeedback)
    this.saveFeedback()
    
    // 触发自定义事件，通知其他组件
    window.dispatchEvent(new CustomEvent('feedbackAdded', { 
      detail: newFeedback 
    }))

    return newFeedback
  }

  // 更新反馈状态
  updateFeedbackStatus(id, status) {
    const feedback = this.feedback.find(f => f.id === id)
    if (feedback) {
      feedback.status = status
      feedback.updatedAt = new Date().toISOString()
      this.saveFeedback()
      return true
    }
    return false
  }

  // 删除反馈
  deleteFeedback(id) {
    const index = this.feedback.findIndex(f => f.id === id)
    if (index !== -1) {
      this.feedback.splice(index, 1)
      this.saveFeedback()
      return true
    }
    return false
  }

  // 获取所有反馈
  getAllFeedback() {
    return [...this.feedback]
  }

  // 根据状态获取反馈
  getFeedbackByStatus(status) {
    return this.feedback.filter(f => f.status === status)
  }

  // 获取反馈统计
  getFeedbackStats() {
    const stats = {
      total: this.feedback.length,
      pending: 0,
      reviewed: 0,
      resolved: 0,
      byType: {}
    }

    this.feedback.forEach(feedback => {
      stats[feedback.status] = (stats[feedback.status] || 0) + 1
      stats.byType[feedback.type] = (stats.byType[feedback.type] || 0) + 1
    })

    return stats
  }

  // 生成唯一ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // 导出反馈数据
  exportFeedback() {
    const data = {
      exportDate: new Date().toISOString(),
      totalCount: this.feedback.length,
      feedback: this.feedback
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `feedback-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // 清空所有反馈
  clearAllFeedback() {
    this.feedback = []
    this.saveFeedback()
  }
}

// 创建全局实例
const feedbackStorage = new FeedbackStorage()

export default feedbackStorage

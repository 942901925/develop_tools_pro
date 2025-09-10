/**
 * 请求管理器
 * 用于管理外部API调用，避免与Google Analytics网络请求冲突
 */

class RequestManager {
  constructor() {
    this.queue = []
    this.active = 0
    this.maxConcurrent = 2 // 限制并发请求数量
    this.timeout = 10000 // 10秒超时
  }

  async request(url, options = {}) {
    return new Promise((resolve, reject) => {
      // 添加超时和优先级设置
      const requestOptions = {
        ...options,
        signal: AbortSignal.timeout(this.timeout),
        priority: 'low' // 降低优先级，避免影响Google Analytics
      }

      this.queue.push({ 
        url, 
        options: requestOptions, 
        resolve, 
        reject,
        timestamp: Date.now()
      })
      
      this.process()
    })
  }

  async process() {
    if (this.active >= this.maxConcurrent || this.queue.length === 0) {
      return
    }

    this.active++
    const { url, options, resolve, reject } = this.queue.shift()

    try {
      const response = await fetch(url, options)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      resolve(response)
    } catch (error) {
      reject(error)
    } finally {
      this.active--
      this.process()
    }
  }

  // 清理过期的请求
  cleanup() {
    const now = Date.now()
    this.queue = this.queue.filter(item => now - item.timestamp < 30000) // 30秒过期
  }
}

// 创建全局请求管理器实例
export const requestManager = new RequestManager()

// 定期清理过期请求
setInterval(() => {
  requestManager.cleanup()
}, 60000) // 每分钟清理一次

// 导出便捷方法
export const apiRequest = (url, options = {}) => {
  return requestManager.request(url, options)
}

export default requestManager

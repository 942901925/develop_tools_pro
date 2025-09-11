/**
 * 日志工具函数
 * 在生产环境中禁用控制台日志，避免干扰Google Analytics
 */

const isDev = import.meta.env.DEV

export const logger = {
  log: (...args) => {
    if (isDev) {
      console.log(...args)
    }
  },
  
  error: (...args) => {
    if (isDev) {
      console.error(...args)
    }
  },
  
  warn: (...args) => {
    if (isDev) {
      console.warn(...args)
    }
  },
  
  info: (...args) => {
    if (isDev) {
      console.info(...args)
    }
  },
  
  debug: (...args) => {
    if (isDev) {
      console.debug(...args)
    }
  }
}

// 导出默认日志器
export default logger

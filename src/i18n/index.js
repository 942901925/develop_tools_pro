import { createI18n } from 'vue-i18n'
import zhCN from '../locales/zh-CN.js'
import zhTW from '../locales/zh-TW.js'
import en from '../locales/en.js'
import ru from '../locales/ru.js'
import fr from '../locales/fr.js'

// 支持的语言列表
export const supportedLocales = [
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
]

// 获取默认语言
const getDefaultLocale = () => {
  const saved = localStorage.getItem('locale')
  if (saved && supportedLocales.find(locale => locale.code === saved)) {
    return saved
  }
  
  // 根据浏览器语言自动选择
  const browserLang = navigator.language || navigator.languages[0]
  if (browserLang.startsWith('zh')) {
    return browserLang.includes('TW') || browserLang.includes('HK') ? 'zh-TW' : 'zh-CN'
  }
  if (browserLang.startsWith('ru')) return 'ru'
  if (browserLang.startsWith('fr')) return 'fr'
  return 'en'
}

// 创建 i18n 实例
const i18n = createI18n({
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en': en,
    'ru': ru,
    'fr': fr
  },
  legacy: false, // 使用 Composition API
  globalInjection: true
})

// 切换语言
export const setLocale = (locale) => {
  if (supportedLocales.find(l => l.code === locale)) {
    i18n.global.locale.value = locale
    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
  }
}

// 获取当前语言
export const getCurrentLocale = () => {
  return i18n.global.locale.value
}

// 获取语言信息
export const getLocaleInfo = (code) => {
  return supportedLocales.find(locale => locale.code === code)
}

export default i18n

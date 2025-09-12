/**
 * IP地理位置检测工具
 * 用于根据用户IP地址自动检测所在地区并设置默认语言
 */

// 支持的地理区域和对应语言
const REGION_LANGUAGE_MAP = {
  // 中国大陆
  'CN': 'zh-CN',
  // 台湾
  'TW': 'zh-CN', 
  // 香港
  'HK': 'zh-CN',
  // 澳门
  'MO': 'zh-CN',
  // 新加坡（华人较多）
  'SG': 'zh-CN',
  // 马来西亚（华人较多）
  'MY': 'zh-CN',
  // 其他地区默认英文
  'default': 'en'
}

// 缓存IP地理位置信息，避免重复请求
const geoCache = new Map()
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24小时

/**
 * 获取用户IP地址
 * @returns {Promise<string>} IP地址
 */
async function getUserIP() {
  try {
    // 使用多个IP检测服务作为备选
    const ipServices = [
      'https://api.ipify.org?format=json',
      'https://ipapi.co/json/',
      'https://ipinfo.io/json'
    ]
    
    for (const service of ipServices) {
      try {
        const response = await fetch(service, {
          method: 'GET',
          timeout: 5000
        })
        
        if (response.ok) {
          const data = await response.json()
          return data.ip || data.query || data.ipAddress
        }
      } catch (error) {
        console.warn(`IP检测服务 ${service} 失败:`, error)
        continue
      }
    }
    
    throw new Error('所有IP检测服务都失败了')
  } catch (error) {
    console.error('获取用户IP失败:', error)
    return null
  }
}

/**
 * 根据IP地址获取地理位置信息
 * @param {string} ip - IP地址
 * @returns {Promise<Object>} 地理位置信息
 */
async function getGeoLocation(ip) {
  // 检查缓存
  const cacheKey = `geo_${ip}`
  const cached = geoCache.get(cacheKey)
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  
  try {
    // 使用多个地理位置API作为备选
    const geoApis = [
      `https://ipapi.co/${ip}/json/`,
      `https://ipinfo.io/${ip}/json`,
      `https://ip-api.com/json/${ip}`
    ]
    
    for (const api of geoApis) {
      try {
        const response = await fetch(api, {
          method: 'GET',
          timeout: 5000
        })
        
        if (response.ok) {
          const data = await response.json()
          
          // 标准化数据格式
          const geoData = {
            country: data.country_code || data.countryCode || data.country,
            countryName: data.country_name || data.country,
            region: data.region || data.regionName,
            city: data.city,
            timezone: data.timezone,
            ip: ip
          }
          
          // 缓存结果
          geoCache.set(cacheKey, {
            data: geoData,
            timestamp: Date.now()
          })
          
          return geoData
        }
      } catch (error) {
        console.warn(`地理位置API ${api} 失败:`, error)
        continue
      }
    }
    
    throw new Error('所有地理位置API都失败了')
  } catch (error) {
    console.error('获取地理位置失败:', error)
    return null
  }
}

/**
 * 根据国家代码获取推荐语言
 * @param {string} countryCode - 国家代码
 * @returns {string} 语言代码
 */
function getLanguageByCountry(countryCode) {
  if (!countryCode) {
    return REGION_LANGUAGE_MAP.default
  }
  
  const upperCountryCode = countryCode.toUpperCase()
  return REGION_LANGUAGE_MAP[upperCountryCode] || REGION_LANGUAGE_MAP.default
}

/**
 * 检测用户地理位置并返回推荐语言
 * @returns {Promise<string>} 推荐的语言代码
 */
export async function detectUserLanguage() {
  try {
    // 检查是否已有用户语言偏好设置
    const savedLanguage = localStorage.getItem('user-language-preference')
    if (savedLanguage) {
      return savedLanguage
    }
    
    // 获取用户IP
    const ip = await getUserIP()
    if (!ip) {
      console.warn('无法获取用户IP，使用默认语言')
      return REGION_LANGUAGE_MAP.default
    }
    
    // 获取地理位置
    const geoData = await getGeoLocation(ip)
    if (!geoData) {
      console.warn('无法获取地理位置，使用默认语言')
      return REGION_LANGUAGE_MAP.default
    }
    
    // 根据国家代码确定语言
    const recommendedLanguage = getLanguageByCountry(geoData.country)
    
    console.log('地理位置检测结果:', {
      ip: geoData.ip,
      country: geoData.country,
      countryName: geoData.countryName,
      recommendedLanguage: recommendedLanguage
    })
    
    return recommendedLanguage
  } catch (error) {
    console.error('语言检测失败:', error)
    return REGION_LANGUAGE_MAP.default
  }
}

/**
 * 保存用户语言偏好
 * @param {string} language - 语言代码
 */
export function saveUserLanguagePreference(language) {
  localStorage.setItem('user-language-preference', language)
}

/**
 * 清除用户语言偏好缓存
 */
export function clearLanguagePreference() {
  localStorage.removeItem('user-language-preference')
  geoCache.clear()
}

/**
 * 获取支持的语言列表
 * @returns {Array} 支持的语言列表
 */
export function getSupportedLanguages() {
  return [
    { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]
}

/**
 * 获取语言显示名称
 * @param {string} languageCode - 语言代码
 * @returns {string} 语言显示名称
 */
export function getLanguageDisplayName(languageCode) {
  const languages = getSupportedLanguages()
  const language = languages.find(lang => lang.code === languageCode)
  return language ? `${language.flag} ${language.name}` : languageCode
}

// SEO 工具函数
import { tools } from '../data/tools.js'

/**
 * 生成工具详情页的SEO信息
 * @param {string} toolId - 工具ID
 * @returns {Object} SEO信息对象
 */
export function generateToolSEO(toolId) {
  const tool = tools.find(t => t.id === toolId)
  
  if (!tool) {
    return {
      title: '工具未找到 - Develop Tools Pro',
      description: 'Develop Tools Pro - 为高效工作人士打造的现代化工具集合',
      keywords: '开发者工具,在线工具,工作效率'
    }
  }

  // 根据工具类型生成不同的关键词
  const categoryKeywords = {
    'JSON工具': 'JSON格式化,JSON验证,JSON压缩,YAML转换,JSON Schema',
    '时间工具': '时间戳转换,时间计算,倒计时,时区转换,日期计算',
    '编码工具': 'Base64编码,URL编码,HTML实体编码,字符编码',
    '加密工具': '哈希生成,密码生成,UUID生成,AES加密,数据加密',
    '文本工具': '文本统计,文本对比,正则表达式,代码高亮,文本处理',
    '图片工具': '图片转换,图片压缩,图片处理,格式转换',
    '网络工具': 'IP查询,User-Agent解析,HTTP状态码,网络诊断',
    '开发工具': 'SQL格式化,CSS格式化,代码格式化,开发辅助'
  }

  const keywords = categoryKeywords[tool.category] || '开发者工具,在线工具,工作效率'
  
  return {
    title: `${tool.name} - ${tool.description} | Develop Tools Pro`,
    description: `使用 ${tool.name} 工具：${tool.description}。Develop Tools Pro 为高效工作人士打造的现代化工具集合，提升您的工作效率。`,
    keywords: `${keywords},${tool.name},在线工具,免费工具,工作效率`,
    category: tool.category
  }
}

/**
 * 更新页面SEO信息
 * @param {Object} seoInfo - SEO信息对象
 */
export function updatePageSEO(seoInfo) {
  // 更新标题
  if (seoInfo.title) {
    document.title = seoInfo.title
  }
  
  // 更新描述
  if (seoInfo.description) {
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', seoInfo.description)
    }
  }
  
  // 更新关键词
  if (seoInfo.keywords) {
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seoInfo.keywords)
    }
  }
  
  // 更新Open Graph标签
  if (seoInfo.title) {
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', seoInfo.title)
    }
  }
  
  if (seoInfo.description) {
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', seoInfo.description)
    }
  }
}

/**
 * 生成面包屑导航的JSON-LD结构化数据
 * @param {Array} breadcrumbs - 面包屑数组
 * @returns {Object} JSON-LD对象
 */
export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

/**
 * 生成工具页面的JSON-LD结构化数据
 * @param {Object} tool - 工具对象
 * @returns {Object} JSON-LD对象
 */
export function generateToolSchema(tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "url": `https://develop-tools-pro.vercel.app/tool/${tool.id}`,
    "author": {
      "@type": "Organization",
      "name": "Develop Tools Pro"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Develop Tools Pro",
      "url": "https://develop-tools-pro.vercel.app/"
    },
    "isAccessibleForFree": true,
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareRequirements": "Web Browser"
  }
}

/**
 * 添加结构化数据到页面
 * @param {Object} schema - 结构化数据对象
 */
export function addStructuredData(schema) {
  // 移除现有的结构化数据
  const existingScript = document.querySelector('script[type="application/ld+json"]')
  if (existingScript && existingScript.id === 'dynamic-schema') {
    existingScript.remove()
  }
  
  // 添加新的结构化数据
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = 'dynamic-schema'
  script.textContent = JSON.stringify(schema)
  document.head.appendChild(script)
}

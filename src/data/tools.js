// 工具数据配置
export const tools = [
  // 职场工具
  {
    id: 'salary-calculator',
    name: '薪酬计算器',
    description: '计算总包、时薪和涨幅',
    category: '职场工具',
    icon: 'Calculator',
    color: 'green',
    size: 'normal',
    component: 'SalaryCalculator'
  },
  {
    id: 'vacation-calculator',
    name: '假期计算器',
    description: '智能优化假期安排，最大化休息时间',
    category: '职场工具',
    icon: 'Calendar',
    color: 'blue',
    size: 'normal',
    component: 'VacationCalculator'
  },
  {
    id: 'ocr-text-extraction',
    name: 'OCR文字提取',
    description: '无需上传服务器，在浏览器中快速提取图片中的文字',
    category: '职场工具',
    icon: 'FileText',
    color: 'purple',
    size: 'normal',
    component: 'OCRTextExtraction'
  },
  {
    id: 'business-card-ocr',
    name: '名片信息提取',
    description: '智能识别名片图片，自动提取并结构化联系人信息',
    category: '职场工具',
    icon: 'CreditCard',
    color: 'indigo',
    size: 'normal',
    component: 'BusinessCardOCR'
  },
  {
    id: 'social-security-calculator',
    name: '社保公积金计算器',
    description: '计算全国主要城市的社保公积金缴纳明细和税后收入',
    category: '职场工具',
    icon: 'Shield',
    color: 'teal',
    size: 'normal',
    component: 'SocialSecurityCalculator'
  },
  {
    id: 'privacy-checker',
    name: '隐私泄露查询',
    description: '检查邮箱是否在数据泄露事件中被暴露，保护您的隐私安全',
    category: '职场工具',
    icon: 'ShieldCheck',
    color: 'red',
    size: 'normal',
    component: 'PrivacyChecker'
  },
  {
    id: 'information-breakout',
    name: '信息茧房突破器',
    description: '生成多维度搜索关键词，帮助突破信息茧房，获得更全面的信息视角',
    category: '职场工具',
    icon: 'Search',
    color: 'orange',
    size: 'normal',
    component: 'InformationBreakout'
  },
  {
    id: 'digital-cleanup',
    name: '数字足迹清理助手',
    description: '提供20+主流平台的账号注销指南，帮助清理数字足迹，保护隐私安全',
    category: '职场工具',
    icon: 'Shield',
    color: 'purple',
    size: 'normal',
    component: 'DigitalCleanupAssistant'
  },
  {
    id: 'markdown-beautifier',
    name: 'Markdown格式化与美化工具',
    description: '专业的Markdown格式化工具，支持语法高亮、实时预览和多种格式化规则',
    category: '开发工具',
    icon: 'FileText',
    color: 'blue',
    size: 'normal',
    component: 'MarkdownBeautifier'
  },
  {
    id: 'api-mock-generator',
    name: 'API接口Mock生成器',
    description: '快速生成API接口Mock数据，支持多种数据类型和网络延迟模拟',
    category: '开发工具',
    icon: 'Server',
    color: 'purple',
    size: 'normal',
    component: 'ApiMockGenerator'
  },
  
  // JSON工具
  {
    id: 'json-formatter',
    name: 'JSON格式化',
    description: '格式化、压缩、验证JSON数据',
    category: 'JSON工具',
    icon: 'Code',
    color: 'blue',
    size: 'normal',
    component: 'JsonFormatter'
  },
  {
    id: 'json-yaml-converter',
    name: 'JSON转YAML',
    description: 'JSON与YAML格式互转',
    category: 'JSON工具',
    icon: 'ArrowLeftRight',
    color: 'green',
    size: 'normal',
    component: 'JsonYamlConverter'
    
  },
  {
    id: 'json-schema-generator',
    name: 'JSON Schema生成',
    description: '根据JSON数据生成Schema',
    category: 'JSON工具',
    icon: 'FileText',
    color: 'purple',
    size: 'normal',
    component: 'JsonSchemaGenerator'
  },
  
  // 时间工具
  {
    id: 'timestamp-converter',
    name: '时间戳转换',
    description: 'Unix时间戳与日期互转',
    category: '时间工具',
    icon: 'Clock',
    color: 'orange',
    size: 'normal',
    component: 'TimestampConverter'
  },
  {
    id: 'time-calculator',
    name: '时间计算器',
    description: '日期加减、时区转换',
    category: '时间工具',
    icon: 'Calculator',
    color: 'blue',
    size: 'normal',
    component: 'TimeCalculator'
  },
  {
    id: 'countdown-timer',
    name: '倒计时器',
    description: '自定义倒计时功能',
    category: '时间工具',
    icon: 'Timer',
    color: 'red',
    size: 'normal',
    component: 'CountdownTimer'
  },
  
  // 编码解码
  {
    id: 'base64-encoder',
    name: 'Base64编解码',
    description: 'Base64编码解码工具',
    category: '编码解码',
    icon: 'Shield',
    color: 'green',
    size: 'normal',
    component: 'Base64Encoder'
  },
  {
    id: 'url-encoder',
    name: 'URL编解码',
    description: 'URL编码解码工具',
    category: '编码解码',
    icon: 'Link',
    color: 'blue',
    size: 'normal',
    component: 'UrlEncoder'
  },
  {
    id: 'html-entities',
    name: 'HTML实体编解码',
    description: 'HTML实体字符转换',
    category: '编码解码',
    icon: 'Hash',
    color: 'purple',
    size: 'normal',
    component: 'HtmlEntities'
  },
  
  // 文本处理
  {
    id: 'text-diff',
    name: '文本差异对比',
    description: '两个文本的差异对比',
    category: '文本处理',
    icon: 'GitCompare',
    color: 'orange',
    size: 'normal',
    component: 'TextDiff'
  },
  {
    id: 'regex-tester',
    name: '正则表达式测试',
    description: '正则表达式在线测试',
    category: '文本处理',
    icon: 'Search',
    color: 'green',
    size: 'normal',
    component: 'RegexTester'
  },
  {
    id: 'text-statistics',
    name: '文本统计',
    description: '字符、单词、行数统计',
    category: '文本处理',
    icon: 'BarChart3',
    color: 'blue',
    size: 'normal',
    component: 'TextStatistics'
  },
  
  // 数据生成
  {
    id: 'uuid-generator',
    name: 'UUID生成器',
    description: '生成各种格式的UUID',
    category: '数据生成',
    icon: 'Key',
    color: 'purple',
    size: 'normal',
    component: 'UuidGenerator'
  },
  {
    id: 'password-generator',
    name: '随机密码生成',
    description: '自定义规则密码生成',
    category: '数据生成',
    icon: 'Lock',
    color: 'red',
    size: 'normal',
    component: 'PasswordGenerator'
  },
  {
    id: 'fake-data-generator',
    name: '假数据生成',
    description: '姓名、邮箱、地址等假数据',
    category: '数据生成',
    icon: 'Users',
    color: 'green',
    size: 'normal',
    component: 'FakeDataGenerator'
  },
  
  // 图像处理
  {
    id: 'image-compressor',
    name: '图片压缩',
    description: '在线图片压缩工具',
    category: '图像处理',
    icon: 'Image',
    color: 'blue',
    size: 'normal',
    component: 'ImageCompressor'
  },
  {
    id: 'image-converter',
    name: '图片格式转换',
    description: '支持JPG/PNG/WebP转换',
    category: '图像处理',
    icon: 'RefreshCw',
    color: 'orange',
    size: 'normal',
    component: 'ImageConverter'
  },
  {
    id: 'qr-code-generator',
    name: '二维码生成',
    description: '文本/链接生成二维码',
    category: '图像处理',
    icon: 'QrCode',
    color: 'purple',
    size: 'normal',
    component: 'QrCodeGenerator'
  },
  
  // 加密解密
  {
    id: 'hash-generator',
    name: 'MD5/SHA哈希',
    description: '多种哈希算法计算',
    category: '加密解密',
    icon: 'Fingerprint',
    color: 'red',
    size: 'normal',
    component: 'HashGenerator'
  },
  {
    id: 'aes-encryptor',
    name: 'AES加密解密',
    description: 'AES对称加密工具',
    category: '加密解密',
    icon: 'ShieldCheck',
    color: 'green',
    size: 'normal',
    component: 'AesEncryptor'
  },
  {
    id: 'password-strength',
    name: '密码强度检测',
    description: '密码安全性评估',
    category: '加密解密',
    icon: 'AlertTriangle',
    color: 'orange',
    size: 'normal',
    component: 'PasswordStrength'
  },
  
  // 网络工具
  {
    id: 'ip-lookup',
    name: 'IP地址查询',
    description: '查询IP地址信息',
    category: '网络工具',
    icon: 'Globe',
    color: 'blue',
    size: 'normal',
    component: 'IpLookup'
  },
  {
    id: 'user-agent-parser',
    name: 'User-Agent解析',
    description: '解析浏览器User-Agent',
    category: '网络工具',
    icon: 'Monitor',
    color: 'purple',
    size: 'normal',
    component: 'UserAgentParser'
  },
  {
    id: 'http-status-codes',
    name: 'HTTP状态码查询',
    description: 'HTTP状态码含义查询',
    category: '网络工具',
    icon: 'Server',
    color: 'green',
    size: 'normal',
    component: 'HttpStatusCodes'
  },
  
  // 开发工具
  {
    id: 'css-formatter',
    name: 'CSS美化',
    description: 'CSS代码格式化美化',
    category: '开发工具',
    icon: 'Palette',
    color: 'blue',
    size: 'normal',
    component: 'CssFormatter'
  },
  {
    id: 'sql-formatter',
    name: 'SQL格式化',
    description: 'SQL语句格式化',
    category: '开发工具',
    icon: 'Database',
    color: 'green',
    size: 'normal',
    component: 'SqlFormatter'
  },
  {
    id: 'color-picker',
    name: '颜色选择器',
    description: '颜色值转换和选择',
    category: '开发工具',
    icon: 'Droplets',
    color: 'purple',
    size: 'normal',
    component: 'ColorPicker'
  },
  {
    id: 'unit-converter',
    name: '单位转换器',
    description: '长度、重量、温度等转换',
    category: '开发工具',
    icon: 'Ruler',
    color: 'orange',
    size: 'normal',
    component: 'UnitConverter'
  },
  {
    id: 'number-base-converter',
    name: '进制转换器',
    description: '二进制、八进制、十六进制转换',
    category: '开发工具',
    icon: 'Binary',
    color: 'red',
    size: 'normal',
    component: 'NumberBaseConverter'
  },
  {
    id: 'code-highlighter',
    name: '代码高亮',
    description: '多语言代码语法高亮',
    category: '开发工具',
    icon: 'Code2',
    color: 'blue',
    size: 'normal',
    component: 'CodeHighlighter'
  }
]

// 工具分类
export const categories = [
  { id: 'all', name: '全部工具', count: tools.length },
  { id: 'JSON工具', name: 'JSON工具', count: tools.filter(t => t.category === 'JSON工具').length },
  { id: '时间工具', name: '时间工具', count: tools.filter(t => t.category === '时间工具').length },
  { id: '编码解码', name: '编码解码', count: tools.filter(t => t.category === '编码解码').length },
  { id: '文本处理', name: '文本处理', count: tools.filter(t => t.category === '文本处理').length },
  { id: '数据生成', name: '数据生成', count: tools.filter(t => t.category === '数据生成').length },
  { id: '图像处理', name: '图像处理', count: tools.filter(t => t.category === '图像处理').length },
  { id: '加密解密', name: '加密解密', count: tools.filter(t => t.category === '加密解密').length },
  { id: '网络工具', name: '网络工具', count: tools.filter(t => t.category === '网络工具').length },
  { id: '开发工具', name: '开发工具', count: tools.filter(t => t.category === '开发工具').length },
  { id: '职场工具', name: '职场工具', count: tools.filter(t => t.category === '职场工具').length }
]

// 获取本地化的分类列表
export const getLocalizedCategories = (t) => {
  return [
    { id: 'all', name: t('home.categories.all'), count: tools.length },
    { id: 'JSON工具', name: t('home.categories.json'), count: tools.filter(t => t.category === 'JSON工具').length },
    { id: '时间工具', name: t('home.categories.time'), count: tools.filter(t => t.category === '时间工具').length },
    { id: '编码解码', name: t('home.categories.encoding'), count: tools.filter(t => t.category === '编码解码').length },
    { id: '文本处理', name: t('home.categories.text'), count: tools.filter(t => t.category === '文本处理').length },
    { id: '数据生成', name: t('home.categories.data'), count: tools.filter(t => t.category === '数据生成').length },
    { id: '图像处理', name: t('home.categories.image'), count: tools.filter(t => t.category === '图像处理').length },
    { id: '加密解密', name: t('home.categories.crypto'), count: tools.filter(t => t.category === '加密解密').length },
    { id: '网络工具', name: t('home.categories.network'), count: tools.filter(t => t.category === '网络工具').length },
    { id: '开发工具', name: t('home.categories.dev'), count: tools.filter(t => t.category === '开发工具').length },
    { id: '职场工具', name: t('home.categories.workplace'), count: tools.filter(t => t.category === '职场工具').length }
  ]
}

// 根据ID获取工具
export const getToolById = (id) => {
  return tools.find(tool => tool.id === id)
}

// 根据分类获取工具
export const getToolsByCategory = (category) => {
  if (category === 'all') return tools
  return tools.filter(tool => tool.category === category)
}

// 搜索工具
export const searchTools = (query) => {
  if (!query.trim()) return tools
  const lowercaseQuery = query.toLowerCase()
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.category.toLowerCase().includes(lowercaseQuery)
  )
}

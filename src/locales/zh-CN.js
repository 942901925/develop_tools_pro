// 简体中文
export default {
  // 通用
  common: {
    search: '搜索',
    clear: '清空',
    copy: '复制',
    copySuccess: '复制成功',
    copyFailed: '复制失败',
    loading: '加载中...',
    error: '错误',
    success: '成功',
    cancel: '取消',
    confirm: '确认',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    add: '添加',
    close: '关闭',
    open: '打开',
    refresh: '刷新',
    reset: '重置',
    submit: '提交',
    download: '下载',
    upload: '上传',
    select: '选择',
    all: '全部',
    none: '无',
    yes: '是',
    no: '否'
  },
  
  // 导航
  nav: {
    title: 'Develop Tools Pro',
    subtitle: '开发者工具集合',
    searchPlaceholder: '搜索工具...',
    home: '首页',
    tools: '工具'
  },
  
  // 首页
  home: {
    title: 'Develop Tools Pro',
    subtitle: '为开发者打造的现代化工具集合，30+ 实用工具，提升开发效率',
    noResults: '未找到相关工具',
    noResultsDesc: '尝试使用其他关键词搜索或选择不同的分类',
    categories: {
      all: '全部工具',
      json: 'JSON工具',
      time: '时间工具',
      encoding: '编码解码',
      text: '文本处理',
      data: '数据生成',
      image: '图像处理',
      crypto: '加密解密',
      network: '网络工具',
      dev: '开发工具'
    }
  },
  
  // 工具详情页
  toolDetail: {
    copyLink: '复制链接',
    backToList: '返回工具列表',
    toolNotFound: '工具不存在',
    toolNotFoundDesc: '您访问的工具不存在或已被移除',
    underDevelopment: '功能开发中',
    underDevelopmentDesc: '该工具的具体功能正在开发中，敬请期待'
  },
  
  // 工具分类
  tools: {
    categories: {
      'JSON工具': 'JSON工具',
      '时间工具': '时间工具',
      '编码解码': '编码解码',
      '文本处理': '文本处理',
      '数据生成': '数据生成',
      '图像处理': '图像处理',
      '加密解密': '加密解密',
      '网络工具': '网络工具',
      '开发工具': '开发工具'
    },
    
    // JSON工具
    'json-formatter': {
      name: 'JSON格式化',
      description: '格式化、压缩、验证JSON数据'
    },
    'json-yaml-converter': {
      name: 'JSON转YAML',
      description: 'JSON与YAML格式互转'
    },
    'json-schema-generator': {
      name: 'JSON Schema生成',
      description: '根据JSON数据生成Schema'
    },
    
    // 时间工具
    'timestamp-converter': {
      name: '时间戳转换',
      description: 'Unix时间戳与日期互转'
    },
    'time-calculator': {
      name: '时间计算器',
      description: '日期加减、时区转换'
    },
    'countdown-timer': {
      name: '倒计时器',
      description: '自定义倒计时功能'
    },
    
    // 编码解码
    'base64-encoder': {
      name: 'Base64编解码',
      description: 'Base64编码解码工具'
    },
    'url-encoder': {
      name: 'URL编解码',
      description: 'URL编码解码工具'
    },
    'html-entities': {
      name: 'HTML实体编解码',
      description: 'HTML实体字符转换'
    },
    
    // 文本处理
    'text-diff': {
      name: '文本差异对比',
      description: '两个文本的差异对比'
    },
    'regex-tester': {
      name: '正则表达式测试',
      description: '正则表达式在线测试'
    },
    'text-statistics': {
      name: '文本统计',
      description: '字符、单词、行数统计'
    },
    
    // 数据生成
    'uuid-generator': {
      name: 'UUID生成器',
      description: '生成各种格式的UUID'
    },
    'password-generator': {
      name: '随机密码生成',
      description: '自定义规则密码生成'
    },
    'fake-data-generator': {
      name: '假数据生成',
      description: '姓名、邮箱、地址等假数据'
    },
    
    // 图像处理
    'image-compressor': {
      name: '图片压缩',
      description: '在线图片压缩工具'
    },
    'image-converter': {
      name: '图片格式转换',
      description: '支持JPG/PNG/WebP转换'
    },
    'qr-code-generator': {
      name: '二维码生成',
      description: '文本/链接生成二维码'
    },
    
    // 加密解密
    'hash-generator': {
      name: 'MD5/SHA哈希',
      description: '多种哈希算法计算'
    },
    'aes-encryptor': {
      name: 'AES加密解密',
      description: 'AES对称加密工具'
    },
    'password-strength': {
      name: '密码强度检测',
      description: '密码安全性评估'
    },
    
    // 网络工具
    'ip-lookup': {
      name: 'IP地址查询',
      description: '查询IP地址信息'
    },
    'user-agent-parser': {
      name: 'User-Agent解析',
      description: '解析浏览器User-Agent'
    },
    'http-status-codes': {
      name: 'HTTP状态码查询',
      description: 'HTTP状态码含义查询'
    },
    
    // 开发工具
    'css-formatter': {
      name: 'CSS美化',
      description: 'CSS代码格式化美化'
    },
    'sql-formatter': {
      name: 'SQL格式化',
      description: 'SQL语句格式化'
    },
    'color-picker': {
      name: '颜色选择器',
      description: '颜色值转换和选择'
    },
    'unit-converter': {
      name: '单位转换器',
      description: '长度、重量、温度等转换'
    },
    'number-base-converter': {
      name: '进制转换器',
      description: '二进制、八进制、十六进制转换'
    },
    'code-highlighter': {
      name: '代码高亮',
      description: '多语言代码语法高亮'
    }
  },
  
  // 页脚
  footer: {
    copyright: '© 2024 Develop Tools Pro. 为开发者打造的现代化工具集合.'
  }
}


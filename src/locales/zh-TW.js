// 繁體中文
export default {
  // 通用
  common: {
    search: '搜尋',
    clear: '清空',
    copy: '複製',
    copySuccess: '複製成功',
    copyFailed: '複製失敗',
    loading: '載入中...',
    error: '錯誤',
    success: '成功',
    cancel: '取消',
    confirm: '確認',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    save: '儲存',
    delete: '刪除',
    edit: '編輯',
    add: '新增',
    close: '關閉',
    open: '開啟',
    refresh: '重新整理',
    reset: '重設',
    submit: '提交',
    download: '下載',
    upload: '上傳',
    select: '選擇',
    all: '全部',
    none: '無',
    yes: '是',
    no: '否'
  },
  
  // 導航
  nav: {
    title: 'Develop Tools Pro',
    subtitle: '開發者工具集合',
    searchPlaceholder: '搜尋工具...',
    home: '首頁',
    tools: '工具'
  },
  
  // 首頁
  home: {
    title: 'Develop Tools Pro',
    subtitle: '為高效的工作人士打造的現代化工具集合，30+ 實用工具，提升工作效率',
    noResults: '未找到相關工具',
    noResultsDesc: '嘗試使用其他關鍵詞搜尋或選擇不同的分類',
    categories: {
      all: '全部工具',
      json: 'JSON工具',
      time: '時間工具',
      encoding: '編碼解碼',
      text: '文字處理',
      data: '資料生成',
      image: '圖像處理',
      crypto: '加密解密',
      network: '網路工具',
      dev: '開發工具'
    }
  },
  
  // 工具詳情頁
  toolDetail: {
    copyLink: '複製連結',
    backToList: '返回工具列表',
    toolNotFound: '工具不存在',
    toolNotFoundDesc: '您存取的工具不存在或已被移除',
    underDevelopment: '功能開發中',
    underDevelopmentDesc: '該工具的具體功能正在開發中，敬請期待'
  },
  
  // 工具分類
  tools: {
    categories: {
      'JSON工具': 'JSON工具',
      '時間工具': '時間工具',
      '編碼解碼': '編碼解碼',
      '文字處理': '文字處理',
      '資料生成': '資料生成',
      '圖像處理': '圖像處理',
      '加密解密': '加密解密',
      '網路工具': '網路工具',
      '開發工具': '開發工具',
      '职场工具': '職場工具'
    },
    
    // JSON工具
    'json-formatter': {
      name: 'JSON格式化',
      description: '格式化、壓縮、驗證JSON資料'
    },
    'json-yaml-converter': {
      name: 'JSON轉YAML',
      description: 'JSON與YAML格式互轉'
    },
    'json-schema-generator': {
      name: 'JSON Schema生成',
      description: '根據JSON資料生成Schema'
    },
    
    // 時間工具
    'timestamp-converter': {
      name: '時間戳轉換',
      description: 'Unix時間戳與日期互轉'
    },
    'time-calculator': {
      name: '時間計算器',
      description: '日期加減、時區轉換'
    },
    'countdown-timer': {
      name: '倒數計時器',
      description: '自訂倒數計時功能'
    },
    
    // 編碼解碼
    'base64-encoder': {
      name: 'Base64編解碼',
      description: 'Base64編碼解碼工具'
    },
    'url-encoder': {
      name: 'URL編解碼',
      description: 'URL編碼解碼工具'
    },
    'html-entities': {
      name: 'HTML實體編解碼',
      description: 'HTML實體字元轉換'
    },
    
    // 文字處理
    'text-diff': {
      name: '文字差異對比',
      description: '兩個文字的差異對比'
    },
    'regex-tester': {
      name: '正規表示式測試',
      description: '正規表示式線上測試'
    },
    'text-statistics': {
      name: '文字統計',
      description: '字元、單詞、行數統計'
    },
    
    // 資料生成
    'uuid-generator': {
      name: 'UUID生成器',
      description: '生成各種格式的UUID'
    },
    'password-generator': {
      name: '隨機密碼生成',
      description: '自訂規則密碼生成'
    },
    'fake-data-generator': {
      name: '假資料生成',
      description: '姓名、信箱、地址等假資料'
    },
    
    // 圖像處理
    'image-compressor': {
      name: '圖片壓縮',
      description: '線上圖片壓縮工具'
    },
    'image-converter': {
      name: '圖片格式轉換',
      description: '支援JPG/PNG/WebP轉換'
    },
    'qr-code-generator': {
      name: 'QR碼生成',
      description: '文字/連結生成QR碼'
    },
    
    // 加密解密
    'hash-generator': {
      name: 'MD5/SHA雜湊',
      description: '多種雜湊演算法計算'
    },
    'aes-encryptor': {
      name: 'AES加密解密',
      description: 'AES對稱加密工具'
    },
    'password-strength': {
      name: '密碼強度檢測',
      description: '密碼安全性評估'
    },
    
    // 網路工具
    'ip-lookup': {
      name: 'IP位址查詢',
      description: '查詢IP位址資訊'
    },
    'user-agent-parser': {
      name: 'User-Agent解析',
      description: '解析瀏覽器User-Agent'
    },
    'http-status-codes': {
      name: 'HTTP狀態碼查詢',
      description: 'HTTP狀態碼含義查詢'
    },
    
    // 開發工具
    'css-formatter': {
      name: 'CSS美化',
      description: 'CSS程式碼格式化美化'
    },
    'sql-formatter': {
      name: 'SQL格式化',
      description: 'SQL語句格式化'
    },
    'color-picker': {
      name: '顏色選擇器',
      description: '顏色值轉換和選擇'
    },
    'unit-converter': {
      name: '單位轉換器',
      description: '長度、重量、溫度等轉換'
    },
    'number-base-converter': {
      name: '進位制轉換器',
      description: '二進位、八進位、十六進位轉換'
    },
    'code-highlighter': {
      name: '程式碼高亮',
      description: '多語言程式碼語法高亮'
    },
    'salary-calculator': {
      name: '薪酬計算器',
      description: '計算總包、時薪和漲幅'
    }
  },
  
  // JSON格式化工具
  jsonFormatter: {
    exampleData: '範例資料',
    format: '格式化',
    minify: '壓縮',
    validate: '驗證',
    clear: '清空',
    jsonInput: 'JSON 輸入',
    copy: '複製',
    inputPlaceholder: '請輸入JSON資料，或點擊上方範例按鈕載入範例資料...',
    formattedResult: '格式化結果',
    copyResult: '複製結果',
    download: '下載',
    resultPlaceholder: '格式化結果將顯示在這裡...',
    noResult: '暫無結果',
    charCount: '字元數',
    lineCount: '行數',
    objectCount: '物件數',
    arrayCount: '陣列數',
    examples: {
      userInfo: '使用者資訊',
      apiResponse: 'API回應',
      configInfo: '設定資訊'
    }
  },
  
  // Base64編解碼工具
  base64Encoder: {
    originalData: '原始資料',
    encode: '編碼',
    clear: '清空',
    inputPlaceholder: '請輸入要編碼的文字...',
    encodedResult: 'Base64 編碼結果',
    copyResult: '複製結果',
    base64Data: 'Base64 資料',
    decode: '解碼',
    decodePlaceholder: '請輸入要解碼的Base64資料...',
    decodedResult: '解碼結果',
    originalCharCount: '原始字元數',
    encodedCharCount: '編碼後字元數',
    compressionRatio: '壓縮比',
    encodeStatus: '編碼狀態',
    encoded: '已編碼',
    notEncoded: '未編碼'
  },
  
  // 佔位符工具
  placeholderTool: {
    developing: '功能開發中',
    developingDesc: '此工具正在開發中，敬請期待！',
    expectedFeatures: '預計功能',
    developingButton: '功能開發中...'
  },
  
  // 文字統計工具
  textStatistics: {
    textInput: '文字輸入',
    inputPlaceholder: '請輸入要分析的文字...',
    characters: '字元數',
    words: '單詞數',
    lines: '行數',
    paragraphs: '段落數',
    charTypeStats: '字元類型統計',
    letters: '字母',
    digits: '數字',
    spaces: '空格',
    punctuation: '標點符號',
    specialChars: '特殊字元',
    wordStats: '單詞統計',
    avgWordLength: '平均單詞長度',
    longestWord: '最長單詞',
    shortestWord: '最短單詞',
    uniqueWords: '唯一單詞',
    topWords: '最常用單詞 (前10個)',
    times: '次',
    textPreview: '文字預覽',
    first100Chars: '前100個字元:'
  },
  
  // 二維碼生成工具
  qrCodeGenerator: {
    generateQR: '生成二維碼',
    contentType: '內容類型',
    text: '文字',
    url: '網址',
    email: '信箱',
    phone: '電話',
    sms: '簡訊',
    wifi: 'WiFi',
    vcard: '名片',
    content: '內容',
    placeholders: {
      text: '輸入要生成二維碼的文字內容...',
      url: 'https://example.com',
      email: 'example@email.com',
      phone: '+886 912 345 678',
      sms: '簡訊內容',
      wifi: 'WiFi 資訊將透過下方設定生成',
      vcard: 'BEGIN:VCARD\nVERSION:3.0\nFN:姓名\nTEL:電話\nEMAIL:信箱\nEND:VCARD'
    }
  },
  
  // 頁尾
  footer: {
    copyright: '© 2025 Develop Tools Pro. 為高效的工作人士打造的現代化工具集合.'
  }
}


// 工具文档配置 - 多语言支持
export const toolDocs = {
  // JSON工具文档
  'json-formatter': {
    'zh-CN': {
      title: 'JSON格式化工具',
      description: '专业的JSON数据格式化、压缩和验证工具，支持语法高亮和错误检测。',
      features: [
        '格式化JSON数据，提高可读性',
        '压缩JSON数据，减少文件大小',
        '验证JSON语法，检测错误',
        '支持语法高亮显示',
        '一键复制格式化结果'
      ],
      usage: [
        '1. 在左侧输入框中粘贴或输入JSON数据',
        '2. 点击"格式化"按钮进行格式化',
        '3. 点击"压缩"按钮进行压缩',
        '4. 点击"验证"按钮检查语法',
        '5. 使用"复制"按钮复制结果'
      ],
      examples: [
        {
          title: '格式化示例',
          input: '{"name":"张三","age":25,"city":"北京"}',
          output: '{\n  "name": "张三",\n  "age": 25,\n  "city": "北京"\n}'
        },
        {
          title: '压缩示例',
          input: '{\n  "name": "张三",\n  "age": 25,\n  "city": "北京"\n}',
          output: '{"name":"张三","age":25,"city":"北京"}'
        }
      ],
      tips: [
        '支持嵌套对象和数组的格式化',
        '自动检测并高亮语法错误',
        '支持大型JSON文件的处理',
        '可以处理包含特殊字符的JSON'
      ]
    },
    'en': {
      title: 'JSON Formatter Tool',
      description: 'Professional JSON data formatting, compression and validation tool with syntax highlighting and error detection.',
      features: [
        'Format JSON data for better readability',
        'Compress JSON data to reduce file size',
        'Validate JSON syntax and detect errors',
        'Support syntax highlighting',
        'One-click copy formatted results'
      ],
      usage: [
        '1. Paste or input JSON data in the left input box',
        '2. Click "Format" button to format the data',
        '3. Click "Compress" button to compress the data',
        '4. Click "Validate" button to check syntax',
        '5. Use "Copy" button to copy the result'
      ],
      examples: [
        {
          title: 'Formatting Example',
          input: '{"name":"John","age":25,"city":"New York"}',
          output: '{\n  "name": "John",\n  "age": 25,\n  "city": "New York"\n}'
        },
        {
          title: 'Compression Example',
          input: '{\n  "name": "John",\n  "age": 25,\n  "city": "New York"\n}',
          output: '{"name":"John","age":25,"city":"New York"}'
        }
      ],
      tips: [
        'Supports formatting of nested objects and arrays',
        'Automatically detects and highlights syntax errors',
        'Can handle large JSON files',
        'Supports JSON with special characters'
      ]
    }
  },

  'timestamp-converter': {
    'zh-CN': {
      title: '时间戳转换工具',
      description: 'Unix时间戳与日期时间格式的相互转换工具，支持多种时区和格式。',
      features: [
        'Unix时间戳转日期时间',
        '日期时间转Unix时间戳',
        '支持多种时区转换',
        '支持毫秒级精度',
        '实时转换显示'
      ],
      usage: [
        '1. 输入Unix时间戳（秒或毫秒）',
        '2. 选择目标时区',
        '3. 点击"转换"按钮',
        '4. 查看转换结果',
        '5. 可以反向转换'
      ],
      examples: [
        {
          title: '时间戳转日期',
          input: '1640995200',
          output: '2022-01-01 00:00:00 (UTC)'
        },
        {
          title: '日期转时间戳',
          input: '2022-01-01 00:00:00',
          output: '1640995200'
        }
      ],
      tips: [
        '支持10位秒级和13位毫秒级时间戳',
        '默认使用UTC时区',
        '可以切换到本地时区',
        '支持批量转换'
      ]
    },
    'en': {
      title: 'Timestamp Converter Tool',
      description: 'Unix timestamp and datetime format conversion tool with support for multiple timezones and formats.',
      features: [
        'Convert Unix timestamp to datetime',
        'Convert datetime to Unix timestamp',
        'Support multiple timezone conversion',
        'Support millisecond precision',
        'Real-time conversion display'
      ],
      usage: [
        '1. Input Unix timestamp (seconds or milliseconds)',
        '2. Select target timezone',
        '3. Click "Convert" button',
        '4. View conversion result',
        '5. Can perform reverse conversion'
      ],
      examples: [
        {
          title: 'Timestamp to Date',
          input: '1640995200',
          output: '2022-01-01 00:00:00 (UTC)'
        },
        {
          title: 'Date to Timestamp',
          input: '2022-01-01 00:00:00',
          output: '1640995200'
        }
      ],
      tips: [
        'Supports 10-digit second and 13-digit millisecond timestamps',
        'Uses UTC timezone by default',
        'Can switch to local timezone',
        'Supports batch conversion'
      ]
    }
  },

  'base64-encoder': {
    'zh-CN': {
      title: 'Base64编解码工具',
      description: 'Base64编码和解码工具，支持文本、图片等多种数据格式的转换。',
      features: [
        '文本Base64编码解码',
        '图片Base64编码',
        '支持多种字符集',
        '实时编码解码',
        '支持文件上传'
      ],
      usage: [
        '1. 输入要编码的文本或上传文件',
        '2. 选择编码模式（文本/文件）',
        '3. 点击"编码"或"解码"按钮',
        '4. 查看转换结果',
        '5. 可以复制结果'
      ],
      examples: [
        {
          title: '文本编码示例',
          input: 'Hello World',
          output: 'SGVsbG8gV29ybGQ='
        },
        {
          title: '文本解码示例',
          input: 'SGVsbG8gV29ybGQ=',
          output: 'Hello World'
        }
      ],
      tips: [
        'Base64编码会增加约33%的数据大小',
        '支持中文等多字节字符',
        '可以处理二进制文件',
        '编码结果不包含换行符'
      ]
    },
    'en': {
      title: 'Base64 Encoder/Decoder Tool',
      description: 'Base64 encoding and decoding tool supporting text, images and various data formats.',
      features: [
        'Text Base64 encoding/decoding',
        'Image Base64 encoding',
        'Support multiple character sets',
        'Real-time encoding/decoding',
        'Support file upload'
      ],
      usage: [
        '1. Input text to encode or upload file',
        '2. Select encoding mode (text/file)',
        '3. Click "Encode" or "Decode" button',
        '4. View conversion result',
        '5. Can copy the result'
      ],
      examples: [
        {
          title: 'Text Encoding Example',
          input: 'Hello World',
          output: 'SGVsbG8gV29ybGQ='
        },
        {
          title: 'Text Decoding Example',
          input: 'SGVsbG8gV29ybGQ=',
          output: 'Hello World'
        }
      ],
      tips: [
        'Base64 encoding increases data size by about 33%',
        'Supports multi-byte characters like Chinese',
        'Can handle binary files',
        'Encoded result contains no line breaks'
      ]
    }
  },

  'password-generator': {
    'zh-CN': {
      title: '密码生成器',
      description: '安全可靠的密码生成工具，支持自定义长度、字符类型和特殊要求。',
      features: [
        '自定义密码长度',
        '选择字符类型（大小写、数字、符号）',
        '排除相似字符',
        '批量生成密码',
        '密码强度检测'
      ],
      usage: [
        '1. 设置密码长度（4-128位）',
        '2. 选择包含的字符类型',
        '3. 设置特殊要求（如排除相似字符）',
        '4. 点击"生成密码"按钮',
        '5. 复制生成的密码'
      ],
      examples: [
        {
          title: '强密码示例',
          input: '长度: 12, 包含: 大小写+数字+符号',
          output: 'K9#mP2$vL8@n'
        },
        {
          title: '简单密码示例',
          input: '长度: 8, 包含: 大小写+数字',
          output: 'Abc123Xy'
        }
      ],
      tips: [
        '建议使用12位以上的密码',
        '包含多种字符类型提高安全性',
        '避免使用常见密码模式',
        '定期更换密码'
      ]
    },
    'en': {
      title: 'Password Generator Tool',
      description: 'Secure and reliable password generation tool with customizable length, character types and special requirements.',
      features: [
        'Customizable password length',
        'Select character types (uppercase, lowercase, numbers, symbols)',
        'Exclude similar characters',
        'Batch password generation',
        'Password strength detection'
      ],
      usage: [
        '1. Set password length (4-128 characters)',
        '2. Select character types to include',
        '3. Set special requirements (e.g., exclude similar characters)',
        '4. Click "Generate Password" button',
        '5. Copy the generated password'
      ],
      examples: [
        {
          title: 'Strong Password Example',
          input: 'Length: 12, Include: Upper+Lower+Numbers+Symbols',
          output: 'K9#mP2$vL8@n'
        },
        {
          title: 'Simple Password Example',
          input: 'Length: 8, Include: Upper+Lower+Numbers',
          output: 'Abc123Xy'
        }
      ],
      tips: [
        'Recommend using passwords with 12+ characters',
        'Include multiple character types for better security',
        'Avoid common password patterns',
        'Change passwords regularly'
      ]
    }
  },

  'qr-code-generator': {
    'zh-CN': {
      title: '二维码生成器',
      description: '快速生成各种类型的二维码，支持文本、链接、WiFi、联系人等多种格式。',
      features: [
        '文本二维码生成',
        '链接二维码生成',
        'WiFi二维码生成',
        '联系人二维码生成',
        '自定义二维码样式'
      ],
      usage: [
        '1. 选择二维码类型',
        '2. 输入相应内容',
        '3. 设置二维码参数',
        '4. 点击"生成二维码"',
        '5. 下载或分享二维码'
      ],
      examples: [
        {
          title: '文本二维码',
          input: 'Hello World',
          output: '生成包含"Hello World"文本的二维码'
        },
        {
          title: '链接二维码',
          input: 'https://develop-tools-pro.vercel.app',
          output: '生成可扫描访问网站的二维码'
        }
      ],
      tips: [
        '二维码内容越多，图案越复杂',
        '建议使用高对比度的颜色',
        '可以调整二维码大小',
        '支持批量生成'
      ]
    },
    'en': {
      title: 'QR Code Generator Tool',
      description: 'Quickly generate various types of QR codes supporting text, links, WiFi, contacts and more formats.',
      features: [
        'Text QR code generation',
        'Link QR code generation',
        'WiFi QR code generation',
        'Contact QR code generation',
        'Custom QR code styling'
      ],
      usage: [
        '1. Select QR code type',
        '2. Input corresponding content',
        '3. Set QR code parameters',
        '4. Click "Generate QR Code"',
        '5. Download or share QR code'
      ],
      examples: [
        {
          title: 'Text QR Code',
          input: 'Hello World',
          output: 'Generate QR code containing "Hello World" text'
        },
        {
          title: 'Link QR Code',
          input: 'https://develop-tools-pro.vercel.app',
          output: 'Generate QR code that can scan to visit website'
        }
      ],
      tips: [
        'More content makes QR code pattern more complex',
        'Recommend using high contrast colors',
        'Can adjust QR code size',
        'Supports batch generation'
      ]
    }
  },

  'hash-generator': {
    'zh-CN': {
      title: '哈希生成器',
      description: '支持多种哈希算法的文本哈希生成工具，包括MD5、SHA1、SHA256等。',
      features: [
        '支持MD5、SHA1、SHA256、SHA512算法',
        '实时哈希计算',
        '批量文本处理',
        '十六进制和Base64输出格式',
        '文件哈希计算'
      ],
      usage: [
        '1. 选择哈希算法',
        '2. 输入要计算哈希的文本',
        '3. 选择输出格式',
        '4. 点击"生成哈希"',
        '5. 复制生成的哈希值'
      ],
      examples: [
        {
          title: 'MD5哈希示例',
          input: 'Hello World',
          output: 'b10a8db164e0754105b7a99be72e3fe5'
        },
        {
          title: 'SHA256哈希示例',
          input: 'Hello World',
          output: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'
        }
      ],
      tips: [
        'MD5已不推荐用于安全用途',
        'SHA256是目前推荐的安全哈希算法',
        '哈希值具有唯一性，相同输入产生相同输出',
        '可以用于数据完整性验证'
      ]
    },
    'en': {
      title: 'Hash Generator Tool',
      description: 'Text hash generation tool supporting multiple hash algorithms including MD5, SHA1, SHA256, etc.',
      features: [
        'Support MD5, SHA1, SHA256, SHA512 algorithms',
        'Real-time hash calculation',
        'Batch text processing',
        'Hexadecimal and Base64 output formats',
        'File hash calculation'
      ],
      usage: [
        '1. Select hash algorithm',
        '2. Input text to calculate hash',
        '3. Choose output format',
        '4. Click "Generate Hash"',
        '5. Copy the generated hash value'
      ],
      examples: [
        {
          title: 'MD5 Hash Example',
          input: 'Hello World',
          output: 'b10a8db164e0754105b7a99be72e3fe5'
        },
        {
          title: 'SHA256 Hash Example',
          input: 'Hello World',
          output: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'
        }
      ],
      tips: [
        'MD5 is not recommended for security purposes',
        'SHA256 is currently the recommended secure hash algorithm',
        'Hash values are unique, same input produces same output',
        'Can be used for data integrity verification'
      ]
    }
  },

  'url-encoder': {
    'zh-CN': {
      title: 'URL编解码工具',
      description: 'URL编码和解码工具，支持特殊字符的URL安全转换。',
      features: [
        'URL编码和解码',
        '支持特殊字符处理',
        '批量URL处理',
        '实时编码解码',
        '保留URL结构'
      ],
      usage: [
        '1. 输入要编码的URL或文本',
        '2. 选择编码模式',
        '3. 点击"编码"或"解码"',
        '4. 查看转换结果',
        '5. 复制处理后的URL'
      ],
      examples: [
        {
          title: 'URL编码示例',
          input: 'https://example.com/search?q=hello world',
          output: 'https://example.com/search?q=hello%20world'
        },
        {
          title: 'URL解码示例',
          input: 'https://example.com/search?q=hello%20world',
          output: 'https://example.com/search?q=hello world'
        }
      ],
      tips: [
        'URL编码确保特殊字符在URL中正确传输',
        '空格会被编码为%20',
        '中文字符需要UTF-8编码',
        '可以处理查询参数和路径'
      ]
    },
    'en': {
      title: 'URL Encoder/Decoder Tool',
      description: 'URL encoding and decoding tool supporting safe conversion of special characters.',
      features: [
        'URL encoding and decoding',
        'Support special character processing',
        'Batch URL processing',
        'Real-time encoding/decoding',
        'Preserve URL structure'
      ],
      usage: [
        '1. Input URL or text to encode',
        '2. Select encoding mode',
        '3. Click "Encode" or "Decode"',
        '4. View conversion result',
        '5. Copy processed URL'
      ],
      examples: [
        {
          title: 'URL Encoding Example',
          input: 'https://example.com/search?q=hello world',
          output: 'https://example.com/search?q=hello%20world'
        },
        {
          title: 'URL Decoding Example',
          input: 'https://example.com/search?q=hello%20world',
          output: 'https://example.com/search?q=hello world'
        }
      ],
      tips: [
        'URL encoding ensures special characters are transmitted correctly in URLs',
        'Spaces are encoded as %20',
        'Chinese characters need UTF-8 encoding',
        'Can handle query parameters and paths'
      ]
    }
  },

  'json-yaml-converter': {
    'zh-CN': {
      title: 'JSON转YAML工具',
      description: 'JSON与YAML格式相互转换工具，支持复杂数据结构的无损转换。',
      features: [
        'JSON转YAML格式',
        'YAML转JSON格式',
        '支持嵌套对象和数组',
        '保持数据类型完整性',
        '实时转换预览'
      ],
      usage: [
        '1. 选择转换方向（JSON→YAML或YAML→JSON）',
        '2. 在输入框中粘贴源数据',
        '3. 点击"转换"按钮',
        '4. 查看转换结果',
        '5. 复制转换后的数据'
      ],
      examples: [
        {
          title: 'JSON转YAML示例',
          input: '{"name":"张三","age":25,"hobbies":["读书","游泳"]}',
          output: 'name: 张三\nage: 25\nhobbies:\n  - 读书\n  - 游泳'
        },
        {
          title: 'YAML转JSON示例',
          input: 'name: 张三\nage: 25\nhobbies:\n  - 读书\n  - 游泳',
          output: '{"name":"张三","age":25,"hobbies":["读书","游泳"]}'
        }
      ],
      tips: [
        'YAML格式更易读，适合配置文件',
        'JSON格式更紧凑，适合数据传输',
        '转换过程中会保持数据类型',
        '支持复杂的嵌套结构'
      ]
    },
    'en': {
      title: 'JSON to YAML Converter Tool',
      description: 'JSON and YAML format conversion tool supporting lossless conversion of complex data structures.',
      features: [
        'JSON to YAML conversion',
        'YAML to JSON conversion',
        'Support nested objects and arrays',
        'Maintain data type integrity',
        'Real-time conversion preview'
      ],
      usage: [
        '1. Select conversion direction (JSON→YAML or YAML→JSON)',
        '2. Paste source data in input box',
        '3. Click "Convert" button',
        '4. View conversion result',
        '5. Copy converted data'
      ],
      examples: [
        {
          title: 'JSON to YAML Example',
          input: '{"name":"John","age":25,"hobbies":["reading","swimming"]}',
          output: 'name: John\nage: 25\nhobbies:\n  - reading\n  - swimming'
        },
        {
          title: 'YAML to JSON Example',
          input: 'name: John\nage: 25\nhobbies:\n  - reading\n  - swimming',
          output: '{"name":"John","age":25,"hobbies":["reading","swimming"]}'
        }
      ],
      tips: [
        'YAML format is more readable, suitable for configuration files',
        'JSON format is more compact, suitable for data transmission',
        'Data types are preserved during conversion',
        'Supports complex nested structures'
      ]
    }
  },

  'json-schema-generator': {
    'zh-CN': {
      title: 'JSON Schema生成器',
      description: '根据JSON数据自动生成对应的JSON Schema，用于数据验证和文档生成。',
      features: [
        '自动生成JSON Schema',
        '支持复杂数据类型',
        '生成详细的验证规则',
        '支持嵌套对象和数组',
        '可自定义Schema选项'
      ],
      usage: [
        '1. 输入JSON数据或上传JSON文件',
        '2. 选择Schema生成选项',
        '3. 点击"生成Schema"按钮',
        '4. 查看生成的JSON Schema',
        '5. 复制或下载Schema文件'
      ],
      examples: [
        {
          title: '简单对象Schema生成',
          input: '{"name":"张三","age":25,"email":"zhang@example.com"}',
          output: '{\n  "type": "object",\n  "properties": {\n    "name": {"type": "string"},\n    "age": {"type": "number"},\n    "email": {"type": "string"}\n  },\n  "required": ["name", "age", "email"]\n}'
        },
        {
          title: '数组Schema生成',
          input: '[{"id":1,"name":"产品1"},{"id":2,"name":"产品2"}]',
          output: '{\n  "type": "array",\n  "items": {\n    "type": "object",\n    "properties": {\n      "id": {"type": "number"},\n      "name": {"type": "string"}\n    }\n  }\n}'
        }
      ],
      tips: [
        'JSON Schema用于验证JSON数据的结构',
        '可以定义必填字段和数据类型',
        '支持字符串长度、数值范围等约束',
        '生成的Schema可用于API文档'
      ]
    },
    'en': {
      title: 'JSON Schema Generator Tool',
      description: 'Automatically generate JSON Schema from JSON data for data validation and documentation.',
      features: [
        'Auto-generate JSON Schema',
        'Support complex data types',
        'Generate detailed validation rules',
        'Support nested objects and arrays',
        'Customizable Schema options'
      ],
      usage: [
        '1. Input JSON data or upload JSON file',
        '2. Select Schema generation options',
        '3. Click "Generate Schema" button',
        '4. View generated JSON Schema',
        '5. Copy or download Schema file'
      ],
      examples: [
        {
          title: 'Simple Object Schema Generation',
          input: '{"name":"John","age":25,"email":"john@example.com"}',
          output: '{\n  "type": "object",\n  "properties": {\n    "name": {"type": "string"},\n    "age": {"type": "number"},\n    "email": {"type": "string"}\n  },\n  "required": ["name", "age", "email"]\n}'
        },
        {
          title: 'Array Schema Generation',
          input: '[{"id":1,"name":"Product 1"},{"id":2,"name":"Product 2"}]',
          output: '{\n  "type": "array",\n  "items": {\n    "type": "object",\n    "properties": {\n      "id": {"type": "number"},\n      "name": {"type": "string"}\n    }\n  }\n}'
        }
      ],
      tips: [
        'JSON Schema is used to validate JSON data structure',
        'Can define required fields and data types',
        'Supports constraints like string length and number range',
        'Generated Schema can be used for API documentation'
      ]
    }
  },

  'time-calculator': {
    'zh-CN': {
      title: '时间计算器',
      description: '强大的时间计算工具，支持日期加减、时区转换、工作日计算等功能。',
      features: [
        '日期加减计算',
        '时区转换功能',
        '工作日计算',
        '时间差计算',
        '多种日期格式支持'
      ],
      usage: [
        '1. 选择计算类型（日期加减、时区转换等）',
        '2. 输入起始日期和时间',
        '3. 设置计算参数（天数、时区等）',
        '4. 点击"计算"按钮',
        '5. 查看计算结果'
      ],
      examples: [
        {
          title: '日期加减示例',
          input: '起始日期: 2024-01-01, 加30天',
          output: '结果日期: 2024-01-31'
        },
        {
          title: '时区转换示例',
          input: '北京时间: 2024-01-01 12:00:00',
          output: '纽约时间: 2023-12-31 23:00:00'
        }
      ],
      tips: [
        '支持多种日期格式输入',
        '可以计算工作日（排除周末）',
        '时区转换支持全球主要城市',
        '结果可以复制到剪贴板'
      ]
    },
    'en': {
      title: 'Time Calculator Tool',
      description: 'Powerful time calculation tool supporting date arithmetic, timezone conversion, business day calculation and more.',
      features: [
        'Date addition and subtraction',
        'Timezone conversion',
        'Business day calculation',
        'Time difference calculation',
        'Multiple date format support'
      ],
      usage: [
        '1. Select calculation type (date arithmetic, timezone conversion, etc.)',
        '2. Input start date and time',
        '3. Set calculation parameters (days, timezone, etc.)',
        '4. Click "Calculate" button',
        '5. View calculation result'
      ],
      examples: [
        {
          title: 'Date Addition Example',
          input: 'Start date: 2024-01-01, Add 30 days',
          output: 'Result date: 2024-01-31'
        },
        {
          title: 'Timezone Conversion Example',
          input: 'Beijing time: 2024-01-01 12:00:00',
          output: 'New York time: 2023-12-31 23:00:00'
        }
      ],
      tips: [
        'Supports multiple date format inputs',
        'Can calculate business days (excluding weekends)',
        'Timezone conversion supports major global cities',
        'Results can be copied to clipboard'
      ]
    }
  },

  'countdown-timer': {
    'zh-CN': {
      title: '倒计时器',
      description: '自定义倒计时功能，支持设置目标时间，实时显示剩余时间。',
      features: [
        '自定义倒计时时间',
        '实时倒计时显示',
        '多种时间单位支持',
        '倒计时结束提醒',
        '可暂停和重置功能'
      ],
      usage: [
        '1. 设置目标日期和时间',
        '2. 选择倒计时显示格式',
        '3. 点击"开始倒计时"',
        '4. 实时查看剩余时间',
        '5. 倒计时结束会有提醒'
      ],
      examples: [
        {
          title: '新年倒计时',
          input: '目标时间: 2025-01-01 00:00:00',
          output: '距离新年还有: 365天 12小时 30分钟 15秒'
        },
        {
          title: '会议倒计时',
          input: '目标时间: 2024-02-15 14:00:00',
          output: '距离会议还有: 15天 2小时 45分钟 30秒'
        }
      ],
      tips: [
        '支持精确到秒的倒计时',
        '可以设置多个倒计时',
        '倒计时结束后会有声音提醒',
        '支持全屏显示模式'
      ]
    },
    'en': {
      title: 'Countdown Timer Tool',
      description: 'Custom countdown functionality supporting target time setting and real-time remaining time display.',
      features: [
        'Custom countdown time',
        'Real-time countdown display',
        'Multiple time unit support',
        'Countdown end notification',
        'Pause and reset functionality'
      ],
      usage: [
        '1. Set target date and time',
        '2. Choose countdown display format',
        '3. Click "Start Countdown"',
        '4. View remaining time in real-time',
        '5. Get notification when countdown ends'
      ],
      examples: [
        {
          title: 'New Year Countdown',
          input: 'Target time: 2025-01-01 00:00:00',
          output: 'Time until New Year: 365 days 12 hours 30 minutes 15 seconds'
        },
        {
          title: 'Meeting Countdown',
          input: 'Target time: 2024-02-15 14:00:00',
          output: 'Time until meeting: 15 days 2 hours 45 minutes 30 seconds'
        }
      ],
      tips: [
        'Supports countdown accurate to seconds',
        'Can set multiple countdowns',
        'Sound notification when countdown ends',
        'Supports full-screen display mode'
      ]
    }
  },

  'html-entities': {
    'zh-CN': {
      title: 'HTML实体编解码工具',
      description: 'HTML实体字符编码和解码工具，支持特殊字符的HTML安全转换。',
      features: [
        'HTML实体编码和解码',
        '支持所有HTML实体字符',
        '批量文本处理',
        '实时编码解码',
        '保留文本格式'
      ],
      usage: [
        '1. 输入要编码的HTML文本',
        '2. 选择编码模式（编码/解码）',
        '3. 点击"转换"按钮',
        '4. 查看转换结果',
        '5. 复制处理后的文本'
      ],
      examples: [
        {
          title: 'HTML实体编码示例',
          input: '<div>Hello & "World"</div>',
          output: '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'
        },
        {
          title: 'HTML实体解码示例',
          input: '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;',
          output: '<div>Hello & "World"</div>'
        }
      ],
      tips: [
        'HTML实体编码防止XSS攻击',
        '支持所有标准HTML实体字符',
        '可以处理复杂的HTML结构',
        '编码结果可以直接用于HTML'
      ]
    },
    'en': {
      title: 'HTML Entities Encoder/Decoder Tool',
      description: 'HTML entity character encoding and decoding tool supporting safe conversion of special characters.',
      features: [
        'HTML entity encoding and decoding',
        'Support all HTML entity characters',
        'Batch text processing',
        'Real-time encoding/decoding',
        'Preserve text formatting'
      ],
      usage: [
        '1. Input HTML text to encode',
        '2. Select encoding mode (encode/decode)',
        '3. Click "Convert" button',
        '4. View conversion result',
        '5. Copy processed text'
      ],
      examples: [
        {
          title: 'HTML Entity Encoding Example',
          input: '<div>Hello & "World"</div>',
          output: '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;'
        },
        {
          title: 'HTML Entity Decoding Example',
          input: '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;',
          output: '<div>Hello & "World"</div>'
        }
      ],
      tips: [
        'HTML entity encoding prevents XSS attacks',
        'Supports all standard HTML entity characters',
        'Can handle complex HTML structures',
        'Encoded results can be used directly in HTML'
      ]
    }
  },

  'uuid-generator': {
    'zh-CN': {
      title: 'UUID生成器',
      description: '生成符合RFC 4122标准的UUID（通用唯一标识符），支持多种版本和格式。',
      features: [
        '支持UUID v1、v4、v5版本',
        '多种输出格式（标准、无连字符、大写）',
        '批量生成UUID',
        '复制单个或批量UUID',
        '符合RFC 4122标准'
      ],
      usage: [
        '1. 选择UUID版本（推荐v4）',
        '2. 设置输出格式',
        '3. 输入生成数量',
        '4. 点击"生成UUID"按钮',
        '5. 复制生成的UUID'
      ],
      examples: [
        {
          title: 'UUID v4示例',
          input: '版本: v4, 格式: 标准',
          output: '550e8400-e29b-41d4-a716-446655440000'
        },
        {
          title: 'UUID v1示例',
          input: '版本: v1, 格式: 无连字符',
          output: '550e8400e29b11d4a716446655440000'
        }
      ],
      tips: [
        'UUID v4是随机生成的，最常用',
        'UUID v1包含时间戳和MAC地址',
        'UUID v5基于命名空间和名称生成',
        '每个UUID都是全局唯一的'
      ]
    },
    'en': {
      title: 'UUID Generator Tool',
      description: 'Generate RFC 4122 compliant UUIDs (Universally Unique Identifiers) supporting multiple versions and formats.',
      features: [
        'Support UUID v1, v4, v5 versions',
        'Multiple output formats (standard, no hyphens, uppercase)',
        'Batch UUID generation',
        'Copy single or batch UUIDs',
        'RFC 4122 compliant'
      ],
      usage: [
        '1. Select UUID version (recommend v4)',
        '2. Set output format',
        '3. Input generation count',
        '4. Click "Generate UUID" button',
        '5. Copy generated UUIDs'
      ],
      examples: [
        {
          title: 'UUID v4 Example',
          input: 'Version: v4, Format: Standard',
          output: '550e8400-e29b-41d4-a716-446655440000'
        },
        {
          title: 'UUID v1 Example',
          input: 'Version: v1, Format: No hyphens',
          output: '550e8400e29b11d4a716446655440000'
        }
      ],
      tips: [
        'UUID v4 is randomly generated and most commonly used',
        'UUID v1 contains timestamp and MAC address',
        'UUID v5 is generated based on namespace and name',
        'Each UUID is globally unique'
      ]
    }
  },

  'fake-data-generator': {
    'zh-CN': {
      title: '假数据生成器',
      description: '生成各种类型的假数据，用于测试、演示和开发，支持多种数据格式。',
      features: [
        '生成个人信息（姓名、邮箱、电话等）',
        '生成地址和地理位置数据',
        '生成公司和企业信息',
        '支持多种语言和地区',
        '可自定义数据格式'
      ],
      usage: [
        '1. 选择数据类型（个人信息、地址等）',
        '2. 设置生成数量和语言',
        '3. 选择输出格式（JSON、CSV等）',
        '4. 点击"生成数据"按钮',
        '5. 下载或复制生成的数据'
      ],
      examples: [
        {
          title: '个人信息生成',
          input: '类型: 个人信息, 数量: 5, 语言: 中文',
          output: '姓名: 张三, 邮箱: zhang@example.com, 电话: 138****1234'
        },
        {
          title: '地址信息生成',
          input: '类型: 地址信息, 数量: 3, 语言: 中文',
          output: '地址: 北京市朝阳区建国路88号'
        }
      ],
      tips: [
        '生成的数据仅用于测试目的',
        '支持多种输出格式',
        '可以自定义数据字段',
        '数据符合各地区的格式规范'
      ]
    },
    'en': {
      title: 'Fake Data Generator Tool',
      description: 'Generate various types of fake data for testing, demonstration and development, supporting multiple data formats.',
      features: [
        'Generate personal information (name, email, phone, etc.)',
        'Generate address and geographic data',
        'Generate company and business information',
        'Support multiple languages and regions',
        'Customizable data formats'
      ],
      usage: [
        '1. Select data type (personal info, address, etc.)',
        '2. Set generation count and language',
        '3. Choose output format (JSON, CSV, etc.)',
        '4. Click "Generate Data" button',
        '5. Download or copy generated data'
      ],
      examples: [
        {
          title: 'Personal Information Generation',
          input: 'Type: Personal Info, Count: 5, Language: English',
          output: 'Name: John Doe, Email: john@example.com, Phone: +1-555-0123'
        },
        {
          title: 'Address Information Generation',
          input: 'Type: Address Info, Count: 3, Language: English',
          output: 'Address: 123 Main St, New York, NY 10001'
        }
      ],
      tips: [
        'Generated data is for testing purposes only',
        'Supports multiple output formats',
        'Can customize data fields',
        'Data conforms to regional format standards'
      ]
    }
  },

  'aes-encryptor': {
    'zh-CN': {
      title: 'AES加密解密工具',
      description: '使用AES算法进行数据加密和解密，支持多种密钥长度和加密模式。',
      features: [
        '支持AES-128、AES-192、AES-256',
        '多种加密模式（CBC、ECB、GCM等）',
        'Base64编码输出',
        '密钥和IV自动生成',
        '安全的加密实现'
      ],
      usage: [
        '1. 选择加密模式（加密/解密）',
        '2. 输入要处理的数据',
        '3. 设置密钥和IV（可选）',
        '4. 点击"处理"按钮',
        '5. 复制处理结果'
      ],
      examples: [
        {
          title: 'AES加密示例',
          input: '数据: Hello World, 密钥: mySecretKey',
          output: '加密结果: U2FsdGVkX1+vupppZksvRf5pq5g5XjFRlipRkwB0K1Y='
        },
        {
          title: 'AES解密示例',
          input: '密文: U2FsdGVkX1+vupppZksvRf5pq5g5XjFRlipRkwB0K1Y=, 密钥: mySecretKey',
          output: '解密结果: Hello World'
        }
      ],
      tips: [
        'AES-256提供最高级别的安全性',
        '密钥长度必须与选择的算法匹配',
        'IV（初始化向量）应该是随机的',
        '请妥善保管密钥，丢失后无法恢复数据'
      ]
    },
    'en': {
      title: 'AES Encryptor/Decryptor Tool',
      description: 'Encrypt and decrypt data using AES algorithm, supporting multiple key lengths and encryption modes.',
      features: [
        'Support AES-128, AES-192, AES-256',
        'Multiple encryption modes (CBC, ECB, GCM, etc.)',
        'Base64 encoded output',
        'Auto-generate keys and IV',
        'Secure encryption implementation'
      ],
      usage: [
        '1. Select mode (encrypt/decrypt)',
        '2. Input data to process',
        '3. Set key and IV (optional)',
        '4. Click "Process" button',
        '5. Copy processed result'
      ],
      examples: [
        {
          title: 'AES Encryption Example',
          input: 'Data: Hello World, Key: mySecretKey',
          output: 'Encrypted: U2FsdGVkX1+vupppZksvRf5pq5g5XjFRlipRkwB0K1Y='
        },
        {
          title: 'AES Decryption Example',
          input: 'Cipher: U2FsdGVkX1+vupppZksvRf5pq5g5XjFRlipRkwB0K1Y=, Key: mySecretKey',
          output: 'Decrypted: Hello World'
        }
      ],
      tips: [
        'AES-256 provides the highest level of security',
        'Key length must match the selected algorithm',
        'IV (Initialization Vector) should be random',
        'Keep your keys safe, data cannot be recovered if key is lost'
      ]
    }
  },

  'text-statistics': {
    'zh-CN': {
      title: '文本统计分析工具',
      description: '分析文本的各种统计信息，包括字符数、词数、行数等详细统计。',
      features: [
        '字符数统计（包含/不包含空格）',
        '词数和句子数统计',
        '行数和段落数统计',
        '阅读时间估算',
        '字符频率分析'
      ],
      usage: [
        '1. 在文本框中输入或粘贴文本',
        '2. 选择统计类型',
        '3. 点击"分析"按钮',
        '4. 查看详细的统计结果',
        '5. 可以导出统计报告'
      ],
      examples: [
        {
          title: '基础文本统计',
          input: 'Hello World! 这是一个测试文本。',
          output: '字符数: 20, 词数: 6, 行数: 1, 阅读时间: 约1秒'
        },
        {
          title: '详细统计分析',
          input: '这是一段较长的文本，包含多个句子和段落。\n\n第二段内容。',
          output: '字符数: 35, 词数: 18, 句子数: 3, 段落数: 2'
        }
      ],
      tips: [
        '支持中英文混合文本统计',
        '可以分析大段文本',
        '统计结果实时更新',
        '支持多种文本格式'
      ]
    },
    'en': {
      title: 'Text Statistics Analysis Tool',
      description: 'Analyze various statistical information of text, including character count, word count, line count and detailed statistics.',
      features: [
        'Character count (with/without spaces)',
        'Word and sentence count',
        'Line and paragraph count',
        'Reading time estimation',
        'Character frequency analysis'
      ],
      usage: [
        '1. Input or paste text in the text box',
        '2. Select statistics type',
        '3. Click "Analyze" button',
        '4. View detailed statistics results',
        '5. Can export statistics report'
      ],
      examples: [
        {
          title: 'Basic Text Statistics',
          input: 'Hello World! This is a test text.',
          output: 'Characters: 30, Words: 7, Lines: 1, Reading time: ~1 second'
        },
        {
          title: 'Detailed Statistics Analysis',
          input: 'This is a longer text with multiple sentences and paragraphs.\n\nSecond paragraph content.',
          output: 'Characters: 95, Words: 18, Sentences: 3, Paragraphs: 2'
        }
      ],
      tips: [
        'Supports mixed Chinese and English text statistics',
        'Can analyze large text blocks',
        'Statistics update in real-time',
        'Supports multiple text formats'
      ]
    }
  },

  'text-diff': {
    'zh-CN': {
      title: '文本差异对比工具',
      description: '对比两个文本的差异，高亮显示增删改的内容，支持多种对比模式。',
      features: [
        '并排对比显示',
        '行级差异高亮',
        '字符级精确对比',
        '支持多种文本格式',
        '导出对比结果'
      ],
      usage: [
        '1. 在左侧输入原始文本',
        '2. 在右侧输入修改后文本',
        '3. 选择对比模式',
        '4. 点击"对比"按钮',
        '5. 查看差异高亮结果'
      ],
      examples: [
        {
          title: '文本修改对比',
          input: '原文: Hello World\n修改: Hello Beautiful World',
          output: '差异: "Beautiful " 被添加到 "Hello" 和 "World" 之间'
        },
        {
          title: '代码差异对比',
          input: '原代码: function test() { return true; }\n新代码: function test() { return false; }',
          output: '差异: "true" 被修改为 "false"'
        }
      ],
      tips: [
        '支持大文件对比',
        '可以忽略空白字符差异',
        '支持正则表达式匹配',
        '结果可以复制或导出'
      ]
    },
    'en': {
      title: 'Text Difference Comparison Tool',
      description: 'Compare differences between two texts, highlight added, deleted and modified content with multiple comparison modes.',
      features: [
        'Side-by-side comparison display',
        'Line-level difference highlighting',
        'Character-level precise comparison',
        'Support multiple text formats',
        'Export comparison results'
      ],
      usage: [
        '1. Input original text on the left',
        '2. Input modified text on the right',
        '3. Select comparison mode',
        '4. Click "Compare" button',
        '5. View highlighted differences'
      ],
      examples: [
        {
          title: 'Text Modification Comparison',
          input: 'Original: Hello World\nModified: Hello Beautiful World',
          output: 'Difference: "Beautiful " added between "Hello" and "World"'
        },
        {
          title: 'Code Difference Comparison',
          input: 'Original: function test() { return true; }\nModified: function test() { return false; }',
          output: 'Difference: "true" changed to "false"'
        }
      ],
      tips: [
        'Supports large file comparison',
        'Can ignore whitespace differences',
        'Supports regex pattern matching',
        'Results can be copied or exported'
      ]
    }
  },

  'color-picker': {
    'zh-CN': {
      title: '颜色选择器',
      description: '专业的颜色选择工具，支持多种颜色格式和调色板，适合设计师和开发者使用。',
      features: [
        '可视化颜色选择器',
        '支持多种颜色格式（HEX、RGB、HSL等）',
        '颜色调色板',
        '颜色历史记录',
        '颜色对比度检测'
      ],
      usage: [
        '1. 使用颜色选择器选择颜色',
        '2. 查看不同格式的颜色值',
        '3. 保存喜欢的颜色到调色板',
        '4. 复制颜色值到剪贴板',
        '5. 查看颜色历史记录'
      ],
      examples: [
        {
          title: '颜色格式转换',
          input: '选择颜色: 蓝色',
          output: 'HEX: #0000FF, RGB: rgb(0,0,255), HSL: hsl(240,100%,50%)'
        },
        {
          title: '颜色对比度',
          input: '前景色: #FFFFFF, 背景色: #000000',
          output: '对比度: 21:1 (AAA级)'
        }
      ],
      tips: [
        '支持键盘快捷键操作',
        '可以导入/导出调色板',
        '支持颜色盲友好模式',
        '提供颜色搭配建议'
      ]
    },
    'en': {
      title: 'Color Picker Tool',
      description: 'Professional color selection tool supporting multiple color formats and palettes, suitable for designers and developers.',
      features: [
        'Visual color picker',
        'Support multiple color formats (HEX, RGB, HSL, etc.)',
        'Color palette',
        'Color history',
        'Color contrast detection'
      ],
      usage: [
        '1. Use color picker to select color',
        '2. View color values in different formats',
        '3. Save favorite colors to palette',
        '4. Copy color values to clipboard',
        '5. View color history'
      ],
      examples: [
        {
          title: 'Color Format Conversion',
          input: 'Selected color: Blue',
          output: 'HEX: #0000FF, RGB: rgb(0,0,255), HSL: hsl(240,100%,50%)'
        },
        {
          title: 'Color Contrast',
          input: 'Foreground: #FFFFFF, Background: #000000',
          output: 'Contrast: 21:1 (AAA level)'
        }
      ],
      tips: [
        'Supports keyboard shortcuts',
        'Can import/export palettes',
        'Supports colorblind-friendly mode',
        'Provides color combination suggestions'
      ]
    }
  },

  // 扩展工具文档
  'unit-converter': {
    'zh-CN': {
      title: '单位转换器',
      description: '支持多种物理量单位的转换，包括长度、重量、温度、面积、体积等常用单位。',
      features: [
        '长度单位转换（米、英尺、英寸等）',
        '重量单位转换（千克、磅、盎司等）',
        '温度单位转换（摄氏度、华氏度、开尔文）',
        '面积和体积单位转换',
        '实时转换计算'
      ],
      usage: [
        '1. 选择要转换的物理量类型',
        '2. 输入数值',
        '3. 选择源单位和目标单位',
        '4. 查看转换结果',
        '5. 可以复制结果'
      ],
      examples: [
        {
          title: '长度转换示例',
          input: '1米 = ? 英尺',
          output: '1米 = 3.28084英尺'
        },
        {
          title: '温度转换示例',
          input: '25摄氏度 = ? 华氏度',
          output: '25°C = 77°F'
        }
      ],
      tips: [
        '支持科学计数法输入',
        '可以同时显示多种单位',
        '支持自定义精度',
        '包含常用单位换算表'
      ]
    },
    'en': {
      title: 'Unit Converter Tool',
      description: 'Convert between various physical units including length, weight, temperature, area, volume and more.',
      features: [
        'Length unit conversion (meters, feet, inches, etc.)',
        'Weight unit conversion (kilograms, pounds, ounces, etc.)',
        'Temperature unit conversion (Celsius, Fahrenheit, Kelvin)',
        'Area and volume unit conversion',
        'Real-time conversion calculation'
      ],
      usage: [
        '1. Select physical quantity type to convert',
        '2. Input numerical value',
        '3. Select source and target units',
        '4. View conversion result',
        '5. Can copy the result'
      ],
      examples: [
        {
          title: 'Length Conversion Example',
          input: '1 meter = ? feet',
          output: '1 meter = 3.28084 feet'
        },
        {
          title: 'Temperature Conversion Example',
          input: '25°C = ? °F',
          output: '25°C = 77°F'
        }
      ],
      tips: [
        'Supports scientific notation input',
        'Can display multiple units simultaneously',
        'Supports custom precision',
        'Includes common unit conversion tables'
      ]
    }
  },

  'number-base-converter': {
    'zh-CN': {
      title: '进制转换器',
      description: '支持二进制、八进制、十进制、十六进制等多种进制之间的相互转换。',
      features: [
        '支持2-36进制转换',
        '实时转换显示',
        '支持大数运算',
        '多种输出格式',
        '批量转换功能'
      ],
      usage: [
        '1. 输入要转换的数值',
        '2. 选择源进制',
        '3. 选择目标进制',
        '4. 查看转换结果',
        '5. 可以复制结果'
      ],
      examples: [
        {
          title: '二进制转十进制',
          input: '二进制: 1010',
          output: '十进制: 10'
        },
        {
          title: '十六进制转二进制',
          input: '十六进制: FF',
          output: '二进制: 11111111'
        }
      ],
      tips: [
        '支持负数转换',
        '可以显示转换过程',
        '支持浮点数转换',
        '包含进制对照表'
      ]
    },
    'en': {
      title: 'Number Base Converter Tool',
      description: 'Convert between different number bases including binary, octal, decimal, hexadecimal and more.',
      features: [
        'Support base 2-36 conversion',
        'Real-time conversion display',
        'Support large number operations',
        'Multiple output formats',
        'Batch conversion functionality'
      ],
      usage: [
        '1. Input number to convert',
        '2. Select source base',
        '3. Select target base',
        '4. View conversion result',
        '5. Can copy the result'
      ],
      examples: [
        {
          title: 'Binary to Decimal',
          input: 'Binary: 1010',
          output: 'Decimal: 10'
        },
        {
          title: 'Hexadecimal to Binary',
          input: 'Hexadecimal: FF',
          output: 'Binary: 11111111'
        }
      ],
      tips: [
        'Supports negative number conversion',
        'Can show conversion process',
        'Supports floating point conversion',
        'Includes base conversion reference table'
      ]
    }
  },

  'image-converter': {
    'zh-CN': {
      title: '图片格式转换工具',
      description: '支持多种图片格式之间的转换，包括JPEG、PNG、GIF、WebP、BMP等格式。',
      features: [
        '支持主流图片格式转换',
        '批量转换功能',
        '质量参数调节',
        '尺寸调整选项',
        '保持EXIF信息'
      ],
      usage: [
        '1. 上传或拖拽图片文件',
        '2. 选择目标格式',
        '3. 设置转换参数',
        '4. 点击"转换"按钮',
        '5. 下载转换后的图片'
      ],
      examples: [
        {
          title: 'PNG转JPEG',
          input: 'PNG图片文件',
          output: 'JPEG格式图片，可调节质量'
        },
        {
          title: '批量格式转换',
          input: '多个不同格式图片',
          output: '统一转换为指定格式'
        }
      ],
      tips: [
        '支持拖拽上传',
        '可以预览转换效果',
        '支持批量下载',
        '保持原始图片质量'
      ]
    },
    'en': {
      title: 'Image Format Converter Tool',
      description: 'Convert between various image formats including JPEG, PNG, GIF, WebP, BMP and more.',
      features: [
        'Support mainstream image format conversion',
        'Batch conversion functionality',
        'Quality parameter adjustment',
        'Size adjustment options',
        'Preserve EXIF information'
      ],
      usage: [
        '1. Upload or drag image files',
        '2. Select target format',
        '3. Set conversion parameters',
        '4. Click "Convert" button',
        '5. Download converted images'
      ],
      examples: [
        {
          title: 'PNG to JPEG',
          input: 'PNG image file',
          output: 'JPEG format image with adjustable quality'
        },
        {
          title: 'Batch Format Conversion',
          input: 'Multiple different format images',
          output: 'Convert all to specified format'
        }
      ],
      tips: [
        'Supports drag and drop upload',
        'Can preview conversion effect',
        'Supports batch download',
        'Maintains original image quality'
      ]
    }
  },

  'image-compressor': {
    'zh-CN': {
      title: '图片压缩工具',
      description: '智能图片压缩工具，在保持图片质量的同时显著减小文件大小。',
      features: [
        '智能压缩算法',
        '质量参数可调',
        '批量压缩功能',
        '压缩前后对比',
        '支持多种格式'
      ],
      usage: [
        '1. 上传要压缩的图片',
        '2. 设置压缩质量',
        '3. 选择压缩模式',
        '4. 点击"压缩"按钮',
        '5. 下载压缩后的图片'
      ],
      examples: [
        {
          title: '高质量压缩',
          input: '2MB JPEG图片',
          output: '压缩后: 500KB，质量损失很小'
        },
        {
          title: '批量压缩',
          input: '多张不同大小图片',
          output: '统一压缩，保持相对质量'
        }
      ],
      tips: [
        '建议压缩质量设置为80-90%',
        '可以预览压缩效果',
        '支持批量下载',
        '压缩比例实时显示'
      ]
    },
    'en': {
      title: 'Image Compressor Tool',
      description: 'Intelligent image compression tool that significantly reduces file size while maintaining image quality.',
      features: [
        'Intelligent compression algorithm',
        'Adjustable quality parameters',
        'Batch compression functionality',
        'Before/after compression comparison',
        'Support multiple formats'
      ],
      usage: [
        '1. Upload images to compress',
        '2. Set compression quality',
        '3. Select compression mode',
        '4. Click "Compress" button',
        '5. Download compressed images'
      ],
      examples: [
        {
          title: 'High Quality Compression',
          input: '2MB JPEG image',
          output: 'Compressed: 500KB with minimal quality loss'
        },
        {
          title: 'Batch Compression',
          input: 'Multiple different size images',
          output: 'Uniform compression maintaining relative quality'
        }
      ],
      tips: [
        'Recommend compression quality 80-90%',
        'Can preview compression effect',
        'Supports batch download',
        'Compression ratio displayed in real-time'
      ]
    }
  },

  'ip-lookup': {
    'zh-CN': {
      title: 'IP地址查询工具',
      description: '查询IP地址的详细信息，包括地理位置、ISP、时区等网络信息。',
      features: [
        'IP地址地理位置查询',
        'ISP和网络信息',
        '时区和语言信息',
        '批量IP查询',
        '历史查询记录'
      ],
      usage: [
        '1. 输入要查询的IP地址',
        '2. 点击"查询"按钮',
        '3. 查看详细信息',
        '4. 可以保存查询结果',
        '5. 支持批量查询'
      ],
      examples: [
        {
          title: 'IP地址查询',
          input: 'IP: 8.8.8.8',
          output: '位置: 美国加利福尼亚州, ISP: Google LLC'
        },
        {
          title: '本机IP查询',
          input: '查询本机IP',
          output: '显示当前网络IP地址和位置信息'
        }
      ],
      tips: [
        '支持IPv4和IPv6地址',
        '查询结果包含详细网络信息',
        '可以导出查询报告',
        '支持IP地址范围查询'
      ]
    },
    'en': {
      title: 'IP Address Lookup Tool',
      description: 'Query detailed information about IP addresses including geographic location, ISP, timezone and network information.',
      features: [
        'IP address geographic location query',
        'ISP and network information',
        'Timezone and language information',
        'Batch IP query',
        'Query history record'
      ],
      usage: [
        '1. Input IP address to query',
        '2. Click "Query" button',
        '3. View detailed information',
        '4. Can save query results',
        '5. Supports batch query'
      ],
      examples: [
        {
          title: 'IP Address Query',
          input: 'IP: 8.8.8.8',
          output: 'Location: California, USA, ISP: Google LLC'
        },
        {
          title: 'Local IP Query',
          input: 'Query local IP',
          output: 'Display current network IP address and location info'
        }
      ],
      tips: [
        'Supports IPv4 and IPv6 addresses',
        'Query results include detailed network information',
        'Can export query reports',
        'Supports IP address range query'
      ]
    }
  },

  'user-agent-parser': {
    'zh-CN': {
      title: 'User-Agent解析工具',
      description: '解析User-Agent字符串，提取浏览器、操作系统、设备等详细信息。',
      features: [
        '浏览器信息解析',
        '操作系统识别',
        '设备类型检测',
        '版本号提取',
        '批量解析功能'
      ],
      usage: [
        '1. 输入User-Agent字符串',
        '2. 点击"解析"按钮',
        '3. 查看解析结果',
        '4. 可以复制解析信息',
        '5. 支持批量解析'
      ],
      examples: [
        {
          title: 'Chrome浏览器解析',
          input: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          output: '浏览器: Chrome, 系统: Windows 10, 架构: x64'
        },
        {
          title: '移动设备解析',
          input: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
          output: '设备: iPhone, 系统: iOS 15.0, 浏览器: Safari'
        }
      ],
      tips: [
        '支持所有主流浏览器',
        '可以识别移动设备',
        '解析结果详细准确',
        '支持自定义User-Agent'
      ]
    },
    'en': {
      title: 'User-Agent Parser Tool',
      description: 'Parse User-Agent strings to extract detailed information about browsers, operating systems, devices and more.',
      features: [
        'Browser information parsing',
        'Operating system identification',
        'Device type detection',
        'Version number extraction',
        'Batch parsing functionality'
      ],
      usage: [
        '1. Input User-Agent string',
        '2. Click "Parse" button',
        '3. View parsing results',
        '4. Can copy parsed information',
        '5. Supports batch parsing'
      ],
      examples: [
        {
          title: 'Chrome Browser Parsing',
          input: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          output: 'Browser: Chrome, OS: Windows 10, Architecture: x64'
        },
        {
          title: 'Mobile Device Parsing',
          input: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
          output: 'Device: iPhone, OS: iOS 15.0, Browser: Safari'
        }
      ],
      tips: [
        'Supports all mainstream browsers',
        'Can identify mobile devices',
        'Parsing results are detailed and accurate',
        'Supports custom User-Agent'
      ]
    }
  },

  'password-strength-checker': {
    'zh-CN': {
      title: '密码强度检测工具',
      description: '检测密码的安全强度，提供详细的强度分析和改进建议。',
      features: [
        '密码强度实时检测',
        '多种强度评估标准',
        '详细的安全建议',
        '常见密码模式检测',
        '密码泄露检查'
      ],
      usage: [
        '1. 输入要检测的密码',
        '2. 查看强度评分',
        '3. 阅读安全建议',
        '4. 根据建议改进密码',
        '5. 重新检测强度'
      ],
      examples: [
        {
          title: '弱密码检测',
          input: '密码: 123456',
          output: '强度: 极弱, 建议: 使用更复杂的密码'
        },
        {
          title: '强密码检测',
          input: '密码: MyStr0ng!P@ssw0rd',
          output: '强度: 很强, 包含大小写字母、数字和特殊字符'
        }
      ],
      tips: [
        '建议使用12位以上的密码',
        '包含大小写字母、数字和特殊字符',
        '避免使用常见密码模式',
        '定期更换密码'
      ]
    },
    'en': {
      title: 'Password Strength Checker Tool',
      description: 'Check password security strength with detailed analysis and improvement suggestions.',
      features: [
        'Real-time password strength detection',
        'Multiple strength evaluation criteria',
        'Detailed security recommendations',
        'Common password pattern detection',
        'Password breach checking'
      ],
      usage: [
        '1. Input password to check',
        '2. View strength score',
        '3. Read security recommendations',
        '4. Improve password based on suggestions',
        '5. Re-check strength'
      ],
      examples: [
        {
          title: 'Weak Password Detection',
          input: 'Password: 123456',
          output: 'Strength: Very Weak, Suggestion: Use more complex password'
        },
        {
          title: 'Strong Password Detection',
          input: 'Password: MyStr0ng!P@ssw0rd',
          output: 'Strength: Very Strong, Contains uppercase, lowercase, numbers and special characters'
        }
      ],
      tips: [
        'Recommend using passwords with 12+ characters',
        'Include uppercase, lowercase, numbers and special characters',
        'Avoid common password patterns',
        'Change passwords regularly'
      ]
    }
  },

  'regex-tester': {
    'zh-CN': {
      title: '正则表达式测试工具',
      description: '在线测试和调试正则表达式，支持多种匹配模式和实时预览。',
      features: [
        '正则表达式实时测试',
        '多种匹配模式支持',
        '匹配结果高亮显示',
        '常用正则表达式模板',
        '替换功能测试'
      ],
      usage: [
        '1. 输入正则表达式',
        '2. 输入测试文本',
        '3. 选择匹配模式',
        '4. 查看匹配结果',
        '5. 测试替换功能'
      ],
      examples: [
        {
          title: '邮箱验证',
          input: '正则: ^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$\n文本: test@example.com',
          output: '匹配: test@example.com'
        },
        {
          title: '数字提取',
          input: '正则: \\d+\n文本: 价格是123元',
          output: '匹配: 123'
        }
      ],
      tips: [
        '支持JavaScript正则表达式语法',
        '可以测试全局匹配和替换',
        '提供常用正则表达式模板',
        '支持多行文本匹配'
      ]
    },
    'en': {
      title: 'Regular Expression Tester Tool',
      description: 'Online regex testing and debugging with multiple matching modes and real-time preview.',
      features: [
        'Real-time regex testing',
        'Multiple matching mode support',
        'Match result highlighting',
        'Common regex templates',
        'Replacement function testing'
      ],
      usage: [
        '1. Input regular expression',
        '2. Input test text',
        '3. Select matching mode',
        '4. View match results',
        '5. Test replacement function'
      ],
      examples: [
        {
          title: 'Email Validation',
          input: 'Regex: ^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$\nText: test@example.com',
          output: 'Match: test@example.com'
        },
        {
          title: 'Number Extraction',
          input: 'Regex: \\d+\nText: Price is $123',
          output: 'Match: 123'
        }
      ],
      tips: [
        'Supports JavaScript regex syntax',
        'Can test global matching and replacement',
        'Provides common regex templates',
        'Supports multiline text matching'
      ]
    }
  },

  'sql-formatter': {
    'zh-CN': {
      title: 'SQL格式化工具',
      description: '格式化SQL代码，提高可读性，支持多种SQL方言和自定义格式选项。',
      features: [
        'SQL代码格式化',
        '支持多种SQL方言',
        '语法高亮显示',
        '自定义格式选项',
        '代码压缩功能'
      ],
      usage: [
        '1. 输入SQL代码',
        '2. 选择SQL方言',
        '3. 设置格式选项',
        '4. 点击"格式化"按钮',
        '5. 复制格式化结果'
      ],
      examples: [
        {
          title: 'SELECT语句格式化',
          input: 'SELECT * FROM users WHERE age>18 ORDER BY name',
          output: 'SELECT *\nFROM users\nWHERE age > 18\nORDER BY name;'
        },
        {
          title: '复杂查询格式化',
          input: 'SELECT u.name,COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id=o.user_id GROUP BY u.id',
          output: 'SELECT u.name,\n       COUNT(o.id)\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id;'
        }
      ],
      tips: [
        '支持MySQL、PostgreSQL、SQL Server等',
        '可以自定义缩进和换行规则',
        '支持关键字大小写转换',
        '格式化后保持语法正确性'
      ]
    },
    'en': {
      title: 'SQL Formatter Tool',
      description: 'Format SQL code for better readability, supporting multiple SQL dialects and custom format options.',
      features: [
        'SQL code formatting',
        'Support multiple SQL dialects',
        'Syntax highlighting',
        'Custom format options',
        'Code compression functionality'
      ],
      usage: [
        '1. Input SQL code',
        '2. Select SQL dialect',
        '3. Set format options',
        '4. Click "Format" button',
        '5. Copy formatted result'
      ],
      examples: [
        {
          title: 'SELECT Statement Formatting',
          input: 'SELECT * FROM users WHERE age>18 ORDER BY name',
          output: 'SELECT *\nFROM users\nWHERE age > 18\nORDER BY name;'
        },
        {
          title: 'Complex Query Formatting',
          input: 'SELECT u.name,COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id=o.user_id GROUP BY u.id',
          output: 'SELECT u.name,\n       COUNT(o.id)\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id;'
        }
      ],
      tips: [
        'Supports MySQL, PostgreSQL, SQL Server, etc.',
        'Can customize indentation and line break rules',
        'Supports keyword case conversion',
        'Maintains syntax correctness after formatting'
      ]
    }
  },

  'css-formatter': {
    'zh-CN': {
      title: 'CSS格式化工具',
      description: '格式化CSS代码，提高可读性，支持CSS3语法和自定义格式选项。',
      features: [
        'CSS代码格式化',
        '支持CSS3语法',
        '属性排序功能',
        '代码压缩选项',
        '语法验证'
      ],
      usage: [
        '1. 输入CSS代码',
        '2. 选择格式选项',
        '3. 设置压缩级别',
        '4. 点击"格式化"按钮',
        '5. 复制格式化结果'
      ],
      examples: [
        {
          title: 'CSS规则格式化',
          input: '.container{width:100%;height:auto;background:#fff;margin:0;padding:20px;}',
          output: '.container {\n  width: 100%;\n  height: auto;\n  background: #fff;\n  margin: 0;\n  padding: 20px;\n}'
        },
        {
          title: '媒体查询格式化',
          input: '@media (max-width:768px){.container{width:100%;padding:10px;}}',
          output: '@media (max-width: 768px) {\n  .container {\n    width: 100%;\n    padding: 10px;\n  }\n}'
        }
      ],
      tips: [
        '支持CSS3新特性',
        '可以按字母顺序排列属性',
        '支持代码压缩和美化',
        '自动修复常见语法错误'
      ]
    },
    'en': {
      title: 'CSS Formatter Tool',
      description: 'Format CSS code for better readability, supporting CSS3 syntax and custom format options.',
      features: [
        'CSS code formatting',
        'Support CSS3 syntax',
        'Property sorting functionality',
        'Code compression options',
        'Syntax validation'
      ],
      usage: [
        '1. Input CSS code',
        '2. Select format options',
        '3. Set compression level',
        '4. Click "Format" button',
        '5. Copy formatted result'
      ],
      examples: [
        {
          title: 'CSS Rule Formatting',
          input: '.container{width:100%;height:auto;background:#fff;margin:0;padding:20px;}',
          output: '.container {\n  width: 100%;\n  height: auto;\n  background: #fff;\n  margin: 0;\n  padding: 20px;\n}'
        },
        {
          title: 'Media Query Formatting',
          input: '@media (max-width:768px){.container{width:100%;padding:10px;}}',
          output: '@media (max-width: 768px) {\n  .container {\n    width: 100%;\n    padding: 10px;\n  }\n}'
        }
      ],
      tips: [
        'Supports CSS3 new features',
        'Can sort properties alphabetically',
        'Supports code compression and beautification',
        'Automatically fixes common syntax errors'
      ]
    }
  },

  'code-highlighter': {
    'zh-CN': {
      title: '代码高亮工具',
      description: '为多种编程语言提供语法高亮显示，支持多种主题和导出格式。',
      features: [
        '支持多种编程语言',
        '多种高亮主题',
        '行号显示',
        '代码复制功能',
        '导出为HTML/图片'
      ],
      usage: [
        '1. 选择编程语言',
        '2. 输入或粘贴代码',
        '3. 选择高亮主题',
        '4. 设置显示选项',
        '5. 复制或导出结果'
      ],
      examples: [
        {
          title: 'JavaScript代码高亮',
          input: 'function hello() {\n  console.log("Hello World!");\n}',
          output: '语法高亮的JavaScript代码，关键字和字符串有不同颜色'
        },
        {
          title: 'Python代码高亮',
          input: 'def hello():\n    print("Hello World!")',
          output: '语法高亮的Python代码，缩进和语法结构清晰显示'
        }
      ],
      tips: [
        '支持50+种编程语言',
        '提供多种高亮主题',
        '可以显示行号',
        '支持代码折叠功能'
      ]
    },
    'en': {
      title: 'Code Highlighter Tool',
      description: 'Provide syntax highlighting for multiple programming languages with various themes and export formats.',
      features: [
        'Support multiple programming languages',
        'Multiple highlight themes',
        'Line number display',
        'Code copy functionality',
        'Export to HTML/image'
      ],
      usage: [
        '1. Select programming language',
        '2. Input or paste code',
        '3. Choose highlight theme',
        '4. Set display options',
        '5. Copy or export result'
      ],
      examples: [
        {
          title: 'JavaScript Code Highlighting',
          input: 'function hello() {\n  console.log("Hello World!");\n}',
          output: 'Syntax highlighted JavaScript code with different colors for keywords and strings'
        },
        {
          title: 'Python Code Highlighting',
          input: 'def hello():\n    print("Hello World!")',
          output: 'Syntax highlighted Python code with clear indentation and syntax structure'
        }
      ],
      tips: [
        'Supports 50+ programming languages',
        'Provides multiple highlight themes',
        'Can display line numbers',
        'Supports code folding functionality'
      ]
    }
  },

  'http-status-codes': {
    'zh-CN': {
      title: 'HTTP状态码查询工具',
      description: '查询HTTP状态码的详细信息和含义，帮助开发者理解Web请求响应。',
      features: [
        '完整的HTTP状态码库',
        '详细的状态码说明',
        '使用场景和示例',
        '快速搜索功能',
        '分类浏览'
      ],
      usage: [
        '1. 输入状态码或搜索关键词',
        '2. 查看详细说明',
        '3. 了解使用场景',
        '4. 查看相关示例',
        '5. 可以收藏常用状态码'
      ],
      examples: [
        {
          title: '200状态码查询',
          input: '状态码: 200',
          output: '200 OK - 请求成功，服务器已成功处理请求'
        },
        {
          title: '404状态码查询',
          input: '状态码: 404',
          output: '404 Not Found - 服务器无法找到请求的资源'
        }
      ],
      tips: [
        '包含所有标准HTTP状态码',
        '提供详细的使用说明',
        '支持按类别浏览',
        '包含实际使用示例'
      ]
    },
    'en': {
      title: 'HTTP Status Codes Lookup Tool',
      description: 'Look up detailed information and meanings of HTTP status codes to help developers understand web request responses.',
      features: [
        'Complete HTTP status code library',
        'Detailed status code descriptions',
        'Usage scenarios and examples',
        'Quick search functionality',
        'Category browsing'
      ],
      usage: [
        '1. Input status code or search keywords',
        '2. View detailed description',
        '3. Understand usage scenarios',
        '4. View related examples',
        '5. Can bookmark common status codes'
      ],
      examples: [
        {
          title: '200 Status Code Lookup',
          input: 'Status Code: 200',
          output: '200 OK - Request successful, server has successfully processed the request'
        },
        {
          title: '404 Status Code Lookup',
          input: 'Status Code: 404',
          output: '404 Not Found - Server cannot find the requested resource'
        }
      ],
      tips: [
        'Includes all standard HTTP status codes',
        'Provides detailed usage descriptions',
        'Supports browsing by category',
        'Includes practical usage examples'
      ]
    }
  },

  // 薪酬计算器
  'salary-calculator': {
    'zh-CN': {
      title: '薪酬计算器',
      description: '专业的薪酬计算工具，帮助计算总包、时薪，并根据涨幅比例计算新薪酬，提供详细的薪酬分析。',
      features: [
        '计算总薪酬包（年收入）',
        '计算时薪（可自定义工作小时）',
        '根据涨幅比例计算新薪酬',
        '提供详细的薪酬对比分析',
        '支持多种发薪频率（12-16薪）',
        '工作时间分析和福利分析'
      ],
      usage: [
        '1. 输入月薪和发薪频率',
        '2. 设置每日工作小时数',
        '3. 输入涨幅比例（如20%、30%）',
        '4. 点击计算按钮查看结果',
        '5. 查看详细的薪酬对比分析'
      ],
      examples: [
        {
          title: '基础薪酬计算',
          input: '月薪：15000元，发薪：13次，工作小时：8小时',
          output: '总包：195000元，时薪：68.18元'
        },
        {
          title: '涨幅计算',
          input: '当前月薪：15000元，涨幅：20%',
          output: '新月薪：18000元，新总包：234000元'
        },
        {
          title: '时薪对比',
          input: '月薪：20000元，工作小时：10小时',
          output: '时薪：90.91元（相比8小时工作减少）'
        }
      ],
      tips: [
        '发薪频率包括基本工资和奖金',
        '时薪计算基于每月22个工作日',
        '涨幅计算适用于所有薪酬项目',
        '建议根据实际工作强度调整工作小时',
        '可以用于跳槽谈判和薪酬评估'
      ]
    },
    'en': {
      title: 'Salary Calculator',
      description: 'Professional salary calculation tool to help calculate total package, hourly rate, and new salary based on raise percentage with detailed salary analysis.',
      features: [
        'Calculate total compensation package (annual income)',
        'Calculate hourly rate (customizable work hours)',
        'Calculate new salary based on raise percentage',
        'Provide detailed salary comparison analysis',
        'Support multiple pay frequencies (12-16 pays)',
        'Work time analysis and benefit analysis'
      ],
      usage: [
        '1. Enter monthly salary and pay frequency',
        '2. Set daily work hours',
        '3. Enter raise percentage (e.g., 20%, 30%)',
        '4. Click calculate button to view results',
        '5. View detailed salary comparison analysis'
      ],
      examples: [
        {
          title: 'Basic Salary Calculation',
          input: 'Monthly: $5000, Pay frequency: 13 times, Work hours: 8 hours',
          output: 'Total package: $65000, Hourly rate: $28.41'
        },
        {
          title: 'Raise Calculation',
          input: 'Current monthly: $5000, Raise: 20%',
          output: 'New monthly: $6000, New total package: $78000'
        },
        {
          title: 'Hourly Rate Comparison',
          input: 'Monthly: $6000, Work hours: 10 hours',
          output: 'Hourly rate: $27.27 (reduced compared to 8-hour work)'
        }
      ],
      tips: [
        'Pay frequency includes base salary and bonuses',
        'Hourly rate calculation based on 22 working days per month',
        'Raise calculation applies to all salary items',
        'Adjust work hours based on actual work intensity',
        'Can be used for job negotiation and salary evaluation'
      ]
    }
  },

  // 假期计算器
  'vacation-calculator': {
    'zh-CN': {
      title: '假期计算器',
      description: '智能的假期安排优化工具，帮助您最大化利用假期时间，通过连接周末和节假日来节省假期天数。',
      features: [
        '智能优化假期安排，最大化休息时间',
        '支持多地区公共假期数据（中国、美国、日本等）',
        '自动识别周末和节假日，计算节省天数',
        '个人重要日期标记和管理',
        '日历可视化显示假期安排',
        '多方案对比和保存',
        '支持日历导出（ICS格式）',
        '方案评级系统（A+到C级）'
      ],
      usage: [
        '1. 输入可用假期天数和日期范围',
        '2. 选择所在地区获取公共假期数据',
        '3. 添加个人重要日期（可选）',
        '4. 点击计算获取最优方案',
        '5. 查看日历可视化和数据统计',
        '6. 保存方案或导出日历'
      ],
      examples: [
        {
          title: '基础假期计算',
          input: '可用假期：5天，日期范围：2024年1月1日-31日，地区：中国',
          output: '最优方案：1月1-5日，包含元旦假期，节省1天假期'
        },
        {
          title: '春节假期优化',
          input: '可用假期：3天，日期范围：2024年2月1日-15日，地区：中国',
          output: '最优方案：2月10-12日，连接春节假期，节省2天假期'
        },
        {
          title: '周末连接优化',
          input: '可用假期：2天，日期范围：2024年3月1日-31日，地区：美国',
          output: '最优方案：3月15-16日，连接周末，节省2天假期'
        }
      ],
      tips: [
        '优先选择包含公共假期的日期段',
        '尽量连接周末以最大化休息时间',
        '考虑个人重要日期避免冲突',
        '不同地区的假期政策不同，选择正确的地区',
        '保存多个方案进行对比选择',
        '使用日历导出功能同步到其他应用'
      ]
    },
    'en': {
      title: 'Vacation Calculator',
      description: 'Intelligent vacation arrangement optimization tool to help you maximize vacation time by connecting weekends and holidays to save vacation days.',
      features: [
        'Intelligent vacation arrangement optimization to maximize rest time',
        'Support for multi-region public holiday data (China, USA, Japan, etc.)',
        'Automatically identify weekends and holidays to calculate saved days',
        'Personal important date marking and management',
        'Calendar visualization of vacation arrangements',
        'Multi-plan comparison and saving',
        'Support for calendar export (ICS format)',
        'Plan rating system (A+ to C grade)'
      ],
      usage: [
        '1. Enter available vacation days and date range',
        '2. Select region to get public holiday data',
        '3. Add personal important dates (optional)',
        '4. Click calculate to get optimal plan',
        '5. View calendar visualization and data statistics',
        '6. Save plan or export calendar'
      ],
      examples: [
        {
          title: 'Basic Vacation Calculation',
          input: 'Available days: 5, Date range: Jan 1-31, 2024, Region: China',
          output: 'Optimal plan: Jan 1-5, includes New Year holiday, saves 1 day'
        },
        {
          title: 'Spring Festival Optimization',
          input: 'Available days: 3, Date range: Feb 1-15, 2024, Region: China',
          output: 'Optimal plan: Feb 10-12, connects Spring Festival, saves 2 days'
        },
        {
          title: 'Weekend Connection Optimization',
          input: 'Available days: 2, Date range: Mar 1-31, 2024, Region: USA',
          output: 'Optimal plan: Mar 15-16, connects weekend, saves 2 days'
        }
      ],
      tips: [
        'Prioritize date ranges that include public holidays',
        'Try to connect weekends to maximize rest time',
        'Consider personal important dates to avoid conflicts',
        'Different regions have different holiday policies, choose the correct region',
        'Save multiple plans for comparison and selection',
        'Use calendar export to sync with other applications'
      ]
    }
  },

  // 社保公积金计算器
  'social-security-calculator': {
    'zh-CN': {
      title: '社保公积金计算器',
      description: '专业的社保公积金计算工具，支持全国20个主要城市的社保公积金缴纳比例计算，提供详细的个人和公司缴纳明细分析。',
      features: [
        '支持全国20个主要城市的社保公积金数据',
        '自动计算个人缴纳明细和总额',
        '自动计算公司缴纳明细和总额',
        '计算个人税后收入',
        '计算公司总支出',
        '可视化进度条显示各项占比',
        '详细的表格展示缴纳明细',
        '实时计算更新',
        '响应式设计，支持移动端'
      ],
      usage: [
        '1. 从下拉菜单中选择您所在的城市',
        '2. 在工资输入框中输入您的月薪金额',
        '3. 系统自动计算并显示各项明细',
        '4. 查看总览卡片了解关键数据',
        '5. 查看详细表格了解具体缴纳项目',
        '6. 参考进度条了解各项占工资比例'
      ],
      examples: [
        {
          title: '北京地区计算示例',
          input: '城市：北京，月薪：10000元',
          output: '个人缴纳：¥2,220 (22.2%)，公司缴纳：¥3,900 (39.0%)，税后收入：¥7,780 (77.8%)，公司总支出：¥13,900 (139.0%)'
        },
        {
          title: '上海地区计算示例',
          input: '城市：上海，月薪：15000元',
          output: '个人缴纳：¥3,375 (22.5%)，公司缴纳：¥4,650 (31.0%)，税后收入：¥11,625 (77.5%)，公司总支出：¥19,650 (131.0%)'
        },
        {
          title: '深圳地区计算示例',
          input: '城市：深圳，月薪：8000元',
          output: '个人缴纳：¥1,784 (22.3%)，公司缴纳：¥2,008 (25.1%)，税后收入：¥6,216 (77.7%)，公司总支出：¥10,008 (125.1%)'
        }
      ],
      tips: [
        '不同城市的社保公积金比例不同，请选择正确的城市',
        '计算结果仅供参考，具体以当地政策为准',
        '实际缴纳比例可能因政策调整而变化',
        '建议定期查看当地社保局和公积金管理中心的最新政策',
        '个人缴纳部分会从工资中扣除，影响税后收入',
        '公司总支出包括工资和公司缴纳的社保公积金部分',
        '住房公积金比例在不同城市差异较大，影响总支出',
        '工伤保险和生育保险通常由公司全额承担'
      ]
    },
    'en': {
      title: 'Social Security Calculator',
      description: 'Professional social security and housing fund calculator supporting 20 major cities in China, providing detailed personal and company contribution analysis.',
      features: [
        'Support for 20 major cities social security and housing fund data',
        'Automatic calculation of personal contribution details and total',
        'Automatic calculation of company contribution details and total',
        'Calculate personal after-tax income',
        'Calculate company total expenditure',
        'Visual progress bars showing contribution ratios',
        'Detailed table display of contribution breakdown',
        'Real-time calculation updates',
        'Responsive design supporting mobile devices'
      ],
      usage: [
        '1. Select your city from the dropdown menu',
        '2. Enter your monthly salary in the salary input box',
        '3. System automatically calculates and displays all details',
        '4. View overview cards to understand key data',
        '5. View detailed tables to understand specific contribution items',
        '6. Reference progress bars to understand contribution ratios'
      ],
      examples: [
        {
          title: 'Beijing Calculation Example',
          input: 'City: Beijing, Monthly Salary: ¥10,000',
          output: 'Personal: ¥2,220 (22.2%), Company: ¥3,900 (39.0%), After-tax: ¥7,780 (77.8%), Company Total: ¥13,900 (139.0%)'
        },
        {
          title: 'Shanghai Calculation Example',
          input: 'City: Shanghai, Monthly Salary: ¥15,000',
          output: 'Personal: ¥3,375 (22.5%), Company: ¥4,650 (31.0%), After-tax: ¥11,625 (77.5%), Company Total: ¥19,650 (131.0%)'
        },
        {
          title: 'Shenzhen Calculation Example',
          input: 'City: Shenzhen, Monthly Salary: ¥8,000',
          output: 'Personal: ¥1,784 (22.3%), Company: ¥2,008 (25.1%), After-tax: ¥6,216 (77.7%), Company Total: ¥10,008 (125.1%)'
        }
      ],
      tips: [
        'Different cities have different social security and housing fund rates, please select the correct city',
        'Calculation results are for reference only, please refer to local policies for actual rates',
        'Actual contribution rates may change due to policy adjustments',
        'Recommend checking with local social security and housing fund management centers for latest policies',
        'Personal contributions are deducted from salary, affecting after-tax income',
        'Company total expenditure includes salary and company social security contributions',
        'Housing fund rates vary significantly between cities, affecting total expenditure',
        'Work injury and maternity insurance are usually fully covered by the company'
      ]
    }
  }
}

// 获取工具文档
export function getToolDoc(toolId, locale = 'zh-CN') {
  const toolDoc = toolDocs[toolId]
  if (!toolDoc) {
    return null
  }
  
  // 如果请求的语言不存在，回退到中文
  return toolDoc[locale] || toolDoc['zh-CN']
}

// 获取所有支持的工具文档
export function getAllToolDocs() {
  return Object.keys(toolDocs)
}

// Русский
export default {
  // Общие
  common: {
    search: 'Поиск',
    clear: 'Очистить',
    copy: 'Копировать',
    copySuccess: 'Скопировано успешно',
    copyFailed: 'Ошибка копирования',
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    back: 'Назад',
    next: 'Далее',
    previous: 'Назад',
    save: 'Сохранить',
    delete: 'Удалить',
    edit: 'Редактировать',
    add: 'Добавить',
    close: 'Закрыть',
    open: 'Открыть',
    refresh: 'Обновить',
    reset: 'Сбросить',
    submit: 'Отправить',
    download: 'Скачать',
    upload: 'Загрузить',
    select: 'Выбрать',
    all: 'Все',
    none: 'Нет',
    yes: 'Да',
    no: 'Нет'
  },
  
  // Навигация
  nav: {
    title: 'Develop Tools Pro',
    subtitle: 'Коллекция инструментов разработчика',
    searchPlaceholder: 'Поиск инструментов...',
    home: 'Главная',
    tools: 'Инструменты'
  },
  
  // Главная
  home: {
    title: 'Develop Tools Pro',
    subtitle: 'Современная коллекция инструментов для эффективных профессионалов с 30+ утилитами для повышения эффективности работы',
    noResults: 'Инструменты не найдены',
    noResultsDesc: 'Попробуйте использовать другие ключевые слова или выберите другую категорию',
    categories: {
      all: 'Все инструменты',
      json: 'JSON инструменты',
      time: 'Временные инструменты',
      encoding: 'Кодирование/Декодирование',
      text: 'Обработка текста',
      data: 'Генерация данных',
      image: 'Обработка изображений',
      crypto: 'Шифрование/Расшифровка',
      network: 'Сетевые инструменты',
      dev: 'Инструменты разработки'
    }
  },
  
  // Детали инструмента
  toolDetail: {
    copyLink: 'Копировать ссылку',
    backToList: 'Вернуться к инструментам',
    toolNotFound: 'Инструмент не найден',
    toolNotFoundDesc: 'Инструмент, который вы ищете, не существует или был удален',
    underDevelopment: 'В разработке',
    underDevelopmentDesc: 'Этот инструмент находится в разработке, следите за обновлениями'
  },
  
  // Категории инструментов
  tools: {
    categories: {
      'JSON工具': 'JSON инструменты',
      '时间工具': 'Временные инструменты',
      '编码解码': 'Кодирование/Декодирование',
      '文本处理': 'Обработка текста',
      '数据生成': 'Генерация данных',
      '图像处理': 'Обработка изображений',
      '加密解密': 'Шифрование/Расшифровка',
      '网络工具': 'Сетевые инструменты',
      '开发工具': 'Инструменты разработки'
    },
    
    // JSON инструменты
    'json-formatter': {
      name: 'JSON Форматтер',
      description: 'Форматирование, сжатие и валидация JSON данных'
    },
    'json-yaml-converter': {
      name: 'JSON в YAML',
      description: 'Конвертация между форматами JSON и YAML'
    },
    'json-schema-generator': {
      name: 'Генератор JSON Schema',
      description: 'Генерация JSON Schema из JSON данных'
    },
    
    // Временные инструменты
    'timestamp-converter': {
      name: 'Конвертер временных меток',
      description: 'Конвертация между Unix временными метками и датами'
    },
    'time-calculator': {
      name: 'Временной калькулятор',
      description: 'Арифметика дат и конвертация часовых поясов'
    },
    'countdown-timer': {
      name: 'Таймер обратного отсчета',
      description: 'Функциональность обратного отсчета'
    },
    
    // Кодирование/Декодирование
    'base64-encoder': {
      name: 'Base64 Кодировщик/Декодировщик',
      description: 'Инструмент кодирования и декодирования Base64'
    },
    'url-encoder': {
      name: 'URL Кодировщик/Декодировщик',
      description: 'Инструмент кодирования и декодирования URL'
    },
    'html-entities': {
      name: 'HTML Сущности',
      description: 'Конвертация HTML символьных сущностей'
    },
    
    // Обработка текста
    'text-diff': {
      name: 'Сравнение текстов',
      description: 'Сравнение различий между двумя текстами'
    },
    'regex-tester': {
      name: 'Тестер регулярных выражений',
      description: 'Онлайн тестирование регулярных выражений'
    },
    'text-statistics': {
      name: 'Статистика текста',
      description: 'Статистика символов, слов и строк'
    },
    
    // Генерация данных
    'uuid-generator': {
      name: 'Генератор UUID',
      description: 'Генерация UUID в различных форматах'
    },
    'password-generator': {
      name: 'Генератор паролей',
      description: 'Генерация паролей с пользовательскими правилами'
    },
    'fake-data-generator': {
      name: 'Генератор тестовых данных',
      description: 'Генерация фальшивых имен, email, адресов и т.д.'
    },
    
    // Обработка изображений
    'image-compressor': {
      name: 'Сжатие изображений',
      description: 'Онлайн инструмент сжатия изображений'
    },
    'image-converter': {
      name: 'Конвертер изображений',
      description: 'Конвертация между форматами JPG/PNG/WebP'
    },
    'qr-code-generator': {
      name: 'Генератор QR кодов',
      description: 'Генерация QR кодов из текста или ссылок'
    },
    
    // Шифрование/Расшифровка
    'hash-generator': {
      name: 'Генератор хешей',
      description: 'Вычисление различных алгоритмов хеширования (MD5/SHA)'
    },
    'aes-encryptor': {
      name: 'AES Шифровщик/Расшифровщик',
      description: 'Инструмент симметричного шифрования AES'
    },
    'password-strength': {
      name: 'Проверка силы пароля',
      description: 'Оценка безопасности пароля'
    },
    
    // Сетевые инструменты
    'ip-lookup': {
      name: 'Поиск IP',
      description: 'Запрос информации об IP адресе'
    },
    'user-agent-parser': {
      name: 'Парсер User-Agent',
      description: 'Парсинг строк User-Agent браузера'
    },
    'http-status-codes': {
      name: 'HTTP коды состояния',
      description: 'Справочник HTTP кодов состояния'
    },
    
    // Инструменты разработки
    'css-formatter': {
      name: 'CSS Форматтер',
      description: 'Форматирование и украшение CSS кода'
    },
    'sql-formatter': {
      name: 'SQL Форматтер',
      description: 'Форматирование SQL запросов'
    },
    'color-picker': {
      name: 'Выбор цвета',
      description: 'Конвертация и выбор цветовых значений'
    },
    'unit-converter': {
      name: 'Конвертер единиц',
      description: 'Конвертация длины, веса, температуры и т.д.'
    },
    'number-base-converter': {
      name: 'Конвертер систем счисления',
      description: 'Конвертация между двоичной, восьмеричной, шестнадцатеричной системами'
    },
    'code-highlighter': {
      name: 'Подсветка синтаксиса',
      description: 'Подсветка синтаксиса для множества языков'
    }
  },
  
  // JSON Форматтер
  jsonFormatter: {
    exampleData: 'Примеры данных',
    format: 'Форматировать',
    minify: 'Сжать',
    validate: 'Проверить',
    clear: 'Очистить',
    jsonInput: 'JSON Ввод',
    copy: 'Копировать',
    inputPlaceholder: 'Введите JSON данные, или нажмите кнопки примеров выше для загрузки образцов...',
    formattedResult: 'Отформатированный результат',
    copyResult: 'Копировать результат',
    download: 'Скачать',
    resultPlaceholder: 'Отформатированный результат будет отображен здесь...',
    noResult: 'Нет результата',
    charCount: 'Символы',
    lineCount: 'Строки',
    objectCount: 'Объекты',
    arrayCount: 'Массивы',
    examples: {
      userInfo: 'Информация о пользователе',
      apiResponse: 'API Ответ',
      configInfo: 'Информация о конфигурации'
    }
  },
  
  // Base64 Кодировщик/Декодировщик
  base64Encoder: {
    originalData: 'Исходные данные',
    encode: 'Кодировать',
    clear: 'Очистить',
    inputPlaceholder: 'Введите текст для кодирования...',
    encodedResult: 'Результат Base64 кодирования',
    copyResult: 'Копировать результат',
    base64Data: 'Base64 данные',
    decode: 'Декодировать',
    decodePlaceholder: 'Введите Base64 данные для декодирования...',
    decodedResult: 'Декодированный результат',
    originalCharCount: 'Исходные символы',
    encodedCharCount: 'Закодированные символы',
    compressionRatio: 'Коэффициент сжатия',
    encodeStatus: 'Статус кодирования',
    encoded: 'Закодировано',
    notEncoded: 'Не закодировано'
  },
  
  // Подвал
  footer: {
    copyright: '© 2025 Develop Tools Pro. Современная коллекция инструментов для эффективных профессионалов.'
  }
}


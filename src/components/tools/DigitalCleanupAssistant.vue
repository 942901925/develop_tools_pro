<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {{ t('digitalCleanup.title') }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ t('digitalCleanup.subtitle') }}
      </p>
    </div>

    <!-- 平台选择区域 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {{ t('digitalCleanup.platformSelection') }}
      </h3>
      
      <!-- 全选/取消全选 -->
      <div class="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <label class="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            :checked="allSelected"
            @change="toggleAllPlatforms"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <span class="text-sm font-medium text-gray-900 dark:text-gray-100">
            {{ allSelected ? t('digitalCleanup.deselectAll') : t('digitalCleanup.selectAll') }}
          </span>
        </label>
      </div>

      <!-- 平台列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="platform in platforms"
          :key="platform.id"
          class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          <input
            :id="platform.id"
            v-model="selectedPlatforms"
            :value="platform.id"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label :for="platform.id" class="flex-1 cursor-pointer">
            <div class="flex items-center space-x-2">
              <span class="text-lg">{{ platform.icon }}</span>
              <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ platform.name }}</span>
            </div>
          </label>
        </div>
      </div>

      <!-- 生成指南按钮 -->
      <div class="mt-6">
        <button
          @click="generateGuide"
          :disabled="selectedPlatforms.length === 0"
          :class="['w-full px-6 py-4 rounded-lg font-semibold text-white transition-colors flex items-center justify-center space-x-2',
                   selectedPlatforms.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700']"
        >
          <span>{{ t('digitalCleanup.generateGuide') }}</span>
          <span v-if="selectedPlatforms.length > 0" class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {{ selectedPlatforms.length }}
          </span>
        </button>
      </div>

      <!-- 使用提示 -->
      <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div class="flex items-start space-x-2">
          <span class="text-blue-600 dark:text-blue-400 text-xl">💡</span>
          <div class="text-sm text-blue-800 dark:text-blue-200">
            <p class="font-medium">{{ t('digitalCleanup.tips.title') }}</p>
            <p class="mt-1">{{ t('digitalCleanup.tips.description') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 生成结果 -->
    <div v-if="generatedGuides.length > 0" class="space-y-6">
      <!-- 结果标题和操作 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {{ t('digitalCleanup.resultTitle', { count: generatedGuides.length }) }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ t('digitalCleanup.resultDescription') }}
          </p>
        </div>
        <div class="flex space-x-2">
          <button
            @click="expandAll"
            class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors flex items-center space-x-1"
          >
            <span>📖</span>
            <span>{{ t('digitalCleanup.expandAll') }}</span>
          </button>
          <button
            @click="collapseAll"
            class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors flex items-center space-x-1"
          >
            <span>📕</span>
            <span>{{ t('digitalCleanup.collapseAll') }}</span>
          </button>
        </div>
      </div>

      <!-- 指南列表 -->
      <div class="space-y-4">
        <div
          v-for="guide in generatedGuides"
          :key="guide.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <!-- 平台标题 -->
          <button
            @click="toggleGuide(guide.id)"
            class="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
          >
            <div class="flex items-center space-x-3">
              <span class="text-2xl">{{ guide.icon }}</span>
              <div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ guide.name }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">{{ t('digitalCleanup.clickToToggle') }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ expandedGuides.includes(guide.id) ? t('digitalCleanup.collapse') : t('digitalCleanup.expand') }}
              </span>
              <span class="text-gray-400 dark:text-gray-500 transition-transform" :class="{ 'rotate-180': expandedGuides.includes(guide.id) }">
                ▼
              </span>
            </div>
          </button>

          <!-- 指南内容 -->
          <div v-if="expandedGuides.includes(guide.id)" class="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
            <div class="pt-4 space-y-4">
              <!-- 官方链接 -->
              <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h5 class="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                  <span class="mr-2">🔗</span>
                  {{ t('digitalCleanup.officialLink') }}
                </h5>
                <a
                  :href="guide.officialLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline break-all"
                >
                  {{ guide.officialLink }}
                </a>
              </div>

              <!-- 注销步骤 -->
              <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h5 class="text-sm font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center">
                  <span class="mr-2">📋</span>
                  {{ t('digitalCleanup.deletionSteps') }}
                </h5>
                <ol class="space-y-2">
                  <li
                    v-for="(step, index) in guide.steps"
                    :key="index"
                    class="flex items-start space-x-3 text-sm text-green-800 dark:text-green-200"
                  >
                    <span class="flex-shrink-0 w-6 h-6 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full flex items-center justify-center text-xs font-semibold">
                      {{ index + 1 }}
                    </span>
                    <span>{{ step }}</span>
                  </li>
                </ol>
              </div>

              <!-- 注意事项 -->
              <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <h5 class="text-sm font-semibold text-yellow-900 dark:text-yellow-100 mb-3 flex items-center">
                  <span class="mr-2">⚠️</span>
                  {{ t('digitalCleanup.importantNotes') }}
                </h5>
                <ul class="space-y-2">
                  <li
                    v-for="(note, index) in guide.notes"
                    :key="index"
                    class="flex items-start space-x-3 text-sm text-yellow-800 dark:text-yellow-200"
                  >
                    <span class="flex-shrink-0 w-2 h-2 bg-yellow-400 dark:bg-yellow-600 rounded-full mt-2"></span>
                    <span>{{ note }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用说明 -->
      <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div class="flex items-start space-x-2">
          <span class="text-yellow-600 dark:text-yellow-400">⚠️</span>
          <div class="text-sm text-yellow-800 dark:text-yellow-200">
            <p class="font-medium">{{ t('digitalCleanup.usageNote.title') }}</p>
            <p class="mt-1">{{ t('digitalCleanup.usageNote.description') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态提示 -->
    <div v-if="generatedGuides.length === 0" class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
      <div class="text-4xl text-gray-400 dark:text-gray-500 mb-4">🧹</div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {{ t('digitalCleanup.emptyState.title') }}
      </h3>
      <p class="text-gray-600 dark:text-gray-300">
        {{ t('digitalCleanup.emptyState.description') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 响应式数据
const selectedPlatforms = ref([])
const expandedGuides = ref([])

// 平台数据库
const platforms = [
  {
    id: 'zhihu',
    name: '知乎',
    icon: '📝',
    officialLink: 'https://www.zhihu.com/settings/account',
    steps: [
      '登录知乎账号',
      '进入设置页面',
      '点击"账号与安全"',
      '选择"注销账号"',
      '按照提示完成注销流程'
    ],
    notes: [
      '注销后无法恢复，请谨慎操作',
      '注销前请备份重要内容',
      '注销过程可能需要7-15个工作日'
    ]
  },
  {
    id: 'douban',
    name: '豆瓣',
    icon: '📚',
    officialLink: 'https://www.douban.com/accounts/delete',
    steps: [
      '登录豆瓣账号',
      '访问账号删除页面',
      '阅读注销协议',
      '填写注销原因',
      '确认注销申请'
    ],
    notes: [
      '注销申请提交后需要等待审核',
      '注销期间账号将被冻结',
      '注销后所有数据将被永久删除'
    ]
  },
  {
    id: 'weibo',
    name: '新浪微博',
    icon: '🐦',
    officialLink: 'https://account.weibo.com/settings/account',
    steps: [
      '登录微博账号',
      '进入账号设置',
      '点击"账号安全"',
      '选择"注销账号"',
      '完成身份验证',
      '确认注销操作'
    ],
    notes: [
      '注销前需要解除所有第三方授权',
      '注销后无法恢复账号',
      '建议先备份重要微博内容'
    ]
  },
  {
    id: 'tianya',
    name: '天涯社区',
    icon: '🌍',
    officialLink: 'https://passport.tianya.cn/',
    steps: [
      '登录天涯账号',
      '进入个人中心',
      '点击"账号设置"',
      '选择"注销账号"',
      '填写注销申请表',
      '等待审核结果'
    ],
    notes: [
      '注销申请需要人工审核',
      '审核时间通常为3-7个工作日',
      '注销后无法恢复任何数据'
    ]
  },
  {
    id: 'mop',
    name: '猫扑',
    icon: '🐱',
    officialLink: 'https://passport.mop.com/',
    steps: [
      '登录猫扑账号',
      '进入个人设置',
      '找到账号管理选项',
      '申请注销账号',
      '按照提示完成流程'
    ],
    notes: [
      '注销前请确保无未完成的交易',
      '注销后所有积分和等级清零',
      '建议先联系客服确认注销流程'
    ]
  },
  {
    id: 'renren',
    name: '人人网',
    icon: '👥',
    officialLink: 'https://www.renren.com/',
    steps: [
      '登录人人网账号',
      '进入账号设置',
      '点击"隐私设置"',
      '选择"注销账号"',
      '确认注销操作'
    ],
    notes: [
      '注销前请备份重要照片和日志',
      '注销后无法恢复任何内容',
      '注销过程不可逆，请谨慎操作'
    ]
  },
  {
    id: 'qq',
    name: 'QQ',
    icon: '💬',
    officialLink: 'https://aq.qq.com/cn2/login_limit',
    steps: [
      '登录QQ安全中心',
      '进入账号管理',
      '选择"注销QQ账号"',
      '完成身份验证',
      '确认注销申请'
    ],
    notes: [
      '注销前需要解绑所有关联服务',
      '注销后无法恢复QQ号',
      '建议先转移重要联系人信息'
    ]
  },
  {
    id: 'wechat',
    name: '微信',
    icon: '💚',
    officialLink: 'https://weixin.qq.com/',
    steps: [
      '打开微信APP',
      '进入"我"页面',
      '点击"设置"',
      '选择"账号与安全"',
      '点击"微信安全中心"',
      '选择"注销账号"'
    ],
    notes: [
      '注销前需要解绑所有第三方服务',
      '注销后无法恢复微信账号',
      '建议先备份重要聊天记录'
    ]
  },
  {
    id: 'baidu',
    name: '百度',
    icon: '🔍',
    officialLink: 'https://passport.baidu.com/',
    steps: [
      '登录百度账号',
      '进入账号设置',
      '点击"账号安全"',
      '选择"注销账号"',
      '完成身份验证',
      '确认注销操作'
    ],
    notes: [
      '注销前需要解绑所有百度服务',
      '注销后无法恢复账号',
      '建议先备份百度网盘等重要数据'
    ]
  },
  {
    id: 'taobao',
    name: '淘宝',
    icon: '🛒',
    officialLink: 'https://member1.taobao.com/member/fresh/account_security.htm',
    steps: [
      '登录淘宝账号',
      '进入账号管理',
      '点击"账号安全"',
      '选择"注销账号"',
      '完成身份验证',
      '确认注销申请'
    ],
    notes: [
      '注销前需要完成所有交易',
      '注销后无法恢复账号',
      '建议先处理未完成的订单'
    ]
  },
  {
    id: 'alipay',
    name: '支付宝',
    icon: '💰',
    officialLink: 'https://custweb.alipay.com/account/index.htm',
    steps: [
      '登录支付宝账号',
      '进入账号设置',
      '点击"安全设置"',
      '选择"注销账号"',
      '完成身份验证',
      '确认注销操作'
    ],
    notes: [
      '注销前需要清空余额和解除所有绑定',
      '注销后无法恢复账号',
      '建议先转移所有资金'
    ]
  },
  {
    id: 'jd',
    name: '京东',
    icon: '📦',
    officialLink: 'https://passport.jd.com/',
    steps: [
      '登录京东账号',
      '进入账号设置',
      '点击"账号安全"',
      '选择"注销账号"',
      '完成身份验证',
      '确认注销申请'
    ],
    notes: [
      '注销前需要完成所有订单',
      '注销后无法恢复账号',
      '建议先处理未完成的交易'
    ]
  },
  {
    id: 'netease',
    name: '网易',
    icon: '🎵',
    officialLink: 'https://reg.163.com/',
    steps: [
      '登录网易账号',
      '进入账号管理',
      '点击"账号安全"',
      '选择"注销账号"',
      '完成身份验证',
      '确认注销操作'
    ],
    notes: [
      '注销前需要解绑所有网易服务',
      '注销后无法恢复账号',
      '建议先备份网易云音乐等重要数据'
    ]
  },
  {
    id: 'sina',
    name: '新浪',
    icon: '📰',
    officialLink: 'https://login.sina.com.cn/',
    steps: [
      '登录新浪账号',
      '进入账号设置',
      '点击"账号安全"',
      '选择"注销账号"',
      '完成身份验证',
      '确认注销申请'
    ],
    notes: [
      '注销前需要解绑所有新浪服务',
      '注销后无法恢复账号',
      '建议先备份重要邮件和博客内容'
    ]
  },
  {
    id: 'sohu',
    name: '搜狐',
    icon: '🦊',
    officialLink: 'https://passport.sohu.com/',
    steps: [
      '登录搜狐账号',
      '进入账号管理',
      '点击"账号安全"',
      '选择"注销账号"',
      '完成身份验证',
      '确认注销操作'
    ],
    notes: [
      '注销前需要解绑所有搜狐服务',
      '注销后无法恢复账号',
      '建议先备份搜狐邮箱等重要数据'
    ]
  },
  {
    id: 'tieba',
    name: '百度贴吧',
    icon: '📋',
    officialLink: 'https://passport.baidu.com/',
    steps: [
      '登录百度账号',
      '进入贴吧设置',
      '点击"账号管理"',
      '选择"注销账号"',
      '完成身份验证',
      '确认注销申请'
    ],
    notes: [
      '注销前需要退出所有贴吧',
      '注销后无法恢复账号',
      '建议先备份重要帖子内容'
    ]
  },
  {
    id: 'bilibili',
    name: '哔哩哔哩',
    icon: '📺',
    officialLink: 'https://passport.bilibili.com/',
    steps: [
      '登录B站账号',
      '进入账号设置',
      '点击"账号安全"',
      '选择"注销账号"',
      '完成身份验证',
      '确认注销操作'
    ],
    notes: [
      '注销前需要解绑所有第三方登录',
      '注销后无法恢复账号',
      '建议先备份重要视频和收藏'
    ]
  },
  {
    id: 'douyin',
    name: '抖音',
    icon: '🎵',
    officialLink: 'https://www.douyin.com/',
    steps: [
      '打开抖音APP',
      '进入"我"页面',
      '点击右上角设置',
      '选择"账号与安全"',
      '点击"注销账号"',
      '完成身份验证'
    ],
    notes: [
      '注销前需要解绑所有第三方账号',
      '注销后无法恢复账号',
      '建议先备份重要视频内容'
    ]
  },
  {
    id: 'xiaohongshu',
    name: '小红书',
    icon: '📖',
    officialLink: 'https://www.xiaohongshu.com/',
    steps: [
      '打开小红书APP',
      '进入"我"页面',
      '点击设置',
      '选择"账号与安全"',
      '点击"注销账号"',
      '完成身份验证'
    ],
    notes: [
      '注销前需要解绑所有第三方账号',
      '注销后无法恢复账号',
      '建议先备份重要笔记内容'
    ]
  },
  {
    id: 'kuaishou',
    name: '快手',
    icon: '⚡',
    officialLink: 'https://www.kuaishou.com/',
    steps: [
      '打开快手APP',
      '进入"我"页面',
      '点击设置',
      '选择"账号与安全"',
      '点击"注销账号"',
      '完成身份验证'
    ],
    notes: [
      '注销前需要解绑所有第三方账号',
      '注销后无法恢复账号',
      '建议先备份重要视频内容'
    ]
  }
]

// 计算属性
const allSelected = computed(() => {
  return selectedPlatforms.value.length === platforms.length
})

const generatedGuides = computed(() => {
  return platforms.filter(platform => selectedPlatforms.value.includes(platform.id))
})

// 方法
const toggleAllPlatforms = () => {
  if (allSelected.value) {
    selectedPlatforms.value = []
  } else {
    selectedPlatforms.value = platforms.map(platform => platform.id)
  }
}

const generateGuide = () => {
  // 重置展开状态
  expandedGuides.value = []
}

const toggleGuide = (guideId) => {
  const index = expandedGuides.value.indexOf(guideId)
  if (index > -1) {
    expandedGuides.value.splice(index, 1)
  } else {
    expandedGuides.value.push(guideId)
  }
}

const expandAll = () => {
  expandedGuides.value = generatedGuides.value.map(guide => guide.id)
}

const collapseAll = () => {
  expandedGuides.value = []
}
</script>

<style scoped>
/* 自定义样式 */
.transition-transform {
  transition: transform 0.2s ease-in-out;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) {
  .grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

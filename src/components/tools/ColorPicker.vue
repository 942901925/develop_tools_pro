<template>
  <div class="space-y-6">
    <!-- 颜色选择器 -->
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">颜色选择器</h3>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">颜色选择</label>
            <input
              v-model="selectedColor"
              type="color"
              class="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">手动输入</label>
            <input
              v-model="hexInput"
              placeholder="#000000"
              class="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              @input="updateFromHex"
            />
          </div>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">RGB值</label>
            <div class="grid grid-cols-3 gap-2">
              <input
                v-model.number="rgb.r"
                type="number"
                min="0"
                max="255"
                placeholder="R"
                class="p-2 border border-gray-300 rounded-lg text-center"
                @input="updateFromRGB"
              />
              <input
                v-model.number="rgb.g"
                type="number"
                min="0"
                max="255"
                placeholder="G"
                class="p-2 border border-gray-300 rounded-lg text-center"
                @input="updateFromRGB"
              />
              <input
                v-model.number="rgb.b"
                type="number"
                min="0"
                max="255"
                placeholder="B"
                class="p-2 border border-gray-300 rounded-lg text-center"
                @input="updateFromRGB"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">HSL值</label>
            <div class="grid grid-cols-3 gap-2">
              <input
                v-model.number="hsl.h"
                type="number"
                min="0"
                max="360"
                placeholder="H"
                class="p-2 border border-gray-300 rounded-lg text-center"
                @input="updateFromHSL"
              />
              <input
                v-model.number="hsl.s"
                type="number"
                min="0"
                max="100"
                placeholder="S"
                class="p-2 border border-gray-300 rounded-lg text-center"
                @input="updateFromHSL"
              />
              <input
                v-model.number="hsl.l"
                type="number"
                min="0"
                max="100"
                placeholder="L"
                class="p-2 border border-gray-300 rounded-lg text-center"
                @input="updateFromHSL"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 颜色预览 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">颜色预览</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="text-center">
          <div class="w-24 h-24 mx-auto rounded-lg border-2 border-gray-300" :style="{ backgroundColor: selectedColor }"></div>
          <div class="text-sm text-gray-600 mt-2">主色</div>
        </div>
        <div class="text-center">
          <div class="w-24 h-24 mx-auto rounded-lg border-2 border-gray-300" :style="{ backgroundColor: lightenColor(selectedColor, 0.3) }"></div>
          <div class="text-sm text-gray-600 mt-2">浅色</div>
        </div>
        <div class="text-center">
          <div class="w-24 h-24 mx-auto rounded-lg border-2 border-gray-300" :style="{ backgroundColor: darkenColor(selectedColor, 0.3) }"></div>
          <div class="text-sm text-gray-600 mt-2">深色</div>
        </div>
        <div class="text-center">
          <div class="w-24 h-24 mx-auto rounded-lg border-2 border-gray-300" :style="{ backgroundColor: selectedColor, opacity: 0.5 }"></div>
          <div class="text-sm text-gray-600 mt-2">半透明</div>
        </div>
      </div>
    </div>

    <!-- 颜色格式转换 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">颜色格式</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700">HEX</span>
            <button @click="copyToClipboard(hexValue)" class="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors">
              复制
            </button>
          </div>
          <div class="p-3 bg-gray-100 rounded-lg font-mono text-sm">{{ hexValue }}</div>
        </div>
        
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700">RGB</span>
            <button @click="copyToClipboard(rgbValue)" class="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors">
              复制
            </button>
          </div>
          <div class="p-3 bg-gray-100 rounded-lg font-mono text-sm">{{ rgbValue }}</div>
        </div>
        
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700">HSL</span>
            <button @click="copyToClipboard(hslValue)" class="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors">
              复制
            </button>
          </div>
          <div class="p-3 bg-gray-100 rounded-lg font-mono text-sm">{{ hslValue }}</div>
        </div>
        
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700">CSS</span>
            <button @click="copyToClipboard(cssValue)" class="px-2 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors">
              复制
            </button>
          </div>
          <div class="p-3 bg-gray-100 rounded-lg font-mono text-sm">{{ cssValue }}</div>
        </div>
      </div>
    </div>

    <!-- 调色板 -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">调色板</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        <div
          v-for="color in colorPalette"
          :key="color"
          class="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"
          :style="{ backgroundColor: color }"
          @click="selectColor(color)"
        ></div>
      </div>
    </div>

    <!-- 颜色历史 -->
    <div v-if="colorHistory.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900">颜色历史</h3>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="(color, index) in colorHistory"
          :key="index"
          class="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer hover:scale-110 transition-transform"
          :style="{ backgroundColor: color }"
          @click="selectColor(color)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const selectedColor = ref('#3B82F6')
const hexInput = ref('#3B82F6')
const rgb = ref({ r: 59, g: 130, b: 246 })
const hsl = ref({ h: 217, s: 91, l: 60 })
const colorHistory = ref([])

const colorPalette = ref([
  '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80',
  '#00FFFF', '#0080FF', '#0000FF', '#8000FF', '#FF00FF', '#FF0080',
  '#000000', '#404040', '#808080', '#C0C0C0', '#FFFFFF', '#800000',
  '#808000', '#008000', '#008080', '#000080', '#800080', '#FFA500'
])

const hexValue = computed(() => {
  return selectedColor.value.toUpperCase()
})

const rgbValue = computed(() => {
  return `rgb(${rgb.value.r}, ${rgb.value.g}, ${rgb.value.b})`
})

const hslValue = computed(() => {
  return `hsl(${hsl.value.h}, ${hsl.value.s}%, ${hsl.value.l}%)`
})

const cssValue = computed(() => {
  return `background-color: ${hexValue.value};`
})

const updateFromHex = () => {
  if (hexInput.value.match(/^#[0-9A-Fa-f]{6}$/)) {
    selectedColor.value = hexInput.value
    updateRGBFromHex(hexInput.value)
    updateHSLFromRGB()
  }
}

const updateFromRGB = () => {
  const hex = rgbToHex(rgb.value.r, rgb.value.g, rgb.value.b)
  selectedColor.value = hex
  hexInput.value = hex
  updateHSLFromRGB()
}

const updateFromHSL = () => {
  const rgbValues = hslToRgb(hsl.value.h, hsl.value.s, hsl.value.l)
  rgb.value = rgbValues
  const hex = rgbToHex(rgbValues.r, rgbValues.g, rgbValues.b)
  selectedColor.value = hex
  hexInput.value = hex
}

const updateRGBFromHex = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  rgb.value = { r, g, b }
}

const updateHSLFromRGB = () => {
  const hslValues = rgbToHsl(rgb.value.r, rgb.value.g, rgb.value.b)
  hsl.value = hslValues
}

const rgbToHex = (r, g, b) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}

const rgbToHsl = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  
  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

const hslToRgb = (h, s, l) => {
  h /= 360
  s /= 100
  l /= 100
  
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }
  
  let r, g, b
  
  if (s === 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

const lightenColor = (color, amount) => {
  const rgb = hexToRgb(color)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  hsl.l = Math.min(100, hsl.l + amount * 100)
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l)
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b)
}

const darkenColor = (color, amount) => {
  const rgb = hexToRgb(color)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  hsl.l = Math.max(0, hsl.l - amount * 100)
  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l)
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b)
}

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

const selectColor = (color) => {
  selectedColor.value = color
  hexInput.value = color
  updateRGBFromHex(color)
  updateHSLFromRGB()
  addToHistory(color)
}

const addToHistory = (color) => {
  if (!colorHistory.value.includes(color)) {
    colorHistory.value.unshift(color)
    if (colorHistory.value.length > 20) {
      colorHistory.value = colorHistory.value.slice(0, 20)
    }
  }
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (e) {
    console.error('复制失败:', e)
  }
}

// 监听颜色变化
watch(selectedColor, (newColor) => {
  updateRGBFromHex(newColor)
  updateHSLFromRGB()
})
</script>

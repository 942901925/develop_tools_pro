# Google AdSense 最简单集成

## ✅ 已完成

只需要在 `index.html` 的 `<head>` 标签中添加了AdSense脚本：

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3896009904827809"
     crossorigin="anonymous"></script>
```

## 🚀 如何添加广告

### 方法1：直接在HTML中添加

在任何需要显示广告的地方，直接添加AdSense代码：

```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-3896009904827809"
     data-ad-slot="你的广告位ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### 方法2：在Vue组件中添加

在Vue组件的模板中直接添加：

```vue
<template>
  <div>
    <!-- 你的内容 -->
    
    <!-- 广告 -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-3896009904827809"
         data-ad-slot="你的广告位ID"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  </div>
</template>

<script>
export default {
  mounted() {
    // 推送广告
    (adsbygoogle = window.adsbygoogle || []).push({});
  }
}
</script>
```

## 📍 建议的广告位置

1. **首页顶部** - 在工具网格上方
2. **首页底部** - 在工具网格下方
3. **工具详情页顶部** - 在工具头部上方
4. **工具详情页底部** - 在工具内容下方

## 🎯 就这么简单！

- ✅ 只需要一个脚本
- ✅ 直接使用AdSense提供的HTML代码
- ✅ 不需要复杂的组件或配置
- ✅ 完全符合Google的标准做法

---

**总结**: 除了添加AdSense脚本，其他所有修改都是不必要的。你可以直接使用Google提供的标准HTML代码来放置广告。

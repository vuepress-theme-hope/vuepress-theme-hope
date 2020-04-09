---
icon: skinfill
category: function
tags:
  - style
  - function
---

# 主题色与夜间模式

vuepress-theme-hope 通过内置 `@mr-hope/vuepress-plugin-theme-color`，实现了主题色与夜间模式功能。

`themeConfig` 中的 `themeColor` 会直接传递给插件作为插件选项。

## 自定义主题色

这是一个开箱即用的功能，除了你的主题色之外，还提供 “蓝、红、绿、橙” 四种颜色主题。

### 禁用功能

你可以将 `themeConfig` 的 `themeColor.picker` 设置为 `false` 来禁用它。

### 自定义颜色

你需要按照 `{ 颜色名1: 颜色值, 颜色名2: 颜色值, ... }` 的格式来配置 `themeConfig.themeColor.picker`：

::: details 例子

```js {5-10}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    themeColor: {
      picker: {
        blue: '#2196f3',
        red: '#f26d6d',
        green: '#3eaf7c',
        orange: '#fb9b5f'
      }
    }
  }
}
```

:::

同时为了使 stylus 编译器正常工作，你还需要将颜色变量赋值给 `$colorPicker` 写入 `.vuepress/styles/palette.styl` 中：

::: details 例子

```stylus
// .vuepress/styles/palette.styl
$colorPicker = {
  red: #f26d6d,
  blue: #2196f3,
  green: #3eaf7c,
  orange: #fb9b5f
}
```

:::

## 深色模式

默认为 `'auto'` (自动) 模式，可以将 `themeConfig` 中的 `themeColor.darkmode` 设置为 `'disable'` 来禁用深色模式，也可以设置为 `'switch'` 来允许用户手动切换。

在深色模式下，页面会使用黑色背景以保护您的眼睛。

![深色模式](./assets/darkmode.png)

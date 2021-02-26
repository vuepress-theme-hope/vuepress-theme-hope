---
title: 主题色
icon: skin
category: interface
tags:
  - themecolor
---

这是一个开箱即用的功能，除了你的主题色之外，还提供 “红、蓝、绿、橙、紫” 五种颜色主题。你也可以定制自己的主题色选择列表。

## 禁用功能

你可以将 `themeConfig` 的 `themeColor` 设置为 `false` 来禁用它。

## 自定义颜色

你需要按照 `{ 颜色名1: 颜色值, 颜色名2: 颜色值, ... }` 的格式来配置 `themeConfig.themeColor`:

::: details 例子

```js {5-10}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    themeColor: {
      blue: "#2196f3",
      red: "#f26d6d",
      green: "#3eaf7c",
      orange: "#fb9b5f",
    },
  },
};
```

:::

同时为了使 Stylus 编译器正常工作，你还需要将颜色变量赋值给 `$colorPicker` 写入 `.vuepress/styles/palette.styl` 中:

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

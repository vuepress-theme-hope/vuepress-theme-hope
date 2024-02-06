---
title: 指南
icon: lightbulb
index: false
---

## 大小优化

这个插件完全支持 tree-shaking。

这意味着你可以自由选择你喜欢的任何组件，并不捆绑其他组件。

例如，如果你使用 `{ components: ['VidStack'] }` 调用此插件，则仅注入 `<VidStack />` 组件。

## 搭配增强语法

我们推荐你搭配 [md-enhance component 语法](https://plugin-md-enhance.vuejs.press/zh/guide/content/component.html) 使用插件。

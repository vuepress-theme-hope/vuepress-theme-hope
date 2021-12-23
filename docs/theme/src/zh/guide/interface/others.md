---
title: 其他界面功能
icon: others
category: interface
tags:
  - interface
---

## 样式定制

主题允许你在 `.vuepress/style` 的 `palette.styl` 设置变量，来定制绝大部分颜色、响应式断点，页面布局尺寸等参数。

详细的参数详见 [Stylus 配置](../../config/stylus.md)

## 全屏按钮

默认启用，显示在导航栏的主题选项卡中。

如果你不需要这个功能，你可以在主题配置中将 `fullscreen` 设置为 `false`。

::: tip

如果当前浏览器不支持全屏，则全屏按钮会自动隐藏。

:::

<CodeGroup>
<CodeGroupItem title="js">

```js {6}
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    fullscreen: false, // Enable by default
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts {6}
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    fullscreen: false, // Enable by default
  },
});
```

</CodeGroupItem>
</CodeGroup>

## 返回顶部按钮 <Badge text="支持页面配置" />

`vuepress-theme-hope` 添加了一个返回顶部控件，默认情况下将在下滑 300px 后显示。

你可以在 `themeConfig` 将 `backToTop` 设置为 `false` 来禁用它，或者是设置为一个数字以更改默认的 300px 触发时机。

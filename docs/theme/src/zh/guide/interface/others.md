---
title: 其他界面功能
icon: others
category:
  - 界面
tag:
  - 界面
---

## 样式定制

主题允许你在 `.vuepress/style` 的 `config.scss` 和 `palette.scss` 设置变量，来定制绝大部分颜色、响应式断点，页面布局尺寸等参数。

详细的参数详见 [配置 → 样式自定义](../../config/style.md)。

## 全屏按钮

默认启用，显示在导航栏的外观选项卡中。

如果你不需要这个功能，你可以在主题配置中将 `fullscreen` 设置为 `false`。

::: tip

如果当前浏览器不支持全屏，则全屏按钮会自动隐藏。

:::

:::: code-group

::: code-group-item TS

```ts {7}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    // 默认启用
    fullscreen: false,
  },
});
```

:::

::: code-group-item JS

```js {7}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    // 默认启用
    fullscreen: false,
  },
});
```

:::

::::

## 返回顶部按钮

`vuepress-theme-hope` 添加了一个返回顶部控件，默认情况下将在下滑 300px 后显示。

你可以在 `themeConfig` 将 `backToTop` 设置为 `false` 来禁用它，或者是设置为一个数字以更改默认的触发距离。

---
title: 其他界面功能
icon: ellipsis
order: 5
category:
  - 界面
tag:
  - 界面
---

## 样式定制

主题允许你在 `.vuepress/styles/config.scss` 和 `.vuepress/styles/palette.scss` 中设置变量，来定制绝大部分颜色、响应式断点，页面布局尺寸等参数。

详细的参数详见 [配置 → 样式自定义](../../config/style.md)。

## 打印按钮

试一试: <PrintButton />

主题对打印样式进行了全面优化，默认在桌面模式的目录下会有一个打印按钮。

要隐藏打印按钮，你应该在主题选项中设置 `print: false`。

## 全屏按钮

<ToggleFullScreenButton />

如果你需要这个功能，你可以在主题选项中设置 `fullscreen: true`。

::: tip

如果当前浏览器不支持全屏，则全屏按钮会自动隐藏。

:::

::: code-tabs#language

@tab TS

```ts {7}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    fullscreen: true,
  }),
});
```

@tab JS

```js {7}
// .vuepress/config.js
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    fullscreen: true,
  }),
});
```

:::

## 返回顶部按钮

`vuepress-theme-hope` 添加了一个返回顶部控件，默认情况下将在下滑 300px 后显示。

你可以在主题选项中设置 `backToTop: false` 来禁用它，或者是设置为一个数字以更改默认的触发距离。

## RTL 布局

`vuepress-theme-hope` 完全支持 RTL 布局。只需在 RTL 多语言配置内设置 `rtl: false`

试一试: <ToggleRTLButton />

<script setup lang="ts">
import PrintButton from "@theme-hope/modules/info/components/PrintButton";
import ToggleRTLButton from "@ToggleRTLButton";
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton";
</script>

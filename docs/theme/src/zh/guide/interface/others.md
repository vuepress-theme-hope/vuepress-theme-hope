---
title: 其他界面功能
icon: ellipsis
order: 7
category:
  - 界面
tag:
  - 界面
---

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

`vuepress-theme-hope` 添加了一个带进度条的返回顶部按钮，默认向下滚动 100px 后显示。

你可以在主题选项中设置 `backToTop: false` 来禁用它，或者用一个对象来设置它来自定义它的阈值距离和进度条显示：

```ts
interface BackToTopOptions {
  /**
   * 显示返回顶部按钮的滚动阈值距离（以像素为单位）
   *
   * @default 100
   */
  threshold?: number;

  /**
   * 是否显示滚动进度
   *
   * @default true
   */
  progress?: boolean;
}
```

## RTL 布局

`vuepress-theme-hope` 完全支持 RTL 布局。只需在 RTL 多语言配置内设置 `rtl: true`

试一试: <ToggleRTLButton />

<script setup lang="ts">
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton";
import PrintButton from "@theme-hope/modules/info/components/PrintButton";
import ToggleRTLButton from "@ToggleRTLButton";
</script>

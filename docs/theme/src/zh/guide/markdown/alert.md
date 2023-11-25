---
title: GFM 警告
icon: box-open
category:
  - Markdown
tag:
  - Markdown
  - 警告
---

主题可以提供 GFM 警告支持。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-11}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用 GFM 警告
        alert: true,
      },
    },
  }),
});
```

@tab JS

```js {7-10}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用 GFM 警告
        alert: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/stylize/alert.md#after -->

---
title: 属性支持
icon: code
category:
  - Markdown
tag:
  - Markdown
  - 属性
---

你可以使用特殊标记为 Markdown 元素添加属性。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        attrs: true,
      },
    },
  }),
});
```

@tab JS

```js {8}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        attrs: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/stylize/attrs.md#after -->

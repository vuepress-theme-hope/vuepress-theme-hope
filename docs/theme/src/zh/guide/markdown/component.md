---
title: 组件语法
icon: puzzle-piece
category:
  - Markdown
tag:
  - Markdown
  - 对齐
---

你可以在 Markdown 中通过 component 代码块快速添加组件。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        component: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        component: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/content/component.md#after -->

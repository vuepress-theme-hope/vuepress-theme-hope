---
title: Component
icon: puzzle-piece
order: 3
category:
  - 组件
tag:
  - 组件
  - Markdown
---

你可以在 Markdown 中通过 component 代码块快速添加组件。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-10} title=".vuepress/config.ts"
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

```js {7-9} title=".vuepress/config.js"
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

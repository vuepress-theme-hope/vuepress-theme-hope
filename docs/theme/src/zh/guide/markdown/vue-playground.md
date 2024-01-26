---
title: Vue 交互演示
icon: fab fa-vuejs
category:
  - Markdown
tag:
  - Markdown
  - 交互演示
---

<!-- @include: @md-enhance/zh/guide/code/vue-playground.md#before -->

::: code-tabs#language

@tab TS

```ts {9} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用 vue 交互演示
        vuePlayground: true,
      },
    },
  }),
});
```

@tab JS

```js {8} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用 vue 交互演示
        vuePlayground: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/code/vue-playground.md#after -->

---
title: Vue 交互演示
icon: fab fa-vuejs
---

<!-- @include: @md-enhance/zh/guide/code/vue-playground.md#before -->

::: code-tabs#config

@tab TS

```ts {10}
// .vuepress/config.ts
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

```js {10}
// .vuepress/config.js
import { mdEnhance } from "vuepress-plugin-md-enhance";

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

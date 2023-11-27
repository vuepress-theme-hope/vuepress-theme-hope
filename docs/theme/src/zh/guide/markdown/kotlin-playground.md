---
title: Kotlin 交互演示
icon: fab fa-kickstarter
category:
  - Markdown
tag:
  - Markdown
  - 交互演示
---

<!-- @include: @md-enhance/zh/guide/code/kotlin-playground.md#before -->

::: code-tabs#language

@tab TS

```ts {10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用 kotlin 交互演示
        kotlinPlayground: true,
      },
    },
  }),
});
```

@tab JS

```js {9}
// .vuepress/config.js
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用 kotlin 交互演示
        kotlinPlayground: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/code/kotlin-playground.md#after -->

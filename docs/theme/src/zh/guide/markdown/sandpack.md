---
title: Sandpack 交互演示
icon: code
category:
  - Markdown
tag:
  - Markdown
  - Playground
---

<!-- @include: @md-enhance/zh/guide/code/sandpack.md#before -->

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
        // 启用 Sandpack 交互演示
        sandpack: true,
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
        // 启用 Sandpack 交互演示
        sandpack: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/code/sandpack.md#after -->

---
title: Mermaid
icon: chart-pie
category:
  - Markdown
tag:
  - Markdown
  - 图表
---

<!-- @include: @md-enhance/zh/guide/chart/mermaid.md#before -->

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
        mermaid: true,
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
        mermaid: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/chart/mermaid.md#after -->

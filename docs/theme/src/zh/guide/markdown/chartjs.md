---
title: Chart.js
icon: chart-simple
category:
  - Markdown
tag:
  - 图表
  - Markdown
---

<!-- @include: @md-enhance/zh/guide/chart/chartjs.md#before -->

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
        chart: true,
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
        chart: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/chart/chartjs.md#after -->

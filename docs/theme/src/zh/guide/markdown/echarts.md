---
title: ECharts
icon: chart-simple
category:
  - Markdown
tag:
  - ECharts
  - Markdown
---

<!-- @include: @md-enhance/zh/guide/chart/echarts.md#before -->

::: code-tabs#language

@tab TS

```ts {8-10} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        echarts: true,
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
        echarts: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/zh/guide/chart/echarts.md#after -->

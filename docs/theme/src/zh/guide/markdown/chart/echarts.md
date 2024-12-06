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

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      echarts: true,
    },
  }),
});
```

<!-- @include: @md-enhance/zh/guide/chart/echarts.md#after -->

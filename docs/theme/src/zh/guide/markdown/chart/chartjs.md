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

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      chart: true,
    },
  }),
});
```

<!-- @include: @md-enhance/zh/guide/chart/chartjs.md#after -->

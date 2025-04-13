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

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    chartjs: true,
  },
});
```

<!-- @include: @md-enhance/zh/guide/chart/chartjs.md#after -->

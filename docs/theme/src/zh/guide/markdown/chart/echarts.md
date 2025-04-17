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

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    echarts: true,
  },
});
```

<!-- @include: @md-enhance/zh/guide/chart/echarts.md#after -->

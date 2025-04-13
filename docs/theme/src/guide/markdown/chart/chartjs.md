---
title: Chart.js
icon: chart-simple
category:
  - Markdown
tag:
  - Chart
  - Markdown
---

<!-- @include: @md-enhance/guide/chart/chartjs.md#before -->

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    chartjs: true,
  },
});
```

<!-- @include: @md-enhance/guide/chart/chartjs.md#after -->

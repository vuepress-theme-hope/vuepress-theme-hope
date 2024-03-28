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

```js {7} title=".vuepress/config.js"
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

<!-- @include: @md-enhance/zh/guide/chart/chartjs.md#after -->

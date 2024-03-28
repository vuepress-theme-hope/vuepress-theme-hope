---
title: ECharts
icon: chart-simple
category:
  - Markdown
tag:
  - ECharts
  - Markdown
---

```js {7} title=".vuepress/config.js"
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

<!-- @include: @md-enhance/zh/guide/chart/echarts.md#after -->

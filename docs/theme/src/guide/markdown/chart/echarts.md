---
title: ECharts
icon: chart-simple
category:
  - Markdown
tag:
  - ECharts
  - Markdown
---

<!-- @include: @md-enhance/guide/chart/echarts.md#before -->

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

<!-- @include: @md-enhance/guide/chart/echarts.md#after -->

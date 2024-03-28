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

<!-- @include: @md-enhance/guide/chart/chartjs.md#after -->

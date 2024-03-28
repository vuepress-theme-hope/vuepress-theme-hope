---
title: Mermaid
icon: chart-pie
category:
  - Markdown
tag:
  - Markdown
  - 图表
---

<!-- @include: @md-enhance/zh/guide/chart/mermaid.md#before -->

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        mermaid: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/zh/guide/chart/mermaid.md#after -->

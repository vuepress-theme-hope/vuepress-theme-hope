---
title: 流程图
icon: route
category:
  - Markdown
tag:
  - Markdown
  - 流程图
---

<!-- @include: @md-enhance/zh/guide/chart/flowchart.md#before -->

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        flowchart: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/zh/guide/chart/flowchart.md#after -->

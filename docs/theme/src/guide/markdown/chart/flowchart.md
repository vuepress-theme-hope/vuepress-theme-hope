---
title: Flowchart
icon: route
category:
  - Markdown
tag:
  - Flowchart
  - Markdown
---

<!-- @include: @md-enhance/guide/chart/flowchart.md#before -->

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

<!-- @include: @md-enhance/guide/chart/flowchart.md#after -->

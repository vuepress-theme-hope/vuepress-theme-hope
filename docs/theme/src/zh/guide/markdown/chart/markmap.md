---
title: 思维导图
icon: fab fa-markdown
category:
  - Markdown
tag:
  - Markdown
  - 图表
---

<!-- @include: @md-enhance/zh/guide/chart/markmap.md#before -->

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        markmap: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/zh/guide/chart/markmap.md#after -->

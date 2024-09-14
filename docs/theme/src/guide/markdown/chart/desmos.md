---
title: Desmos
icon: fa-solid fa-chart-area
category:
  - Markdown
tag:
  - Desmos
  - Markdown
---

<!-- @include: @md-enhance/guide/chart/desmos.md#before -->

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        desmos: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/guide/chart/desmos.md#after -->

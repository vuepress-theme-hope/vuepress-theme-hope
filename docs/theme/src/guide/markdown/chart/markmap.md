---
title: Markmap
icon: fab fa-markdown
category:
  - Markdown
tag:
  - Diagram
  - Markdown
---

<!-- @include: @md-enhance/guide/chart/markmap.md#before -->

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

<!-- @include: @md-enhance/guide/chart/markmap.md#after -->

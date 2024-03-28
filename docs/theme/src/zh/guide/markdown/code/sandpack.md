---
title: Sandpack 交互演示
icon: code
category:
  - Markdown
tag:
  - Markdown
  - Playground
---

<!-- @include: @md-enhance/zh/guide/code/sandpack.md#before -->

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        sandpack: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/zh/guide/code/sandpack.md#after -->

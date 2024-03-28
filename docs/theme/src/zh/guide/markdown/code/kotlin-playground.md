---
title: Kotlin 交互演示
icon: fab fa-kickstarter
category:
  - Markdown
tag:
  - Markdown
  - 交互演示
---

<!-- @include: @md-enhance/zh/guide/code/kotlin-playground.md#before -->

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        kotlinPlayground: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/zh/guide/code/kotlin-playground.md#after -->

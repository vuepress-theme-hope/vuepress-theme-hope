---
title: Kotlin Playground
icon: fab fa-kickstarter
category:
  - Markdown
tag:
  - Markdown
  - Playground
---

Let the Markdown file support kotlin playground in your VuePress site.

<!-- more -->

<!-- @include: @md-enhance/guide/code/kotlin-playground.md#settings -->

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

<!-- @include: @md-enhance/guide/code/kotlin-playground.md#after -->

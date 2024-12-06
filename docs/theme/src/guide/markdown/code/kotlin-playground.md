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

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      kotlinPlayground: true,
    },
  }),
});
```

<!-- @include: @md-enhance/guide/code/kotlin-playground.md#after -->

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

<!-- @include: @md-enhance/zh/guide/code/kotlin-playground.md#after -->

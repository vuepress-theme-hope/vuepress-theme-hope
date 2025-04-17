---
title: Kotlin 交互演示
icon: b:kickstarter
category:
  - Markdown
tag:
  - Markdown
  - 交互演示
---

<!-- @include: @md-enhance/zh/guide/code/kotlin-playground.md#settings -->

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    kotlinPlayground: true,
  },
});
```

<!-- @include: @md-enhance/zh/guide/code/kotlin-playground.md#after -->

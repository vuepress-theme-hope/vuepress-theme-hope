---
title: Kotlin Playground
icon: b:kickstarter
category:
  - Markdown
tag:
  - Markdown
  - Playground
---

Let the Markdown file support kotlin playground in your VuePress site.

<!-- more -->

<!-- @include: @md-enhance/guide/code/kotlin-playground.md#settings -->

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    kotlinPlayground: true,
  },
});
```

<!-- @include: @md-enhance/guide/code/kotlin-playground.md#after -->

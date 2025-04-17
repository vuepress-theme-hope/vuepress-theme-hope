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

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    sandpack: true,
  },
});
```

<!-- @include: @md-enhance/zh/guide/code/sandpack.md#after -->

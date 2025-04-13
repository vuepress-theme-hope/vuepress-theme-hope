---
title: Markmap
icon: b:markdown
category:
  - Markdown
tag:
  - Diagram
  - Markdown
---

<!-- @include: @md-enhance/guide/chart/markmap.md#before -->

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    markmap: true,
  },
});
```

<!-- @include: @md-enhance/guide/chart/markmap.md#after -->

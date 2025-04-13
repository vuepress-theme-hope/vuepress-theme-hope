---
title: Mermaid
icon: chart-pie
category:
  - Markdown
tag:
  - Markdown
  - 图表
---

<!-- @include: @md-enhance/zh/guide/chart/mermaid.md#before -->

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    mermaid: true,
  },
});
```

<!-- @include: @md-enhance/zh/guide/chart/mermaid.md#after -->

---
title: Mermaid
icon: chart-pie
category:
  - Markdown
tag:
  - Diagram
  - Markdown
---

<!-- @include: @md-enhance/guide/chart/mermaid.md#before -->

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      mermaid: true,
    },
  }),
});
```

<!-- @include: @md-enhance/guide/chart/mermaid.md#after -->

---
title: Flowchart
icon: route
category:
  - Markdown
tag:
  - Flowchart
  - Markdown
---

<!-- @include: @md-enhance/guide/chart/flowchart.md#before -->

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      flowchart: true,
    },
  }),
});
```

<!-- @include: @md-enhance/guide/chart/flowchart.md#after -->

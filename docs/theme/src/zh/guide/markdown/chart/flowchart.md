---
title: 流程图
icon: route
category:
  - Markdown
tag:
  - Markdown
  - 流程图
---

<!-- @include: @md-enhance/zh/guide/chart/flowchart.md#before -->

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

<!-- @include: @md-enhance/zh/guide/chart/flowchart.md#after -->

---
title: Plantuml
icon: diagram-project
category:
  - Markdown
tag:
  - Markdown
  - 图表
---

<!-- @include: @md-enhance/zh/guide/chart/plantuml.md#before -->

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      plantuml: true,
    },
  }),
});
```

<!-- @include: @md-enhance/zh/guide/chart/plantuml.md#after -->

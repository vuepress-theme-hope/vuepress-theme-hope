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

```ts twoslash {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      markmap: true,
    },
  }),
});
```

<!-- @include: @md-enhance/guide/chart/markmap.md#after -->

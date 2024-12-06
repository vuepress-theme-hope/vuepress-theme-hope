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

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      sandpack: true,
    },
  }),
});
```

<!-- @include: @md-enhance/zh/guide/code/sandpack.md#after -->

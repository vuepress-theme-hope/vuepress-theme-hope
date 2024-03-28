---
title: Code Tabs
icon: code
category:
  - Markdown
tag:
  - Code Tabs
  - Markdown
---

The theme provides you code tabs support.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        codetabs: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/guide/code/code-tabs.md#after -->

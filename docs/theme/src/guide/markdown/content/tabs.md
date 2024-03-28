---
title: Tabs
icon: table-columns
category:
  - Markdown
tag:
  - Markdown
  - Tabs
---

Let the Markdown file in your VuePress site support tabs.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tabs: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/guide/content/tabs.md#after -->

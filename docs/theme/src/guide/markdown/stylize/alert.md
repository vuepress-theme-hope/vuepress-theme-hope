---
title: GFM alert
icon: bell
category:
  - Markdown
tag:
  - alert
  - Markdown
---

The theme adds GFM alerts support.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        alert: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/guide/stylize/alert.md#after -->

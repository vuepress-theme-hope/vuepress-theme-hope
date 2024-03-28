---
title: Custom alignment
icon: align-center
category:
  - Markdown
tag:
  - Align
  - Markdown
---

Customize content alignment.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        align: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/guide/stylize/align.md#after -->

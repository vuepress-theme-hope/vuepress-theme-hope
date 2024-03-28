---
title: Attrs support
icon: code
category:
  - Markdown
tag:
  - Attributes
  - Markdown
---

You can use custom syntax to add attrs for Markdown content.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        attrs: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/guide/stylize/attrs.md#after -->

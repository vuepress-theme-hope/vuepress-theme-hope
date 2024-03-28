---
title: Image
icon: image
category:
  - Markdown
tag:
  - Markdown
  - Image
---

Improve image syntax in Markdown to support color scheme and size.

<!-- more -->

## Settings

```js {8,10,12,14} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // Enable figure
        figure: true,
        // Enable image lazyload
        imgLazyload: true,
        // Enable image mark
        imgMark: true,
        // Enable image size
        imgSize: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/guide/grammar/image.md#after -->

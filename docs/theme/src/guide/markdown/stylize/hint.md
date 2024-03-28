---
title: Hint box
icon: box-open
category:
  - Markdown
tag:
  - hintbox
  - Markdown
---

The theme adds tip, note, info, warning, danger and detail hint box.

<!-- more -->

## Settings

```js {8} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // this is the default option, so you can use this feature directly
        hint: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/guide/stylize/hint.md#after -->

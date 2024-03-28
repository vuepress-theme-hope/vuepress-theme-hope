---
title: Footnote
icon: quote-left
category:
  - Markdown
tag:
  - Footnote
  - Markdown
---

Let the Markdown file in your VuePress site support footnotes.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        footnote: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/guide/content/footnote.md#after -->

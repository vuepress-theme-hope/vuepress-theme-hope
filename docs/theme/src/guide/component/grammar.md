---
title: Component
icon: puzzle-piece
order: 3
category:
  - Component
tag:
  - Component
  - Markdown
---

You can easily insert components in Markdown content with component code block.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        components: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/guide/content/component.md#after -->

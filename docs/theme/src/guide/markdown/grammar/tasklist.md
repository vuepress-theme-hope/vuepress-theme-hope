---
title: Task list
icon: square-check
category:
  - Markdown
tag:
  - Markdown
  - Task List
---

Let the Markdown file in your VuePress site support task list.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tasklist: true,
      },
    },
  }),
};
```

<!-- @include: @md-enhance/guide/grammar/tasklist.md#after -->

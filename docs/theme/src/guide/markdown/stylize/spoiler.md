---
title: Spoiler
icon: eraser
category:
  - Markdown
tag:
  - Markup
  - Markdown
---

Hide spoiler contents in your VuePress site.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        spoiler: true,
      },
    },
  }),
};
```

## Syntax

Use `!! !!` to mark a content as spoiler.

::: md-demo Demo

VuePress Theme Hope is !!powerful!!.

:::

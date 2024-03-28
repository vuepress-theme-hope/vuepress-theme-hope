---
title: Markup
icon: highlighter
category:
  - Markdown
tag:
  - Markup
  - Markdown
---

Make Markdown files in your VuePress site support markup.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        mark: true,
      },
    },
  }),
};
```

## Syntax

Use `== ==` to mark.

::: md-demo Demo

VuePress Theme Hope is ==powerful==.

:::

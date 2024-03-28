---
title: Markup
icon: highlighter
---

Make Markdown files in your VuePress site support markup.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // enable markup
      mark: true,
    }),
  ],
};
```

## Syntax

Use `== ==` to mark.

::: md-demo Demo

VuePress Theme Hope is ==powerful==.

:::

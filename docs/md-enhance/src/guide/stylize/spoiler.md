---
title: Spoiler
icon: eraser
---

Hide spoiler contents in your VuePress site.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // enable spoiler
      spoiler: true,
    }),
  ],
};
```

## Syntax

Use `!! !!` to mark a content as spoiler.

::: md-demo Demo

VuePress Theme Hope is !!powerful!!.

:::

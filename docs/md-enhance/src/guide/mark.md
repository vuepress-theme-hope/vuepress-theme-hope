---
title: Markup
icon: write
---

Make Markdown files in your VuePress site support markup.

<!-- more -->

## Configuration

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // enable markup
      mark: true,
    }),
  ],
};
```

:::

::: code-group-item JS

```js {8}
// .vuepress/config.js
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhance({
      // enable markup
      mark: true,
    }),
  ],
};
```

:::

::::

## Syntax

Use `== ==` to mark.

## Demo

VuePress Theme Hope is ==powerfull==.

```md
VuePress Theme Hope is ==powerfull==.
```

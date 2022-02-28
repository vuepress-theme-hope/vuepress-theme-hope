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
import { mdEhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEhance({
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
const { mdEhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEhance({
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

Mr. Hope is ==handsome==.

```md
Mr. Hope is ==handsome==.
```

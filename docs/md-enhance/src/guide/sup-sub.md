---
title: Superscript and Subscript
icon: superscript
---

Let the Markdown file in your VuePress site support Subscript and Superscript.

<!-- more -->

## Configuration

:::: code-group

::: code-group-item TS

```ts {8,10}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // Enable Subscript
      sub: true,
      // Enable  Superscript
      sup: true,
    }),
  ],
};
```

:::

::: code-group-item JS

```js {8,10}
// .vuepress/config.js
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhance({
      // Enable Subscript
      sub: true,
      // Enable  Superscript
      sup: true,
    }),
  ],
};
```

:::

::::

## Syntax

- Use `^ ^` to mark the superscript.
- Use `~ ~` to mark the subscript.

## Demo

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```

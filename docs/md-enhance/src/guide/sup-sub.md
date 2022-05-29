---
title: Superscript and Subscript
icon: superscript
---

Let the Markdown file in your VuePress site support Subscript and Superscript.

<!-- more -->

## Config

::: code-tabs#language

@tab TS

```ts {8,10}
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable Subscript
      sub: true,
      // Enable  Superscript
      sup: true,
    }),
  ],
};
```

@tab JS

```js {8,10}
// .vuepress/config.js
const { mdEnhancePlugin } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhancePlugin({
      // Enable Subscript
      sub: true,
      // Enable  Superscript
      sup: true,
    }),
  ],
};
```

:::

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

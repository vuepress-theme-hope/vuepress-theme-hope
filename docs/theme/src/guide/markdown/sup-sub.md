---
title: Superscript and Subscript
icon: superscript
category:
  - Markdown
tag:
  - Markdown
  - Superscript
  - Subscript
---

Let the Markdown file in your VuePress site support Subscript and Superscript.

<!-- more -->

## Config

:::: code-group

::: code-group-item TS

```ts {7-12}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        // Enable Subscript
        sub: true,
        // Enable  Superscript
        sup: true,
      },
    },
  },
});
```

:::

::: code-group-item JS

```js {7-12}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        // Enable Subscript
        sub: true,
        // Enable  Superscript
        sup: true,
      },
    },
  },
});
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

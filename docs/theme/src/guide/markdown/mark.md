---
title: Markup
icon: write
index: 7
category:
  - Markdown
tag:
  - Markup
  - Markdown
---

Make Markdown files in your VuePress site support markup.

<!-- more -->

## Config

:::: code-group

::: code-group-item TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        mark: true,
      },
    },
  }),
});
```

:::

::: code-group-item JS

```js {7-9}
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        mark: true,
      },
    },
  }),
};
```

:::

::::

## Syntax

Use `== ==` to mark.

## Demo

VuePress Theme Hope is ==powerful==.

```md
VuePress Theme Hope is ==powerful==.
```

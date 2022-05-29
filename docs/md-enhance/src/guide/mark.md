---
title: Markup
icon: write
---

Make Markdown files in your VuePress site support markup.

<!-- more -->

## Config

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
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

@tab JS

```js {8}
// .vuepress/config.js
const { mdEnhancePlugin } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhancePlugin({
      // enable markup
      mark: true,
    }),
  ],
};
```

:::

## Syntax

Use `== ==` to mark.

## Demo

VuePress Theme Hope is ==powerful==.

```md
VuePress Theme Hope is ==powerful==.
```

---
title: Markup
icon: write
category:
  - markdown
tag:
  - markup
  - markdown
---

Make Markdown files in your VuePress site support markup.

<!-- more -->

## Configuration

:::: code-group

::: code-group-item TS

```ts {7-9}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        mark: true,
      },
    },
  },
});
```

:::

::: code-group-item JS

```js {7-9}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        mark: true,
      },
    },
  },
});
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

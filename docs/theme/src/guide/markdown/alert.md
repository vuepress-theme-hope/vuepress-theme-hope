---
title: GFM alert
icon: bell
category:
  - Markdown
tag:
  - alert
  - Markdown
---

The theme adds GFM alerts support.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8-11} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // enable GFM alert
        alert: true,
      },
    },
  }),
});
```

@tab JS

```js {7-10} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // enable GFM alert
        alert: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/stylize/alert.md#after -->

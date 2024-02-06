---
title: Hint box
icon: box-open
category:
  - Markdown
tag:
  - hintbox
  - Markdown
---

The theme adds tip, note, info, warning, danger and detail hint box.

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
        // this is the default option, so you can use it directly
        hint: true,
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
        // this is the default option, so you can use it directly
        hint: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/stylize/hint.md#after -->

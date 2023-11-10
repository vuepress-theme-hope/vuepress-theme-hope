---
title: Custom container
icon: box-open
category:
  - Markdown
tag:
  - Container
  - Markdown
---

The theme adds tip, note, info, warning, danger and detail container.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8-11}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // this is the default option, so you can use it directly
        container: true,
      },
    },
  }),
});
```

@tab JS

```js {7-10}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // this is the default option, so you can use it directly
        container: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/stylize/container.md#after -->

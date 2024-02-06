---
title: Attrs support
icon: code
category:
  - Markdown
tag:
  - Attributes
  - Markdown
---

You can use custom syntax to add attrs for Markdown content.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        attrs: true,
      },
    },
  }),
});
```

@tab JS

```js {8} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        attrs: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/stylize/attrs.md#after -->

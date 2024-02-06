---
title: Tabs
icon: table-columns
order: 2
category:
  - Markdown
tag:
  - Markdown
  - Tabs
---

Let the Markdown file in your VuePress site support tabs.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8-10} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tabs: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        tabs: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/content/tabs.md#after -->

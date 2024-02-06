---
title: Component
icon: puzzle-piece
order: 3
category:
  - Component
tag:
  - Component
  - Markdown
---

You can easily insert components in Markdown content with component code block.

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
        components: true,
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
        components: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/content/component.md#after -->

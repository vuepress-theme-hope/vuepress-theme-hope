---
title: Component
icon: puzzle-piece
category:
  - Markdown
tag:
  - Component
  - Markdown
---

You can add easily components in Markdown content.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
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

```js {7-9}
// .vuepress/config.js
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

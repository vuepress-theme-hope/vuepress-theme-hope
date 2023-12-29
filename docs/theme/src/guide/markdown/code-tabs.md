---
title: Code Tabs
icon: code
order: 3
category:
  - Markdown
tag:
  - Code Tabs
  - Markdown
---

The theme provides you code tabs support.

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
        codetabs: true,
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
        codetabs: true,
      },
    },
  }),
};
```

:::

## Usage

This is the same as [tabs feature](./tabs.md), but it's special built for code blocks.

<!-- @include: @md-enhance/guide/code/code-tabs.md#after -->

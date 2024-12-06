---
title: Spoiler
icon: eraser
category:
  - Markdown
tag:
  - Markup
  - Markdown
---

Hide spoiler contents in your VuePress site.

<!-- more -->

## Settings

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      spoiler: true,
    },
  }),
});
```

## Syntax

Use `!! !!` to mark a content as spoiler.

::: md-demo Demo

VuePress Theme Hope is !!powerful!!.

:::

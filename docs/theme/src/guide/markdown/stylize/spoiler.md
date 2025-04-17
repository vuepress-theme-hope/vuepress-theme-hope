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

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    spoiler: true,
  },
});
```

## Syntax

Use `!! !!` to mark a content as spoiler.

::: md-demo Demo

VuePress Theme Hope is !!powerful!!.

:::

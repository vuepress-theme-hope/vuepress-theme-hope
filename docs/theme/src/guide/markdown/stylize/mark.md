---
title: Mark
icon: highlighter
category:
  - Markdown
tag:
  - Mark
  - Markdown
---

Highlight content with `<mark>` tag in your VuePress site.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    mark: true,
  },
});
```

## Syntax

Use `== ==` to mark.

::: md-demo Demo

VuePress Theme Hope is ==powerful==.

:::

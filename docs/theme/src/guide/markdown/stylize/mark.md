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

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      mark: true,
    },
  }),
});
```

## Syntax

Use `== ==` to mark.

::: md-demo Demo

VuePress Theme Hope is ==powerful==.

:::

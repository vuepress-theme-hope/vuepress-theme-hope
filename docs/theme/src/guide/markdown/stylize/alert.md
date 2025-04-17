---
title: GFM alert
icon: bell
category:
  - Markdown
tag:
  - alert
  - Markdown
---

The theme adds GFM alerts support.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    alert: true,
  },
});
```

## Demo

<!-- markdownlint-disable MD028 -->

::: md-demo Alert demo

> [!important]
> This is important text

> [!info]
> This is information text

> [!tip]
> This is tip text

> [!warning]
> This is warning text

> [!caution]
> This is caution text

> [!note]
> This is note text

:::

<!-- markdownlint-enable MD028 -->

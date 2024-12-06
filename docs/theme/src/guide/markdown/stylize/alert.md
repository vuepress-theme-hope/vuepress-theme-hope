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

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      alert: true,
    },
  }),
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

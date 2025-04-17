---
title: Code Demo
icon: splotch
category:
  - Markdown
tag:
  - Code Demo
  - Markdown
---

Let you insert code demos in your Markdown file.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    demo: true,
  },
});
```

<!-- @include: @md-enhance/guide/code/demo/README.md#syntax -->

::: tip

The json block is optional, for config please see [config](../../../config/markdown/code.md#demo).

:::

The plugin support three types:

- normal
- vue
- react

:::: code-tabs

@tab Normal

<!-- @include: @md-enhance/guide/code/demo/normal.md#syntax -->

@tab Vue

<!-- @include: @md-enhance/guide/code/demo/vue.md#syntax -->

@tab React

<!-- @include: @md-enhance/guide/code/demo/react.md#syntax -->

::::

<!-- @include: @md-enhance/guide/code/demo/README.md#language -->

## Demo

<!-- @include: @md-enhance/guide/code/demo/normal.md#demo -->
<!-- @include: @md-enhance/guide/code/demo/vue.md#demo -->
<!-- @include: @md-enhance/guide/code/demo/react.md#demo -->
<!-- @include: @md-enhance/guide/code/demo/README.md#demo -->

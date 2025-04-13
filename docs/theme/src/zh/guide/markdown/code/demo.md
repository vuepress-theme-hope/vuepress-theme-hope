---
title: 代码演示
icon: splotch
category:
  - Markdown
tag:
  - Markdown
  - 代码演示
---

让你的 VuePress 站点中的 Markdown 文件支持代码案例。

<!-- more -->

## 配置

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    demo: true,
  },
});
```

<!-- @include: @md-enhance/zh/guide/code/demo/README.md#syntax -->

::: tip

JSON 块是可选的，可用的配置详见 [配置](../../../config/markdown/code.md#demo)。

:::

此插件支持三种类型:

- normal
- vue
- react

:::: code-tabs

@tab Normal

<!-- @include: @md-enhance/zh/guide/code/demo/normal.md#syntax -->

@tab Vue

<!-- @include: @md-enhance/zh/guide/code/demo/vue.md#syntax -->

@tab React

<!-- @include: @md-enhance/zh/guide/code/demo/react.md#syntax -->

::::

<!-- @include: @md-enhance/zh/guide/code/demo/README.md#language -->

## 案例

<!-- @include: @md-enhance/zh/guide/code/demo/normal.md#demo -->
<!-- @include: @md-enhance/zh/guide/code/demo/vue.md#demo -->
<!-- @include: @md-enhance/zh/guide/code/demo/react.md#demo -->
<!-- @include: @md-enhance/zh/guide/code/demo/README.md#demo -->

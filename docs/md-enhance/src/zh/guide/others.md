---
title: 其他
icon: more
---

## 链接检查

`vuepress-plugin-md-enhance` 默认在开发模式下检查你的 Markdown 链接。

你可以通过插件选项中的 `linkCheck` 自定义此功能，你可以选择 `'always'`、`'never'`、`'dev'` 和 `'build'`。

## GFM

如果你的文档既在文档站点上提供又直接在 GitHub 上提供，我们提供了一个 `gfm` 选项来使你的 Markdown 行为与 GitHub 保持一致。

::: note

自定义容器在 `@vuepress/theme-default` 和 `vuepress-theme-hope` 中默认启用，但在 GitHub Markdown 预览中不可用。

:::

## v-pre

由于 VuePress2 已经在 `@vuepress/core` 中移除了 V1 的 v-pre 容器，插件提供了一个选项支持它。也就是你可以在下面的容器中使用任何 Mustache 语法。

```md
::: v-pre

{{ abc }}

:::
```

---
title: 其他
icon: more
order: -2
category:
  - Markdown
tag:
  - Markdown
---

## 链接检查

主题默认在开发模式下检查你的 Markdown 链接。

你可以在主题选项中通过 `plugins.mdEnhance.linkCheck` 自定义此功能，你可以选择 `'always'`、`'never'`、`'dev'` 和 `'build'`。

## GFM

如果你的文档既在文档站点上提供又直接在 GitHub 上提供，我们在主题选项中提供了 `plugins.mdEnhance.gfm` 选项来使你的 Markdown 行为与 GitHub 保持一致。

::: note

自定义容器在 `@vuepress/theme-default` 和 `vuepress-theme-hope` 中默认启用，但在 GitHub Markdown 预览中不可用。

:::

## v-pre

由于 VuePress2 已经在 `@vuepress/core` 中移除了 V1 的 v-pre 容器，插件提供了一个选项 `vPre` 支持它。

换言之当设置 `plugins.mdEnhance.vPre: true` 时，你可以在下面的容器中使用任何 Mustache 语法。

```md
::: v-pre

{{ abc }}

:::
```

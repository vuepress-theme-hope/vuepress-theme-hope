---
title: 其他
icon: ellipsis
order: -2
category:
  - Markdown
tag:
  - Markdown
---

## 链接检查

主题默认通过 `@vuepress/plugin-links-check` 检查你的 Markdown 链接。

你可以通过主题选项中的 `markdown.linksCheck` 自定义此功能，详见 [links-check 文档][links-check]。

## GFM

如果你的文档既在文档站点上提供又直接在 GitHub 上提供，我们提供了 `markdown.gfm` 选项来使你的 Markdown 行为与 GitHub 保持一致。

::: important

有关完整的 GFM 语法，请参阅 [GFM](https://github.github.com/gfm/)。

只有常见的 GFM 语法被支持，有些行为可能会有所不同。

例如，为了支持 Vue 语法，VuePress 中允许 `<script>` 标签。

:::

## v-pre

由于 VuePress2 在核心中删除了 V1 的 v-pre 容器，我们提供了 `markdown.vPre` 选项来支持它。你可以在启用此选项时在 `v-pre` 容器中使用任何 Mustache 语法:

:::: md-demo

::: v-pre

{{ abc }}

:::

::::

[links-check]: https://ecosystem.vuejs.press/zh/plugins/markdown/links-check.html

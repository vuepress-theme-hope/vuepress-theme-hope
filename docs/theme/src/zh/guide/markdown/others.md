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

你可以通过主题选项中的 `plugins.linksCheck` 自定义此功能，详见 [links-check 文档][links-check]。

## GFM

如果你的文档既在文档站点上提供又直接在 GitHub 上提供，我们提供了一个 `gfm` 选项来使你的 Markdown 行为与 GitHub 保持一致。

::: note

有关完整的 GFM 语法，请参阅 [GFM](https://github.github.com/gfm/)。

老实说，我们并不是 100% 支持它，我们只补全了它的语法，包括链接转换、换行、任务列表、脚注、代码高亮、图片标记、Mermaid、Mathjax 等。

某些行为可能会有所不同，例如，为了允许 Vue 语法，我们并没有禁止 `<script>` 标签。 但在大多数情况下，行为应该是相同的。

另外自定义容器在 `@vuepress/theme-default` 和 `vuepress-theme-hope` 中默认启用，但在 GitHub Markdown 预览中不可用。

:::

## v-pre

由于 VuePress2 已经移除了 V1 的 v-pre 容器，插件提供了一个选项 `vPre` 支持它。

换言之当设置 `plugins.mdEnhance.vPre: true` 时，你可以在下面的容器中使用任何 Mustache 语法。

:::: md-demo

::: v-pre

{{ abc }}

:::

::::

[links-check]: https://ecosystem.vuejs.press/zh/plugins/links-check.html

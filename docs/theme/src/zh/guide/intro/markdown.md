---
title: Markdown
icon: fab fa-markdown
order: 3
category:
  - 快速上手
tag:
  - 快速上手
  - Markdown
---

VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。

你需要创建并编写 Markdown，以便 VuePress 可以根据文件结构将它们转换为不同的页面。

<!-- more -->

```component VPBanner
title: 针对新手的 Markdown 教程
logo: /assets/image/markdown.svg
background: var(--bg-2)
color: var(--banner-text)
actions:
  - text: 了解更多
    link: ../../cookbook/markdown/
```

## Markdown 配置

VuePress 通过 Frontmatter 为每个 Markdown 页面引入配置。

::: important Frontmatter

Frontmatter 是 VuePress 中很重要的一个概念，请阅读 [Frontmatter 介绍](../../cookbook/vuepress/page.md#frontmatter) 了解详情。

:::

## Markdown 扩展

VuePress 会使用 [Markdown It](https://github.com/markdown-it/markdown-it) 来解析 Markdown 内容，因此可以借助于 Markdown It 插件来实现语法扩展。

- VuePress 扩展

  为了丰富文档写作，VuePress 对 Markdown 语法进行了一些扩展，请阅读 [内置 Markdown 扩展](../../cookbook/vuepress/markdown.md) 了解详情。

- 主题扩展

  通过 <ProjectLink name="md-enhance" path="/zh/">`vuepress-plugin-md-enhance`</ProjectLink>，主题扩展了更多 Markdown 语法，请阅读 [主题 Markdown 扩展](../markdown/README.md) 了解详情。

- 自行扩展

  你可以自行寻找合适的 Markdown It 插件来扩展 Markdown 语法，[Markdown It 插件](https://mdit-plugins.github.io/) 是一个不错的选择。

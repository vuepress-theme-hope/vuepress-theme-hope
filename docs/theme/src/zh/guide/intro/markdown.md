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

你应该创建和编写 Markdown 文件，以便 VuePress 可以根据文件结构将它们转换为不同的页面。

<!-- more -->

```component VPBanner
title: Markdown 介绍
content: 如果你是一个新手，还不会编写 Markdown，请先阅读下方板块。
logo: /assets/image/markdown.svg
background: var(--bg-2)
color: var(--banner-text)
actions:
  - text: Markdown 教程
    link: ../../cookbook/markdown/
```

## Markdown 配置

VuePress 通过 Frontmatter 为每个 Markdown 页面引入配置。

::: info

Frontmatter 是 VuePress 中很重要的一个概念，如果你不了解它，你需要阅读 [Frontmatter 介绍](../../cookbook/vuepress/page.md#frontmatter)。

:::

## Markdown 扩展

VuePress 会使用 [markdown-it](https://github.com/markdown-it/markdown-it) 来解析 Markdown 内容，因此可以借助于 markdown-it 插件来实现 [语法扩展](https://github.com/markdown-it/markdown-it#syntax-extensions) 。

### VuePress 扩展

为了丰富文档写作，VuePress 对 Markdown 语法进行了扩展。

关于这些扩展，请阅读 [内置 Markdown 扩展](../../cookbook/vuepress/markdown.md)。

### 主题扩展

通过 <ProjectLink name="md-enhance" path="/zh/">`vuepress-plugin-md-enhance`</ProjectLink>，主题扩展了更多 Markdown 语法，提供更加丰富的写作功能。

关于这些扩展，请阅读 [主题扩展](../markdown/README.md)。

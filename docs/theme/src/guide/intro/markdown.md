---
title: Markdown
icon: fab fa-markdown
order: 3
category:
  - Get Started
tag:
  - Get Started
  - Markdown
---

VuePress basically generate pages from Markdown files. So you can use it to generate documentation or blog sites easily.

You should create and write Markdown files, so that VuePress can convert them to different pages according to file structure.

<!-- more -->

```component VPBanner
title: Markdown Introduction
content: If you are a newcomer and don't know how to write Markdown, please read the following section.
logo: /assets/image/markdown.svg
background: var(--bg-2)
color: var(--banner-text)
actions:
  - text: Markdown Tutorial
    link: ../../cookbook/markdown/
```

## Markdown Config

VuePress introduce configuration for each Markdown page using Frontmatter.

::: info

Frontmatter is an important concept in VuePress. If you don't know it, you need to read [Frontmatter Introduction](../../cookbook/vuepress/page.md#frontmatter).

:::

## Markdown Extension

The Markdown content in VuePress will be parsed by [markdown-it](https://github.com/markdown-it/markdown-it), which supports [syntax extensions](https://github.com/markdown-it/markdown-it#syntax-extensions) via markdown-it plugins.

## VuePress Enhancement

To enrich document content, VuePress extends standard Markdown syntax.

For these extended syntax, please see [Built-in Markdown Features](../../cookbook/vuepress/markdown.md).

## Theme Enhancement

By using <ProjectLink name="md-enhance">`vuepress-plugin-md-enhance`</ProjectLink>, the theme extends more Markdown syntax and provides richer writing functions.

For these extensions, please see [Theme Enhancement](../markdown/README.md).

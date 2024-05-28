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
title: Markdown Tutorial
logo: /assets/image/markdown.svg
background: var(--bg-2)
color: var(--banner-text)
actions:
  - text: Learn More
    link: ../../cookbook/markdown/
```

## Markdown Config

VuePress introduce configuration for each Markdown page using Frontmatter.

::: important Frontmatter

Frontmatter is an important concept in VuePress, read [Frontmatter Intro](../../cookbook/vuepress/page.md#frontmatter) for details.

:::

## Markdown Extensions

The Markdown content in VuePress will be parsed by [markdown-it](https://github.com/markdown-it/markdown-it), which supports syntax extensions via markdown-it plugins.

- VuePress Enhancement

  To enrich document content, VuePress extends standard Markdown syntax, read [Built-in Markdown Features](../../cookbook/vuepress/markdown.md) for details.

- Theme Enhancement

  With <ProjectLink name="md-enhance">`vuepress-plugin-md-enhance`</ProjectLink>, the theme extends more Markdown syntax, see [Theme Enhancement](../markdown/README.md) for details.

- Self Enhancement

  You can find suitable Markdown It plugins to extend Markdown syntax by yourself, [Markdown It Plugins](https://mdit-plugins.github.io/) can be a good choice.

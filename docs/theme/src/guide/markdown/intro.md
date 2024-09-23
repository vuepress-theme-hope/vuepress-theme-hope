---
title: Enable Enhance
icon: toggle-on
order: 1
category:
  - Markdown
tag:
  - Intro
  - Markdown
---

Besides Markdown syntaxes VuePress itself adds, `vuepress-theme-hope` enables more syntax in Markdown via <ProjectLink name="md-enhance">vuepress-plugin-md-enhance</ProjectLink>, [@vuepress/plugin-markdown-hint][markdown-hint], [@vuepress/plugin-markdown-image][markdown-image] and [@vuepress/plugin-markdown-math][markdown-math].

<!-- more -->

## Built-in Enhancements

VuePress comes with GitHub-style tables, Emoji, TOC, etc. are all available out of the box.

For detailed syntax, please see [Built-in Markdown Enhance](../../cookbook/vuepress/markdown.md).

## Enable Markdown Enhancement

The following options in the theme options will be passed to the plugin:

- `plugins.markdownHint` will be passed to `@vuepress/plugin-markdown-hint` as a plugin option
- `plugins.markdownImage` will be passed to `@vuepress/plugin-markdown-image` as a plugin option
- `plugins.markdownMath` will be passed to `@vuepress/plugin-markdown-math` as a plugin option
- `plugins.mdEnhance` will be passed to `vuepress-plugin-md-enhance` as a plugin option

So you can also read their documentation directly to see how to use them:

- [@vuepress/plugin-markdown-hint docs][markdown-hint]
- [@vuepress/plugin-markdown-image docs][markdown-image]
- [@vuepress/plugin-markdown-math docs][markdown-math]
- <ProjectLink name="md-enhance">vuepress-plugin-md-enhance Docs</ProjectLink>

`plugins.mdEnhance` in theme options will be passed to the plugin as a plugin option. Visit <ProjectLink name="md-enhance">plugin documentation</ProjectLink> to see the usage.

::: tip

Don't worry about the size of your site. If you don't enable related features, the final code won't include code for these features.

:::

[markdown-hint]: https://ecosystem.vuejs.press/plugins/markdown/markdown-hint.html
[markdown-image]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html
[markdown-math]: https://ecosystem.vuejs.press/plugins/markdown/markdown-math.html

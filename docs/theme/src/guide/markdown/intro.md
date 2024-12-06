---
title: Markdown Intro
icon: toggle-on
order: 1
category:
  - Markdown
tag:
  - Intro
  - Markdown
---

Besides Markdown syntaxes VuePress itself adds, `vuepress-theme-hope` enables more syntax and features in Markdown via the following plugins:

- [@vuepress/plugin-markdown-ext][markdown-ext]
- [@vuepress/plugin-markdown-image][markdown-image]
- [@vuepress/plugin-markdown-include][markdown-include]
- [@vuepress/plugin-markdown-hint][markdown-hint]
- [@vuepress/plugin-markdown-math][markdown-math]
- [@vuepress/plugin-markdown-stylize][markdown-stylize]
- [@vuepress/plugin-markdown-tab][markdown-tab]
- [@vuepress/plugin-link-check][link-check]
- [@vuepress/plugin-revealjs][revealjs]
- <ProjectLink name="md-enhance">vuepress-plugin-md-enhance</ProjectLink>

<!-- more -->

## Built-in Enhancements

VuePress comes with GitHub-style tables, Emoji, TOC, etc. are all available out of the box.

For detailed syntax, please see [Built-in Markdown Enhance](../../cookbook/vuepress/markdown.md).

## Enable Markdown Enhancement

You can control Markdown syntax and features through the `markdown` option in the theme options.

::: tip

Don't worry about the size of your site. If you don't enable related features, the final code won't include code for these features.

:::

[markdown-ext]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html
[markdown-image]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html
[markdown-include]: https://ecosystem.vuejs.press/plugins/markdown/markdown-include.html
[markdown-hint]: https://ecosystem.vuejs.press/plugins/markdown/markdown-hint.html
[markdown-math]: https://ecosystem.vuejs.press/plugins/markdown/markdown-math.html
[markdown-stylize]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html
[markdown-tab]: https://ecosystem.vuejs.press/plugins/markdown/markdown-tab.html
[link-check]: https://ecosystem.vuejs.press/plugins/markdown/link-check.html
[revealjs]: https://ecosystem.vuejs.press/plugins/markdown/revealjs/

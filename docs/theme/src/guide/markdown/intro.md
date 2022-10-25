---
title: Enable Enhance
icon: enable
order: 1
category:
  - Markdown
tag:
  - Intro
  - Markdown
---

Besides Markdown syntaxes VuePress itself adds, `vuepress-theme-hope` enables more syntax in Markdown via [vuepress-plugin-md-enhance][md-enhance] plugin.

<!-- more -->

## Built-in Enhancements

VuePress comes with GitHub-style tables, Emoji, TOC, code line numbers, specific line highlighting, etc. are all available out of the box.

For detailed syntax, please see [Built-in Markdown Enhance](../../cookbook/vuepress/markdown.md).

## Enable Markdown Enhancement

`plugin.mdEnhance` in theme options will be passed to the plugin as a plugin option. Visit [plugin documentation][md-enhance] to see the usage.

::: tip

Don’t worry about the size of your site. If you don’t enable related features, the final code won’t include code for these features.

:::

[md-enhance]: https://vuepress-theme-hope.github.io/v2/md-enhance/

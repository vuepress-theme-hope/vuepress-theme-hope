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

Besides Markdown syntaxes VuePress itself adds, `vuepress-theme-hope` enables more syntax in Markdown via <ProjectLink name="md-enhance">vuepress-plugin-md-enhance</ProjectLink> plugin.

<!-- more -->

## Built-in Enhancements

VuePress comes with GitHub-style tables, Emoji, TOC, code line numbers, specific line highlighting, etc. are all available out of the box.

For detailed syntax, please see [Built-in Markdown Enhance](../../cookbook/vuepress/markdown.md).

## Enable Markdown Enhancement

`plugins.mdEnhance` in theme options will be passed to the plugin as a plugin option. Visit <ProjectLink name="md-enhance">plugin documentation</ProjectLink> to see the usage.

::: tip

Don't worry about the size of your site. If you don't enable related features, the final code won't include code for these features.

:::

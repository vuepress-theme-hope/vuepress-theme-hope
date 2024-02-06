---
title: 启用 Markdown 增强
icon: toggle-on
order: 1
category:
  - Markdown
tag:
  - Markdown
  - 介绍
---

除了 VuePress 本身新增了一些 Markdown 语法外，`vuepress-theme-hope` 通过 <ProjectLink name="md-enhance" path="/zh/">vuepress-plugin-md-enhance</ProjectLink>，在 Markdown 中启用了更多的语法与新功能。

<!-- more -->

## 内置增强

VuePress 自带的 GitHub 风格的表格，Emoji、TOC、代码行号、特定行高亮等都是开箱即用的。

详细语法详见 [内置 Markdown 扩展](../../cookbook/vuepress/markdown.md)。

## 启用 Markdown 增强

主题选项中的 `plugins.mdEnhance` 会传递给 `vuepress-plugin-md-enhance` 作为插件选项。所以你也可以直接阅读 <ProjectLink name="md-enhance" path="/zh/">插件文档</ProjectLink> 查看用法。

::: tip

请不用担心你的网站大小，如果你不启用相关功能，最终代码不会包含这些功能相关的代码。

:::

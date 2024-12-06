---
title: Markdown 介绍
icon: toggle-on
order: 1
category:
  - Markdown
tag:
  - Markdown
  - 介绍
---

除了 VuePress 本身新增了一些 Markdown 语法外，`vuepress-theme-hope` 通过以下插件，在 Markdown 中启用了更多的语法与功能：

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

## 内置增强

VuePress 自带的 GitHub 风格的表格，Emoji、TOC 都是开箱即用的。

详细语法详见 [内置 Markdown 扩展](../../cookbook/vuepress/markdown.md)。

## 启用 Markdown 增强

你可以通过主题选项中的 `markdown` 选项来控制 Markdown 语法与功能。

::: tip

请不用担心你的网站大小，如果你不启用相关功能，最终代码不会包含这些功能相关的代码。

:::

[markdown-ext]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html
[markdown-image]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html
[markdown-include]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-include.html
[markdown-hint]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-hint.html
[markdown-math]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-math.html
[markdown-stylize]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html
[markdown-tab]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-tab.html
[link-check]: https://ecosystem.vuejs.press/zh/plugins/markdown/link-check.html
[revealjs]: https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/

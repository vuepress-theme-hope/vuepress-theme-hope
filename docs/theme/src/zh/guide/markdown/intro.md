---
title: 启用 Markdown 增强
icon: enable
category: markdown
tags:
  - intro
  - markdown
---

除了 VuePress 本身新增了一些 Markdown 语法外，`vuepress-theme-hope` 通过 [vuepress-plugin-md-enhance](https://vuepress-theme-hope.github.io/md-enhance)，在 Markdown 中启用了更多的语法与新功能。

<!-- more -->

## 内置增强

VuePress 自带的 GitHub 风格的表格，Emoji、TOC、代码行号、特定行高亮等都是开箱即用的。

详细语法详见 [内置 Markdown 扩展](../../basic/vuepress/markdown.md)。

## 启用 Markdown 增强

`.vuepress/config.js` 中的 `themeconfig.mdEnhance` 会直接传递给插件作为插件选项。所以你也可以直接阅读 [vuepress-plugin-md-enhance 文档](https://vuepress-theme-hope.github.io/md-enhance) 查看用法。

::: tip

请不用担心你的网站大小，如果你不启用相关功能，最终代码不会包含这些功能相关的代码。

:::

### 一键启用

你可以设置 `themeconfig.mdEnhance.enableAll` 启用 [md-enhance](https://vuepress-theme-hope.github.io/md-enhance) 插件的所有功能。

```js {3-5}
module.exports = {
  themeConfig: {
    mdEnhance: {
      enableAll: true,
    },
  },
};
```

::: danger

请仅将此选项用于体验或测试。随着时间的增长，`vuepress-plugin-md-enhance` 变得越来越强大。它为 Markdown 解析器添加了更多语法，并输出了更多代码。

启用不需要的功能将增加开发和构建时间。 (`markdown-it` 必须检查额外的语法)

同样，幻灯片演示功能将在输出中添加 700KB 大小的代码 (主要是 `reveal.js`)。

因此，请仅启用需要的功能。

:::

### 启用特定的语法

特定语法的配置项可以在对应的说明页或者 [主题插件配置](../../config/theme/plugin.md#mdEnhance) 中找到。

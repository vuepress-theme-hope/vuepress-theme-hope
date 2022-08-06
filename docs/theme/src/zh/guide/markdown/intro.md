---
title: 启用 Markdown 增强
icon: enable
order: 1
category:
  - Markdown
tag:
  - Markdown
  - 介绍
---

除了 VuePress 本身新增了一些 Markdown 语法外，`vuepress-theme-hope` 通过 [vuepress-plugin-md-enhance][md-enhance]，在 Markdown 中启用了更多的语法与新功能。

<!-- more -->

## 内置增强

VuePress 自带的 GitHub 风格的表格，Emoji、TOC、代码行号、特定行高亮等都是开箱即用的。

详细语法详见 [内置 Markdown 扩展](../../cookbook/vuepress/markdown.md)。

## 启用 Markdown 增强

主题选项中的 `plugin.mdEnhance` 会传递给 `vuepress-plugin-md-enhance` 作为插件选项。所以你也可以直接阅读 [插件文档][md-enhance] 查看用法。

::: tip

请不用担心你的网站大小，如果你不启用相关功能，最终代码不会包含这些功能相关的代码。

:::

### 一键启用

你可以在主题选项中设置 `plugins.mdEnhance.enableAll: true` 启用 [md-enhance][md-enhance] 插件的所有功能。

::: code-tabs#language

@tab TS

```js {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        enableAll: true,
      },
    },
  }),
};
```

@tab JS

```js {7-9}
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        enableAll: true,
      },
    },
  }),
};
```

:::

::: danger

请仅将此选项用于体验或测试。随着时间的增长，`vuepress-plugin-md-enhance` 变得越来越强大。它为 Markdown 解析器添加了更多语法，并输出了更多代码。

启用不需要的功能将增加开发和构建时间。 (`markdown-it` 必须检查额外的语法)

同样，幻灯片演示功能将在输出中添加 700KB 大小的代码 (主要是 `reveal.js`)。

因此，请仅启用需要的功能。

:::

### 启用特定的语法

特定语法的配置项可以在对应的说明页或者 [主题插件配置](../../config/plugins/md-enhance.md) 中找到。

[md-enhance]: https://vuepress-theme-hope.github.io/v2/md-enhance/zh/

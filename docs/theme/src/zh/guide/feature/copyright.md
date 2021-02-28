---
title: 版权信息
icon: copyright
category: feature
tags:
  - copyright
  - feature
copyright:
  minLength: 40
---

有些时候，你可能不想让你的某些文章被他人复制，或者你想让他人在复制时，自动生成一段版权信息到剪切板中。

针对这一情况，`vuepress-theme-hope` 引入了 [vuepress-plugin-copyright](https://www.npmjs.com/package/vuepress-plugin-copyright)。

<!-- more -->

## 启用插件

由于相当一部分用户将本主题用于构建文档，而文档站点通常不需要附加版权信息，所以本插件并不是默认启用的。

启用本插件，你需要将主题配置中的 `copyright` 设置为 true，或者设置 `copyright.status` 才能启用它。`copyright.status` 可选的值为 `global` 和 `local`，。默认的值是 `global` 即全局启用 (也是 `themeConfig.copyright: true` 的状态)。

## 使用

默认设置下，当用户从你的站点复制超过 100 字的消息时，在这段消息的尾部添加版权声明消息。

版权声明的作者名称会从你在主题中配置的作者信息或站点名称自动生成。

### 触发字符数 <Badge text="支持页面配置" />

你可以通过 `copyright.minLength` 设置触发禁用复制或者追加版权信息的最小字符数，默认为 `100`。

在 themeConfig 和 frontmatter 均可以设置这一属性，前者会自动应用于全局，而后者仅作用于特定页面优先级高于前者。

### 禁止复制

在 frontmatter 中将 `copyright.noCopy` 设置为 `true`。

::: tip

该行为收到 `minLength` 的控制，即字符串没有达到 `minLength` 的值的时候用户仍然可以进行复制操作。

:::

### 禁止选中

在 frontmatter 中设置 `copyright.noSelect` 为 `true`。

## 演示

请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。

## 文档

关于插件详细信息，请参见 [vuepress-plugin-copyright 文档](https://vuepress.github.io/zh/plugins/copyright/#配置项)

::: warning

这是一个 VuePress 社区插件，而不是内置插件。因此，如果你遇到问题，请前往 [它的仓库](https://github.com/vuepress/vuepress-plugin-copyright) 寻求帮助。

:::

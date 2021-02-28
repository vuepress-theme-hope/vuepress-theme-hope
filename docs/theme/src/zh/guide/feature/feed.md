---
title: Feed 支持
icon: rss
category: feature
tags:
  - feed
  - feature
---

`vuepress-theme-hope` 通过内置 [`@mr-hope/vuepress-plugin-feed`](https://vuepress-theme-hope.github.io/feed/zh/) 插件来为你提供 feed 支持。

主题会自动为你生成以下三种格式的 feed 文件:

- Atom 1.0 (默认输出为 atom.xml)
- JSON 1.1 (默认输出为 feed.json)
- RSS 2.0 (默认输出为 rss.xml)

考虑到现在 Feed 已经很小众，我们旨在提供最小配置来尽可能自动生成详细的 Feed 文件。如果你不需要这个功能，则可以将 `themeConfig.feed` 设置为 `false` 来禁用该插件。

<!-- more -->

## 频道设置

你可以通过设置 `themeConfig.feed.channel` 选项来自自定义 Feed 频道的各项信息。

我们推荐你进行如下设置:

- 将建立 Feed 的日期转换为 ISOString 写入到 `channel.pubDate` 中
- 通过 `channel.ttl` 中设置内容的更新周期(单位: 分钟)

详细的选项及其默认值详见 [Feed 插件频道设置](https://vuepress-theme-hope.github.io/feed/zh/config/channel/)

## 项目设置

默认情况下，所有文章均会被添加至 feed 流。你可以通过配置 frontmatter 中的 feed 选项，对特定文章的 feed 项目生成进行控制。

如果你想在 feed 中移除指定页面，你可以在该页面的 frontmatter 中将 `feed.enable` 设置为 `false`。

当然你也可以通过 `frontmatter.feed` 直接向 feed 插件传入内容。详细的选项及其默认值详见 [Feed 插件项目设置](https://vuepress-theme-hope.github.io/feed/zh/config/item/)

## 输出配置

你可通过配置选项中的 `output` 来决定输出哪些格式的 Feed 文件以及它们的位置。

详细的选项及其默认值详见 [Feed 插件输出设置](https://vuepress-theme-hope.github.io/feed/zh/config/#output)

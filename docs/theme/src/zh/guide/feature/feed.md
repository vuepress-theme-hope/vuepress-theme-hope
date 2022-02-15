---
title: Feed 支持
icon: rss
category:
  - feature
tag:
  - feed
  - feature
---

`vuepress-theme-hope` 通过内置 [`vuepress-plugin-feed2`][feed2] 插件来为你提供 feed 支持。

::: info

`vuepress-theme-hope` 将 `themeConfig.plugins` 中的 `feed` 选项作为插件选项提供给 `vuepress-plugin-feed2`。

:::

<!-- more -->

## 启用 Feed 输出

`vuepress-plugin-feed2` 插件可为你生成以下三种格式的 feed 文件:

- Atom 1.0 (默认输出为 atom.xml)
- JSON 1.1 (默认输出为 feed.json)
- RSS 2.0 (默认输出为 rss.xml)

::: tip

Atom 和 JSON 是为了提供更多 Feed 软件的适配而提供的。

如果可以，请尽可能使用 RSS。

:::

请按照需要生成的格式，在 `themeConfig.plugins.feed` 中 设置 `atom`, `json` 或 `rss` 为 `true`。

考虑到现在 Feed 已经很小众，插件旨在提供最小配置来尽可能自动生成详细的 Feed 文件。当然插件也预留了充足的设置项，以让你自由定义 Feed 的输出内容。

## 频道设置

你可以在 `themeConfig.plugins.feed` 中通过设置 `channel` 选项来自自定义 Feed 频道的各项信息。

我们推荐进行如下设置:

- 将建立 Feed 的日期转换为 ISOString 写入到 `channel.pubDate` 中
- 通过 `channel.ttl` 中设置内容的更新周期(单位: 分钟)

::: tip 默认频道设置

- 频道的标题、描述默认为站点的名称与链接。

- 频道的链接、最后更新时间会由插件自动生成。

- 频道的版权信息会尝试从页脚的版权信息中读取。

:::

详细的选项及其默认值详见 [配置 → 频道设置][feed2-channel]

## 生成控制

### 项目默认生成

默认情况下，所有文章均会被添加至 feed 流。

关于默认情况下读取的内容，详见 [配置 → 项目控制][feed2-item]

### 自定义页面

你可以通过配置 frontmatter 中的 `feed` 选项，对特定文章的 feed 项目生成的内容进行控制。

详细的选项及其默认值详见 [配置 → 项目设置][feed2-item]

### 自定义 Feed 生成

你可以通过配置插件选项中的 `getter`，完全控制 Feed 项目的生成逻辑。

详细的选项及其默认值详见 [配置 → Feed 获取器][feed2-getter]

[feed2]: https://vuepress-theme-hope.github.io/v2/feed/zh/
[feed2-channel]: https://vuepress-theme-hope.github.io/v2/feed/zh/config/channel.html
[feed2-item]: https://vuepress-theme-hope.github.io/v2/feed/zh/config/item.html
[feed2-getter]: https://vuepress-theme-hope.github.io/v2/feed/zh/config/getter.html

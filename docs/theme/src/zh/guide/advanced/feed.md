---
title: Feed 支持
icon: rss
order: 4
category:
  - 高级
tag:
  - 高级
  - Feed
---

主题通过[`@vuepress/plugin-feed`][feed] 提供 Feed 支持。你需要在项目中手动安装 `@vuepress/plugin-feed` 以启用此功能。

::: info
`vuepress-theme-hope` 会将主题选项中的 `plugins.feed` 配置透传给 `@vuepress/plugin-feed`。
:::

<!-- more -->

## 启用 Feed 输出

`@vuepress/plugin-feed` 插件支持生成三种格式的 Feed 文件：

- Atom 1.0
- JSON 1.1
- RSS 2.0

在主题选项中将 `plugins.feed.atom`、`plugins.feed.json` 或 `plugins.feed.rss` 设置为 `true` 即可生成对应格式。你可以同时启用多种格式。

::: tip
RSS 为主要格式，Atom 与 JSON 仅用于兼容性支持。
:::

## 频道设置

你可以通过主题选项中的 `plugins.feed.channel` 自定义 Feed 频道信息。

推荐配置：

- 将 Feed 创建日期设为 ISOString 格式并写入 `channel.pubDate`。
- 通过 `channel.ttl` 设置内容更新周期（单位：分钟）。
- 通过 `channel.copyright` 设置版权信息（默认回退至主题的 `copyright` 选项）。
- 通过 `channel.author` 设置频道作者（默认回退至主题的 `author` 选项）。

::: info
默认情况下，频道的标题与描述会继承站点的名称与描述。插件会自动生成频道链接与最后更新时间。
:::

详细选项请参考[Feed Channel 文档][feed-channel]。

## 生成控制

默认情况下，所有文章均会加入 Feed 流。

你可以通过页面 Frontmatter 中的 `feed` 选项控制特定文章的 Feed 生成逻辑，详见[Feed Frontmatter 文档][feed-frontmatter]。

你可以通过配置 `plugins.feed.getter` 完全接管 Feed 项目的生成逻辑，详见 [Feed Getter 文档][feed-getter]。

### 多语言配置

插件会为每种语言生成独立的 Feed 文件。

你可以通过 `plugins.feed.locales` 为不同语言应用特定设置。

[feed]: https://ecosystem.vuejs.press/plugins/blog/feed/
[feed-channel]: https://ecosystem.vuejs.press/plugins/blog/feed/channel.html
[feed-frontmatter]: https://ecosystem.vuejs.press/plugins/blog/feed/frontmatter.html
[feed-getter]: https://ecosystem.vuejs.press/plugins/blog/feed/getter.html

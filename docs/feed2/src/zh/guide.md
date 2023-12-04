---
title: 指南
icon: lightbulb
---

## 使用

`vuepress-plugin-feed2` 插件可为你生成以下三种格式的 feed 文件:

- Atom 1.0
- JSON 1.1
- RSS 2.0

::: tip 如果可以，请尽可能使用 RSS。Atom 和 JSON 是为了最好的兼容性而提供的。

:::

请按照需要生成的格式，在插件选项中设置 `atom`, `json` 或 `rss` 为 `true`。

::: tip 你可以全部输出，这不是一个三选一。

:::

考虑到现在 Feed 已经很小众，本插件旨在提供最小配置来尽可能自动生成详细的 Feed 文件。当然本插件也预留了充足的设置项，以让你自由定义 Feed 的输出内容。

为了正确生成链接地址，你需要在插件选项中设置 `hostname` (部署域名)，

## 频道设置

你可以通过设置 `channel` 选项来自自定义 Feed 频道的各项信息。

我们推荐进行如下设置:

- 将建立 Feed 的日期转换为 ISOString 写入到 `channel.pubDate` 中
- 通过 `channel.ttl` 中设置内容的更新周期(单位: 分钟)
- 通过 `channel.copyright` 设置版权信息
- 通过 `channel.author` 设置频道作者。

::: tip 默认频道设置

- 频道的标题、描述默认为站点的名称与链接。
- 频道的链接、最后更新时间会由插件自动生成。

:::

详细的选项及其默认值详见 [配置 → 频道设置](./config/channel.md)

## 生成控制

### 项目默认生成逻辑

默认情况下，所有文章均会被添加至 feed 流。

关于默认情况下读取的内容，详见 [配置 → 项目控制](./config/item.md)

### 自定义页面

你可以通过配置 frontmatter 中的 `feed` 选项，对特定文章的 feed 项目生成的内容进行控制。

详细的选项及其默认值详见 [配置 → 项目设置](./config/item.md)

### 自定义 Feed 生成

你可以通过配置插件选项中的 `getter`，完全控制 Feed 项目的生成逻辑。

详细的选项及其默认值详见 [配置 → Feed 获取器](./config/getter.md)

### 多语言配置

插件会针对每个语言生成单独的 Feed。

你可以通过插件选项中的 `locales` 分别对不同语言提供不同的默认设置。

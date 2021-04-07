---
title: 指南
icon: creative
---

## 使用

`@mr-hope/vuepress-plugin-feed` 插件会自动为你生成以下三种格式的 feed 文件:

- Atom 1.0
- JSON 1.1
- RSS 2.0

::: tip

Atom 和 JSON 是为了提供更多 Feed 软件的适配而提供的。

如果可以，请尽可能使用 RSS。

:::

考虑到现在 Feed 已经很小众，本插件旨在提供最小配置来尽可能自动生成详细的 Feed 文件。当然本插件也预留了充足的设置项，以让你自由定义 Feed 的输出内容。

为了正确生成链接地址，你需要在插件选项或者 themeConfig 中提供 `hostname` (部署域名)。其他选项均是选填的。

## 频道设置

你可以通过设置 `channel` 选项来自自定义 Feed 频道的各项信息。

我们推荐进行如下设置:

- 将建立 Feed 的日期转换为 ISOString 写入到 `channel.pubDate` 中
- 通过 `channel.ttl` 中设置内容的更新周期(单位: 分钟)
- 通过 `channel.copyright` 设置版权信息
- 通过 `channel.author` 设置频道作者，或设置 `themeConfig.author` 为作者名称。

::: tip 默认频道设置

- 频道的标题、描述默认为站点的名称与链接。

- 频道的链接、最后更新时间会由插件自动生成。

- 频道的版权信息会尝试从页脚的版权信息中读取。

:::

详细的选项及其默认值详见 [配置 → 频道设置](config/channel.md)

## 项目设置

### 项目默认生成

默认情况下，所有文章均会被添加至 feed 流。

::: details 文章

所有 `frontmatter.article` 不为 `false` 且不是主页的页面均会被视为文章。

:::

`@mr-hope/vuepress-plugin-feed` 会从 frontmatter 中读取以下内容:

- `description`: 文章的描述信息

- `author`: 文章的作者名称

- `copyrightText`: 文章的版权信息

- `time`: 文章的发布时间

- `image`: 文章的封面

`@mr-hope/vuepress-plugin-feed` 也会使用以下内容:

- `page.excerpt`: 在 `<!-- more -->` 注释前的内容，用作文章的备选描述
- 页面渲染的网页内容: 用于描述 Feed 项目的内容

### 自定义

你可以通过配置 frontmatter 中的 feed 选项，对特定文章的 feed 项目生成进行控制。

如果你想在 feed 中移除指定页面，你可以在该页面的 frontmatter 中将 `feed.enable` 设置为 `false`。

当然你也可以通过 `frontmatter.feed` 直接向 feed 插件传入内容。支持的选项如下:

- `feed.title`: 为 Feed 项目覆盖默认的文章标题
- `feed.description`: 为 Feed 项目覆盖默认的文章描述
- `feed.author`: 设置多个作者与详细的作者信息，格式为 `FeedAuthor[] | FeedAuthor`。

  > 默认读取 `frontmatter.author`。

  ::: details FeedAuthor 格式

  ```ts
  interface FeedAuthor {
    /** 作者姓名 */
    name: string;
    /** 作者电子邮箱 */
    email?: string;
    /** 作者网站 */
    url?: string;
    /**
     * 作者头像地址
     *
     * 正方形，最好不小于 128×128，透明背景
     */
    avator?: string;
  }
  ```

  :::

- `feed.contributor`: 设置多个贡献者与详细的贡献者信息，格式为 `FeedContributor[] | FeedContributor`

  > `FeedContributor` 选项与 `FeedAuthor` 完全相同。
  > 该选项默认同 `feed.author`。

- `feed.category`: 设置多个详细的分类信息，格式为 `FeedCategory[] | FeedCategory`

  ::: details FeedCategory 格式

  ```ts
  interface FeedCategory {
    /** 分类名称 */
    name: string;
    /**
     * 分类的域名
     *
     * @description rss format only
     */
    domain?: string;
    /**
     * 分类 scheme 的 URI
     *
     * @description atom format only
     */
    scheme?: string;
  }
  ```

  :::

- `feed.guid`: 覆盖默认的 Feed 项目标识符，默认为页面永久链接，若不存在回退到页面链接。

详细的选项及其默认值详见 [配置 → 项目设置](config/item.md)

## 输出配置

你可通过配置选项中的 `output` 来决定输出哪些格式的 Feed 文件以及它们的位置。

详细的选项及其默认值详见 [配置 → 输出设置](config/readme.md#output)

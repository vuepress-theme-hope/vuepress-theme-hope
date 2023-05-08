---
title: Feed 插件配置
icon: rss
order: 5
category:
  - 配置
tag:
  - 插件配置
  - 主题配置
  - Feed
---

## 介绍

`vuepress-theme-hope` 通过 `vuepress-plugin-feed2` 插件提供 Feed 生成支持。它将主题选项中的 `plugins.feed` 作为插件选项传递给 `vuepress-plugin-feed2` 插件。

`vuepress-plugin-feed2` 插件可为你生成以下三种格式的 feed 文件:

- Atom 1.0
- JSON 1.1
- RSS 2.0

请按照需要生成的格式，在 `plugins.feed` 中设置 `atom`, `json` 或 `rss` 为 `true` 来启用插件。

::: tip

Atom 和 JSON 是为了提供更多 Feed 软件的适配而提供的。

如果可以，请尽可能使用 RSS。

:::

::: info

有关更多详细信息，请参见 <ProjectLink name="feed2" path="/zh/config/">feed2 插件文档</ProjectLink>。

:::

## 插件选项

### atom

- 类型: `boolean`
- 默认值: `false`

是否启用 Atom 格式输出。

### json

- 类型: `boolean`
- 默认值: `false`

是否启用 JSON 格式输出。

### rss

- 类型: `boolean`
- 默认值: `false`

是否启用 RSS 格式输出。

### image

- 类型: `string`

一个大的图片，用作 feed 展示。

### icon

- 类型: `string`

一个小的图标，显示在订阅列表中。

### count

- 类型: `number`
- 默认值: `1000`

设置 feed 的最大项目数量。在所有页面排序好后，插件会截取前 count 个项目。

如果你的站点文章很多，你应该考虑设置这个选项以减少 feed 文件大小。

### preservedElements

- 类型: `(RegExp | string)[] | (tagName: string) => boolean`
- 默认值: `[]`

应在 Feed 中保留的自定义元素或组件。

::: note

默认情况下，所有的未知标签都会被移除。

:::

### filter

- 类型: `(page: Page)=> boolean`
- 默认值:

  ```ts
  ({ frontmatter, filePathRelative }: Page): boolean =>
    !(
      frontmatter.home ||
      !filePathRelative ||
      frontmatter.article === false ||
      frontmatter.feed === false
    );
  ```

自定义的过滤函数，用于过滤哪些项目在 feed 中显示。

### sort

- 类型: `(pageA: Page, pageB: Page)=> number`

自定义排序函数，用于对站点中的页面进行排序。

最终生成的 feed 文件将会按照这个顺序对项目进行显示。

::: warning

强烈建议设置这个选项，否则 feed 流中，项目的顺序完全由 VuePress 默认输出的 pages 顺序决定。

你可以按照自己的需求对站点内的页面进行排序。

:::

### channel

`channel` 选项用于配置 Feed 频道。

可用选项详见 <ProjectLink name="feed2" path="/config/channel.html">配置 → 频道设置</ProjectLink>。

### atomOutputFilename

- 类型: `string`
- 默认值: `atom.xml`

Atom 格式输出路径，相对于输出路径。

### jsonOutputFilename

- 类型: `string`
- 默认值: `feed.json`

JSON 格式输出路径，相对于输出路径。

### rssOutputFilename

- 类型: `string`
- 默认值: `rss.xml`

RSS 格式输出路径，相对于输出路径。

### getter

Feed 生成控制器

::: tip

插件已经在默认情况下提供了合理的获取器，如果你需要完全控制 Feed 生成，你可以设置此项。

:::

详见 <ProjectLink name="feed2" path="/zh/config/getter.html">Feed 生成器</ProjectLink>.

### locales

- 类型: `Record<string, BaseFeedOptions>`
- 必填: 否

你可以将它用于每个语言环境的特定选项。

除 `hostname` 外，上述任何选项均受支持。

---
title: Feed 插件配置
icon: rss
order: 8
category:
  - 配置
tag:
  - 插件配置
  - 主题配置
  - Feed
---

## 介绍

主题可通过 `@vuepress/plugin-feed` 生成 Feed，你需要**手动安装插件**。

你可以在主题选项中设置 `plugins.feed: true` 来启用此功能。默认行为是生成 RSS 格式的 Feed。

## 插件选项

主题将主题选项中的 `plugins.feed` 作为插件选项传递给 `@vuepress/plugin-feed`。

你可以通过 `plugins.feed` 自行设置选项，以下是常见选项:

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
- 默认值: `100`

设置 feed 的最大项目数量。在所有页面排序好后，插件会截取前 count 个项目。

如果你的站点文章很多，你应该考虑设置这个选项以减少 feed 文件大小。

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

Feed 项目的排序器。

默认的排序行为是通过 Git 的文件添加日期 (需要 `@vuepress/plugin-git`)。

::: info

查看 [feed 插件文档][feed-config] 以获取全部可用选项。

:::

[feed-config]: https://ecosystem.vuejs.press/zh/plugins/feed/

---
title: 博客配置
icon: blog
order: 2
category:
  - 配置
tag:
  - 插件配置
  - 主题配置
  - 博客
---

## 介绍

主题提供博客功能，默认情况下**不启用**。

你可以在主题选项中设置 `plugins.blog: true` 来启用博客功能。

有关说明，请参阅[博客介绍](../../guide/blog/intro.md)。

## 选项

### autoExcerpt

- 类型: `boolean`
- 默认值: `false`

是否为每个页面生成摘录。

### filter

- 类型: `(page: Page) => boolean`
- 默认: `(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`

页面过滤器，此函数用于鉴别页面是否作为文章。

默认情况下，所有从 Markdown 源文件中生成的非主页页面，会被作为文章。

### article

- 类型: `string`
- 默认值: `/article/`

文章列表路由路径。

### category

- 类型: `string`
- 默认值: `/category/`

分类地图路由路径。

### categoryItem

- 类型: `string`
- 默认值: `/category/:name/`

分类列表路由路径。`:name` 会被自动替换为分类名称。

### tag

- 类型: `string`
- 默认值: `/tag/`

标签地图路由路径。

### tagItem

- 类型: `string`
- 默认值: `/tag/:name/`

标签列表路由路径。`:name` 会被自动替换为标签名称。

### encrypted

- 类型: `string`
- 默认值: `/encrypted/`

加密文章列表路由路径。

### slide

- 类型: `string`
- 默认值: `/slide/`

幻灯片列表路由路径。

### star

- 类型: `string`
- 默认值: `/star/`

收藏文章列表路由路径。

### timeline

- 类型: `string`
- 默认值: `/timeline/`

时间线列表路由路径。

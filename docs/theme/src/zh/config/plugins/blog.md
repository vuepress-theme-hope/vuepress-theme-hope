---
title: 博客配置
icon: blog
order: 4
category:
  - 配置
tag:
  - 插件配置
  - 主题配置
  - 博客
---

## 介绍

主题通过 `@vuepress/plugin-blog` 提供博客功能，默认情况下此功能**不启用**。

你可以在主题选项中设置 `plugins.blog: true` 来启用博客功能。

有关说明，请参阅[博客介绍](../../guide/blog/intro.md)。

## 选项

### plugins.blog.excerpt

- 类型: `boolean`
- 默认值: `true`

是否生成摘要。

### plugins.blog.excerptSeparator

- 类型: `string`
- 默认值: `<!-- more -->`

摘要分隔符。

### plugins.blog.excerptLength

- 类型: `number`
- 默认值: `300`

自动生成的摘要的长度。

::: note

摘要的长度会尽可能的接近这个值。如果设置为 `0`，意味着不自动生成摘要。

:::

### plugins.blog.filter

- 类型: `(page: Page) => boolean`
- 默认值:

  ```js
  ({ frontmatter, filePathRelative }) =>
    frontmatter.article ?? (Boolean(filePathRelative) && !frontmatter.home);
  ```

页面过滤器，此函数用于鉴别页面是否作为文章。

默认情况下，所有从 Markdown 源文件中生成的非主页页面，会被作为文章。

### plugins.blog.excerptFilter

- 类型: `(page: Page) => boolean`
- 默认值: `filter` 选项

页面过滤器，此函数用于鉴别插件是否需要生成摘要。

### plugins.blog.slugify

- 类型: `(name: string) => string`
- 默认值: `(name) => name.replace(/ _/g, '-').replace(/[:?*|\\/<>]/g, "").toLowerCase()`

Slugify 函数，用于转换 key 在路由中注册的形式。

### plugins.blog.type

- 类型: `BlogTypeOptions[]`

  ```ts twoslash
  import type { Page } from "vuepress";

  interface BlogTypeOptions {
    /**
     * 唯一的类型名称
     */
    key: string;

    /**
     * 一个过滤函数来决定页面是否满足此类型
     */
    filter: (page: Page) => boolean;

    /**
     * 页面排序器
     */
    sorter?: (pageA: Page, pageB: Page) => number;

    /**
     * 待注册的页面路径
     *
     * @default '/:key/'
     */
    path?: string | false;

    /**
     * 页面布局组件名称
     *
     * @default 'Blog'
     */
    layout?: string;

    /**
     * frontmatter 配置
     */
    frontmatter?: (localePath: string) => Record<string, string>;
  }
  ```

- 默认值: `[]`
- 详情:
  - [指南 → 文章列表](../../guide/blog/article.md#其他类型的文章)

额外的文章类型。

### plugins.blog.article

- 类型: `string`
- 默认值: `/article/`

文章列表路由路径。

### plugins.blog.category

- 类型: `string`
- 默认值: `/category/`

分类地图路由路径。

### plugins.blog.categoryItem

- 类型: `string`
- 默认值: `/category/:name/`

分类列表路由路径。`:name` 会被自动替换为分类名称。

### plugins.blog.tag

- 类型: `string`
- 默认值: `/tag/`

标签地图路由路径。

### plugins.blog.tagItem

- 类型: `string`
- 默认值: `/tag/:name/`

标签列表路由路径。`:name` 会被自动替换为标签名称。

### plugins.blog.star

- 类型: `string`
- 默认值: `/star/`

星标文章列表路由路径。

### plugins.blog.timeline

- 类型: `string`
- 默认值: `/timeline/`

时间线列表路由路径。

### plugins.blog.hotReload

- 类型: `boolean`
- 默认值: 是否在使用 `--debug` 标识

是否需要在开发服务器启用热更新。

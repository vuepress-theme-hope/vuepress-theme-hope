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

:::: fields
@`plugins.blog.excerpt` type=boolean default=`true`

是否生成摘要。

@`plugins.blog.excerptSeparator` type=string default=`<!-- more -->`

摘要分隔符。

@`plugins.blog.excerptLength` type=number default=`300`

自动生成的摘要的长度。

::: note

摘要的长度会尽可能的接近这个值。如果设置为 `0`，意味着不自动生成摘要。

:::

@`plugins.blog.filter` type=`(page: Page) => boolean`

页面过滤器，此函数用于鉴别页面是否作为文章。

默认情况下，所有从 Markdown 源文件中生成的非主页页面，会被作为文章。

其默认值为：

```js
({ frontmatter, filePathRelative }) =>
  frontmatter.article ?? (Boolean(filePathRelative) && !frontmatter.home);
```

@`plugins.blog.excerptFilter` type=`(page: Page) => boolean` default="filter 选项"

页面过滤器，此函数用于鉴别插件是否需要生成摘要。

@`plugins.blog.slugify` type=`(name: string) => string` default=`(name) => name.replace(/ _/g, '-').replace(/[:?*|\\/<>]/g, "").toLowerCase()`

Slugify 函数，用于转换 key 在路由中注册的形式。

@`plugins.blog.type` type=`BlogTypeOptions[]` default=`[]`

额外的文章类型。

参考：[指南 → 文章列表](../../guide/blog/article.md#其他类型的文章)。

@@`plugins.blog.type[*].key` type=string required

唯一的类型名称。

@@`plugins.blog.type[*].filter` type=`(page: Page) => boolean` required

一个过滤函数来决定页面是否满足此类型。

@@`plugins.blog.type[*].sorter` type=`(pageA: Page, pageB: Page) => number`

页面排序器。

@@`plugins.blog.type[*].path` type=`string | false` default=`/:key/`

待注册的页面路径，设置为 `false` 以禁用类型页面。

@@`plugins.blog.type[*].layout` type=string default=`Blog`

页面布局组件名称。

@@`plugins.blog.type[*].frontmatter` type=`(localePath: string) => Record<string, string>`

frontmatter 配置。

@`plugins.blog.article` type=string default=`/article/`

文章列表路由路径。

@`plugins.blog.category` type=string default=`/category/`

分类地图路由路径。

@`plugins.blog.categoryItem` type=string default=`/category/:name/`

分类列表路由路径。`:name` 会被自动替换为分类名称。

@`plugins.blog.tag` type=string default=`/tag/`

标签地图路由路径。

@`plugins.blog.tagItem` type=string default=`/tag/:name/`

标签列表路由路径。`:name` 会被自动替换为标签名称。

@`plugins.blog.star` type=string default=`/star/`

星标文章列表路由路径。

@`plugins.blog.timeline` type=string default=`/timeline/`

时间线列表路由路径。

@`plugins.blog.hotReload` type=boolean default="是否在使用 `--debug` 标识"

是否需要在开发服务器启用热更新。

::::

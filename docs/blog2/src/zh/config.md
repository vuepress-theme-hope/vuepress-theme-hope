---
title: 选项
icon: config
---

## getInfo

- 类型: `(page: Page) => Record<string, unknown>`
- 必填: 否

获取文章信息的函数

获取到的信息会被稍后注入至路由元数据，以便你可以在客户端中通过组合式 API 获取。

## filter

- 类型: `(page: Page) => boolean`
- 默认: `(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`

页面过滤器，此函数用于鉴别页面是否作为文章。

默认情况下，所有从 Markdown 源文件中生成的非主页页面，会被作为文章。

## metaScope

- 类型: `string`
- 默认: `'_blog'`

注入文章信息至路由元数据时使用的键名。

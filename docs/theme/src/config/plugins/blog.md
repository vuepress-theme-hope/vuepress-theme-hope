---
title: Blog Plugin Config
icon: blog
order: 4
category:
  - Config
tag:
  - Blog
  - Plugin Config
  - Theme Config
---

## Intro

The theme provides blog feature via `@vuepress/plugin-blog`, and it's **not** enabled by default.

You can enable blog feature by setting `plugins.blog` to `true` in theme options.

For instructions, please see [Blog Intro](../../guide/blog/intro.md).

## Options

:::: fields
@`plugins.blog.excerpt` type=boolean default=`true`

Whether generate excerpt for page.

@`plugins.blog.excerptSeparator` type=string default=`<!-- more -->`

Separator used to split excerpt from page content.

@`plugins.blog.excerptLength` type=number default=`300`

Length of excerpt when auto generating.

::: note

The length of the excerpt will be as close as possible to this value. If it is set to `0`, it means no excerpt will be generated automatically.

:::

@`plugins.blog.filter` type=`(page: Page) => boolean`

Page filter, determine whether a page should be included.

By default, all the pages generated from Markdown files but not homepage will be included as articles.

Its default value is:

```js
({ frontmatter, filePathRelative }) =>
  frontmatter.article ?? (Boolean(filePathRelative) && !frontmatter.home);
```

@`plugins.blog.excerptFilter` type=`(page: Page) => boolean` default="filter option"

Page filter, determine whether the plugin should generate excerpt for it.

@`plugins.blog.slugify` type=`(name: string) => string` default=`(name) => name.replace(/ _/g, '-').replace(/[:?*|\\/<>]/g, "").toLowerCase()`

Slugify function, used to convert key name which they are register in routes.

@`plugins.blog.type` type=`BlogTypeOptions[]` default=`[]`

Additional article type.

See also: [Guide → Article List](../../guide/blog/article.md#custom-article-types).

@@`plugins.blog.type[*].key` type=string required

Unique type name.

@@`plugins.blog.type[*].filter` type=`(page: Page) => boolean` required

A filter function to determine whether a page should be the type.

@@`plugins.blog.type[*].sorter` type=`(pageA: Page, pageB: Page) => number`

A custom function to sort the pages.

@@`plugins.blog.type[*].path` type=`string | false` default=`/:key/`

Page path to be registered, set to `false` to disable the type page.

@@`plugins.blog.type[*].layout` type=string default=`Blog`

Layout name.

@@`plugins.blog.type[*].frontmatter` type=`(localePath: string) => Record<string, string>`

Frontmatter.

@`plugins.blog.article` type=string default=`/article/`

Article list route path.

@`plugins.blog.category` type=string default=`/category/`

Category map route path.

@`plugins.blog.categoryItem` type=string default=`/category/:name/`

Category list route path. `:name` will be replaced by category name.

@`plugins.blog.tag` type=string default=`/tag/`

Tag map route path.

@`plugins.blog.tagItem` type=string default=`/tag/:name/`

Tag list route path. `:name` will be replaced by tag name.

@`plugins.blog.star` type=string default=`/star/`

Star article list route path.

@`plugins.blog.timeline` type=string default=`/timeline/`

Timeline list route path.

@`plugins.blog.hotReload` type=boolean default="Whether using `--debug` flag"

Whether to enable hot reload in the development server.

::::

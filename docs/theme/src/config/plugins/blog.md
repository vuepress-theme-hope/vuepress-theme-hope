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

### plugins.blog.excerpt

- Type: `boolean`
- Default: `true`

Whether generate excerpt for page.

### plugins.blog.excerptSeparator

- Type: `string`
- Default: `<!-- more -->`

Separator used to split excerpt from page content.

### plugins.blog.excerptLength

- Type: `number`
- Default: `300`

Length of excerpt when auto generating.

### plugins.blog.filter

- Type: `(page: Page) => boolean`
- Default:

  ```js
  ({ frontmatter, filePathRelative }) =>
    frontmatter.article ?? (Boolean(filePathRelative) && !frontmatter.home);
  ```

Page filter, determine whether a page should be included.

By default, all the pages generated from Markdown files but not homepage will be included as articles.

### plugins.blog.excerptFilter

- Type: `(page: Page) => boolean`
- Default: `filter` option

Page filter, determine whether the plugin should generate excerpt for it.

### plugins.blog.slugify

- Type: `(name: string) => string`
- Default: `(name) => name.replace(/ _/g, '-').replace(/[:?*|\\/<>]/g, "").toLowerCase()`

Slugify function, used to convert key name which they are register in routes.

### plugins.blog.type

- Type: `BlogTypeOptions[]`

  ```ts twoslash
  import type { Page } from "vuepress";

  interface BlogTypeOptions {
    /**
     * Unique type name
     */
    key: string;

    /**
     * A filter function to determine whether a page should be the type
     */
    filter: (page: Page) => boolean;

    /**
     * A custom function to sort the pages
     */
    sorter?: (pageA: Page, pageB: Page) => number;

    /**
     * Page path to be registered
     *
     * @default '/:key/'
     */
    path?: string;

    /**
     * Frontmatter
     */
    frontmatter?: (localePath: string) => Record<string, string>;

    /**
     * Layout name
     *
     * @default 'Blog'
     */
    layout?: string;
  }
  ```

- Default: `[]`
- Details:
  - [Guide → Article List](../../guide/blog/article.md#other-types-of-articles)

Additional article type.

### plugins.blog.article

- Type: `string`
- Default: `/article/`

Article list route path.

### plugins.blog.category

- Type: `string`
- Default: `/category/`

Category map route path.

### plugins.blog.categoryItem

- Type: `string`
- Default: `/category/:name/`

Category list route path. `:name` will be replaced by category name.

### plugins.blog.tag

- Type: `string`
- Default: `/tag/`

Tag map route path.

### plugins.blog.tagItem

- Type: `string`
- Default: `/tag/:name/`

Tag list route path. `:name` will be replaced by tag name.

### plugins.blog.star

- Type: `string`
- Default: `/star/`

Star article list route path.

### plugins.blog.timeline

- Type: `string`
- Default: `/timeline/`

Timeline list route path.

### plugins.blog.hotReload

- Type: `boolean`
- Default: Whether using `--debug` flag

Whether to enable hot reload in the development server.

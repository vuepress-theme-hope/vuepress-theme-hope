---
title: Blog Plugin Config
icon: blog
order: 3
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

### excerpt

- Type: `boolean`
- Default: `true`

Whether generate excerpt for page.

### excerptSeparator

- Type: `string`
- Default: `<!-- more -->`

Separator used to split excerpt from page content.

### excerptLength

- Type: `number`
- Default: `300`

Length of excerpt when auto generating.

### filter

- Type: `(page: Page) => boolean`
- Default: `(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`

Page filter, determine whether a page should be included.

By default, all the pages generated from Markdown files but not homepage will be included as articles.

### excerptFilter

- Type: `(page: Page) => boolean`
- Default: `filter` option

Page filter, determine whether the plugin should generate excerpt for it.

### slugify

- Type: `(name: string) => string`
- Default: `(name) => name.replace(/ _/g, '-').replace(/[:?*|\\/<>]/g, "").toLowerCase()`

Slugify function, used to convert key name which they are register in routes.

### type

- Type: `BlogTypeOptions[]`

  ```ts
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
     * @default 'BlogType'
     */
    layout?: string;
  }
  ```

- Default: `[]`
- Details:
  - [Guide → Article List](../../guide/blog/article.md#other-types-of-articles)

Additional article type.

### article

- Type: `string`
- Default: `/article/`

Article list route path.

### category

- Type: `string`
- Default: `/category/`

Category map route path.

### categoryItem

- Type: `string`
- Default: `/category/:name/`

Category list route path. `:name` will be replaced by category name.

### tag

- Type: `string`
- Default: `/tag/`

Tag map route path.

### tagItem

- Type: `string`
- Default: `/tag/:name/`

Tag list route path. `:name` will be replaced by tag name.

### star

- Type: `string`
- Default: `/star/`

Star article list route path.

### timeline

- Type: `string`
- Default: `/timeline/`

Timeline list route path.

### hotReload

- Type: `boolean`
- Default: Whether using `--debug` flag

Whether to enable hot reload in the development server.

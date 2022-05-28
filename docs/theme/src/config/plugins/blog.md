---
title: Blog Plugin Config
icon: blog
order: 2
category:
  - Config
tag:
  - Blog
  - Plugin Config
  - Theme Config
---

## Intro

The theme provides blog feature, and it’s **not** enabled by default.

You can enable blog feature by setting `plugins.blog` to `true` in theme options.

For instructions, please see [Blog Intro](../../guide/blog/intro.md).

## Options

### autoExcerpt

- Type: `boolean`
- Default: `false`

Whether to generate excerpt for every page.

### filter

- Type: `(page: Page) => boolean`
- Default: `(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`

Page filter, determine whether a page should be included.

By default, all the pages generated from Markdown files but not homepage will be included as articles.

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

### encrypted

- Type: `string`
- Default: `/encrypted/`

Encrypted articles list route path.

### slide

- Type: `string`
- Default: `/slide/`

Slides list route path.

### star

- Type: `string`
- Default: `/star/`

Star article list route path.

### timeline

- Type: `string`
- Default: `/timeline/`

Timeline list route path.

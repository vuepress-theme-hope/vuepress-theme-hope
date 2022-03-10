---
title: Blog Plugin Config
icon: blog
category:
  - Config
tag:
  - Blog
  - Plugin Config
  - Theme Config
---

## Intro

The theme provides blog feature, and it's not enabled by default.

You can enable blogging by setting `themeConfig.plugins.blog` to `true`.

For instructions, please see [Blog Intro](../../guide/blog/intro.md).

## Options

### autoExcerpt

- Type: `boolean`
- Default: `false`

Whether to generate excerpt for every page.

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

Category list route path.

### tag

- Type: `string`
- Default: `/tag/`

Tag map route path.

### tagItem

- Type: `string`
- Default: `/tag/:name/`

Tag list route path.

### encrypted

- Type: `string`
- Default: `/encrypted/`

Encrypted articles list route path.

### slides

- Type: `string`
- Default: `/slides/`

Slides list route path.

### star

- Type: `string`
- Default: `/star/`

Star article list route path.

### timeline

- Type: `string`
- Default: `/timeline/`

Timeline list route path.

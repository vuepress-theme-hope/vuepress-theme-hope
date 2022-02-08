---
title: Options
icon: config
---

## getInfo

- Type: `(page: Page) => Record<string, unknown>`
- Required: No

Function getting article info.

Article info will injected in route meta so that they will be avaiable later in client composables.

## filter

- Type: `(page: Page) => boolean`
- Default: `(page) => Boolean(page.filePathRelative) && !page.frontmatter.home`

Page filter, determine whether a page should be included.

By default, all the pages generated from Markdown files but not homepage will be included as articles.

## metaScope

- Type: `string`
- Default: `'_blog'`

Key used when injecting info to route meta.

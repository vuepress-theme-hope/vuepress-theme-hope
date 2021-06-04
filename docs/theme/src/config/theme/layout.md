---
title: Theme Layout Config
icon: config
category: config
tags:
  - themeConfig
  - config
---

## navbar

- Type: `boolean`
- Default: `false`

Whether disable navbar

## navAutoHide

- Type: `"always" | "mobile" | "none"`
- Default: `"mobile"`

Whether to hide navbar when scrolling down

## anchorDisplay

- Type: `boolean`
- Default: `true`

Whether display anchor in desktop mode

## breadcrumb

- Type: `boolean`
- Default: `true`

Whether enable route navigation globally

## Footer settings

### footer.content

- Type: `string`
- Required: false

The default content for the footer, can accept HTMLString.

### footer.copyright

- Type: `string | boolean`
- Default: `'Copyright © <author>'`

The default copyright info, set it to `false` to disable it by default.

### footer.display

- Type: `boolean`
- Default: `false`

Whether to display footer by default

## pageInfo

- Type: `string[] | false`
- Default: `['author', 'visitor', 'time', 'category', 'tag', 'reading-time']`

Article information. The order of the items decides the display order. Fill in `false` to disable it.

Available items:

- `'author'`: author
- `'time'`: writing date
- `'category'`: category
- `'tag'`: tags
- `'reading-time'`: expect reading time
- `'word'`: word number for the article
- `'visitor'`: pageviews

---
title: API Config
icon: config
---

## type

- Type: `'valine' | 'vssue' | 'disable'`
- Required: true

Comment service provider.

Setting it to `'disable'` will disable the comment feature while still enabling PageInfo feature.

## author

- Type: `string`
- Required: false

Default author for pages

## pageInfo

- Type: `string[] | false`
- Default: `['author', 'visitor', 'time', 'category', 'tag', 'reading-time']`

The order of the items decides the display order. Fill in `false` to disable it.

Available items:

- `'author'`: author
- `'time'`: writing date
- `'category'`: category
- `'tag'`: tags
- `'reading-time'`: expect reading time
- `'word'`: word number for the article
- `'visitor'`: pageviews

## comment

- Type: `boolean`
- Default: `true`

Whether to enable comment feature by default.

## wordPerminute

- Type: `number`
- Default: `300`

Reading words per minute.

## Waline config

- [See here](waline.md)

## Vssue config

- [See here](vssue.md)

## Valine config

- [See here](valine.md)

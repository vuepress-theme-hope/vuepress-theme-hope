---
title: API Config
icon: config
---

## baseLang

- Type: `string`
- Default: `'en-US'`

The language of the home directory.

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
- Default: `['Author', 'Visitor', 'Time', 'Category', 'Tag', 'ReadTime']`

The order of the items decides the display order . Fill in `false` to disable it.

Available items:

- `'Author'`: Author
- `'Time'`: Writing Date
- `'Category'`: Category
- `'Tag'`: Tags
- `'ReadTime'`: Expect reading time
- `'Word'`: Word number for the article
- `'Visitor'`: Visitor Number

## comment

- Type: `boolean`
- Default: `true`

Whether to enable comment feature by default.

## wordPerminute

- Type: `number`
- Default: `300`

Reading words per minute.

## Valine config

- [See here](valine.md)

## Vssue config

- [See here](vssue.md)

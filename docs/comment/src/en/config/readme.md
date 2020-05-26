---
icon: configuration
---

# API Config

## type

- Type: `'valine' | 'vssue' | 'disable'`
- Required: true

Use Valine or Vssue. Setting to `'disable'` will only enable PageInfo feature.

## author

- Type: `string`
- Required: false

Default author for pages

## pageInfo

- Type: `string[] | false`
- Default: `['Author', 'Visitor', 'Time', 'Category', 'Tag', 'ReadTime']`

Article information can be filled in an array, and the order of the array is the order in which the items are displayed. Fill in `false` to disable it.

The items that can be filled are as follows:

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

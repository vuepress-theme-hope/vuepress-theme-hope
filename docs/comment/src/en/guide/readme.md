---
icon: creativefill
---

# Guide

This plugin exposes two components at `@mr-hope/vuepress-plugin-comment/<component name>.vue`. Please include it manually in your theme.

- `<Comment />`: Comment component
- `<PageInfo />`: Page information component

There are two comment plugins to choose from: Valine and Vssue.

## `<PageInfo />`

The page information component (`<PageInfo />`) is enabled by default. If you need to disable it, please set `pageInfo` to `false`.

`pageInfo` accepts an array by default, the optional values and corresponding contents are as follows:

- `'Author'`: Author
- `'Time'`: Writing Date
- `'Category'`: Category
- `'Tag'`: Tags
- `'ReadTime'`: Expect reading time
- `'Word'`: Word number for the article
- `'Visitor'`: Visitor Number

By default it will display "Author, Visits, Writing Date, Categories, Tags, Estimated Reading Time"

The order of filling is the order in which the items are displayed.

You can also set `pageInfo` in the page `frontmatter` to override the global configuration.

## Comment component

You can set `comment: false` in the page frontmatter to disable comments on specific pages.

### Valine

See [Valine Config Guide](valine.md)

### Vssue

See [Vssue Config Guide](vssue.md)

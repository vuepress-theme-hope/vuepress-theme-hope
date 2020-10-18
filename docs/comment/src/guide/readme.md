---
icon: creativefill
---

# Guide

This plugin exposes two components at `@mr-hope/vuepress-plugin-comment/<component name>.vue`. Please include it manually in your theme.

- `<Comment />`: Comment component
- `<PageInfo />`: Page information component

There are two comment plugins to choose from: Valine and Vssue.

## `<PageInfo />`

You need to insert the page information component (`<PageInfo />`) before the `<Content />` component.

- [View Details](page-info.md)

## `<Comment />`

It is recommended to insert the comment component (`<Comment />`) after the `<PageNav />` component.

`<Comment />` components are enabled globally by default. You can disable it by setting `comment: false` in `Front Matter` on a specific page.

To keep it globally disabled, please set `comment` to `false` in the plugin options. This way you can set `comment: true` in the frontmatter of a particular page to enable it locally.

There are two comment plugins to choose from: Valine and Vssue.

### Valine

See [Valine Config Guide](valine.md)

### Vssue

See [Vssue Config Guide](vssue.md)

---
title: 指南
icon: creative
---

此插件暴露两个组件，路径为 `@mr-hope/vuepress-plugin-comment/<组件名>.vue`。请在你的主题中手动引入。

- `<Comment />`: 评论组件
- `<PageInfo />`: 页面信息组件

## `<PageInfo />`

你需要将页面信息组件 (`<PageInfo />`) 插入在 `<Content />` 组件前。

- [查看详情](page-info.md)

## `<Comment />`

推荐将评论组件 (`<Comment />`) 插入在 `<PageNav />` 组件后。

`<Comment />` 组件默认全局启用。你可以在特定页面的 `Front Matter` 中设置 `comment: false` 来局部禁用它。

如果你需要保持全局禁用，请在插件选项中设置 `comment` 为 `false`。这样你可以在特定页面的 `Front Matter` 中设置 `comment: true` 来局部启用它。

有两个评论插件可以选择: Valine 和 Vssue。

### Valine

[详见 Valine 指南](valine.md)

### Vssue

[详见 Vssue 指南](vssue.md)

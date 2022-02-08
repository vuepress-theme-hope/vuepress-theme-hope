---
title: 指南
icon: creative
---

此插件会全局注册评论组件 `<CommentService />`。

推荐将评论组件 (`<CommentService />`) 插入在 `<PageNav />` 组件后。

`<CommentService />` 组件默认全局启用。你可以在特定页面的 frontmatter 中设置 `comment: false` 来局部禁用它。

如果你需要保持全局禁用，请在插件选项中设置 `comment` 为 `false`。这样你可以在特定页面的 frontmatter 中设置 `comment: true` 来局部启用它。

目前只能选择 Waline。

### Waline

[详见 Waline 指南](waline.md)

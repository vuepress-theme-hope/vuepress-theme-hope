---
title: 指南
icon: lightbulb
---

## 添加评论

该插件全局注册了一个组件 `<CommentService />`。

- 如果你是用户，你应该使用 `alias` 和布局槽来插入组件。 我们建议你在 `<PageNav />` 组件之后插入评论组件 (`<CommentService />`)，并且[这里有一个 demo](../demo.md) 使用默认主题供参考。
- 如果你是主题开发者，你应该将这个组件插入到你的主题布局中。

## 评论状态

默认情况下，`<CommentService />` 组件是全局启用的，你可以在插件选项和页面 frontmatter 中使用 `comment` 选项来控制它。

- 你可以通过在页面 frontmatter 中设置 `comment: false` 在本地禁用它。

- 要使其全局禁用，请在插件选项中将 `comment` 设置为 `false`。 然后你可以在页面 frontmatter 中设置 comment: true 以在局部启用它。

## 评论服务

目前你可以选择 Giscus、Waline、 Twikoo 和 Artalk。

::: tip 选择评论服务

你的博客或文档的目标人群:

- 程序员和开发人员: Giscus
- 公众: Waline

:::

- [Giscus 指南](giscus.md)

- [Waline 指南](waline.md)

- [Twikoo 指南](twikoo.md)

- [Artalk 指南](artalk.md)

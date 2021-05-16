---
title: 指南
icon: creative
---

此插件暴露两个组件，路径为 `@mr-hope/vuepress-plugin-comment/lib/client/<组件名>.vue`。请在你的主题中手动引入。

- `<Comment />`: 评论组件
- `<PageInfo />`: 页面信息组件

## `<PageInfo />`

你需要将页面信息组件 (`<PageInfo />`) 插入在 `<Content />` 组件前。

- [查看详情](page-info.md)

## `<Comment />`

推荐将评论组件 (`<Comment />`) 插入在 `<PageNav />` 组件后。

`<Comment />` 组件默认全局启用。你可以在特定页面的 frontmatter 中设置 `comment: false` 来局部禁用它。

如果你需要保持全局禁用，请在插件选项中设置 `comment` 为 `false`。这样你可以在特定页面的 frontmatter 中设置 `comment: true` 来局部启用它。

有三个评论插件可以选择: Waline、Vssue 和 Valine。

::: tip 评论服务的比较

- Waline 需要后端服务器以及额外的配置，支持页面访问量统计，无需登录账号即可评论。可以使用 Vercel。
- Vssue 使用代码平台仓库的 issue 面板，需要用户登录或注册相应平台账号。
- Valine 使用 leancloud，支持页面访问量统计，无需登录账号即可评论

如果你的站点面向大众而非程序员，推荐使用 Waline。

:::

### Waline

[详见 Waline 指南](waline.md)

### Vssue

[详见 Vssue 指南](vssue.md)

### Valine

[详见 Valine 指南](valine.md)

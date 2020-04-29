---
icon: creativefill
---

# 指南

此插件暴露两个组件，路径为 `@mr-hope/vuepress-plugin-comment/<组件名>.vue`。请在您的主题中手动引入。

- `<Comment />`：评论组件
- `<PageInfo />`: 页面信息组件

有两个评论插件可以选择: Valine 和 Vssue。

## 页面信息组件

页面信息组件默认启用，如果你需要将它禁用，请设置 `pageInfo` 为 `false`。

`pageInfo` 默认接受一个数组，可选的值和对应内容如下:

- `'Author'`: 作者
- `'Time'`: 写作日期
- `'Category'`: 分类
- `'Tag'`: 标签
- `'ReadTime'`: 预计阅读时间
- `'Word'`: 字数
- `'Visitor'`: 访问量

默认会显示 “作者，访问量，写作日期，分类，标签，预计阅读时间”。

填入的顺序即是各条目显示的顺序。

你也可以在页面的 `frontmatter` 中设置 `pageInfo` 来覆盖全局的默认配置。

## 评论组件

你也可以在页面的 `frontmatter` 中设置 `comment: false` 来禁用特定页面的评论。

### Valine

[详见 Valine 指南](valine.md)

### Vssue

[详见 Vssue 指南](vssue.md)

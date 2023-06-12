---
title: 页面
icon: file
order: 5
category:
  - 布局
tag:
  - 布局
  - 页面
---

## 图标支持

你可以在页面的 frontmatter 中配置 `icon` 字段，填入对应图标的 FontClass 即可绑定图标到页面。

该图标会在导航栏，侧边栏，路径导航和标题中使用。

::: details 例子

```md
---
icon: home
---
```

:::

::: info

图标的相关设置，详见 [图标支持](../interface/icon.md)

:::

## 路径导航

详见 [路径导航](breadcrumb.md) 章节。

## 文章信息展示

详见 [文章信息](../feature/page-info.md) 章节。

## 标题列表

在桌面模式下，文章的标题列表会自动显示在屏幕的右侧。(在移动视图下它们会放置在侧边栏里)

如果你不希望在桌面模式下显示右侧的标题列表，请在主题选项中设置 `toc: false`。

你也可以在特定页面的 frontmatter 中通过 `toc` 来指定它。

### 设置标题深度

你可以通过在主题选项和页面 frontmatter 中设置 headerDepth 来自定义标题列表的深度。

::: note

有效最大值取决于你通过 [markdown.headers.level](https://vuejs.press/zh/reference/config.html#markdown.headers) 提取了哪些级别的标题。

由于 [markdown.headers.level](https://vuejs.press/zh/reference/config.html#markdown.headers) 的默认值是 `[2, 3]` ，因此 `headerDepth` 的默认最大值是 `2` 。

:::

## 贡献者与最后更新时间

详见 [页面元数据](../feature/meta.md) 章节。

## 上 / 下一篇链接

<!-- TODO: Improve it -->

上一篇和下一篇文章的链接将会自动地根据当前页面的侧边栏的顺序来获取。你也可以通过主题选项或 frontmatter 来明确地重写或者禁用它:

```md
---
prev: ./some-other-page
next: false
---
```

## 评论

具体详情请见 [评论](../feature/comment.md) 章节。

## 自定义布局

默认情况下，每个 `*.md` 文件将会被渲染在一个 `<div class="page">` 容器中，同时还有侧边栏、自动生成的编辑链接，以及上 / 下一篇文章的链接。如果你想要使用一个完全自定义的组件来代替当前的页面，你可以通过 frontmatter 来指定布局组件。

```md
---
layout: SpecialLayout
---
```

这将会为当前的页面渲染 VuePress 中注册的 SpecialLayout 布局。

::: note

主题只提供了 `Layout`，`404` 布局。

同时主题:

- 在博客功能启用时提供 `Blog` 布局
- 在幻灯片功能启用时提供 `Slide` 布局

如果你想使用你自己的布局，详见 [继承主题](../advanced/extend.md)。

:::

## 自定义容器 Class

默认情况下，每个页面都会渲染在 class 为 `theme-container` 的 `div` 中。如果你需要对特定页面应用一些特殊样式，你可以通过在 frontmatter 中设置 `containerClass` 来额外指定一个类名

```md
---
containerClass: fancy-container
---
```

这将会为当前的页面渲染在 `<div class="theme-container fancy-container" />` 中。

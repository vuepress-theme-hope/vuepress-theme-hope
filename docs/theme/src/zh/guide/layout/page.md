---
title: 页面
icon: file
order: 4
category:
  - 布局
tag:
  - 布局
  - 页面
---

## 图标支持

你可以在页面 Frontmatter 中设置 `icon` 来为页面设置图标，详见 [图标支持](../interface/icon.md)。

该图标会在导航栏，侧边栏，路径导航和标题中使用。

::: details 例子

```md
---
icon: home
---
```

:::

## 路径导航

主题添加了开箱即用的路径导航支持。

你可以在主题选项和页面 Frontmatter 中通过 `breadcrumb` 设置一个布尔值来控制全局和特定页面的路径导航显示。

路径导航的图标也是可配置的，你可以在主题选项和页面 Frontmatter 中通过 `breadcrumbIcon` 设置一个布尔值来控制全局和特定页面的行为。

如果你不希望某个页面被添加到路径导航中（例如：首页），你可以在页面的 Frontmatter 中设置 `breadcrumbExclude: true`。

## 文章信息展示

详见 [文章信息](../feature/page-info.md) 章节。

## 标题列表

在桌面模式下，文章的标题列表会自动显示在屏幕的右侧。(在移动视图下它们会放置在侧边栏里)

如果你不希望在桌面模式下显示右侧的标题列表，请在主题选项中设置 `toc: false`。

你也可以在特定页面的 Frontmatter 中通过 `toc` 来指定它。

::: tip 自定义 TOC 标题

你可以通过在主题选项和页面 Frontmatter 中设置一个对象 `toc` 来自定义 TOC 标题，该对象可能包含以下属性：

- `selector`: 选择器的标题。

  默认值为 `"#markdown-content >  h1, #markdown-content > h2, #markdown-content > h3, #markdown-content > h4, #markdown-content > h5, #markdown-content > h6, [vp-content] > h2"`。

- `depth`: 标题的级别。

  `1` 到 `6` 对应 `<h1>` 到 `<h6>`

  - `false`: 没有标题。
  - `number`: 仅显示该级别的标题。
  - `[number, number]`: 标题级别元组，第一个数字应该小于第二个数字，例如 `[2, 4]`，表示将显示所有从 `<h2>` 到 `<h4>` 的标题。
  - `deep` (默认): 同 `[2, 6]`，表示将显示所有从 `<h2>` 到 `<h6>` 的标题。

- `ignore`: 忽略标题中的特定元素，应该是一个字符串数组，默认值为 `[".vp-badge", ".vp-icon"]`。

:::

## 贡献者与最后更新时间

详见 [页面元数据](../feature/meta.md) 章节。

## 上 / 下一篇链接

上一篇和下一篇文章的链接将会自动地根据当前页面的侧边栏的顺序来获取。你也可以通过主题选项或 frontmatter 来明确地重写或者禁用它:

```md
---
prev: ./some-other-page
next: false
---
```

你也可以通过传递一个拥有 title, icon 和 link 的对象来完全自定义它。

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

如果你想使用你自己的布局，你可以在 [客户端配置文件中注册布局](https://vuejs.press/zh/advanced/cookbook/usage-of-client-config.html#layouts)。

:::

## 自定义容器 Class

默认情况下，每个页面都会渲染在 class 为 `theme-container` 的 `div` 中。如果你需要对特定页面应用一些特殊样式，你可以通过在 frontmatter 中设置 `containerClass` 来额外指定一个类名

```md
---
containerClass: fancy-container
---
```

这将会为当前的页面渲染在 `<div class="theme-container fancy-container" />` 中。

---
title: 页面
icon: page
category: layout
tags:
  - layout
  - page
---

## 图标支持

你可以在页面的 frontmatter 中配置 `icon` 字段，填入对应图标的 FontClass 即可绑定图标到页面。

::: details 例子

```md
---
icon: home
---
```

:::

该图标会在导航栏，侧边栏，路径导航和标题中使用。

::: info

图标的相关设置，详见 [图标支持](../interface/icon.md)

:::

## 路径导航

详见 [路径导航](breadcrumb.md) 章节。

## 文章信息展示

详见 [文章信息](../feature/page-info.md) 章节。

## 标题列表

在桌面模式下，文章的标题列表会自动显示在屏幕的右侧。(在移动视图下它们会放置在侧边栏里)

如果你不希望在桌面模式下显示右侧的标题列表，请将 `themeConfig.anchorDisplay` 设置为 `false`。

你也可以在特定页面的 frontmatter 中通过 `anchorDisplay` 来指定它。

## 贡献者与最后更新时间

详见 [Git 信息插件](../feature/git.md) 章节。

## 上 / 下一篇链接

上一篇和下一篇文章的链接将会自动地根据当前页面的侧边栏的顺序来获取。你也可以使用 `themeConfig` 或 frontmatter 来明确地重写或者禁用它:

```md
---
prev: ./some-other-page
next: false
---
```

## 评论

具体详情请见 [评论](../feature/comment.md) 章节。

## 特定页面的自定义布局

默认情况下，每个 `*.md` 文件将会被渲染在一个 `<div class="page">` 容器中，同时还有侧边栏、自动生成的编辑链接，以及上 / 下一篇文章的链接。如果你想要使用一个完全自定义的组件来代替当前的页面，你可以通过 frontmatter 来指定布局组件。

```md
---
layout: SpecialLayout
---
```

这将会为当前的页面渲染 `.vuepress/components/SpecialLayout.vue` 布局。

---
title: 主题介绍
icon: circle-info
star: true
order: 1
category:
  - 快速上手
tag:
  - 快速上手
  - 介绍
---

## 主题初衷

制作本主题的初衷是发现 VuePress 默认的主题只是一个提供基础文档布局的主题。

例如，它不会为 SEO 优化注入元标记，也不会生成 Sitemap 来帮助搜索引擎索引文档的内容。

VuePress 虽然在一定程度上扩展了 Markdown 语法，但仍然缺少一些常用的功能，如文本对齐、标记、流程图、公式、展示等，同时默认主题提供的一些功能较弱或缺失 ，比如图片预览，深色模式等。

在这种情况下，`vuepress-theme-hope` 和一些系列插件就应运诞生。

主题不仅在默认主题的基础上**大幅提高美观性**，同时搭配各种插件，**在各种细节与功能上为 VuePress 提供全方位的增强**。

::: warning 一个拥有插件和强大主题的项目

[vuepress-theme-hope/vuepress-theme-hope](https://github.com/vuepress-theme-hope/vuepress-theme-hope) 虽然标明了其为主题仓库，但它同时包含了十多个同样功能完善且强大的插件。每一个插件也都是由 Mr.Hope 精心开发，功能足够强大，可以自由搭配默认主题或者第三方主题单独使用。

而基于这样十几个插件，Mr.Hope 才可以自信的说 `vuepress-theme-hope` 是“**一个带有成吨功能的强大主题**”。它也可以看作是 VuePress 所有主题中，功能最多，覆盖最全面的主题。

:::

## 设计目标

- ### 强大且独立的功能

  我们将每个功能提取到一个插件中，以便用户可以在其他主题中使用它们或单独自定义它们的行为。

- ### 最小化配置

  如果可能，所有功能都会尝试生成默认值，因此你可以在零配置或最小配置下使用它们。

  这有助于减少你的迁移或学习成本，同时直接享受它们的便利。

- ### 改进的布局

  主题界面已经完全重构，以提供可定制和漂亮的布局。

- ### 可拆分

  借助 Vue3 的组合 API，主题在保持强大的同时充分实现了“Tree-shaking”。

  主题将只运行你想要的功能，而不会因其他功能而变慢或影响打包大小。

## 因何强大

### 更丰富的内容

主题为 Markdown 提供了大量的扩展语法支持，让你在正文插入更多的内容。

- 如果你是一名文学爱好者想放置一些随笔，主题提供了 [自定义对齐](../markdown/align.md) 与 [脚注](../markdown/footnote.md)。

- 如果你希望存放一些知识笔记，主题提供了 [自定义容器](../markdown/container.md)、[标记](../markdown/mark.md)、[徽章](../markdown/components.md)、[任务列表](../markdown/tasklist.md) 与 [公式](../markdown/tex.md) 支持。

- 如果你是一名程序员需要大量展示代码与 demo，本主题为代码块提供了浅色与深色两种主题，[代码组](../markdown/code-tabs.md) 与 ["一键复制" 按钮](../feature/copy-code.md)。同时我们还提供 [代码演示](../markdown/demo.md)，[Playground](../markdown/playground.md) 和 [Vue Playground](../markdown/vue-playground.md) 功能，方便你展示自己的 Vue、React 组件或者其他 demo。

- 如果你需要提供产品文档与展示，主题提供了 [选项卡](../markdown/tabs.md)、[幻灯片](../markdown/presentation.md)、[图表](../markdown/chart.md)、[流程图](../markdown/flowchart.md) 与 [Mermaid 图表](../markdown/mermaid.md) 功能。

总之，任何人都可以享受 Markdown 增强语法带来的便利。

### UI 改进

- [夜间模式支持](../interface/darkmode.md)

- [图标支持](../interface/icon.md)

- [自定义代码块主题](../interface/code-theme.md)

- [完整的无障碍支持](../interface/accessibility.md)

- [文章信息](../feature/page-info.md)

- [图片预览功能](../feature/photo-swipe.md)

### 布局改进

- [导航栏](../layout/navbar.md):

  添加了图标和路径前缀支持

  移动布局的导航栏布局已完全重构

- [侧边栏](../layout/sidebar.md):

  添加了图标和路径前缀支持

  侧边栏可以从 [页面标题](../layout/sidebar.md#通过标题自动生成) 和 [文件结构](../layout/sidebar.md#通过文件结构自动生成) 自动生成。

- [主页](../layout/home.md):

  全新外观，主页特性模块支持图标与跳转。

- [目录](../layout/catalog.md)

  自动生成目录页面

- 更多:

  新增 [路径导航](../layout/breadcrumb.md), [页面标题](../layout/page#标题列表) 与 [页脚](../layout/footer.md) 支持。

### 搜索功能

- [VuePress 官方搜索插件](../feature/search.md) 的内置支持。

- [基于客户端搜索的 search-pro 插件](../feature/search.md#使用-vuepress-plugin-search-pro) 支持。

### 完整的博客支持

主题引入了完整的博客支持，你可以启用全新的 [博客主页](../blog/home.md)。

- 内置的 [分类、标签](../blog/category-and-tags.md)、[时间线](../blog/timeline.md)、[文章精选](../blog/article.md) 等功能。

- 提供 [评论功能](../feature/comment.md) 以便你可以与你的访客交流。

- 支持创建 [Feed](../advanced/feed.md)，以便他人可以订阅你的网站。

### 搜索引擎增强

- 提供 [SEO 增强](../advanced/seo.md)，会自动注入网站信息以完整支持 OGP 与 JSON-LD 协议，增强搜索引擎索引。

- 提供 [Sitemap 生成](../advanced/sitemap.md)

- 提供 [PWA 支持](../advanced/pwa.md)，使你的站点可被安装。

### 其他

- 复制时 [追加版权信息](../feature/copyright.md)，也可禁用页面复制和选择。

- 提供 [文章加密](../feature/encrypt.md) 功能，保护隐私信息。

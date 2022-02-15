---
title: 主题介绍
icon: info
category:
  - Get Started
tag:
  - intro
---

## 主题初衷

制作本主题的初衷是发现 VuePress 只是一个单纯的静态文档生成器。举个例子，它并不会注入 meta 标签做 SEO 优化，也不会生成 Sitemap 帮助搜索引擎索引文档内容。

虽然 VuePress 在一定程度上扩展了 Markdown 语法，它仍然缺失一些常用的功能，比如文本对齐、标记、流程图、公式、演示等。同时默认主题提供的一些功能，也比较弱或者缺失，如图片预览，深色模式等。

在这种情况下，`vuepress-theme-hope` 和一些系列插件就应运诞生。

主题不仅在默认主题的基础上**大幅提高美观性**，同时搭配各种插件，**在各种细节与功能上为 VuePress 提供全方位的增强**。

::: warning 本项目不是单纯一个主题

[vuepress-theme-hope/vuepress-theme-hope](https://github.com/vuepress-theme-hope/vuepress-theme-hope) 虽然标明了这是一个主题仓库，但是它同时包含了十多个同样功能完善且强大的插件。每一个插件也都是由 Mr.Hope 精心开发，功能足够强大，可以自由搭配默认主题或者第三方主题单独使用。

而基于这样十几个插件，Mr.Hope 才可以自信的说 `vuepress-theme-hope` 是“**一个带有成吨功能的强大主题**”。它也可以看作是 vuepress 所有主题中，功能最多，覆盖最全面的主题。

:::

## 设计目标

::: info v1 的设计目标

- 方向: 主题的所有功能都是为了增强文档**内容丰富性**与**可传播性**。

- 功能的强大与独立: 本主题会对功能提供全面的细节，并将它们解构成独立插件，以便用户在其他主题中引入并使用他们。

- 零或低配置: 本主题的所有功能都尽可能设计成在零配置或低配置下即可工作，以便尽可能降低你的迁移或学习成本，直接享受到它们的便利。

:::

在已经完善的 V1 基础上，v2 进一步的进行了:

- 美观度提升: 主题界面不在基于默认主题的布局与样式，进行了完全的重构。

- 功能的解构: 借助 Vue3 的组合式 API 主题在保持强大的同时进一步增强了 “Tree Shakeable”。

  主题会只运行你需要的哪些功能，不会被其他功能拖慢或影响构建大小。

## 强大在哪

### 更丰富的内容

主题为 Markdown 提供了大量的扩展语法支持，让你在正文插入更多的内容。

- 如果你是一名文学爱好者想放置一些随笔，主题提供了 [自定义对齐](../markdown/align.md) 与 [脚注](../markdown/footnote.md)。

- 如果你希望存放一些知识笔记，主题提供了 [自定义容器](../markdown/container.md)、[标记](../markdown/mark.md)、[徽章](../markdown/components.md)、[任务列表](../markdown/tasklist.md) 与 [公式](../markdown/tex.md) 支持。

- 如果你是一名程序员需要大量展示代码与 demo，本主题为代码块提供了浅色与深色两种主题，[代码组](../markdown/code-group.md) 与 ["一键复制" 按钮](../feature/copy-code.md)。同时我们还提供 [代码演示](../markdown/demo.md) 功能，方便你展示自己的 Vue、React 组件或者其他 demo。

- 如果你需要提供产品文档与展示，主题提供了 [幻灯片](../markdown/presentation.md)、[流程图](../markdown/flowchart.md) 与 [Mermaid 图表](../markdown/mermaid.md) 功能。

总之，任何人都可以享受 Markdown 增强语法带来的便利。

### 搜索引擎增强

- 提供 [SEO 增强](../feature/seo.md)，会自动注入网站信息以完整支持 OGP 与 JSON-LD 协议，增强增强搜索引擎索引。

- 提供 [Sitemap 生成](../feature/sitemap.md)

### 页面 UI

- 主页: 全新外观，特性支持图标与跳转。

- 页面: [**页面图标**](../interface/icon.md)、[**文章信息**](../feature/page-info.md)、**标题目录**、[图片预览功能](../feature/photo-swipe.md)。

- 站点结构: 简化了 [导航栏](../layout/navbar.md) 与 [侧边栏](../layout/sidebar.md) 配置，添加了图标与路径前缀支持。同时主题添加了[**路径导航**](../layout/page.md#路径导航) 与页脚支持。

### 完整的博客支持

主题引入了完整的博客支持，你可以启用全新的 [**博客主页**](../blog/home.md)。

- 内置的 [分类、标签](../blog/category-and-tags.md)、[时间线](../blog/timeline.md)、[文章精选](../blog/article.md) 等功能。

- 提供 [**评论**](../feature/comment.md) 功能以便你可以与你的访客交流。

- 支持创建 [Feed](../feature/feed.md)，以便他人可以订阅你的网站。

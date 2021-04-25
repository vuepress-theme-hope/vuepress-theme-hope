---
title: 主题介绍
icon: info
category: Get Started
tags:
  - intro
---

## 🎈 主题的初衷与设计目标

### 初衷

制作本主题的初衷是发现 VuePress 只是一个单纯的静态文档生成器。举个例子，它并不会注入 meta 标签做 SEO 优化，也不会生成 Sitemap 帮助搜索引擎索引文档内容。

由于尤雨溪转向 Vite 驱动的 VitePress，VuePress 的社区生态也越来越差，一些开发者占用了最直观的插件名称，如 `copy-code` `feed` `seo` `sitemap` 等，却提供很弱的功能，并不再提供任何更新。

虽然 VuePress 在一定程度上扩展了 Markdown 语法，它仍然缺失一些常用的功能，比如文本对齐、标记、流程图、公式、演示等。同时默认主题提供的一些功能，也比较弱或者缺失，如图片预览，暗黑模式等。

在这种情况下，`vuepress-theme-hope` 就设计诞生。由于开发者 Mr.Hope 本人就读物理专业，对设计方面并不擅长，所以本主题在 UI 上很大程度保持默认主题的简约风格，不做过多的改动，而在致力于**各种细节与功能上为 VuePress 提供全方位的增强**。

### 设计目标

- 方向: 主题的所有功能都是为了增强文档**内容丰富性**与**可传播性**。

- 功能的强大与独立: 本主题会对功能提供全面的细节，并将它们解构成独立插件，以便用户在其他主题中引入并使用他们。

- 零配置或低置: 本主题的所有功能都尽可能设计成在零配置或低配置下即可工作，以便尽可能降低你的迁移或学习成本，直接享受到它们的便利。

## ✨ 为什么说它 powerful

### Markdown

主题为 Markdown 提供了大量的扩展语法支持，让你在正文插入更多的内容。

- 如果你是一名文学爱好者想放置一些随笔，主题提供了 [自定义对齐](../markdown/align.md) 与 [脚注](../markdown/footnote.md)。

- 如果你希望存放一些知识笔记，主题提供了 [标记](../markdown/mark.md)、[任务列表](../markdown/tasklist.md) 与 [公式](../markdown/tex.md) 支持。

- 如果你是一名程序员需要大量展示代码与 demo，本主题为代码块提供了浅色与深色两种主题，代码组 `<CodeGroup />` 与 ["一键复制" 按钮](../feature/copy-code.md)。同时我们还提供 [代码演示](../markdown/demo.md) 功能，方便你展示自己的 Vue、React 组件或者其他 demo。

- 如果你需要提供产品文档与展示，主题提供了 [幻灯片](../markdown/presentation.md)、[流程图](../markdown/flowchart.md) 与 [Mermaid 图表](../markdown/mermaid.md) 功能。

总之，任何人都可以享受 Markdown 增强语法带来的便利。

### 搜索引擎增强

主题提供 [SEO 增强](../feature/seo.md)，自动向网页注入 meta 标签增强搜索引擎索引。

主题也提供 [Sitemap 生成](../feature/sitemap.md) 提供自动的 Sitemap 生成。

### 页面 UI

- 主页: 多个动作按钮支持，UI 优化。

- 页面: [**页面图标**](../interface/icon.md)、[**文章信息**](../feature/page-info.md)、**标题目录**、图片预览功能。

- 站点结构: 简化了 [导航栏](../layout/navbar.md) 与 [侧边栏](../layout/sidebar.md) 配置，添加了图标与路径前缀支持。同时主题添加了[**路径导航**](../layout/page.md#路径导航) 与页脚支持。

### 博客

主题提供了 [分类、标签](../blog/category-and-tags.md)、[时间线](../blog/timeline.md)、[文章精选](../blog/article.md) 等功能，并提供了全新的 [**博客主页**](../blog/home.md)。

同时主题还提供了 [**评论**](../feature/comment.md)、[**Feed**](../feature/feed.md) 等博客常用内容。

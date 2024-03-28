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

VuePress 在一定程度上扩展了 Markdown 语法，但仍然缺少一些常用的功能，例如文本对齐、标记、流程图、公式、演示等，同时默认主题提供的一些功能较弱或缺失，如图片预览、代码块复制、目录页等。同时 VuePress 默认主题太简陋，功能不够强大。在这种情况下，`vuepress-theme-hope` 和一些系列插件就应运诞生。

与默认主题相比，我们不仅**大大改进了美观度**，而且**通过主题插件为 VuePress** 提供了全方位的增强功能。

## 设计目标

::: info 强大且独立的功能

我们将每个功能提取到一个插件中，以便用户可以在其他主题中使用它们或单独自定义它们的行为。

:::

::: info 最小化配置

如果可能，所有功能都会尝试使用默认值，因此你可以在零配置或最小配置下使用它们。

这有助于减少你的迁移或学习成本，同时直接享受它们的便利。

:::

::: info 改进的布局

主题界面已经完全重构，以提供可定制和漂亮的布局。

:::

::: info 可拆分

借助 Vue3 的组合 API，主题在保持强大的同时充分实现了“Tree-shaking”。

主题将只运行你想要的功能，而不会因其他功能而变慢或影响打包大小。

:::

## 因何强大

### 更丰富的内容

主题为 Markdown 提供了大量的扩展语法支持，让你在正文插入更多的内容。

- 如果你是一名文学爱好者想放置一些随笔，主题提供了 [自定义对齐](../markdown/stylize/align.md) 与 [脚注](../markdown/content/footnote.md)。

- 我们对 [图片进行了一些内置增强](../markdown/grammar/image.md)。

- 如果你希望存放一些知识笔记，主题提供了 [自定义容器](../markdown/stylize/hint.md)、[标记](../markdown/stylize/mark.md)、[任务列表](../markdown/grammar/tasklist.md)、[思维导图](../markdown/chart/markmap.md) 与 [公式](../markdown/grammar/tex.md) 支持。

- 如果你是一名程序员需要大量展示代码与 demo，本主题为代码块提供了浅色与深色两种主题，[代码组](../markdown/code/code-tabs.md) 与 ["一键复制" 按钮](../feature/copy-code.md)。同时我们还提供 [代码演示](../markdown/code/demo.md)，[Playground](../markdown/code/playground.md) [Kotlin Playground](../markdown/code/kotlin-playground.md) 和 [Vue Playground](../markdown/code/vue-playground.md) 功能，方便你展示自己的 Vue、React 组件或者其他 demo。

- 如果你需要提供产品文档与展示，主题提供了 [选项卡](../markdown/content/tabs.md)、[幻灯片](../markdown/content/revealjs.md)、[图表](../markdown/chart/chartjs.md)、[echarts](../markdown/chart/echarts.md)、[流程图](../markdown/chart/flowchart.md) 与 [Mermaid 图表](../markdown/chart/mermaid.md) 功能。

- 为了重新组织您的内容，主题提供了[文件包含](../markdown/content/include.md)功能。

- 为了设置内容的样式，主题提供了[下标和上标](../markdown/grammar/sup-sub.md)、[属性设置](../markdown/stylize/attrs.md)和 [样式化](../markdown/stylize. md) 功能，并为您提供了很多[有用的组件](../component/built-in.md)。

总之，任何人都可以享受 Markdown 增强语法带来的便利。

### UI 改进

- [夜间模式支持](../interface/darkmode.md)

- [图标支持](../interface/icon.md)

- [自定义代码块主题](../interface/code-theme.md)

- [主题颜色](../interface/theme-color.md): 允许您在浏览过程中动态切换

- 更多:

  [全屏按钮](../interface/others.md#全屏按钮)、[返回顶部按钮](../interface/others.md#返回顶部按钮)、[打印按钮](../interface/others.md#打印按钮)、[无障碍完整支持](../interface/accessibility.md) 和 [RTL 布局](../interface/others.md#rtl-布局)。

### 布局改进

- [导航栏](../layout/navbar.md):

  - 支持图标和路径前缀。
  - 改进了移动设备上的布局。

- [侧边栏](../layout/sidebar.md):

  - 支持图标和路径前缀。
  - 从 [页面标题](../layout/sidebar.md#通过标题自动生成) 和 [文件结构](../layout/sidebar.md#通过文件结构自动生成) 自动生成。

- [全新主页外观，支持特性与亮点](../layout/home.md)

- 更多:

  增加 [路径导航](../layout/breadcrumb.md), [页面标题](../layout/page#标题列表) 与 [页脚](../layout/footer.md) 支持。

### 页面元数据

- [页面信息](../feature/page-info.md) 包括：

  - 作者
  - 书写日期
  - 字数统计和预计阅读时间
  - 标签和类别
  - 浏览量

- [贡献者和最后更新时间](../feature/meta.md#基于-git-的信息)

- [编辑链接](../feature/meta.md#编辑此页链接)

### 功能

- [图片预览](../feature/photo-swipe.md) 支持缩放、拖动、幻灯片浏览、分享和下载

- [自动生成目录页](../feature/catalog.md)

- 搜索功能

  - [基于 docsearch 的爬虫搜索支持](../feature/search.md#使用-vuepressplugin-docsearch)
  - [基于 slimsearch 的强大客户端搜索支持](../feature/search.md#使用-vuepress-plugin-search-pro)。

- [页面加密](../feature/encrypt.md) 功能来限制访问。

- 复制时 [附加版权信息](../feature/copyright.md)，或直接禁用页面复制和选择

- 搜索引擎优化

  - [SEO 增强](../advanced/seo.md) 完全支持 OGP 和 JSON-LD 协议

  - [站点地图生成](../advanced/sitemap.md)

  - [PWA 功能](../advanced/pwa.md)

### 完整的博客支持

该主题支持[博客](../blog/intro.md)，[有置顶功能的文章列表，星标文章，自动摘录生成，自动摘要](../blog/article.md)。

- 支持[类别和标签](../blog/category-and-tags.md)、[时间线](../blog/timeline.md)。

- 全新的[博客主页](../blog/home.md)。

- 提供 [评论功能](../feature/comment.md) 以便你可以与你的访客交流。

- 支持创建 [Feed](../advanced/feed.md)，以便他人可以订阅你的网站。

## 内置插件 🧩

本主题包含了以下内建插件，如果有需要，你也可以单独进行使用或搭配其他主题。

- <ProjectLink name="components" path="/zh/">vuepress-plugin-components</ProjectLink>: 提供一些开箱即用的插件

- <ProjectLink name="md-enhance" path="/zh/">vuepress-plugin-md-enhance</ProjectLink>: 提供更多 Markdown 语法

- <ProjectLink name="sass-palette" path="/zh/">vuepress-plugin-sass-palette</ProjectLink>: 面向全部插件和主题的 Sass 配置插件

::: tip

这里还有一些其他没有被主题捆绑的插件，你可以根据自己的需求自行启用。

- <ProjectLink name="lightgallery" path="/zh/">vuepress-plugin-lightgallery</ProjectLink>: 基于 lightgallery 图片浏览插件

- <ProjectLink name="search-pro" path="/zh/">vuepress-plugin-search-pro</ProjectLink>: 客户端搜索插件

:::

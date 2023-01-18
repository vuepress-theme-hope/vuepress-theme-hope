---
title: 指南
icon: lightbulb
index: false
category:
  - 介绍
tag:
  - 介绍
---

::: tip

如果你在使用过程中遇到了 bug，可以 [提一个 issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues) 或者 [加入 QQ 群](https://jq.qq.com/?_wv=1027&k=rATJyxGK) (群号: 1003437555) 进行反馈。

:::

## 主题特点 ✨

主题很大程度上继承了 VuePress 默认主题的配置，并在此基础上添加了大量功能与布局优化。

<!-- more -->

### Markdown

为 Markdown 添加了更多语法，丰富文档与博客写作:

- [自定义容器](markdown/container.md)
- [选项卡](markdown/tabs.md)
- [代码组](markdown/code-tabs.md)
- [脚注](markdown/footnote.md)
- [任务列表](markdown/tasklist.md)
- [图片增强](markdown/image.md)
- [自定义对齐](markdown/align.md)
- [自定义属性](markdown/attrs.md)
- [上下角标](markdown/sup-sub.md)
- [标记](markdown/mark.md)
- [图表](markdown/chart.md)
- [Echarts](markdown/echarts.md)
- [流程图](markdown/flowchart.md)
- [Mermaid 图表](markdown/mermaid.md)
- [Tex 支持](markdown/tex.md)
- [文件导入](markdown/include.md)
- [代码演示](markdown/demo.md)
- [幻灯片](markdown/presentation.md)
- [样式化](markdown/stylize.md)
- [交互演示](markdown/playground.md)
- [Vue 交互演示](markdown/vue-playground.md)
- [开箱即用的组件](markdown/components.md)
- [自定义主题](interface/code-theme.md)

### 布局

页面新增:

- [路径导航](layout/breadcrumb.md)

- 桌面宽度下右侧增加 [TOC 锚点](layout/page.md#标题列表)

- [自定义页脚](layout/footer.md)

布局优化:

- 完全重构的移动端布局
- 页面底部导航和信息样式改进
- [默认主页增强](layout/home.md):

  - 宽屏布局优化
  - 特性支持添加图标，拥有全新布局、动画并支持跳转

### 界面

- [图标支持](interface/icon.md)

- [导航栏](layout/navbar.md)

- [侧边栏](layout/sidebar.md)

- [全新主题色](interface/theme-color.md)，允许你在浏览过程中动态切换

- [深色模式](interface/darkmode.md)，允许你手动切换或者是根据设备设置自动应用

- [全屏按钮](interface/others.md#全屏按钮)

- [返回顶部按钮](interface/others.md#返回顶部按钮)

### 页面增强

- [一键复制代码](feature/copy-code.md)

- [图片预览](feature/photo-swipe.md)，支持放大，拖拽，滑动浏览，分享和下载

- [评论系统](feature/comment.md)

- [页面信息展示](feature/page-info.md)

  - 阅读量统计
  - 作者与写作日期
  - 自动生成的字数与预计阅读时间
  - 标签与分类

- [版权信息](feature/copyright.md)

- [文章加密](feature/encrypt.md)

- [搜索支持](feature/search.md)

### 博客

- [支持置顶的文章列表](blog/intro.md)

- [标签分组列表](blog/category-and-tags.md)

- [时间线](blog/timeline.md)

- [收藏文章](blog/article.md)

- [全新博客主页布局](blog/home.md)

### 高级功能

- [PWA 支持](advanced/pwa.md)

- [Feed 生成](advanced/feed.md)

- [SEO 增强](advanced/seo.md)

- [Sitemap 生成](advanced/sitemap.md)

## 内建插件 🧩

本主题包含了以下内建插件，如果有需要，你也可以单独进行使用或搭配其他主题。

- <ProjectLink name="auto-catalog" path="/zh/">vuepress-plugin-auto-catalog</ProjectLink>: VuePress2 的目录自动生成插件

- <ProjectLink name="blog2" path="/zh/">vuepress-plugin-blog2</ProjectLink>: VuePress2 的博客插件

- <ProjectLink name="comment2" path="/zh/">vuepress-plugin-comment2</ProjectLink>: 评论与浏览量功能

- <ProjectLink name="components" path="/zh/">vuepress-plugin-components</ProjectLink>: 提供一些开箱即用的插件

- <ProjectLink name="copy-code2" path="/zh/">vuepress-plugin-copy-code2</ProjectLink>: 提供一键复制代码块功能。

- <ProjectLink name="copyright2" path="/zh/">vuepress-plugin-copyright2</ProjectLink>: 在用户复制时追加版权信息，或禁用站点的复制与选择。

- <ProjectLink name="feed2" path="/zh/">vuepress-plugin-feed2</ProjectLink>: Feed 支持

- <ProjectLink name="md-enhance" path="/zh/">vuepress-plugin-md-enhance</ProjectLink>: 提供更多 Markdown 语法

- <ProjectLink name="photo-swipe" path="/zh/">vuepress-plugin-photo-swipe</ProjectLink>: 基于 Photo Swipe 的图片浏览插件

- <ProjectLink name="pwa2" path="/zh/">vuepress-plugin-pwa2</ProjectLink>: 增强的 PWA 支持

- <ProjectLink name="reading-time2" path="/zh/">vuepress-plugin-reading-time2</ProjectLink>: 阅读时间与字数统计

- <ProjectLink name="sass-palette" path="/zh/">vuepress-plugin-sass-palette</ProjectLink>: 面向全部插件和主题的 Sass 配置插件

- <ProjectLink name="seo2" path="/zh/">vuepress-plugin-seo2</ProjectLink>: SEO 增强插件

- <ProjectLink name="sitemap2" path="/zh/">vuepress-plugin-sitemap2</ProjectLink>: Sitemap 插件

::: tip

这里还有一些其他没有被主题捆绑的插件，你可以根据自己的需求自行启用。

- <ProjectLink name="lightgallery" path="/zh/">vuepress-plugin-lightgallery</ProjectLink>: 基于 lightgallery 图片浏览插件

- <ProjectLink name="redirect" path="/zh/">vuepress-plugin-redirect</ProjectLink>: 重定向插件

- <ProjectLink name="remove-pwa" path="/zh/">vuepress-plugin-remove-pwa</ProjectLink>: 移除 PWA 插件

- <ProjectLink name="search-pro" path="/zh/">vuepress-plugin-search-pro</ProjectLink>: 客户端搜索插件

:::

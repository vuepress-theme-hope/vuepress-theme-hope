---
title: 指南
icon: creative
category: guide
tags:
  - intro
---

::: tip

如果你在使用过程中遇到了 bug，可以 [提一个 issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues) 或者 [加入 QQ 群](https://jq.qq.com/?_wv=1027&k=rATJyxGK) (群号: 1003437555) 进行反馈。

:::

## ✨ 主题特点

主题很大程度上保持了 VuePress 默认主题的风格，并在此基础上添加了大量功能与优化:

<!-- more -->

### Markdown

为 Markdown 添加了更多语法，丰富文档与博客写作

- [徽章 `<Badge />`](markdown/components.md#badge) 在官方基础上增加了颜色支持
- [代码组 `<CodeGroup />`](markdown/components.md#codegroup-codegroupitem)
- [Tex 支持](markdown/tex.md)
- [自定义对齐](markdown/align.md)
- [流程图](markdown/flowchart.md)
- [Mermaid 图表](markdown/mermaid.md)
- [标记](markdown/mark.md)
- [任务列表](markdown/tasklist.md)
- [上下角标](markdown/sup-sub.md)
- [代码演示](markdown/demo.md)
- [幻灯片](markdown/presentation.md)

### 布局

- 新增:

  - [路径导航](layout/page.md#路径导航)

  - [自定义页脚](layout/page.md#页脚支持)

- 其他内置组件优化

  - [导航栏](layout/navbar.md) 与 [侧边栏](layout/sidebar.md) 添加 `prefix` 与 `icon`

  - [默认主页增强](layout/home.md)

    - 特性拥有全新动画并支持跳转
    - 多个动作按钮
    - 宽屏布局优化

### 界面

- [全新主题色](interface/theme-color.md)，允许你在浏览过程中动态切换

- [深色模式](interface/darkmode.md)，允许你手动切换或者是根据设备设置自动应用

- [图标支持](interface/icon.md)

- [全屏按钮](interface/others.md#全屏按钮)

- [返回顶部按钮](interface/others.md#返回顶部按钮)

### 页面增强

- [一键复制代码](feature/copy-code.md)

- [图片预览](feature/photo-swipe.md)，支持放大，拖拽，滑动浏览，分享和下载

- [版权信息](feature/copyright.md)

- [评论系统](feature/comment.md)

- [文章信息展示](feature/page-info.md)

  - 阅读量统计
  - 作者与写作日期
  - 自动生成的字数与预计阅读时间
  - 标签与分类

- [加密特定文章或路径](feature/encrypt.md)

### 功能

- [PWA 支持](feature/pwa.md)

- [Feed 生成](feature/feed.md)

- [SEO 增强](feature/seo.md)

- [Sitemap 生成](feature/sitemap.md)

- [利用 Git 的信息生成](feature/git.md)

- [TypeScript 支持](feature/typescript.md)

### 博客

- [社交关注按钮与页面社交分享](https://vuepress-theme-hope.github.io/add-this/zh/)

- [支持置顶的文章列表](blog/intro.md)

- [标签分组列表](blog/category-and-tags.md)

- [时间线](blog/timeline.md)

- [收藏文章](blog/article.md)

- [全新博客主页布局](blog/home.md)

## 🧩 内建插件

本主题还包含了以下内建插件，如果有需要，你也可以单独进行使用或搭配其他主题。

- [@mr-hope/vuepress-plugin-comment][comment]: 评论与文章信息功能

- [@mr-hope/vuepress-plugin-component][component]: 提供一些开箱即用的插件

- [@mr-hope/vuepress-plugin-copy-code][copy-code]: 提供一键复制代码块功能。

- [@mr-hope/vuepress-plugin-feed][feed]: Feed 支持

- [@mr-hope/vuepress-plugin-git][git]: 基于 Git 的页面信息插件

- [@mr-hope/vuepress-plugin-pwa][pwa]: PWA 支持

- [@mr-hope/vuepress-plugin-reading-time][reading-time]: 阅读时间与字数统计

- [@mr-hope/vuepress-plugin-seo][seo]: SEO 增强插件

- [@mr-hope/vuepress-plugin-sitemap][sitemap]: 为你的站点生成 sitemap

- @mr-hope/vuepress-plugin-smooth-scroll: 启用平滑滚动 (移除了旧浏览器兼容)

- [vuepress-plugin-active-hash][active-hash]: 自动激活锚点

- [vuepress-plugin-add-this][add-this]: 让网站支持社交分享与关注

- [vuepress-plugin-md-enhance][md-enhance]: 提供更多 Markdown 语法

- [vuepress-plugin-photo-swipe][photo-swipe]: 使网站的图片支持缩放与滑动浏览

[active-hash]: https://vuepress-theme-hope.github.io/active-hash/zh/
[add-this]: https://vuepress-theme-hope.github.io/add-this/zh/
[comment]: https://vuepress-theme-hope.github.io/comment/zh/
[component]: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/packages/components/readme.md#使用
[copy-code]: https://vuepress-theme-hope.github.io/copy-code/zh/
[feed]: https://vuepress-theme-hope.github.io/feed/zh/
[git]: https://vuepress-theme-hope.github.io/git/zh/
[md-enhance]: https://vuepress-theme-hope.github.io/md-enhance/zh/
[photo-swipe]: https://vuepress-theme-hope.github.io/photo-swipe/zh/
[pwa]: https://vuepress-theme-hope.github.io/pwa/zh/
[reading-time]: https://vuepress-theme-hope.github.io/reading-time/zh/
[seo]: https://vuepress-theme-hope.github.io/seo/zh/
[sitemap]: https://vuepress-theme-hope.github.io/sitemap/zh/

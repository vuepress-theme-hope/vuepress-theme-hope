---
icon: info
category: instruction
tags: intro
---

# 介绍

::: tip
如果你在使用过程中遇到了 bug，可以 [提一个 issue](https://github.com/Mister-Hope/vuepress-theme-hope/issues)。
:::

## 主题特点

主题很大程度上保持了 VuePress 默认主题的风格，并在此基础上添加了大量功能与优化:

### 页面增强

- 为 Markdown 添加了更多语法，丰富文档与博客写作

  - [Tex 支持](feature/markdown/tex.md)
  - [自定义对齐](feature/markdown/align.md)
  - [流程图](feature/markdown/flowchart.md)
  - [标记](feature/markdown/mark.md)
  - [上下角标](feature/markdown/sup-sub.md)
  - [代码演示](feature/markdown/demo.md)
  - [幻灯片](feature/markdown/presentation.md)

- [图片预览](feature/page.md#图片预览)，支持放大，拖拽，滑动浏览，分享和下载

- [文章信息展示](feature/page-info.md)

  - 阅读量统计
  - 作者与写作日期
  - 自动生成的字数与预计阅读时间
  - 标签与分类

- [评论系统](feature/comment.md)

- [路径导航](layout/page.md#路径导航)

- [页面图标](layout/page.md#图标支持)

- [自定义页脚](layout/page.md#页脚支持)

### 功能增强

#### 零配置自动实现并允许你定制

- [全新主题色，允许你在浏览过程中动态切换](feature/theme.md#主题色)

- [深色模式，允许你手动切换或者是根据设备设置自动应用](feature/theme.md#深色模式)

- [全屏按钮](feature/theme.md#全屏按钮)

- [PWA 支持](feature/pwa.md)

- [返回顶部按钮](feature/component.md#返回顶部按钮-backtotop)

- [一键复制代码](feature/page.md#代码复制)

- 复制时添加版权信息

#### 更多强大功能

- [SEO 增强](feature/seo-sitemap.md#SEO)

- [Sitemap 生成](feature/seo-sitemap.md#Sitemap)

- [加密特定文章或路径](feature/encrypt.md)

- [TypeScript 支持](feature/typescript.md)

### 样式优化

- [图标支持](feature/readme.md)

- [默认主页优化](layout/home.md)

  - 特性拥有全新动画并支持跳转
  - 多个动作按钮
  - 宽屏布局优化

- 其他内置组件优化

  - [**导航栏**](layout/navbar.md)
  - [**侧边栏**](layout/sidebar.md)
  - [徽章 `<MyBadge />`](feature/component.md#徽章-mybadge): 在官方基础上增加了颜色支持

### 博客部分

- [全新博客主页布局](layout/blog.md)

- [社交关注按钮与页面社交分享](https://vuepress-add-this.mrhope.site/zh/)

- [文章展示](feature/blog.md)

  - [支持置顶的文章列表](feature/blog.md#文章)
  - [分类分组列表](feature/blog.md#分类)
  - [标签分组列表](feature/blog.md#标签)
  - [时间线](feature/blog.md#时间线)

## 内建插件

本主题还包含了以下内建插件，如果有需要，你也可以单独进行使用或搭配其他主题。

- [@mr-hope/vuepress-plugin-comment][comment]: 评论与文章信息功能

- [@mr-hope/vuepress-plugin-component](feature/component.md): 提供一些开箱即用的插件

- [@mr-hope/vuepress-plugin-copy-code][copy-code]: 提供一键复制代码块功能。

- [@mr-hope/vuepress-plugin-last-update][last-update]: 支持多语言格式的最后更新时间

- [@mr-hope/vuepress-plugin-pwa][pwa]: PWA 支持

- [@mr-hope/vuepress-plugin-reading-time][reading-time]: 阅读时间与字数统计

- [@mr-hope/vuepress-plugin-seo][seo]: SEO 增强插件

- [@mr-hope/vuepress-plugin-sitemap][sitemap]: 为你的站点生成 sitemap

- [vuepress-plugin-add-this][add-this]: 让网站支持社交分享与关注

- [vuepress-plugin-md-enhance][md-enhance]: 提供更多 Markdown 语法

- [vuepress-plugin-photo-swipe][photo-swipe]: 使网站的图片支持缩放与滑动浏览

[add-this]: https://vuepress-add-this.mrhope.site/zh/
[comment]: https://vuepress-comment.mrhope.site/zh/
[copy-code]: https://vuepress-copy-code.mrhope.site/zh/
[last-update]: https://vuepress-last-update.mrhope.site/zh/
[md-enhance]: https://vuepress-md-enhance.mrhope.site/zh/
[photo-swipe]: https://vuepress-photo-swipe.mrhope.site/zh/
[pwa]: https://vuepress-pwa.mrhope.site/zh/
[reading-time]: https://vuepress-reading-time.mrhope.site/zh/
[seo]: https://vuepress-seo.mrhope.site/zh/
[sitemap]: https://vuepress-sitemap.mrhope.site/zh/

---
icon: infofill
tag: intro
category: instruction
---

# 介绍

::: danger 非稳定状态
本主题仍在制作中，可能会有一定数量的 bug。

如果您在使用过程中遇到了 bug，可以 [提一个issue](https://github.com/Mister-Hope/vuepress-theme-hope/issues)。
:::

## 主题特点

主题继承了 Vupress 的默认主题，并很大程度上保持了 Vuepress 默认主题的风格。同时主题做了如下优化：

- 为导航栏、侧边栏提供了外观美化与功能增强
- 全新的主题色与夜间模式
- 增加了 PWA 支持与全屏按钮增强沉浸感
- 为 Markdown 添加了更多语法，丰富文档与博客写作
- 为所有页面添加阅读量统计与作者、写作日期展示
- 添加文章的评论功能
- 在主题多处添加了图标支持
- 允许自定义每篇文章的页脚
- 添加了新的路径导航功能
- 添加了新的返回顶部按钮
- 对默认的主页样式进行了进一步的优化

::: tip
您应当已经熟悉 Vuepress 的默认主题，因为所有跟默认主题相关的内容都不会被介绍。

如果您希望阅读 Vuepress 默认主题配置，请访问 [Vuepress 默认主题配置](https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html)
:::

## 新增功能概览

- [**图标支持**](icon.md)

- [**导航栏**](layout/navbar.md)

  - [图标支持](layout/navbar.md#对默认主题的改进)
  - [主题色切换](feature/themecolor.md#自定义主题色)
  - [夜间模式](feature/themecolor.md#夜间模式)
  - [全屏按钮](feature/fullscreen.md)

- [**侧边栏**](layout/sidebar.md)

  - [图标支持](layout/sidebar.md#图标支持)
  - [分组增强](layout/sidebar.md#分组增强)

- [**页面**](layout/page.md)

  - [阅读量与作者信息展示](layout/page.md#文章信息展示)
  - [页面图标](layout/page.md#图标支持)
  - [路径导航](layout/breadcrumb.md)
  - [底部评论](feature/comment.md)
  - [自定义页脚](layout/page.md#页脚支持)
  - [主页](layout/home.md)

- [**新增组件**](feature/component.md)

  - [返回顶部按钮 `<BackToTop />`](feature/component.md#返回顶部按钮)

  - [徽章 `<MyBadge />`](feature/component.md#徽章): 在官方基础上增加了颜色支持

- [**Markdown 增强**](markdown/readme.md)

[^themeConfig]: 主题配置字段即 `.vuepress/config.js` 默认导出的 `themeConfig` 对象

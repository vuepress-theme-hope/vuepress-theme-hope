---
icon: discoverfill
category: feature
tags:
  - intro
  - function
---

# 新增特性

- [**深色模式**](theme.md#深色模式)

- [**主题色**](theme.md#主题色)

- [**页面信息**](page-info.md)

- [**评论功能**](comment.md)

- [**加密功能**](encrypt.md)

- [**Markdown 增强**](markdown/readme.md)

- [**新增组件**](component.md)

- [**Seo 和 Sitemap 支持**](seoAndSitemap.md)

- **图片预览支持**

  页面内的所有图片都支持点击预览，并支持在预览界面中进行缩放、下载或分享。你可以设置 `themeConfig.photoSwipe` 为 `false` 来禁用它。

- **图标支持**

  整个主题在多处都添加了 FontClass 格式图标的支持。

  请在 `.vuepress/styles` 的 `index.styl` 中导入对应的图标 css 文件。例如：

  ```css
  @import "//at.alicdn.com/t/font_1446717_giwlq66d28j.css";
  ```

  图标的前置名默认为 `icon-`，可以在主题配置中的 `iconPrefix` 字段进行更改。

- [**Typescript 支持**](typescript.md)

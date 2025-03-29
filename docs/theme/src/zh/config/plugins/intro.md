---
title: 主题插件
icon: circle-info
order: 1
category:
  - 配置
tag:
  - 插件配置
  - 主题配置
  - 介绍
---

`vuepress-theme-hope` 捆绑了很多 VuePress 插件并提供了更多 VuePress 插件支持。

<!-- more -->

## 插件选项

主题提供 `plugins` 选项向对应的插件传递所需选项。

::: info 插件选项名称

所有的配置键名均为插件名称的驼峰式 (camelCase) 版本，并去除名称中可能存在的数字 2 结尾。

例如:

- `@vuepress/plugin-copy-code` 的配置键名为 `copyCode`。
- `@vuepress/plugin-copyright` 的配置键名为 `copyright`
- `vuepress-plugin-md-enhance` 的配置键名为 `mdEnhance`

:::

## 插件列表

### 内置插件

下列插件被内部调用，不可禁用:

- [@vuepress/plugin-sass-palette][sass-palette]: 面向插件和主题的 Sass 配置插件

- [@vuepress/plugin-theme-data][theme-data]: 主题配置的 Composition API 插件

- <ProjectLink name="components" path="/zh/">vuepress-plugin-components</ProjectLink>: 提供一些开箱即用的组件

### 自动启用的插件

下列插件默认启用，你可以禁用它们:

- [@vuepress/plugin-active-header-links][active-header-links]: 自动更新路由 Hash

- [@vuepress/plugin-back-to-top][back-to-top]: 返回顶部按钮

- [@vuepress/plugin-catalog][catalog]: 提供目录页自动生成与 `<Catalog />` 组件

- [@vuepress/plugin-copy-code][copy-code]: 为代码块提供复制按钮。

- [@vuepress/plugin-git][git]: 基于 Git 的信息插件

- [@vuepress/plugin-icon][icon]: 提供图标

- [@vuepress/plugin-links-check][links-check]: 检查 Markdown 链接

- [@vuepress/plugin-markdown-hint][markdown-hint]: Markdown 提示容器

- [@vuepress/plugin-markdown-image][markdown-image]: Markdown 图片增强

- [@vuepress/plugin-nprogress][nprogress]: 进度条

- [@vuepress/plugin-photo-swipe][photo-swipe]: 基于 Photo Swipe 的图片浏览插件

- [@vuepress/plugin-reading-time][reading-time]: 阅读时间与字数统计

- [@vuepress/plugin-redirect][redirect]: 重定向插件

- [@vuepress/plugin-seo][seo]: SEO 增强插件

- [@vuepress/plugin-shiki][shiki]: 基于 Shiki 的代码高亮插件

- [@vuepress/plugin-sitemap][sitemap]: Sitemap 插件

- <ProjectLink name="md-enhance" path="/zh/">vuepress-plugin-md-enhance</ProjectLink>: 提供更多 Markdown 语法

### 需要手动启用的插件

主题捆绑以下插件，你可以通过配置启用它们

- [@vuepress/plugin-blog][blog]: VuePress2 的博客插件

- [@vuepress/plugin-copyright][copyright]: 在用户复制时追加版权信息，或禁用站点的复制与选择。

- [@vuepress/plugin-comment][comment]: 提供评论与浏览量功能

- [@vuepress/plugin-markdown-math][markdown-math]: 公式支持

- [@vuepress/plugin-notice][notice]: 提供公告

- [@vuepress/plugin-rtl][rtl]: 提供 RTL 支持

- [@vuepress/plugin-watermark][watermark]: 水印插件

### 内置支持的插件

以下插件受到主题支持，但你需要在使用前自行安装它们:

- [@vuepress/plugin-docsearch][docsearch]: 基于 DocSearch 的搜索插件

- [@vuepress/plugin-search][search]: 简单的客户端搜索插件

- [@vuepress/plugin-slimsearch][slimsearch]: 基于 SlimSearch 的客户端搜索插件

- [@vuepress/plugin-feed][feed]: Feed 支持

- [@vuepress/plugin-prismjs][prismjs]: 基于 prism.js 的代码高亮插件

- [@vuepress/plugin-pwa][pwa]: PWA 支持

### 官方插件

[active-header-links]: https://ecosystem.vuejs.press/zh/plugins/development/active-header-links.html
[back-to-top]: https://ecosystem.vuejs.press/zh/plugins/features/back-to-top.html
[blog]: https://ecosystem.vuejs.press/zh/plugins/blog/blog/
[catalog]: https://ecosystem.vuejs.press/zh/plugins/features/catalog.html
[comment]: https://ecosystem.vuejs.press/zh/plugins/blog/comment/
[copy-code]: https://ecosystem.vuejs.press/zh/plugins/features/copy-code.html
[copyright]: https://ecosystem.vuejs.press/zh/plugins/features/copyright.html
[docsearch]: https://ecosystem.vuejs.press/zh/plugins/search/docsearch.html
[feed]: https://ecosystem.vuejs.press/zh/plugins/blog/feed/
[git]: https://ecosystem.vuejs.press/zh/plugins/development/git.html
[icon]: https://ecosystem.vuejs.press/zh/plugins/features/icon.html
[markdown-hint]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-hint.html
[markdown-image]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html
[markdown-math]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-math.html
[links-check]: https://ecosystem.vuejs.press/zh/plugins/markdown/links-check.html
[notice]: https://ecosystem.vuejs.press/zh/plugins/features/notice.html
[nprogress]: https://ecosystem.vuejs.press/zh/plugins/features/nprogress.html
[photo-swipe]: https://ecosystem.vuejs.press/zh/plugins/features/photo-swipe.html
[prismjs]: https://ecosystem.vuejs.press/zh/plugins/markdown/prismjs.html
[pwa]: https://ecosystem.vuejs.press/zh/plugins/pwa/pwa/
[redirect]: https://ecosystem.vuejs.press/zh/plugins/tools/redirect.html
[reading-time]: https://ecosystem.vuejs.press/zh/plugins/development/reading-time.html
[rtl]: https://ecosystem.vuejs.press/zh/plugins/development/rtl.html
[sass-palette]: https://ecosystem.vuejs.press/zh/plugins/development/sass-palette/
[search]: https://ecosystem.vuejs.press/zh/plugins/search/search.html
[seo]: https://ecosystem.vuejs.press/zh/plugins/seo/seo/
[shiki]: https://ecosystem.vuejs.press/zh/plugins/markdown/shiki.html
[sitemap]: https://ecosystem.vuejs.press/zh/plugins/seo/sitemap/
[slimsearch]: https://ecosystem.vuejs.press/zh/plugins/search/slimsearch.html
[theme-data]: https://ecosystem.vuejs.press/zh/plugins/development/theme-data.html
[watermark]: https://ecosystem.vuejs.press/zh/plugins/features/watermark.html

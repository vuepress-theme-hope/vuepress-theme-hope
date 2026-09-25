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

下列插件在核心功能中被内部使用，且无法被禁用:

- [@vuepress/plugin-sass-palette][sass-palette]: 面向插件和主题的 Sass 配置插件

- [@vuepress/plugin-theme-data][theme-data]: 主题配置的 Composition API 插件

### 自动启用的插件

下列插件由主题捆绑并默认启用，你可以禁用它们:

- [@vuepress/plugin-active-header-links][active-header-links]: 自动更新路由 Hash（`plugins.activeHeaderLinks`）

- [@vuepress/plugin-back-to-top][back-to-top]: 返回顶部按钮（`plugins.backToTop`）

- [@vuepress/plugin-catalog][catalog]: 提供目录页自动生成与 `<Catalog />` 组件（`plugins.catalog`）

- [@vuepress/plugin-copy-code][copy-code]: 为代码块提供复制按钮（`plugins.copyCode`）

- [@vuepress/plugin-git][git]: 基于 Git 的信息插件（`plugins.git`）

- [@vuepress/plugin-icon][icon]: 提供图标（`plugins.icon`）

- [@vuepress/plugin-links-check][links-check]: 检查 Markdown 链接（`markdown.linksCheck`）

- [@vuepress/plugin-markdown-chart][markdown-chart]: 图表与流程图支持（`markdown.chartjs`、`markdown.echarts`、`markdown.flowchart`、`markdown.markmap`、`markdown.mermaid`、`markdown.plantuml`）

- [@vuepress/plugin-markdown-ext][markdown-ext]: GFM 支持与其他常用 Markdown 语法（`markdown.gfm`、`markdown.breaks`、`markdown.linkify`、`markdown.footnote`、`markdown.tasklist`、`markdown.component`、`markdown.vPre`、`markdown.cjkFriendly`）

- [@vuepress/plugin-markdown-hint][markdown-hint]: Markdown 提示容器（`markdown.hint`、`markdown.alert`）

- [@vuepress/plugin-markdown-image][markdown-image]: Markdown 图片增强（`markdown.figure`、`markdown.imgLazyload`、`markdown.imgMark`、`markdown.imgSize`、`markdown.obsidianImgSize`）

- [@vuepress/plugin-markdown-include][markdown-include]: Markdown 文件导入（`markdown.include`）

- [@vuepress/plugin-markdown-stylize][markdown-stylize]: Markdown 内容样式化（`markdown.align`、`markdown.attrs`、`markdown.layout`、`markdown.mark`、`markdown.spoiler`、`markdown.steps`、`markdown.sup`、`markdown.sub`、`markdown.stylize`）

- [@vuepress/plugin-markdown-tab][markdown-tab]: 选项卡与代码块分组（`markdown.tabs`、`markdown.codeTabs`）

- [@vuepress/plugin-nprogress][nprogress]: 进度条（`plugins.nprogress`）

- [@vuepress/plugin-photo-swipe][photo-swipe]: 基于 Photo Swipe 的图片浏览插件（`plugins.photoSwipe`）

- [@vuepress/plugin-reading-time][reading-time]: 阅读时间与字数统计（`plugins.readingTime`）

- [@vuepress/plugin-seo][seo]: SEO 增强插件（`plugins.seo`）

- [@vuepress/plugin-shiki][shiki]: 基于 Shiki 的代码高亮插件（`markdown.highlighter`）

- [@vuepress/plugin-sitemap][sitemap]: Sitemap 插件（`plugins.sitemap`）

- <ProjectLink name="components" path="/zh/">vuepress-plugin-components</ProjectLink>: 提供一些开箱即用的组件（`plugins.components`）

### 需要手动启用的插件

主题捆绑以下插件，但它们默认处于关闭状态。你需要通过对应的选项启用它们:

- [@vuepress/plugin-blog][blog]: VuePress2 的博客插件（`plugins.blog`）

- [@vuepress/plugin-comment][comment]: 提供评论与浏览量功能（`plugins.comment`）

- [@vuepress/plugin-copyright][copyright]: 在用户复制时追加版权信息，或禁用站点的复制与选择（`plugins.copyright`）

- [@vuepress/plugin-markdown-field][markdown-field]: 字段容器支持（`markdown.fields`）

- [@vuepress/plugin-markdown-file-tree][markdown-file-tree]: 文件树与代码树支持（`markdown.fileTree`、`markdown.codeTree`）

- [@vuepress/plugin-markdown-math][markdown-math]: 公式支持（`markdown.math`）

- [@vuepress/plugin-markdown-preview][markdown-preview]: Markdown 预览支持（`markdown.preview`）

- [@vuepress/plugin-media][media]: 提供嵌入视频、音频与 PDF 文档的组件（`plugins.media`）

- [@vuepress/plugin-notice][notice]: 提供公告（`plugins.notice`）

- [@vuepress/plugin-redirect][redirect]: 重定向插件（`plugins.redirect`）

- [@vuepress/plugin-rtl][rtl]: 提供 RTL 支持（在需要的主题语言配置中设置 `rtl: true`）

- <ProjectLink name="md-enhance" path="/zh/">vuepress-plugin-md-enhance</ProjectLink>: 提供更多 Markdown 语法（`markdown.demo`、`markdown.playground`、`markdown.kotlinPlayground`、`markdown.vuePlayground`、`markdown.sandpack`）

### 内置支持的插件

以下插件受到主题支持，但没有被捆绑。你需要在使用前自行安装它们，然后通过对应的选项启用:

- [@vuepress/plugin-docsearch][docsearch]: 基于 DocSearch 的搜索插件（`plugins.docsearch`）

- [@vuepress/plugin-feed][feed]: Feed 支持（`plugins.feed`）

- [@vuepress/plugin-meilisearch][meilisearch]: 基于 MeiliSearch 的开源搜索插件（`plugins.meilisearch`）

- [@vuepress/plugin-orama][orama]: 基于 Orama 的客户端搜索插件（`plugins.orama`）

- [@vuepress/plugin-prismjs][prismjs]: 基于 prism.js 的代码高亮插件（`markdown.highlighter`）

- [@vuepress/plugin-pwa][pwa]: PWA 支持（`plugins.pwa`）

- [@vuepress/plugin-revealjs][revealjs]: 幻灯片支持（`markdown.revealjs`）

- [@vuepress/plugin-search][search]: 简单的客户端搜索插件（`plugins.search`）

  ::: warning 已弃用

  请改用 `@vuepress/plugin-slimsearch` 或 `@vuepress/plugin-orama`。

  :::

- [@vuepress/plugin-slimsearch][slimsearch]: 基于 SlimSearch 的客户端搜索插件（`plugins.slimsearch`）

- [@vuepress/plugin-watermark][watermark]: 水印插件（`plugins.watermark`）

- [@vuepress/shiki-twoslash][shiki-twoslash]: 为 Shiki 高亮器提供 TypeScript twoslash 支持（设置 `markdown.highlighter` 的 `twoslash` 选项）

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
[links-check]: https://ecosystem.vuejs.press/zh/plugins/markdown/links-check.html
[markdown-chart]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-chart/
[markdown-ext]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html
[markdown-field]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-field.html
[markdown-file-tree]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-file-tree.html
[markdown-hint]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-hint.html
[markdown-image]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html
[markdown-include]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-include.html
[markdown-math]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-math.html
[markdown-preview]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-preview.html
[markdown-stylize]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-stylize.html
[markdown-tab]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-tab.html
[meilisearch]: https://ecosystem.vuejs.press/zh/plugins/search/meilisearch.html
[media]: https://ecosystem.vuejs.press/zh/plugins/features/media.html
[notice]: https://ecosystem.vuejs.press/zh/plugins/features/notice.html
[nprogress]: https://ecosystem.vuejs.press/zh/plugins/features/nprogress.html
[orama]: https://ecosystem.vuejs.press/zh/plugins/search/orama.html
[photo-swipe]: https://ecosystem.vuejs.press/zh/plugins/features/photo-swipe.html
[prismjs]: https://ecosystem.vuejs.press/zh/plugins/markdown/prismjs.html
[pwa]: https://ecosystem.vuejs.press/zh/plugins/pwa/pwa/config.html
[reading-time]: https://ecosystem.vuejs.press/zh/plugins/development/reading-time.html
[redirect]: https://ecosystem.vuejs.press/zh/plugins/tools/redirect.html
[revealjs]: https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/
[rtl]: https://ecosystem.vuejs.press/zh/plugins/development/rtl.html
[sass-palette]: https://ecosystem.vuejs.press/zh/plugins/development/sass-palette/
[search]: https://ecosystem.vuejs.press/zh/plugins/search/search.html
[seo]: https://ecosystem.vuejs.press/zh/plugins/seo/seo/config.html
[shiki]: https://ecosystem.vuejs.press/zh/plugins/markdown/shiki.html
[shiki-twoslash]: https://ecosystem.vuejs.press/zh/plugins/markdown/shiki.html#twoslash
[sitemap]: https://ecosystem.vuejs.press/zh/plugins/seo/sitemap/config.html
[slimsearch]: https://ecosystem.vuejs.press/zh/plugins/search/slimsearch.html
[theme-data]: https://ecosystem.vuejs.press/zh/plugins/development/theme-data.html
[watermark]: https://ecosystem.vuejs.press/zh/plugins/features/watermark.html

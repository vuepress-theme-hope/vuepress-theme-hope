---
title: 插件说明
icon: info
category: config
copyright:
  minLength: 10
tags:
  - plugin
  - config
---

`vuepress-theme-hope` 自带了很多 VuePress 插件。一些插件会自动启用，如果你不需要，可以在 themeConfig 中将其禁用；一些插件也只有你进行配置才会启用。

<!-- more -->

## 内建插件

- [@mr-hope/vuepress-plugin-comment][comment]: 评论与文章信息功能

- [@mr-hope/vuepress-plugin-component][component]: 提供一些开箱即用的插件

- [@mr-hope/vuepress-plugin-copy-code][copy-code]: 提供一键复制代码块功能。

- [@mr-hope/vuepress-plugin-feed][feed]: 提供 Feed 生成

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

## 外部插件

- [vuepress-plugin-container](container.md): 自定义容器

- [vuepress-plugin-copyright](copyright.md): 在网站内容被复制的时候提供额外的版权信息

- [vuepress-plugin-typescript](../../guide/feature/typescript.md): 提供 TypeScript 支持

- @vuepress/plugin-blog: 博客支持

- @vuepress/plugin-search: 搜索插件，**将最大搜索建议增加至 10**

- @vuepress/plugin-nprogress: 进度条

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

---
title: 插件说明
icon: info
order: 1
category:
  - 配置
tag:
  - 插件配置
  - 主题配置
  - 介绍
---

`vuepress-theme-hope` 会调用很多 VuePress 插件。

- 一些插件会自动启用，如果你不需要，可以在主题选项中将其禁用;
- 一些插件只有你在进行必要配置后才会启用。

::: note

作为 [VuePress Org](https://github.com/orgs/vuepress/people) 的成员之一，Mr.Hope 开发了很多 VuePress 插件。

`vuepress-theme-hope` 调用的所有插件均为官方插件或托管在 `vuepress-theme-hope` 仓库下由 Mr.Hope 自己开发的插件。

- 官方插件的文档详见 [VuePress2 官网][vuepress]
- Mr.Hope 自己开发的插件也全部拥有自己的文档，可以搭配其他主题使用。

:::

<!-- more -->

## 插件选项

主题提供 `plugins` 选项向对应的插件传递所需选项。

::: info 插件选项名称

所有的配置键名均为插件名称的驼峰式 (camelCase) 版本，并去除名称中可能存在的数字 2 结尾。

例如:

- `vuepress-plugin-copy-code2` 的配置键名为 `copyCode`。
- `vuepress-plugin-md-enhance` 的配置键名为 `mdEnhance`

:::

## 插件列表

### Mr.Hope 提供的插件

- [vuepress-plugin-blog2][blog2]: VuePress2 的博客插件

- [vuepress-plugin-comment2][comment2]: 提供评论与浏览量功能

- [vuepress-plugin-components][components]: 提供一些开箱即用的插件

- [vuepress-plugin-copy-code2][copy-code2]: 提供一键复制代码块功能。

- [vuepress-plugin-copyright2][copyright2]: 在用户复制时追加版权信息，或禁用站点的复制与选择。

- [vuepress-plugin-feed2][feed2]: Feed 支持

- [vuepress-plugin-md-enhance][md-enhance]: 提供更多 Markdown 语法

- [vuepress-plugin-photo-swipe][photo-swipe]: 基于 Photo Swipe 的图片浏览插件

- [vuepress-plugin-pwa2][pwa2]: 增强的 PWA 支持

- [vuepress-plugin-reading-time2][reading-time2]: 阅读时间与字数统计

- [vuepress-plugin-redirect][redirect]: 重定向插件

- [vuepress-plugin-sass-palette][sass-palette]: 面向全部插件和主题的 Sass 配置插件

- [vuepress-plugin-seo2][seo2]: SEO 增强插件

- [vuepress-plugin-sitemap2][sitemap2]: Sitemap 插件

::: tip

这里还有一些其他没有被主题默认启用的插件，你可以根据自己的需求自行启用。

- [vuepress-plugin-lightgallery][lightgallery]: 基于 lightgallery 图片浏览插件

:::

### 官方插件

- [@vuepress/plugin-active-header-links][active-header-links]: 自动更新路由 Hash

- [@vuepress/plugin-container][container]: 自定义容器

- [@vuepress/external-link-icon][external-link-icon]: 为 Markdown 的外部链接添加外部链接图标。

- [@vuepress/plugin-git][git]: 基于 Git 的信息插件

- [@vuepress/plugin-nprogress][nprogress]: 进度条

- [@vuepress/plugin-prismjs][prismjs]: 基于 prism.js 的代码高亮插件

- [@vuepress/plugin-theme-data][theme-data]: 主题配置的 Composition API 插件

[blog2]: https://vuepress-theme-hope.github.io/v2/blog/zh/
[comment2]: https://vuepress-theme-hope.github.io/v2/comment/zh/
[components]: https://vuepress-theme-hope.github.io/v2/components/zh/
[copy-code2]: https://vuepress-theme-hope.github.io/v2/copy-code/zh/
[copyright2]: https://vuepress-theme-hope.github.io/v2/copyright/zh/
[feed2]: https://vuepress-theme-hope.github.io/v2/feed/zh/
[lightgallery]: https://vuepress-theme-hope.github.io/v2/lightgallery/zh/
[md-enhance]: https://vuepress-theme-hope.github.io/v2/md-enhance/zh/
[photo-swipe]: https://vuepress-theme-hope.github.io/v2/photo-swipe/zh/
[pwa2]: https://vuepress-theme-hope.github.io/v2/pwa/zh/
[reading-time2]: https://vuepress-theme-hope.github.io/v2/reading-time/zh/
[redirect]: https://vuepress-theme-hope.github.io/v2/redirect/zh/
[sass-palette]: https://vuepress-theme-hope.github.io/v2/sass-palette/zh/
[seo2]: https://vuepress-theme-hope.github.io/v2/seo/zh/
[sitemap2]: https://vuepress-theme-hope.github.io/v2/sitemap/zh/
[active-header-links]: https://v2.vuepress.vuejs.org/zh/reference/plugin/active-header-links.html
[container]: https://v2.vuepress.vuejs.org/zh/reference/plugin/container.html
[external-link-icon]: https://v2.vuepress.vuejs.org/zh/reference/plugin/external-link-icon.html
[git]: https://v2.vuepress.vuejs.org/zh/reference/plugin/git.html
[nprogress]: https://v2.vuepress.vuejs.org/zh/reference/plugin/nprogress.html
[prismjs]: https://v2.vuepress.vuejs.org/zh/reference/plugin/prismjs.html
[theme-data]: https://v2.vuepress.vuejs.org/zh/reference/plugin/theme-data.html
[vuepress]: https://v2.vuepress.vuejs.org/zh/

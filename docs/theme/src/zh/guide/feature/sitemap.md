---
title: Sitemap
icon: sitemap
category: feature
tags:
  - feature
  - sitemap
---

`vuepress-theme-hope` 通过内置 [`@mr-hope/vuepress-plugin-sitemap`](https://vuepress-theme-hope.github.io/sitemap/zh/) 为你提供 Sitemap 生成。

插件会为你的网站自动生成 Sitemap，它会自动根据页面的 Git 的时间戳生成页面的最后更新时间，同时会根据站点的多语言配置声明页面的其他语言替代版本地址。

如果你不需要这个插件，请设置 `themeConfig.sitemap` 为 `false`。

## 控制 Sitemap 链接

默认情况下，所有除 404 页面以外的网站链接均会被添加进 Sitemap。

如果你希望在 VuePress 项目页面之外，添加其他页面链接到 Sitemap，请将它们变成数组传入 `themeConfig.sitemap.urls`

如果你不希望某些页面出现在 sitemap 中，你可以将它们变成一个数组传入到 `themeConfig.sitemap.exclude`，或者在对应页面的 frontmatter 中，设置 `feed.exclude` 为 `true`。

你还可以通过 `themeConfig.sitemap.outFile` 选项控制输出的地址，默认为输出目录下的 `sitemap.xml`。

## 更新周期

页面默认的更新周期是 `daily` (每天)，如果你希望修改全部的页面周期，请设置 `themeConfig.sitemap.changefreq` 。你也可以在页面的 frontmatter 中设置 `feed.changefreq`，页面具有更高的优先级。

合法的频率有:

- `"always"`
- `"hourly"`
- `"daily"`
- `"weekly"`
- `"monthly"`
- `"yearly"`
- `"never"`

::: info Sitemap 介绍

网站地图 (Sitemap) 提供 SEO 增强:

- 为搜索引擎爬虫提供可以浏览整个网站的链接；
- 为搜索引擎爬虫提供一些链接，指向动态页面或者采用其他方法比较难以到达的页面；
- 如果访问者试图访问网站所在域内并不存在的 URL，那么这个访问者就会被转到“无法找到文件”的错误页面，而网站地图可以作为该页面的“准”内容。

网站地图通过使所有页面可被找到来增强搜索引擎优化的效果。

大部分搜索引擎只跟踪页面内有限数量的链接，因此当网站非常大的时候，网站地图对于使搜索引擎和访问者可以访问网站中的所有内容就变得必不可少了。

Sitemaps 是站点管理员向搜索引擎爬虫公布站点可被抓取页面的协议，sitemap 文件内容必须遵循 XML 格式的定义。每个 URL 可以包含更新的周期和时间、URL 在整个站点中的优先级。这样可以让搜索引擎更佳有效的抓取网站内容。

Google 引入了 Google 网站地图使得网页开发者可以发布整个站点的链接列表。网站地图文件可以被用来指引网络蜘蛛如何找到这类页面。

:::

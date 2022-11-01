---
title: 指南
icon: creative
---

本插件会为你的网站自动生成 Sitemap。为了使插件正常工作，你需要将部署的域名传递给插件的 `hostname` 选项。

插件会自动根据页面的 Git 的时间戳生成页面的最后更新时间，同时会根据站点的多语言配置声明页面的其他语言版本替代地址。

## 控制 Sitemap 链接

默认情况下，所有除 404 页面以外的网站链接均会被添加进 Sitemap。

如果你希望在 VuePress 项目页面之外，添加其他页面链接到 Sitemap，请将它们变成数组传入插件的 `extraUrls` 选项。

如果你需要排除一些链接，你可以将它们变成数组传入到插件的 `excludeUrls` 选项。你也可以在对应页面的 frontmatter 中，设置 `sitemap.exclude` 为 `true`。

## 输出位置

你还可以通过插件的 `sitemapFilename` 选项控制输出的地址，此地址相对于输出目录，默认为 `sitemap.xml`。

## 更新周期

页面默认的更新周期是 `daily` (每天)，如果你希望修改全部的页面周期，请在插件选项中设置 `changefreq` 。你也可以在页面的 frontmatter 中设置 `sitemap.changefreq`，页面具有更高的优先级。

合法的频率有:

- `"always"`
- `"hourly"`
- `"daily"`
- `"weekly"`
- `"monthly"`
- `"yearly"`
- `"never"`

## 优先级

你可以在插件中设置 `priority` 以提供一个默认值。同时你可以通过 frontmatter 中的 `sitemap.priority` 来为每个页面设置优先级。可接受的值为 `0` 到 `1` 的浮点数。

## 修改时间获取

你可以通过插件的 `modifyTimeGetter` 来返回一个 ISO 字符串格式的时间，默认会通过 Git 插件生成。

以下是一个基于文件最后修改时间的例子。

```ts
// 基于文件最后修改时间
({
  modifyTimeGetter: (page) =>
    fs.statSync(app.dir.source(page.filePathRelative)).mtime.toISOString();
})
```

## Sitemap 介绍

网站地图 (Sitemap) 提供搜索引擎优化 (SEO):

- 为搜索引擎爬虫提供可以浏览整个网站的链接；
- 为搜索引擎爬虫提供一些链接，指向动态页面或者采用其他方法比较难以到达的页面；
- 如果访问者试图访问网站所在域内并不存在的 URL，那么这个访问者就会被转到“无法找到文件”的错误页面，而网站地图可以作为导航页。

网站地图通过使所有页面可被找到来增强搜索引擎优化的效果。

大部分搜索引擎只跟踪页面内有限数量的链接，因此当网站非常大的时候，网站地图对于使搜索引擎和访问者可以访问网站中的所有内容就变得必不可少了。

Sitemaps 是站点管理员向搜索引擎爬虫公布站点可被抓取页面的协议，sitemap 文件内容必须遵循 XML 格式的定义。每个 URL 可以包含更新的周期和时间、URL 在整个站点中的优先级。这样可以让搜索引擎更佳有效的抓取网站内容。

::: warning 同步配置 robots.txt

由于 Sitemap 面向搜索引擎，配合此插件使用时，你最好保证你在 `.vuepress/public` 文件夹下放置了有效的 `robots.txt`，以允许搜索引擎收录。一个最简单的 robots.txt 如下 (允许所有搜索引擎访问所有路径)

```txt
User-agent: *

Allow: /
```

:::

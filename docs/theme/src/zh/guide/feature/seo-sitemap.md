---
icon: config
category: feature
tags:
  - seo
  - sitemap
  - feature
---

# SEO 和 Sitemap

`vuepress-theme-hope` 引入了 `@mr-hope/vuepress-plugin-seo` 与 `@mr-hope/vuepress-plugin-sitemap` 为你提供 SEO 增强功能和 Sitemap 生成。

为了使两个插件能够更好的工作，您可能需要查看一下 [页面信息配置](../../config/page.md#页面信息配置) 并合理的配置它们。

## SEO

插件会向网页的 `<head>` 注入一些 `<meta>` 标签，使你的网页对搜索引擎和社交媒体更加友好。默认情况下，插件会读取站点配置、主题配置与页面的 frontmatter 来尽可能自动为你生成 `<meta>` 标签。诸如站点名称，页面标题，页面类型，写作日期，最后更新日期，文章标签均会自动生成。

插件会读取的配置 (你应当进行的配置) 有:

- `siteConfig.title`
- `siteConfig.description`

- `themeConfig.author`

- `frontmatter.title`
- `frontmatter.description`
- `frontmatter.image`
- `frontmatter.author`
- `frontmatter.time`
- `frontmatter.tags`

- Git 的上一次提交时间

你还可以查看 [插件的具体配置](../../config/plugin/seo.md)

## Sitemap

插件会自动读取整个文档的配置，尽可能自动的为你生成 sitemap。

除了 [插件的配置](../../config/plugin/sitemap.md) 外，你还可以在页面的 Frontmatter 中的 sitemap 设置如下内容:

- `sitemap.changefreq`: 更新频率，可选值为: `"always"` `"hourly"` `"daily"` `"weekly"` `"monthly"` `"yearly"` `"never"`
- `sitemap.exclude`: 是否不包含此页面
- `sitemap.priority`: 页面优先级，范围 0~1，默认为 `0.5`

---
title: 选项
icon: gears
---

## 插件选项

### hostname

- 类型: `string`
- 必填: 是

当前网站部署到的域名，插件需要此选项才能工作。

### extraUrls

- 类型: `string[]`
- 必填: 否

需要额外包含的网址。

如果你有一些不包含在 VuePress 路由中的链接 (如: 存放在 public 文件夹下的页面或其他插件或工具直接生成的页面)，你可能需要设置此项。

例如: `['/about.html', '/api/']`

### excludeUrls

- 类型: `string[]`
- 默认值: `['/404.html']`

不需要收录的页面路径，请以绝对路径开头。

默认情况下 VuePress 自动生成的所有路径 (除 404 页) 都会被添加进 Sitemap。

### sitemapFilename

- 类型: `string`
- 默认值: `"sitemap.xml"`

输出的文件名，相对于输出目录。

### sitemapXSLFilename

- 类型: `string`
- 默认值: `"sitemap.xsl"`

输出的 xsl 文件名，相对于输出目录。

### sitemapXSLTemplate

- 类型: `string`
- 默认值: `"vuepress-plugin-sitemap2/templates/sitemap.xsl"`

用作模板的 XSL 文件路径

### changefreq

- 类型: `"always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"`
- 默认值: `"daily"`

<!-- markdownlint-disable  MD051 -->

页面默认更新频率，会被 Frontmatter 中的 [changefreq](#sitemap-changefreq) 选项覆盖。

<!-- markdownlint-enable  MD051 -->

### priority

- 类型: `number`

- 默认值: `0.5`

页面优先级，范围 `0` 至 `1`。

### modifyTimeGetter

- 类型: `(page: Page, app: App) => string`
- 必填: 否

最后修改事件的获得器，需要返回一个 ISO 字符形式的时间，默认会自动通过 Git 插件生成。

## Frontmatter 选项

### sitemap

- 类型: `SitemapFrontmatterOptions | false`
- 必填: 否

`false` 代表不输出此页面到 Sitemap

### sitemap.changefreq

- 类型: `"always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"`
- 默认值: `"daily"`

页面默认更新频率。它会覆盖插件选项中的 [changefreq](#changefreq) 选项。

### sitemap.exclude

- 类型: `boolean`
- 默认值: `false`

### sitemap.priority

- 类型: `number`
- 默认值: `0.5`

页面优先级，范围 `0` 至 `1`。

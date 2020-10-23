---
icon: config
category: feature
tags:
  - seo
  - sitemap
  - feature
---

# SEO and Sitemap

`vuepress-theme-hope` introduces `@mr-hope/vuepress-plugin-seo` and `@mr-hope/vuepress-plugin-sitemap` to provide you with SEO enhancements and Sitemap generation.

To make the two plugins work better, you may need to look at [Page Information Configuration](../../config/page.md#page-information-configuration) and configure them reasonably.

## SEO

The plugin will inject some `<meta>` tags into the web page’s `<head>`, making your web page more friendly to search engines and social media. By default, the plugin will read the site configuration, theme configuration and frontmatter of the page to automatically generate the `<meta>` tag for you whenever possible. Such as site name, page title, page type, writing date, last update date, article tags are automatically generated.

The configuration that the plugin will read (the options you should config) is:

- `siteConfig.title`
- `siteConfig.description`

- `themeConfig.author`

- `frontmatter.title`
- `frontmatter.description`
- `frontmatter.image`
- `frontmatter.author`
- `frontmatter.time`
- `frontmatter.tags`

- Git’s last commit time

You can also view [Plugin configuration](../../config/plugin/seo.md) to find more options.

## Sitemap

The plugin will automatically read the configuration of the entire document and automatically generate a sitemap for you as much as possible.

You can also set the following in Frontmatter of the page besides [plugin configuration](../../config/plugin/sitemap.md):

- `sitemap.changefreq`: update frequency, optional values: `"always"` `"hourly"` `"daily"` `"weekly"` `"monthly"` `"yearly"` `"never"`
- `sitemap.exclude`: whether to exclude this page
- `sitemap.priority`: page priority, range 0 ~ 1, default is `0.5`

---
title: Sitemap
icon: sitemap
category: feature
tags:
  - feature
  - sitemap
---

`vuepress-theme-hope` provide SEO enhancement by includeing [`@mr-hope/vuepress-plugin-sitemap`](https://vuepress-theme-hope.github.io/sitemap/).

The plugin will automatically generate the last update time of the page based on the Git timestamp of the page, and will also declare the alternative version link of the page in other languages ​​according to the locales config.

If you don’t need this plugin, please set `themeConfig.sitemap` to `false`.

## Control Sitemap Link

By default, all site links except 404 page will be added to the Sitemap.

To add other pages to the Sitemap outside of the VuePress project page, please turn them into an array and pass to `themeConfig.sitemap.urls`.

If you don’t want certain pages to appear in the sitemap, you can turn them into an array and pass them to `themeConfig.sitemap.exclude`, or set `feed.exclude` to `true` in the frontmatter of the corresponding page.

You can also control the output link through the `themeConfig.sitemap.outFile`. The default output directory is `sitemap.xml`.

## Change frequency

The default update cycle of the page is `daily` (every day). To modify the entire page cycle, please set `themeConfig.sitemap.changefreq`. You can also set `feed.changefreq` in the frontmatter of the page. Note that page has a higher priority.

The legal frequencies are:

- `"always"`
- `"hourly"`
- `"daily"`
- `"weekly"`
- `"monthly"`
- `"yearly"`
- `"never"`

::: info Sitemap Intro

Sitemaps may be addressed to users or to software. Many sites have user-visible sitemaps which present a systematic view, typically hierarchical, of the site. These are intended to help visitors find specific pages, and can also be used by crawlers. Alphabetically organized site maps, sometimes called site indexes, are a different approach.

For use by search engines and other crawlers, there is a structured format, the XML Sitemap, which lists the pages in a site, their relative importance, and how often they are updated. This is pointed to from the robots.txt file and is typically called sitemap.xml .

Google introduced the Sitemaps protocol so web developers can publish lists of links from across their sites.

:::

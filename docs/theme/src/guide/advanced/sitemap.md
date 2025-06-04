---
title: Sitemap
icon: sitemap
order: 2
category:
  - Advanced
tag:
  - Advanced
  - Sitemap
---

`vuepress-theme-hope` provides Sitemap generation with built-in [`@vuepress/plugin-sitemap`][sitemap].

The plugin automatically generates Sitemap for your website. It automatically generates the last update time of the page based on the Git timestamp of the page, and also declares the alternative version addresses of the page in other languages according to the site's multilingual configuration.

If you don't need this plugin, please set `plugins.sitemap` to `false` in theme options.

::: info

`vuepress-theme-hope` passes `plugins.sitemap` in theme options as plugin options to `@vuepress/plugin-sitemap`.

:::

## Control Sitemap Link

By default, all site links except 404 page will be added to the Sitemap.

To add other pages to the Sitemap outside the VuePress project page, please turn them into an array and pass to `extraUrls`.

If you don't want certain pages to appear in the sitemap, you can turn them into an array and pass them to `excludeUrls`, or you can pass in a filter function though `filter` options. You can also set `sitemap.exclude` to `true` in page frontmatter.

You can also control the output address through the `sitemapFilename` option. The default is `sitemap.xml` in the output directory.

## Change Frequency

The default update cycle of the page is `daily` (every day). To modify the entire page cycle, please set `changefreq`. You can also set `sitemap.changefreq` in the frontmatter of the page. Note that page has a higher priority.

The legal frequencies are:

- `"always"`
- `"hourly"`
- `"daily"`
- `"weekly"`
- `"monthly"`
- `"yearly"`
- `"never"`

::: info Sitemap Intro

A sitemap provides SEO enhancements:

- Provides search engine crawlers with links to browse the entire website;
- Provides search engine crawlers with some links pointing to dynamic pages or pages that are difficult to reach by other methods;
- If a visitor tries to access a URL that does not exist in the domain where the website is located, the visitor will be redirected to the "file not found" error page, and the sitemap can serve as the "quasi" content of that page.

Sitemaps enhance the effectiveness of search engine optimization by making all pages discoverable.

Most search engines only track a limited number of links within a page, so when a website is very large, sitemaps become essential for making all content on the website accessible to search engines and visitors.

Sitemaps are a protocol for site administrators to announce to search engine crawlers the pages of the site that can be crawled. The content of the sitemap file must follow the XML format definition. Each URL can contain the update cycle and time, and the priority of the URL in the entire site. This allows search engines to crawl website content more effectively.

Google introduced Google Sitemaps so that web developers can publish lists of links from across their sites. Sitemap files can be used to guide web crawlers on how to find such pages.

:::

[sitemap]: https://ecosystem.vuejs.press/plugins/seo/sitemap/

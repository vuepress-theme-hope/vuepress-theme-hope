---
title: Theme Plugins
icon: circle-info
order: 1
category:
  - Config
tag:
  - Intro
  - Plugin Config
  - Theme Config
---

`vuepress-theme-hope` bundles many VuePress plugins and adds support for more VuePress plugin.

<!-- more -->

## Plugin Options

The theme provides `plugins` option to pass options to plugins.

::: info Plugin Options Name

All key names in `plugins` option are the camelCase version of the plugin name, with the optional number `2` suffix removed.

For example:

- `@vuepress/plugin-copy-code` is controlled by key name `copyCode`.
- `@vuepress/plugin-copyright` is controlled by key name `copyright`.
- `vuepress-plugin-md-enhance` is controlled by key name `mdEnhance`.

:::

## Plugin List

### Internal Plugins

The following plugins are used internally and can not be disabled:

- [@vuepress/plugin-sass-palette][sass-palette]: Sass plugin for plugins and themes

- [@vuepress/plugin-theme-data][theme-data]: Composition API plugin for theme data

- <ProjectLink name="components">vuepress-plugin-components</ProjectLink>: Provides common components out of the box.

### Automatically Enabled Plugins

The following plugins are enabled by default, and you can disable them:

- [@vuepress/plugin-active-header-links][active-header-links]: Automatically update route hash based on current header

- [@vuepress/plugin-back-to-top][back-to-top]: Provides back to top button

- [@vuepress/plugin-catalog][catalog]: Provides catalog page generation and `<Catalog />` component

- [@vuepress/plugin-copy-code][copy-code]: Provides copy button for code blocks.

- [@vuepress/plugin-git][git]: Git-based info plugin

- [@vuepress/plugin-icon][icon]: Icon support

- [@vuepress/plugin-links-check][links-check]: check links in markdown files

- [@vuepress/plugin-markdown-hint][markdown-hint]: Markdown hint containers

- [@vuepress/plugin-markdown-image][markdown-image]: Markdown image enhancement

- [@vuepress/plugin-nprogress][nprogress]: progress bar

- [@vuepress/plugin-photo-swipe][photo-swipe]: Image preview plugin based on photo-swipe

- [@vuepress/plugin-reading-time][reading-time]: Reading time and word count

- [@vuepress/plugin-redirect][redirect]: Redirect pages

- [@vuepress/plugin-seo][seo]: SEO enhancement plugin

- [@vuepress/plugin-shiki][shiki]: Code highlighting plugin using Shiki

- [@vuepress/plugin-sitemap][sitemap]: Sitemap plugin

- <ProjectLink name="md-enhance">vuepress-plugin-md-enhance</ProjectLink>: Provides more Markdown syntax

### Plugins that need to be enabled manually

The following plugins are bundled by theme, you can enable them via configuration:

- [@vuepress/plugin-blog][blog]: Blog plugin for VuePress2

- [@vuepress/plugin-copyright][copyright]: Append copyright information when copying or disable copy and selection.

- [@vuepress/plugin-comment][comment]: Provides comment and pageview function

- [@vuepress/plugin-markdown-math][markdown-math]: Formula support

- [@vuepress/plugin-notice][notice]: Provides notice

- [@vuepress/plugin-rtl][rtl]: Provides rtl support

- [@vuepress/plugin-watermark][watermark]: Watermark plugin

### Plugins with Built-in Support

These plugins are supported by theme, but you need to install them manually while using:

- [@vuepress/plugin-docsearch][docsearch]: Crawler based search plugin with DocSearch

- [@vuepress/plugin-meilisearch][meilisearch]: Open source search plugin with MeiliSearch

- [@vuepress/plugin-search][search]: Simple client search plugin

- [@vuepress/plugin-slimsearch][slimsearch]: Client search plugin using SlimSearch

- [@vuepress/plugin-feed][feed]: Feed support

- [@vuepress/plugin-prismjs][prismjs]: Code highlighting plugin using Prism.js

- [@vuepress/plugin-pwa][pwa]: PWA support

[active-header-links]: https://ecosystem.vuejs.press/plugins/development/active-header-links.html
[back-to-top]: https://ecosystem.vuejs.press/plugins/features/back-to-top.html
[blog]: https://ecosystem.vuejs.press/plugins/blog/blog/
[catalog]: https://ecosystem.vuejs.press/plugins/features/catalog.html
[copy-code]: https://ecosystem.vuejs.press/plugins/features/copy-code.html
[comment]: https://ecosystem.vuejs.press/plugins/blog/comment/
[copyright]: https://ecosystem.vuejs.press/plugins/features/copyright.html
[docsearch]: https://ecosystem.vuejs.press/plugins/search/docsearch.html
[feed]: https://ecosystem.vuejs.press/plugins/blog/feed/
[git]: https://ecosystem.vuejs.press/plugins/development/git.html
[icon]: https://ecosystem.vuejs.press/plugins/features/icon.html
[links-check]: https://ecosystem.vuejs.press/plugins/markdown/links-check.html
[markdown-hint]: https://ecosystem.vuejs.press/plugins/markdown/markdown-hint.html
[markdown-image]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html
[markdown-math]: https://ecosystem.vuejs.press/plugins/markdown/markdown-math.html
[meilisearch]: https://ecosystem.vuejs.press/plugins/search/meilisearch.html
[notice]: https://ecosystem.vuejs.press/plugins/features/notice.html
[nprogress]: https://ecosystem.vuejs.press/plugins/features/nprogress.html
[photo-swipe]: https://ecosystem.vuejs.press/plugins/features/photo-swipe.html
[prismjs]: https://ecosystem.vuejs.press/plugins/markdown/prismjs.html
[pwa]: https://ecosystem.vuejs.press/plugins/pwa/pwa/
[reading-time]: https://ecosystem.vuejs.press/plugins/development/reading-time.html
[redirect]: https://ecosystem.vuejs.press/plugins/tools/redirect.html
[rtl]: https://ecosystem.vuejs.press/plugins/development/rtl.html
[sass-palette]: https://ecosystem.vuejs.press/plugins/development/sass-palette/
[search]: https://ecosystem.vuejs.press/plugins/search/search.html
[seo]: https://ecosystem.vuejs.press/plugins/seo/seo/
[shiki]: https://ecosystem.vuejs.press/plugins/markdown/shiki.html
[sitemap]: https://ecosystem.vuejs.press/plugins/seo/sitemap/
[slimsearch]: https://ecosystem.vuejs.press/plugins/search/slimsearch.html
[theme-data]: https://ecosystem.vuejs.press/plugins/development/theme-data.html
[watermark]: https://ecosystem.vuejs.press/plugins/features/watermark.html

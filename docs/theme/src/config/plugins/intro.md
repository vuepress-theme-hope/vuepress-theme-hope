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

The following plugins are used internally with core functionality and can not be disabled:

- [@vuepress/plugin-sass-palette][sass-palette]: Sass plugin for plugins and themes

- [@vuepress/plugin-theme-data][theme-data]: Composition API plugin for theme data

### Automatically Enabled Plugins

The following plugins are bundled and enabled by default, and you can disable them:

- [@vuepress/plugin-active-header-links][active-header-links]: Automatically update route hash based on current header (`plugins.activeHeaderLinks`)

- [@vuepress/plugin-back-to-top][back-to-top]: Provides back to top button (`plugins.backToTop`)

- [@vuepress/plugin-catalog][catalog]: Provides catalog page generation and `<Catalog />` component (`plugins.catalog`)

- [@vuepress/plugin-copy-code][copy-code]: Provides copy button for code blocks (`plugins.copyCode`)

- [@vuepress/plugin-git][git]: Git-based info plugin (`plugins.git`)

- [@vuepress/plugin-icon][icon]: Icon support (`plugins.icon`)

- [@vuepress/plugin-links-check][links-check]: Check links in markdown files (`markdown.linksCheck`)

- [@vuepress/plugin-markdown-chart][markdown-chart]: Chart and diagram support (`markdown.chartjs`, `markdown.echarts`, `markdown.flowchart`, `markdown.markmap`, `markdown.mermaid`, `markdown.plantuml`)

- [@vuepress/plugin-markdown-ext][markdown-ext]: GFM support and other general Markdown syntax (`markdown.gfm`, `markdown.breaks`, `markdown.linkify`, `markdown.footnote`, `markdown.tasklist`, `markdown.component`, `markdown.vPre`, `markdown.cjkFriendly`)

- [@vuepress/plugin-markdown-hint][markdown-hint]: Markdown hint containers (`markdown.hint`, `markdown.alert`)

- [@vuepress/plugin-markdown-image][markdown-image]: Markdown image enhancement (`markdown.figure`, `markdown.imgLazyload`, `markdown.imgMark`, `markdown.imgSize`, `markdown.obsidianImgSize`)

- [@vuepress/plugin-markdown-include][markdown-include]: Markdown file import (`markdown.include`)

- [@vuepress/plugin-markdown-stylize][markdown-stylize]: Markdown content stylize (`markdown.align`, `markdown.attrs`, `markdown.layout`, `markdown.mark`, `markdown.spoiler`, `markdown.steps`, `markdown.sup`, `markdown.sub`, `markdown.stylize`)

- [@vuepress/plugin-markdown-tab][markdown-tab]: Tabs and code tabs (`markdown.tabs`, `markdown.codeTabs`)

- [@vuepress/plugin-nprogress][nprogress]: Progress bar (`plugins.nprogress`)

- [@vuepress/plugin-photo-swipe][photo-swipe]: Image preview plugin based on photo-swipe (`plugins.photoSwipe`)

- [@vuepress/plugin-reading-time][reading-time]: Reading time and word count (`plugins.readingTime`)

- [@vuepress/plugin-seo][seo]: SEO enhancement plugin (`plugins.seo`)

- [@vuepress/plugin-shiki][shiki]: Code highlighting plugin using Shiki (`markdown.highlighter`)

- [@vuepress/plugin-sitemap][sitemap]: Sitemap plugin (`plugins.sitemap`)

- <ProjectLink name="components">vuepress-plugin-components</ProjectLink>: Provides common components out of the box (`plugins.components`).

### Plugins that need to be enabled manually

The following plugins are bundled by theme, but they are disabled by default. You need to enable them via their options:

- [@vuepress/plugin-blog][blog]: Blog plugin for VuePress2 (`plugins.blog`)

- [@vuepress/plugin-comment][comment]: Provides comment and pageview function (`plugins.comment`)

- [@vuepress/plugin-copyright][copyright]: Append copyright information when copying or disable copy and selection (`plugins.copyright`)

- [@vuepress/plugin-markdown-field][markdown-field]: Field container support (`markdown.fields`)

- [@vuepress/plugin-markdown-file-tree][markdown-file-tree]: File tree and code tree support (`markdown.fileTree`, `markdown.codeTree`)

- [@vuepress/plugin-markdown-math][markdown-math]: Formula support (`markdown.math`)

- [@vuepress/plugin-markdown-preview][markdown-preview]: Markdown preview support (`markdown.preview`)

- [@vuepress/plugin-notice][notice]: Provides notice (`plugins.notice`)

- [@vuepress/plugin-redirect][redirect]: Redirect pages (`plugins.redirect`)

- [@vuepress/plugin-rtl][rtl]: Provides rtl support (set `rtl: true` in the needed theme locales)

- <ProjectLink name="md-enhance">vuepress-plugin-md-enhance</ProjectLink>: Provides more Markdown syntax (`markdown.demo`, `markdown.playground`, `markdown.kotlinPlayground`, `markdown.vuePlayground`, `markdown.sandpack`)

### Plugins with Built-in Support

These plugins are supported by theme, but they are not bundled. You need to install them manually, then enable them via their options:

- [@vuepress/plugin-docsearch][docsearch]: Crawler based search plugin with DocSearch (`plugins.docsearch`)

- [@vuepress/plugin-feed][feed]: Feed support (`plugins.feed`)

- [@vuepress/plugin-meilisearch][meilisearch]: Open source search plugin with MeiliSearch (`plugins.meilisearch`)

- [@vuepress/plugin-orama][orama]: Client search plugin using Orama (`plugins.orama`)

- [@vuepress/plugin-prismjs][prismjs]: Code highlighting plugin using Prism.js (`markdown.highlighter`)

- [@vuepress/plugin-pwa][pwa]: PWA support (`plugins.pwa`)

- [@vuepress/plugin-revealjs][revealjs]: Presentation support (`markdown.revealjs`)

- [@vuepress/plugin-search][search]: Simple client search plugin (`plugins.search`)

  ::: warning Deprecated

  Use `@vuepress/plugin-slimsearch` or `@vuepress/plugin-orama` instead.

  :::

- [@vuepress/plugin-slimsearch][slimsearch]: Client search plugin using SlimSearch (`plugins.slimsearch`)

- [@vuepress/plugin-watermark][watermark]: Watermark plugin (`plugins.watermark`)

- [@vuepress/shiki-twoslash][shiki-twoslash]: TypeScript twoslash support for the Shiki highlighter (set the `twoslash` option of `markdown.highlighter`)

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
[markdown-chart]: https://ecosystem.vuejs.press/plugins/markdown/markdown-chart/
[markdown-ext]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html
[markdown-field]: https://ecosystem.vuejs.press/plugins/markdown/markdown-field.html
[markdown-file-tree]: https://ecosystem.vuejs.press/plugins/markdown/markdown-file-tree.html
[markdown-hint]: https://ecosystem.vuejs.press/plugins/markdown/markdown-hint.html
[markdown-image]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html
[markdown-include]: https://ecosystem.vuejs.press/plugins/markdown/markdown-include.html
[markdown-math]: https://ecosystem.vuejs.press/plugins/markdown/markdown-math.html
[markdown-preview]: https://ecosystem.vuejs.press/plugins/markdown/markdown-preview.html
[markdown-stylize]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html
[markdown-tab]: https://ecosystem.vuejs.press/plugins/markdown/markdown-tab.html
[meilisearch]: https://ecosystem.vuejs.press/plugins/search/meilisearch.html
[notice]: https://ecosystem.vuejs.press/plugins/features/notice.html
[nprogress]: https://ecosystem.vuejs.press/plugins/features/nprogress.html
[orama]: https://ecosystem.vuejs.press/plugins/search/orama.html
[photo-swipe]: https://ecosystem.vuejs.press/plugins/features/photo-swipe.html
[prismjs]: https://ecosystem.vuejs.press/plugins/markdown/prismjs.html
[pwa]: https://ecosystem.vuejs.press/plugins/pwa/pwa/config.html
[reading-time]: https://ecosystem.vuejs.press/plugins/development/reading-time.html
[redirect]: https://ecosystem.vuejs.press/plugins/tools/redirect.html
[revealjs]: https://ecosystem.vuejs.press/plugins/markdown/revealjs/
[rtl]: https://ecosystem.vuejs.press/plugins/development/rtl.html
[sass-palette]: https://ecosystem.vuejs.press/plugins/development/sass-palette/
[search]: https://ecosystem.vuejs.press/plugins/search/search.html
[seo]: https://ecosystem.vuejs.press/plugins/seo/seo/config.html
[shiki]: https://ecosystem.vuejs.press/plugins/markdown/shiki.html
[shiki-twoslash]: https://ecosystem.vuejs.press/plugins/markdown/shiki.html#twoslash
[sitemap]: https://ecosystem.vuejs.press/plugins/seo/sitemap/config.html
[slimsearch]: https://ecosystem.vuejs.press/plugins/search/slimsearch.html
[theme-data]: https://ecosystem.vuejs.press/plugins/development/theme-data.html
[watermark]: https://ecosystem.vuejs.press/plugins/features/watermark.html

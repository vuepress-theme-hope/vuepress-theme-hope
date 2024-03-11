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

- [@vuepress/plugin-theme-data][theme-data]: Composition API plugin for theme data

- <ProjectLink name="components">vuepress-plugin-components</ProjectLink>: Provides common components out of the box.

- <ProjectLink name="sass-palette">vuepress-plugin-sass-palette</ProjectLink>: Sass style plugin for all plugins and themes

### Automatically Enabled Plugins

The following plugins are enabled by default, and you can disable them:

- [@vuepress/plugin-active-header-links][active-header-links]: Automatically update route hash based on current header

- [@vuepress/plugin-catalog][catalog]: Provides catalog page generation and `<Catalog />` component

- [@vuepress/plugin-copy-code][copy-code]: Provides copy button for code blocks.

- [@vuepress/plugin-external-link-icon][external-link-icon]: Add external link icon for external links in Markdown.

- [@vuepress/plugin-git][git]: Git-based info plugin

- [@vuepress/plugin-nprogress][nprogress]: progress bar

- [@vuepress/plugin-photo-swipe][photo-swipe]: Image preview plugin based on photo-swipe

- [@vuepress/plugin-prismjs][prismjs]: Code highlighting plugin using Prism.js

- [@vuepress/plugin-reading-time][reading-time]: Reading time and word count

- [@vuepress/plugin-seo][seo]: SEO enhancement plugin

- [@vuepress/plugin-sitemap][sitemap]: Sitemap plugin

- <ProjectLink name="md-enhance">vuepress-plugin-md-enhance</ProjectLink>: Provides more Markdown syntax

### Plugins that need to be enabled manually

The following plugins are bundled by theme, you can enable them via configuration:

- [@vuepress/plugin-blog][blog]: Blog plugin for VuePress2

- [@vuepress/plugin-copyright][copyright]: Append copyright information when copying or disable copy and selection.

- [@vuepress/plugin-comment][comment]: Provides comment and pageview function

### Plugins with Built-in Support

These plugins are supported by theme, but you need to install them manually while using:

- [@vuepress/plugin-docsearch][docsearch]: Crawler based search plugin with DocSearch

- [@vuepress/plugin-search][search]: Simple client search plugin

- [@vuepress/plugin-feed][feed]: Feed support

- [@vuepress/plugin-pwa][pwa]: PWA support

- [@vuepress/plugin-redirect][redirect]: Redirect pages

- <ProjectLink name="search-pro">vuepress-plugin-search-pro</ProjectLink>: Professional Client search plugin

[active-header-links]: https://ecosystem.vuejs.press/plugins/active-header-links.html
[blog]: https://ecosystem.vuejs.press/plugins/blog/
[catalog]: https://ecosystem.vuejs.press/plugins/catalog.html
[copy-code]: https://ecosystem.vuejs.press/plugins/copy-code.html
[comment]: https://ecosystem.vuejs.press/plugins/comment/
[copyright]: https://ecosystem.vuejs.press/plugins/copyright.html
[docsearch]: https://ecosystem.vuejs.press/plugins/docsearch.html
[external-link-icon]: https://ecosystem.vuejs.press/plugins/external-link-icon.html
[feed]: https://ecosystem.vuejs.press/plugins/feed/
[git]: https://ecosystem.vuejs.press/plugins/git.html
[nprogress]: https://ecosystem.vuejs.press/plugins/nprogress.html
[photo-swipe]: https://ecosystem.vuejs.press/plugins/photo-swipe.html
[prismjs]: https://ecosystem.vuejs.press/plugins/prismjs.html
[pwa]: https://ecosystem.vuejs.press/plugins/pwa/
[reading-time]: https://ecosystem.vuejs.press/plugins/reading-time.html
[redirect]: https://ecosystem.vuejs.press/plugins/redirect.html
[search]: https://ecosystem.vuejs.press/plugins/search.html
[seo]: https://ecosystem.vuejs.press/plugins/seo/
[sitemap]: https://ecosystem.vuejs.press/plugins/sitemap/
[theme-data]: https://ecosystem.vuejs.press/plugins/theme-data.html

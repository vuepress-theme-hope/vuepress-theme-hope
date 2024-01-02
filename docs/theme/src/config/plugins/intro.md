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

- `vuepress-plugin-copy-code2` is controlled by key name `copyCode`.
- `vuepress-plugin-md-enhance2` is controlled by key name `mdEnhance`.

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

- [@vuepress/external-link-icon][external-link-icon]: Add external link icon for external links in Markdown.

- [@vuepress/plugin-git][git]: Git-based info plugin

- [@vuepress/plugin-nprogress][nprogress]: progress bar

- [@vuepress/plugin-prismjs][prismjs]: Code highlighting plugin using Prism.js

- <ProjectLink name="auto-catalog">vuepress-plugin-auto-catalog</ProjectLink>: Provides catalog page generation and `<AutoCatalog />` component

- <ProjectLink name="copy-code2">vuepress-plugin-copy-code2</ProjectLink>: Provides copy button for code blocks.

- <ProjectLink name="md-enhance">vuepress-plugin-md-enhance</ProjectLink>: Provides more Markdown syntax

- <ProjectLink name="photo-swipe">vuepress-plugin-photo-swipe</ProjectLink>: Image preview plugin based on photo-swipe

- <ProjectLink name="reading-time2">vuepress-plugin-reading-time2</ProjectLink>: Reading time and word count

- <ProjectLink name="seo2">vuepress-plugin-seo2</ProjectLink>: SEO enhancement plugin

- <ProjectLink name="sitemap2">vuepress-plugin-sitemap2</ProjectLink>: Sitemap plugin

### Plugins that need to be enabled manually

The following plugins are bundled by theme, you can enable them via configuration:

- <ProjectLink name="blog2">vuepress-plugin-blog2</ProjectLink>: Blog plugin for VuePress2

- <ProjectLink name="comment2">vuepress-plugin-comment2</ProjectLink>: Provides comment and pageview function

- <ProjectLink name="copyright2">vuepress-plugin-copyright2</ProjectLink>: Append copyright information when copying or disable copy and selection.

### Plugins with Built-in Support

These plugins are supported by theme, but you need to install them manually while using:

- [@vuepress/plugin-docsearch][docsearch]: Crawler based search plugin with DocSearch

- [@vuepress/plugin-search][search]: Simple client search plugin

- <ProjectLink name="feed2">vuepress-plugin-feed2</ProjectLink>: Feed support

- <ProjectLink name="pwa2">vuepress-plugin-pwa2</ProjectLink>: Enhanced PWA support

- <ProjectLink name="redirect">vuepress-plugin-redirect</ProjectLink>: Redirect pages

- <ProjectLink name="search-pro">vuepress-plugin-search-pro</ProjectLink>: Professional Client search plugin

[active-header-links]: https://vuejs.press/reference/plugin/active-header-links.html
[docsearch]: https://vuejs.press/zh/reference/plugin/docsearch.html
[external-link-icon]: https://vuejs.press/reference/plugin/external-link-icon.html
[git]: https://vuejs.press/reference/plugin/git.html
[nprogress]: https://vuejs.press/reference/plugin/nprogress.html
[prismjs]: https://vuejs.press/reference/plugin/prismjs.html
[search]: https://vuejs.press/reference/plugin/search.html
[theme-data]: https://vuejs.press/reference/plugin/theme-data.html

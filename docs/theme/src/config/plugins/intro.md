---
title: Plugin Intro
icon: info
order: 1
category:
  - Config
tag:
  - Intro
  - Plugin Config
  - Theme Config
---

`vuepress-theme-hope` bundles many VuePress plugins.

- Some plugins are automatically enabled, you can disable them in theme options if you don’t need them.
- Some plugins are only enabled when you provide necessary options.

::: note

As a member of [VuePress Org](https://github.com/orgs/vuepress/people), Mr. Hope has developed many VuePress plugins.

All plugins called by `vuepress-theme-hope` are official plugins or plugins developed by Mr. Hope which hosted under the `vuepress-theme-hope` repository.

- For the documentation of the official plugin, see [VuePress2 official website][vuepress]
- All plugins developed by Mr.Hope have their own documentation and can be used with other themes.

:::

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

### Plugins provided by Mr.Hope

- [vuepress-plugin-blog2][blog2]: Blog plugin for VuePress2

- [vuepress-plugin-comment2][comment2]: Provides comment and pageview function

- [vuepress-plugin-components][components]: Provides some plugins out of the box

- [vuepress-plugin-copy-code2][copy-code2]: Provides one-click copy code block function.

- [vuepress-plugin-copyright2][copyright2]: Append copyright information when copying or disable copy and selection.

- [vuepress-plugin-feed2][feed2]: Feed support

- [vuepress-plugin-md-enhance][md-enhance]: Provides more Markdown syntax

- [vuepress-plugin-photo-swipe][photo-swipe]: Image preview plugin based on photo-swipe

- [vuepress-plugin-pwa2][pwa2]: Enhanced PWA support

- [vuepress-plugin-reading-time2][reading-time2]: Reading time and word count

- [vuepress-plugin-redirect][redirect]: Redirect pages

- [vuepress-plugin-sass-palette][sass-palette]: Sass style plugin for all plugins and themes

- [vuepress-plugin-seo2][seo2]: SEO enhancement plugin

- [vuepress-plugin-sitemap2][sitemap2]: Sitemap plugin

::: tip

Here are some other plugins that are not enabled by default by the theme, you can enable them according to your own needs.

- [vuepress-plugin-lightgallery][lightgallery]: Image preview plugin based on lightgallery

:::

### Official plugin

- [@vuepress/plugin-active-header-links][active-header-links]: Automatically update route Hash

- [@vuepress/plugin-container][container]: custom container

- [@vuepress/external-link-icon][external-link-icon]: Add external link icon for external links in Markdown.

- [@vuepress/plugin-git][git]: Git-based info plugin

- [@vuepress/plugin-nprogress][nprogress]: progress bar

- [@vuepress/plugin-prismjs][prismjs]: Code highlighting plugin using Prism.js

- [@vuepress/plugin-theme-data][theme-data]: Composition API plugin for theme data

[blog2]: https://vuepress-theme-hope.github.io/v2/blog/
[comment2]: https://vuepress-theme-hope.github.io/v2/comment/
[components]: https://vuepress-theme-hope.github.io/v2/components/
[copy-code2]: https://vuepress-theme-hope.github.io/v2/copy-code/
[copyright2]: https://vuepress-theme-hope.github.io/v2/copyright/
[feed2]: https://vuepress-theme-hope.github.io/v2/feed/
[lightgallery]: https://vuepress-theme-hope.github.io/v2/lightgallery/
[md-enhance]: https://vuepress-theme-hope.github.io/v2/md-enhance/
[photo-swipe]: https://vuepress-theme-hope.github.io/v2/photo-swipe/
[pwa2]: https://vuepress-theme-hope.github.io/v2/pwa/
[reading-time2]: https://vuepress-theme-hope.github.io/v2/reading-time/
[redirect]: https://vuepress-theme-hope.github.io/v2/redirect/
[sass-palette]: https://vuepress-theme-hope.github.io/v2/sass-palette/
[seo2]: https://vuepress-theme-hope.github.io/v2/seo/
[sitemap2]: https://vuepress-theme-hope.github.io/v2/sitemap/
[active-header-links]: https://v2.vuepress.vuejs.org/reference/plugin/active-header-links.html
[container]: https://v2.vuepress.vuejs.org/reference/plugin/container.html
[external-link-icon]: https://v2.vuepress.vuejs.org/reference/plugin/external-link-icon.html
[git]: https://v2.vuepress.vuejs.org/reference/plugin/git.html
[nprogress]: https://v2.vuepress.vuejs.org/reference/plugin/nprogress.html
[prismjs]: https://v2.vuepress.vuejs.org/reference/plugin/prismjs.html
[theme-data]: https://v2.vuepress.vuejs.org/reference/plugin/theme-data.html
[vuepress]: https://v2.vuepress.vuejs.org/

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

`vuepress-theme-hope` bundles many VuePress plugins.

- Some plugins are automatically enabled, you can disable them in theme options if you don't need them.
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

- <ProjectLink name="auto-catalog">vuepress-plugin-auto-catalog</ProjectLink>: Catalog automatically generation for VuePress2

- <ProjectLink name="blog2">vuepress-plugin-blog2</ProjectLink>: Blog plugin for VuePress2

- <ProjectLink name="comment2">vuepress-plugin-comment2</ProjectLink>: Provides comment and pageview function

- <ProjectLink name="components">vuepress-plugin-components</ProjectLink>: Provides some plugins out of the box

- <ProjectLink name="copy-code2">vuepress-plugin-copy-code2</ProjectLink>: Provides one-click copy code block function.

- <ProjectLink name="copyright2">vuepress-plugin-copyright2</ProjectLink>: Append copyright information when copying or disable copy and selection.

- <ProjectLink name="feed2">vuepress-plugin-feed2</ProjectLink>: Feed support

- <ProjectLink name="md-enhance">vuepress-plugin-md-enhance</ProjectLink>: Provides more Markdown syntax

- <ProjectLink name="photo-swipe">vuepress-plugin-photo-swipe</ProjectLink>: Image preview plugin based on photo-swipe

- <ProjectLink name="pwa2">vuepress-plugin-pwa2</ProjectLink>: Enhanced PWA support

- <ProjectLink name="reading-time2">vuepress-plugin-reading-time2</ProjectLink>: Reading time and word count

- <ProjectLink name="sass-palette">vuepress-plugin-sass-palette</ProjectLink>: Sass style plugin for all plugins and themes

- <ProjectLink name="seo2">vuepress-plugin-seo2</ProjectLink>: SEO enhancement plugin

- <ProjectLink name="sitemap2">vuepress-plugin-sitemap2</ProjectLink>: Sitemap plugin

::: tip

Here are some other plugins that are not bundled by the theme, you can enable them according to your own needs.

- <ProjectLink name="lightgallery">vuepress-plugin-lightgallery</ProjectLink>: Image preview plugin based on lightgallery

- <ProjectLink name="redirect">vuepress-plugin-redirect</ProjectLink>: Redirect pages

- <ProjectLink name="remove-pwa">vuepress-plugin-remove-pwa</ProjectLink>: Plugins to remove pwa

- <ProjectLink name="search-pro">vuepress-plugin-search-pro</ProjectLink>: Client search plugin

:::

### Official plugin

- [@vuepress/plugin-active-header-links][active-header-links]: Automatically update route Hash

- [@vuepress/plugin-container][container]: custom container

- [@vuepress/external-link-icon][external-link-icon]: Add external link icon for external links in Markdown.

- [@vuepress/plugin-git][git]: Git-based info plugin

- [@vuepress/plugin-nprogress][nprogress]: progress bar

- [@vuepress/plugin-prismjs][prismjs]: Code highlighting plugin using Prism.js

- [@vuepress/plugin-theme-data][theme-data]: Composition API plugin for theme data

[active-header-links]: https://vuejs.press/reference/plugin/active-header-links.html
[container]: https://vuejs.press/reference/plugin/container.html
[external-link-icon]: https://vuejs.press/reference/plugin/external-link-icon.html
[git]: https://vuejs.press/reference/plugin/git.html
[nprogress]: https://vuejs.press/reference/plugin/nprogress.html
[prismjs]: https://vuejs.press/reference/plugin/prismjs.html
[theme-data]: https://vuejs.press/reference/plugin/theme-data.html
[vuepress]: https://vuejs.press/

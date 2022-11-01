---
title: Other Plugin Config
icon: more
order: 8
category:
  - Config
tag:
  - Plugin Config
  - Theme Config
---

## components

Register components which can be used in Markdown files, available component names are:

- `"Badge"`
- `"BiliBili"`
- `"CodePen"`
- `"PDF"`
- `"StackBlitz"`
- `"VideoPlayer"`
- `"YouTube"`

You can set `plugin.components` with an array of components you want, by default it will be `["Badge"]`.

## copyCode <Badge text="enabled by default" />

Controls `vuepress-plugin-copy-code2`, providing a code copy button.

By default, no config is required. If you don’t need this feature, please set to `false`.

::: info

For plugin options, please refer to [copy-code2 plugin options][copy-code-config].

:::

## git <Badge text="enabled in production" />

Controls `@vuepress/plugin-git` to provide file information via Git commit history.

By default, it is only enabled in build mode to improve development server performance. You can manually set a boolean to control the plugin state, or provide plugin options.

::: info

See [git plugin options][git-config] for plugin options.

:::

## nprogress <Badge text="enabled by default" />

Controls `@vuepress/plugin-nprogress` and provides a progress bar when switching pages through nprogress.

By default, the theme will enable this plugin, you can set `false` to disable it.

## prismjs <Badge text="enabled by default" />

Controls `@vuepress/plugin-prismjs` to provide code block highlighting via PrismJS.

By default, the theme will enable this plugin, you can set `false` to disable it and highlight code blocks yourself.

::: info

See [prismjs plugin options][prismjs-config] for plugin options.

:::

## photoSwipe <Badge text="enabled by default" />

Controls `vuepress-plugin-photo-swipe`, providing picture browsing function.

By default, no config is required. If you don’t need this feature, please set to `false`.

::: info

For plugin options, please refer to [photo-swipe plugin options][photo-swipe-config].

:::

## readingTime <Badge text="enabled by default" />

Controls `vuepress-plugin-reading-time2`, providing word count for a page and generate an estimated reading time.

### readingTime.wordPerMinute

- Type: `number`
- Default: `300`

Words read per minute.

::: info

For more plugin options, see [reading-time2 plugin docs][reading-time].

:::

## seo <Badge text="enabled by default" />

Controls `vuepress-plugin-seo2`, providing search engine enhancements.

By default, no config is required. If you don’t need this feature, please set to `false`.

::: info

For plugin config, see [seo2 plugin options][seo-config].

:::

## sitemap <Badge text="enabled by default" />

Controls `vuepress-plugin-seo2`, providing automatically Sitemap generation.

By default, no config is required. If you don’t need this feature, please set to `false`.

::: info

For plugin config, please refer to [sitemap2 plugin options][sitemap-config].

:::

[copy-code-config]: https://vuepress-theme-hope.github.io/v2/copy-code/config.html
[git-config]: https://v2.vuepress.vuejs.org/reference/plugin/git.html
[prismjs-config]: https://v2.vuepress.vuejs.org/reference/plugin/prismjs.html
[photo-swipe-config]: https://vuepress-theme-hope.github.io/v2/photo-swipe/config.html
[reading-time]: https://vuepress-theme-hope.github.io/v2/reading-time/
[seo-config]: https://vuepress-theme-hope.github.io/v2/seo/config.html
[sitemap-config]: https://vuepress-theme-hope.github.io/v2/sitemap/config.html

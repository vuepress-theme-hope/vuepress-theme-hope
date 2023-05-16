---
title: Other Plugin Config
icon: ellipsis
order: 8
category:
  - Config
tag:
  - Plugin Config
  - Theme Config
---

## components

Controls `vuepress-plugin-components`, providing a set of components for Markdown.

Available component which can be used in markdown files are:

- `"AudioPlayer"`
- `"Badge"`
- `"BiliBili"`
- `"CodePen"`
- `"PDF"`
- `"StackBlitz"`
- `"VideoPlayer"`
- `"YouTube"`

You can set `plugin.components.components` with an array of components you want, by default it will be `["Badge"]`.

Also, you can set `plugin.components.rootComponents` to enable some root components, such as addThis and notice.

::: info

For plugin options, please refer to <ProjectLink name="components" path="/config.html">components plugin options</ProjectLink>.

:::

## copyCode <Badge text="enabled by default" />

Controls `vuepress-plugin-copy-code2`, providing a code copy button.

By default, no config is required. If you don't need this feature, please set to `false`.

::: info

For plugin options, please refer to <ProjectLink name="copy-code2" path="/config.html">copy-code2 plugin options</ProjectLink>.

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

### prismjs.light

- Type: `PrismjsTheme`
- Default: `"one-light"`
- Details: [Interface → Code Themes](../../guide/interface/code-theme.md)

Prism.js theme used in lightmode.

### prismjs.dark

- Type: `PrismjsTheme`
- Default: `"one-dark"`
- Details: [Interface → Code Themes](../../guide/interface/code-theme.md)

Prism.js theme used in darkmode.

## photoSwipe <Badge text="enabled by default" />

Controls `vuepress-plugin-photo-swipe`, providing picture browsing function.

By default, no config is required. If you don't need this feature, please set to `false`.

::: info

For plugin options, please refer to <ProjectLink name="photo-swipe" path="/config.html">photo-swipe plugin options</ProjectLink>.

:::

## readingTime <Badge text="enabled by default" />

Controls `vuepress-plugin-reading-time2`, providing word count for a page and generate an estimated reading time.

### readingTime.wordPerMinute

- Type: `number`
- Default: `300`

Words read per minute.

::: info

For more plugin options, see <ProjectLink name="reading-time2" path="/config.html">reading-time2 plugin options</ProjectLink>.

:::

## seo <Badge text="enabled by default" />

Controls `vuepress-plugin-seo2`, providing search engine enhancements.

By default, no config is required. If you don't need this feature, please set to `false`.

::: info

For plugin config, see <ProjectLink name="seo2" path="/config.html">seo2 plugin options</ProjectLink>.

:::

## sitemap <Badge text="enabled by default" />

Controls `vuepress-plugin-seo2`, providing automatically Sitemap generation.

By default, no config is required. If you don't need this feature, please set to `false`.

::: info

For plugin config, please refer to <ProjectLink name="sitemap2" path="/config.html">sitemap2 plugin options</ProjectLink>.

:::

[git-config]: https://vuejs.press/reference/plugin/git.html

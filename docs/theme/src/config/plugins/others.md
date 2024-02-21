---
title: Other Plugin Config
icon: ellipsis
order: -1
category:
  - Config
tag:
  - Plugin Config
  - Theme Config
---

## catalog <Badge text="enabled by default" />

Controls `@vuepress/plugin-catalog` which provides catalog pages generation.

No extra config is required by default. Se it to `false` if you don't need it.

Check [catalog plugin docs][catalog-config] for available plugin options.

## backToTop <Badge text="enabled by default" />

Controls `@vuepress/plugin-back-to-top` which provides a back to top button.

No extra config is required by default. Se it to `false` if you don't need it.

Check [back-to-top plugin docs][back-to-top-config] for available plugin options.

## components

Controls `vuepress-plugin-components`, providing a set of components for Markdown.

Available component which can be used in markdown files are:

- `"ArtPlayer"`
- `"Badge"`
- `"BiliBili"`
- `"CodePen"`
- `"FontIcon"`
- `"PDF"`
- `"Replit"`
- `"Share"`
- `"StackBlitz"`
- `"VPBanner"`
- `"VPCard"`
- `"VidStack"`
- `"SiteInfo"`
- `"XiGua"`

You can set `plugins.components.components` with an array of components you want, by default it will be `["Badge"]`.

Also, you can set `plugins.components.rootComponents` to enable some root components, such as Notice.

Check <ProjectLink name="components" path="/config.html">components plugin docs</ProjectLink> for available plugin options.

## copyCode <Badge text="enabled by default" />

Controls `@vuepress/plugin-copy-code` which provides a code copy button on desktop.

No extra config is required by default. Se it to `false` if you don't need it.

Check [copy-code plugin docs][copy-code-config] for available plugin options.

## externalLinkIcon <Badge text="enabled by default" />

Controls whether enable `@vuepress/external-link-icon` or not, only accept boolean value.

## git <Badge text="enabled in production" />

Controls `@vuepress/plugin-git` which provides page meta via Git.

The plugin is only enabled in build mode by default to improve devServer performance. You can manually set a boolean to control the plugin state, or provide plugin options.

Check [git plugin docs][git-config] for available plugin options.

## linksCheck <Badge text="enabled by default" />

Controls `@vuepress/plugin-links-check` which provides markdown links check. You can manually set a boolean to control the plugin state, or provide plugin options.

Check [links-check plugin docs][links-check-config] for available plugin options.

## nprogress <Badge text="enabled by default" />

Controls `@vuepress/plugin-nprogress` which provides a progress bar through `nprogress` when switching pages .

You can set `false` to disable it.

## prismjs <Badge text="enabled by default" />

Controls `@vuepress/plugin-prismjs` which provides code block highlighting via `prismjs`.

You can set `false` to disable it and highlight code blocks yourself or with other plugins.

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

Controls `@vuepress/plugin-photo-swipe` which provides picture browsing feature.

No extra config is required by default. Se it to `false` if you don't need it.

Check [photo-swipe plugin docs][photo-swipe-config] for available plugin options.

## pwa

Controls `@vuepress/plugin-pwa` which provides PWA support.

You can set `true` to directly enable it, or provide plugin options.

Check [pwa plugin docs][pwa-config] for available plugin options.

## readingTime <Badge text="enabled by default" />

Controls `@vuepress/plugin-reading-time` which generates words count and estimated reading time for pages.

### readingTime.wordPerMinute

- Type: `number`
- Default: `300`

Reading speed (words per minute)

Check [reading-time plugin docs][reading-time-config] for available plugin options.

## seo <Badge text="enabled by default" />

Controls `@vuepress/plugin-seo` which provides search engine enhancements.

No extra config is required by default. Se it to `false` if you don't need it.

Check [seo plugin docs][seo-config] for available plugin options.

## sitemap <Badge text="enabled by default" />

Controls `@vuepress/plugin-sitemap` which provides sitemap.

No extra config is required by default. Se it to `false` if you don't need it.

Check [sitemap plugin docs][sitemap-config] for available plugin options.

[back-to-top-config]: https://ecosystem.vuejs.press/plugins/back-to-top.html#options
[catalog-config]: https://ecosystem.vuejs.press/plugins/catalog.html#options
[copy-code-config]: https://ecosystem.vuejs.press/plugins/copy-code.html#options
[git-config]: https://ecosystem.vuejs.press/plugins/git.html#options
[links-check-config]: https://ecosystem.vuejs.press/plugins/links-check.html#options
[photo-swipe-config]: https://ecosystem.vuejs.press/plugins/photo-swipe.html#options
[pwa-config]: https://ecosystem.vuejs.press/plugins/pwa/config.html#options
[reading-time-config]: https://ecosystem.vuejs.press/plugins/reading-time.html#options
[seo-config]: https://ecosystem.vuejs.press/plugins/sitemap/config.html
[sitemap-config]: https://ecosystem.vuejs.press/plugins/seo/config.html

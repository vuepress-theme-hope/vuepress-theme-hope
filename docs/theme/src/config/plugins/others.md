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

- ArtPlayer: A video player powered by ArtPlayer
- Badge: Colorful badge component
- BiliBili: Embedded BiliBili video
- CodePen: Embedded CodePen demo
- FontIcon: Font icon component
- PDF: Embedded PDF viewer
- Share: Sharing current page with social medias
- StackBlitz: Embedded StackBlitz demo
- SiteInfo: Display sites
- VPBanner: A banner component
- VPCard: A card component
- VidStack: Audio/Video player powered by VidStack
- XiGua: Embedded XiGua video

You can set `plugins.components.components` with an array of components you want, by default it will be `["Badge"]`.

Also, you can set `plugins.components.rootComponents` to enable some root components, such as Notice.

Check <ProjectLink name="components" path="/config.html">components plugin docs</ProjectLink> for available plugin options.

## copyCode <Badge text="enabled by default" />

Controls `@vuepress/plugin-copy-code` which provides a code copy button on desktop.

No extra config is required by default. Se it to `false` if you don't need it.

Check [copy-code plugin docs][copy-code-config] for available plugin options.

## git <Badge text="enabled in production" />

Controls `@vuepress/plugin-git` which provides page meta via Git.

The plugin is only enabled in build mode by default to improve devServer performance. You can manually set a boolean to control the plugin state, or provide plugin options.

Check [git plugin docs][git-config] for available plugin options.

## linksCheck <Badge text="enabled by default" />

Controls `@vuepress/plugin-links-check` which provides markdown links check. You can manually set a boolean to control the plugin state, or provide plugin options.

Check [links-check plugin docs][links-check-config] for available plugin options.

## markdownHint <Badge text="enabled by default" />

Controls `@vuepress/plugin-markdown-hint` which adds hint container support in markdown. You can manually set a boolean to control the plugin state, or provide plugin options.

The hint containers are enabled by default, and you can set `false` to disable the plugin.

Check [markdown-hint plugin docs][markdown-hint-config] for available plugin options.

## markdownImage <Badge text="enabled by default" />

Controls `@vuepress/plugin-markdown-image` which provides image enhancement in markdown. You can manually set a boolean to control the plugin state, or provide plugin options.

Lazyload and figure feature are enabled by default, and you can set `false` to disable the plugin.

Check [markdown-image plugin docs][markdown-image-config] for available plugin options.

## markdownMath

Controls `@vuepress/plugin-markdown-math` which provides math support in markdown. You can manually set a boolean to control the plugin state, or provide plugin options.

Setting `true` means using katex with defaults.

Check [markdown-math plugin docs][markdown-math-config] for available plugin options.

## markdownTab

Controls `@vuepress/plugin-markdown-tab` which provides code tabs and tabs in markdown. You can manually set a boolean to control the plugin state, or provide plugin options.

Setting to `true` means enabling both features.

Check [markdown-tab plugin docs][markdown-tab-config] for available plugin options.

## nprogress <Badge text="enabled by default" />

Controls `@vuepress/plugin-nprogress` which provides a progress bar through `nprogress` when switching pages .

You can set `false` to disable it.

## prismjs

Controls `@vuepress/plugin-prismjs` which provides code block highlighting via `prismjs`.

Check [prismjs plugin docs][prismjs-config] for available plugin options.

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

## revealjs

Controls `@vuepress/plugin-revealjs` which provides presentation support.

You can set `true` to directly enable it, or provide plugin options.

Check [revealjs plugin docs][revealjs-config] for available plugin options.

## seo <Badge text="enabled by default" />

Controls `@vuepress/plugin-seo` which provides search engine enhancements.

No extra config is required by default. Se it to `false` if you don't need it.

Check [seo plugin docs][seo-config] for available plugin options.

## sitemap <Badge text="enabled by default" />

Controls `@vuepress/plugin-sitemap` which provides sitemap.

No extra config is required by default. Se it to `false` if you don't need it.

Check [sitemap plugin docs][sitemap-config] for available plugin options.

## watermark

Controls `@vuepress/plugin-watermark` which provides watermark.

Check [watermark plugin docs][watermark-config] for available plugin options.

[back-to-top-config]: https://ecosystem.vuejs.press/plugins/back-to-top.html#options
[catalog-config]: https://ecosystem.vuejs.press/plugins/features/catalog.html#options
[copy-code-config]: https://ecosystem.vuejs.press/plugins/features/copy-code.html#options
[git-config]: https://ecosystem.vuejs.press/plugins/development/git.html#options
[links-check-config]: https://ecosystem.vuejs.press/plugins/markdown/links-check.html#options
[markdown-hint-config]: https://ecosystem.vuejs.press/plugins/markdown/markdown-hint.html#options
[markdown-image-config]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html#options
[markdown-math-config]: https://ecosystem.vuejs.press/plugins/markdown/markdown-math.html#options
[markdown-tab-config]: https://ecosystem.vuejs.press/plugins/markdown/markdown-tab.html#options
[photo-swipe-config]: https://ecosystem.vuejs.press/plugins/features/photo-swipe.html#options
[prismjs-config]: https://ecosystem.vuejs.press/plugins/markdown/prismjs.html#options
[pwa-config]: https://ecosystem.vuejs.press/plugins/pwa/pwa/config.html#options
[reading-time-config]: https://ecosystem.vuejs.press/plugins/development/reading-time.html#options
[revealjs-config]: https://ecosystem.vuejs.press/plugins/markdown/revealjs/#options
[seo-config]: https://ecosystem.vuejs.press/plugins/seo/seo/config.html
[sitemap-config]: https://ecosystem.vuejs.press/plugins/seo/sitemap/config.html
[watermark-config]: https://ecosystem.vuejs.press/plugins/features/watermark.html

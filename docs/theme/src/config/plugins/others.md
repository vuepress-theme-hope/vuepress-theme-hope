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

## autoCatalog <Badge text="enabled by default" />

Controls `vuepress-plugin-auto-catalog` which provides catalog pages generation.

No extra config is required by default. Se it to `false` if you don't need it.

Check <ProjectLink name="auto-catalog" path="/config.html">auto catalog plugin docs</ProjectLink> for available plugin options.

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

Controls `vuepress-plugin-copy-code2` which provides a code copy button on desktop.

No extra config is required by default. Se it to `false` if you don't need it.

Check <ProjectLink name="copy-code2" path="/config.html">copy-code2 plugin docs</ProjectLink> for available plugin options.

## externalLinkIcon <Badge text="enabled by default" />

Controls whether enable `@vuepress/external-link-icon` or not, only accept boolean value.

## git <Badge text="enabled in production" />

Controls `@vuepress/plugin-git` which provides page meta via Git.

The plugin is only enabled in build mode by default to improve devServer performance. You can manually set a boolean to control the plugin state, or provide plugin options.

Check [git plugin docs][git-config] for available plugin options.

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

Controls `vuepress-plugin-photo-swipe` which provides picture browsing feature.

No extra config is required by default. Se it to `false` if you don't need it.

Check <ProjectLink name="photo-swipe" path="/config.html">photo-swipe plugin docs</ProjectLink> for available plugin options.

## readingTime <Badge text="enabled by default" />

Controls `vuepress-plugin-reading-time2` which generates words count and estimated reading time for pages.

### readingTime.wordPerMinute

- Type: `number`
- Default: `300`

Reading speed (words per minute)

Check <ProjectLink name="reading-time2" path="/config.html">reading-time2 plugin docs</ProjectLink> for available plugin options.

## seo <Badge text="enabled by default" />

Controls `vuepress-plugin-seo2` which provides search engine enhancements.

No extra config is required by default. Se it to `false` if you don't need it.

Check <ProjectLink name="seo2" path="/config.html">seo2 plugin docs</ProjectLink> for available plugin options.

## sitemap <Badge text="enabled by default" />

Controls `vuepress-plugin-seo2` which provides sitemap.

No extra config is required by default. Se it to `false` if you don't need it.

Check <ProjectLink name="sitemap2" path="/config.html">sitemap2 plugin docs</ProjectLink> for available plugin options.

[git-config]: https://vuejs.press/reference/plugin/git.html

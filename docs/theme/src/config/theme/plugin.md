---
title: Theme Plugin Config
icon: configuration
category: config
tags:
  - config
  - plugin
  - themeConfig
---

These are plugin config provided by theme.

::: tip
All the config key name is the camelCase version of plugin name.

E.g.: `@mr-hope/vuepress-copy-code` 's config keyname will be `copyCode`.
:::

## mdEhance

Markdown Enhance config, for details see [vuepress-plugin-md-enhance documentation][md-enhance-config]

### mdEhance.enableAll

- Type: `boolean`
- Default: `false`

Whether to enable all features

### mdEhance.lineNumbers <MyBadge text="Default value changed" type = "error" />

- Type: `boolean`
- Default: `true`

Whether to show line numbers to the left of each code block

### mdEhance.align

- Type: `boolean`
- Default: `false`

Whether to enable align support

### mdEhance.sup

- Type: `boolean`
- Default: `false`

Whether to enable superscript format support

### mdEhance.sub

- Type: `boolean`
- Default: `false`

Whether to enable subscript format support

### mdEhance.footnote

- Type: `boolean`
- Default: `false`

Whether to enable footnote format support

### mdEhance.mark

- Type: `boolean`
- Default: `false`

Whether to enable mark format support

### mdEhance.tex

- Type: `boolean`
- Default: `false`

Whether to enable TeX syntax support

### mdEhance.flowchart

- Type: `boolean`
- Default: `false`

Whether to enable flowchart syntax support

## Comment settings

Comment options are omitted here because of the complexity.

For details, see [@mr-hope/vuepress-plugin-comment documentation][comment-config]

> You can set it to `false` to disable the comment plugin

## Copyright Settings

For details see [vuepress-plugin-copyright documentation][copyright-config]

> It's a vuepress community plugin, not a built-in plugin. So if you met bugs, please come to [it's repo](https://github.com/vuepress/vuepress-plugin-copyright) for help.

### copyright.status

- Type: `"global" | "local"`
- Required: Yes

Whether to enable this feature globally.

### copyright.minLength

- Type: `number`
- Default value: `100`

The minimum number of characters that trigger copyright information or prohibit copying.

### copyright.noCopy

- Type: `boolean`
- Default value: `false`

Whether to prohibit copying

### copyright.noSelect

- Type: `boolean`
- Default value: `false`

Whether to prohibit selected text

## pwa <MyBadge text="Enabled by default" />

PWA setting options，no configuration is needed by default.

> If you don't need this feature, please set to `false`.

### pwa.popupComponent

- Type: `string`
- Required: No

A custom component to replace the default popup component.

### pwa.gerateSWConfig

workbox-build's [generateSW config](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config)

## seo <MyBadge text="Enabled by default" />

SEO Enhance settings, no configuration is needed by default.

> For details, see [vuepress-plugin-seo config][seo-config]
>
> If you don't need this feature, please set to `false`.

## sitemap <MyBadge text="Enabled by default" />

Sitemap Generator settings, no configuration is needed by default.

> For details, see [vuepress-plugin-sitemap config][sitemap-config]
>
> If you don't need this feature, please set to `false`.

## addThis

- Type: `string`
- Required: No

pubid for AddThis

> For details see [AddThis Plugin][add-this]

## copyCode

Options for copy code plugin, set to `false` to disable this plugin.

> By default no more configuration is needed, and for details see [Copy Code Plugin Config][copy-code]

## photoSwipe

Options for photo preview plugin, set to `false` to disable this plugin.

> By default no more configuration is needed, and for details see [PhotoSwipe Plugin Config][photo-swipe-config]

## lastUpdate

- Type: `(timestamp: number, lang: string) => string`
- Default value: `` `${dayjs(timestamp).format('LL')} ${dayjs(timestamp).format('HH:mm')}` ``

Time conversion function for `@mr-hope/plugin-last-update`.

Will use dayjs to automatically localize according to the current page language by default.

Such as: `2020年5月8日 16:05` `May 8, 2020 16:05`

[add-this]: https://vuepress-add-this.mrhope.site
[comment-config]: https://vuepress-comment.mrhope.site/config/
[copyright-config]: https://vuepress.github.io/en/plugins/copyright/
[md-enhance-config]: https://vuepress-md-enhance.mrhope.site/config/
[copy-code]: https://vuepress-copy-code.mrhope.site
[photo-swipe-config]: https://vuepress-photo-swipe.mrhope.site/config/
[seo-config]: https://vuepress-seo.mrhope.site/config/
[sitemap-config]: https://vuepress-sitemap.mrhope.site/config/

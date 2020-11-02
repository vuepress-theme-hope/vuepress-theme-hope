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

## mdEnhance

Markdown Enhance config, for details see [vuepress-plugin-md-enhance documentation][md-enhance-config]

### mdEnhance.enableAll

- Type: `boolean`
- Default: `false`

Whether to enable all features

### mdEnhance.lineNumbers <MyBadge text="Default value changed" type = "error" />

- Type: `boolean`
- Default: `true`

Whether to show line numbers to the left of each code block

### mdEnhance.align

- Type: `boolean`
- Default: `false`

Whether to enable align support

### mdEnhance.sup

- Type: `boolean`
- Default: `false`

Whether to enable superscript format support

### mdEnhance.sub

- Type: `boolean`
- Default: `false`

Whether to enable subscript format support

### mdEnhance.footnote

- Type: `boolean`
- Default: `false`

Whether to enable footnote format support

### mdEnhance.mark

- Type: `boolean`
- Default: `false`

Whether to enable mark format support

### mdEnhance.tex

- Type: `boolean`
- Default: `false`

Whether to enable TeX syntax support

### mdEnhance.flowchart

- Type: `boolean`
- Default: `false`

Whether to enable flowchart syntax support

### mdEnhance.presentation

- Type: `PresentationOptions | boolean`
- Default: `false`

Whether to enable presentation syntax support.

You can set it with an object, the object will be used to config reveal.js.

#### mdEnhance.presentation.plugins

- Type: `string[]`
- Required: No

Plugins you want to use on reveal.js.

Acceptable values are:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

#### mdEnhance.presentation.revealConfig

- Type: `Partial<RevealOptions>`
- Required: No

Config which you want to pass to reveal.js.

## Comment settings

Comment options are omitted here because of the complexity.

For details, see [@mr-hope/vuepress-plugin-comment documentation][comment-config]

> You can set it to `false` to disable the comment plugin

## Copyright Settings

For details see [vuepress-plugin-copyright documentation][copyright-config]

> It’s a vuepress community plugin, not a built-in plugin. So if you met bugs, please come to [it’s repo](https://github.com/vuepress/vuepress-plugin-copyright) for help.

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

Progressive Web App support

> If you don’t need this feature, please set to `false`.
>
> For more detail, see [pwa plugin documatation][pwa-config]

### pwa.manifest

- Type: `ManifestOption`
- Required: No

You can fill with an object which will be parsed to manifest.webmanifest.

::: tip
Some options have their fallback if you donot set them.

- name: `siteConfig.title` || `themeConfig.title` || `'Site'`
- short_name: `siteConfig.title` || `themeConfig.title` || `'Site'`
- description: `siteConfig.description` || `themeConfig.description` || `'A site built with vuepress-theme-hope'`
- lang: `options.baseLang` || `themeConfig.baseLang` || `"en-US"`
- start_url: `context.base`
- scope: `context.base`

- display: `"standalone"`
- theme_color: `"#46bd87"`
- background_color: `'#ffffff'`
- orientation: `'portrait-primary'`
- prefer_related_applications: `false`

:::

### pwa.showInstall

- Type: `boolean`
- Default: `true`

Whether display install button

### pwa.favicon

- Type: `string`
- Required: No

Path of favico.ico with absolute path.(We recommand you to set it for your site)

### pwa.themeColor

- 类型: `string`
- 默认值: `"#46bd87"`

Theme Color

### pwa.maxSize

- Type: `number`
- Default: `1024`

Max size which allows to cache, with KB unit

### pwa.cacheHTML

- Type: `boolean`
- Default: `true`

Whether cache HTML files besides home page and 404 page.

::: tip
This option is useful if your site is too large when containing HTML files.
:::

### pwa.cachePic

- Type: `boolean`
- Default: `false`

Whether cache pictures

> Any file ends with `.png`, `.jpg`, `.jpeg` , `.gif`, `.bmp`, `.webp` will be seen as picture files.

### pwa.maxPicSize

- Type: `number`
- Default: `512`

Max picture size which allows to cache, with KB unit

### pwa.apple

Special settings for Apple

> If you don’t want to make detailed settings, you can safely ignore it; if you don’t want your site compatable with apple, please set it to `false`.

#### pwa.apple.icon

- Type: `string`
- Required: No

Fill in the icon address used by Apple, the recommended size is 152×152

#### pwa.apple.statusBarColor

- Type: `"black" | "white"`
- Default: `"black"`

Apple’s status bar color

#### pwa.apple.maskIcon

- Type: `string`
- Required: No

Safari mask icon

### pwa.msTile

Special settings for Microsoft tiles

> If you don’t want to make detailed settings, you can safely ignore it; if you don’t want your site compatable with windows, please set it to `false`.

#### pwa.msTile.image

- Type: `string`
- Required: No

Tile icon

### pwa.msTile.color

- Type: `string`
- Default value: `themeColor`

The tile color will automatically fall back to themeColor if you don’t set it.

### pwa.popupComponent

- Type: `string`
- Default: `'SWUpdatePopup'`

You can fill in the custom pop-up component path.

### pwa.generateSwConfig

Options passed to `workbox-build`, for details, see [Workbox documentation](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)

::: tip
We will precache all site related files `**/*.{js,css,svg}` and font files `**/*.{woff,woff2,eot,ttf,otf}` for you.

If you set `cachePic` to `true`, we will also precache `**/*.{png,jpg,jpeg,gif,bmp,webp}` files for you.

All the files larger than `maxSize` or any pictures larger than `maxPicSize` will be dropped.
:::

## seo <MyBadge text="Enabled by default" />

SEO Enhance settings, no configuration is needed by default.

> For details, see [vuepress-plugin-seo config][seo-config]
>
> If you don’t need this feature, please set to `false`.

## sitemap <MyBadge text="Enabled by default" />

Sitemap Generator settings, no configuration is needed by default.

> For details, see [vuepress-plugin-sitemap config][sitemap-config]
>
> If you don’t need this feature, please set to `false`.

## addThis

- Type: `string`
- Required: No

Pubid for AddThis

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
[pwa-config]: https://vuepress-pwa.mrhope.site/config/
[seo-config]: https://vuepress-seo.mrhope.site/config/
[sitemap-config]: https://vuepress-sitemap.mrhope.site/config/

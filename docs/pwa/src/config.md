---
title: config
icon: configuration
---

## baseLang

- Type: `string`
- Default: `'en-US'`

The language of the home directory.

## popupComponent

- Type: `string`
- Default: `'SWUpdatePopup'`

You can fill in the custom pop-up component path.

## manifest

- Type: `ManifestOption`
- Required: No

You can fill with an object which will be parsed to manifest.json.

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

## cacheHTML

- Type: `boolean`
- Default: `true`

Whether cache HTML files besides home page and 404 page.

::: tip
This option is useful if your site is too large when containing HTML files.
:::

## cachePic

- Type: `boolean`
- Default: `false`

Whether cache pictures

## cacheMaxSize

- Type: `number`
- Default: `1024`

Max size which allows to cache, with KB unit

## generateSwConfig

Options passed to `workbox-build`, for details, see [Workbox documentation](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)

::: tip
We will precache all site related files `**/*.{js,css,svg}` and font files `**/*.{woff,woff2,eot,ttf,otf}` for you.

If you set `cachePic` to `true`, we will also precache `**/*.{png,jpg,jpeg,gif,webp}` files for you.

All the files larger than `cacheMaxSize` will be dropped.
:::

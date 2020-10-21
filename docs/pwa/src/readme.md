---
home: true
title: "@mr-hope/vuepress-plugin-pwa"
icon: homefill
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-pwa"
tagline: A powerfull PWA plugin
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

Progressive Web App Support

## Plugin description

This plugin will turn on PWA support. A pop-up window will be displayed in the lower right corner when an update is obtained.

The default language of the popup will automatically be set to `baseLang` configured in `themeConfig`.

## How to use

### Install

```bash
npm i -D @mr-hope/vuepress-plugin-pwa
```

Or

```bash
yarn add -D @mr-hope/vuepress-plugin-pwa
```

### Usage

```js {3-7}
// .vuepress/config.js
module.exports = {
  plugin: [
    "@mr-hope/pwa",
    {
      // your options
    },
  ],
};
```

## Plugin Options

### baseLang

- Type: `string`
- Default: `'en-US'`

The language of the home directory.

### popupComponent

- Type: `string`
- Default: `'SWUpdatePopup'`

You can fill in the custom pop-up component path.

### manifest

- Type: `ManifestOption`
- Required: No

You can fill with an object which will be parsed to manifest.json.

::: tip
There are some options which will have their fallback if you donot set them.

- name: `siteConfig.title` || `themeConfig.title` || `'Site'`
- short_name: `siteConfig.title` || `themeConfig.title` || `'Site'`
- description: `siteConfig.description` || `themeConfig.description` || `'A site built with vuepress-theme-hope'`
- start_url: `context.base`
- scope: `context.base`

- theme_color: `"#46bd87"`
- background_color: `'#ffffff'`
- orientation: `'portrait-primary'`

:::

### cachePic

- Type: `boolean`
- Default: `false`

Whether cache pictures

### cacheMaxSize

- Type: `number`
- Default: `1024`

Max size which allows to cache, with KB unit

### generateSwConfig

Options passed to `workbox-build`, for details, see [Workbox documentation](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)

::: tip
We will precache all site related files `**/*.{html, css, js}` and font files `**/*.{woff,woff2,eot,ttf,otf}` for you.

If you set `cachePic` to `true`, we will also precache `**/*.{png,jpg,jpeg,svg}` files for you.

All the files larger than `cacheMaxSize` will be dropped.
:::

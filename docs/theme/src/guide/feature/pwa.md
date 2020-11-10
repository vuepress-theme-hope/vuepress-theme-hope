---
icon: setting
category: feature
tags:
  - pwa
  - feature
---

# PWA

The theme will enable progressive web app support using `@mr-hope/vuepress-plugin-pwa` by default. If you do not need this feature or want to use other pwa plugins, you can set the `themeConfig.pwa` to `false` to disable the plugin.

::: tip
You don’t need to use `head` function to handle your head option while using vuepress-theme-hope, `config` function in theme will do the job for you. The only thing you need is to set `themeConfig.pwa`.
:::

## Content Cache and update

After the Service worker obtains the content update, a popup will be displayed in the bottom right corner, prompting the user that new content is available and allowing the user to trigger the update.

The default language of the popup will automatically be set to `baseLang` configured in `themeConfig`.

## Manifest

A manifest.webmanifest will be auto generated in dist folder. If you have a manifest.webmanifest or manifest.json in `.vuepress/public`, the plugin will read and merge it in the final manifest.

To let your site be able to register as Web App, you should set icons in `themeConfig.pwa.manifest.icons`.

You can also set other options in `themeConfig.pwa.manifest`.

## Cache Size

To better control what your Service Worker can precache, you can set `themeConfig.pwa.cachePic` and `themeConfig.pwa.cacheHTML` to decide whether the service worker caches HTML files except the homepage and 404 error pages and site pictures.

To prevent from including large files in your precache list, any resources larger than 2MB and any pictures larger than 1MB will be dropped. You can change the size limit by setting `themeConfig.pwa.maxSize` and `themeConfig.pwa.maxPicSize`.

## More

For more detail, see [pwa plugin documatation][pwa]

[pwa]: https://vuepress-pwa.mrhope.site/

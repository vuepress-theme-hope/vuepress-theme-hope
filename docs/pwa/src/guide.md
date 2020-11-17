---
title: Guide
icon: creative
---

## Content Cache and update

After the Service worker obtains the content update, a popup will be displayed in the bottom right corner, prompting the user that new content is available and allowing the user to trigger the update.

The default language of the popup will automatically be set to `baseLang` configured in `themeConfig`.

## PWA

### Manifest

A `manifest.webmanifest` will be auto generated in dist folder. If you have a manifest.webmanifest or manifest.json in `.vuepress/public`, the plugin will read and merge it in the final manifest.

To let your site be able to register as Web App, you should set icons in `themeConfig.pwa.manifest.icons`.

You can also set other options in `themeConfig.pwa.manifest`.

::: info More
For docs of Manifest, please see [W3C Manifest](https://w3c.github.io/manifest/)
:::

### Head Tags Inject

You need to use the built-in head function to automatically inject the head tag into the `<head>` of your site to be able to register and display well on all devices. The first parameter of the head function is the plugin option, and the second parameter is the optional original head array.

```js
const { head } = require("@mr-hope/vuepress-plugin-pwa");

const pwaOptions = {
  // your options
};

// .vuepress/config.js
module.exports = {
  head: head(pwaOptions, [
    /*
     * your original head
     * omit this param if you don’t have any config
     */
  ]),
  plugins: [["@mr-hope/pwa", pwaOptions]],
};
```

## Cache Size

To better control what your Service Worker can precache, you can set `themeConfig.pwa.cachePic` and `themeConfig.pwa.cacheHTML` to decide whether the service worker caches HTML files except the homepage and 404 error pages and site pictures.

To prevent from including large files in your precache list, any resources larger than 2MB and any pictures larger than 1MB will be dropped. You can change the size limit by setting `themeConfig.pwa.maxSize` and `themeConfig.pwa.maxPicSize`.

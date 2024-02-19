---
title: PWA
icon: mobile-screen
order: 3
category:
  - Advanced
tag:
  - Advanced
  - PWA
---

The theme provides progressive web app support [^pwa-intro] via [`@vuepress/plugin-pwa`][pwa]. To use it, install `@vuepress/plugin-pwa` manually in your project.

::: info

If you are using this plugin, we recommend you to set `shouldPrefetch: false` in your [VuePress config file](../../cookbook/vuepress/config.md#config-file).

`vuepress-theme-hope` provides `plugins.pwa` in theme options to `@vuepress/plugin-pwa`.

:::

<!-- more -->

[^pwa-intro]: **PWA introduction**

    PWA, full name Progressive Web app. PWA standard is stipulated by W3C.

    It allows sites to install the site as an App on supported platform through a browser that supports this feature.

## Direct Enable <Badge text="Not recommended" type="warning" />

You can set `plugins.pwa` to `true` in theme options to let theme automatically generate the necessary config and enable plugins quickly. However, we recommend you to manually set some options by following the instructions below.

## Web App Manifests

To make your website fully compliant with PWA, a Web app manifests [^manifest] file is needed, and your pwa should satisfy the installability [^installable] specification.

[^manifest]: **Manifest File**

    The manifest file uses the JSON format and is responsible for declaring various information of the PWA, such as name, description, icon, and shortcut actions.

    In order for your site to be registered as a PWA, you need to meet the basic specifications of the manifest to make the browser consider the site as an installable PWA and allow users to install it.

    ::: tip

    For Manifest standards and specifications, please see [MDN Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest) and [W3C Manifest](https://w3c.github.io/manifest/).

    :::

[^installable]: **Installable**

    To let the site be registered as a PWA, the site needs to successfully register a valid service worker by itself, and declare a valid manifest file with its link in meta tag.

    The manifest file should contain at least `name` (or `short_name`) `icons` `start_url`.

    On safari, the maximum cache size of the service worker is 50 MB.

You can set `plugins.pwa.manifest` option to customize the manifest file, or provide a `manifest.webmanifest` or `manifest.json` in public folder. The former has higher priority.

The plugin will automatically generate `manifest.webmanifest` for you and add manifest link declaration in each page, while **you should still at least set a valid icon through `plugins.pwa.manifest.icons` or other icon related options in the PWA plugin.**

::: warning

The installability [^installable] specification requires at least one valid icon to be declared in the manifest.

So if you do not configure `plugins.pwa.manifest.icons`, visitors can only enjoy the offline accessibility brought by the Service Worker cache, while cannot install your site as a PWA.

:::

Besides the plugin does not process anything in the manifest by default, but outputs them as-is. This means that if you plan to deploy to a subdirectory, you should append the URL prefix to manifest Urls yourself. If everything you need is all under `base` directory, you can set `plugins.pwa.appendBase: true` in plugin options to let the plugin append `base` to any links in manifest.

## Cache Control

To better control what the Service Worker can pre-cache, the plugin provides related options for cache control.

### Default cache

By default, the plugin will pre-cache all `js` `css` files, and only homepage and 404 html are cached. The plugin will also cache font files (woff, woff2, eot, ttf, otf) and SVG icons.

### Image Cache

If your site has only a few important images, and want them displayed in offline mode, you can cache site images by setting `plugins.pwa.cacheImage: true` .

We recognize images by file extension. Any files ending with `.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp`, `.webp` will be regarded as images.

### HTML Cache

If you have small sites, and would like to make document fully offline available, you can set `plugins.pwa.cacheHTML` to `true` to cache all HTML files.

::: tip Why only home and 404 page been cached by default?

Though VuePress generates HTML files through SSG[^ssg] for all pages, these files are mainly used for SEO[^seo] and allow you to directly configure the backend without SPA[^spa] Visit any link.

[^ssg]: **SSG**: **S**tatic **S**ite **G**eneration,
[^seo]: **SEO**: **S**earch **E**ngine **O**ptimization.
[^spa]: **SPA**: **S**ingle **P**age **A**pplication, most of them only have the homepage, and use history mode to handle routing instead of actually navigating between pages.

VuePress is essentially an SPA. This means that you only need to cache the home page and enter from the home page to access all pages normally. Therefore, not caching other HTML by default can effectively reduce the cache size (40% smaller in size) and speed up the SW update speed.

But this also has the disadvantage. If the user enters the site directly from a non-home page, the HTML file for the first page still needs to be loaded from the internet. Also, in offline environment, users can only enter through the homepage and then navigate to the corresponding page by themselves. If they directly access a link, an inaccessible prompt will appear.

:::

### Size Control

To prevent large files from being included in the pre-cache list, any files > 2 MB or images > 1 MB will be omitted. You can customize these limits with `plugins.pwa.maxSize` and `plugins.pwa.maxImageSize` options (in KB unit).

## Update Control

We provide the `plugins.pwa.update` option to control how users receive updates.

The default value of the `plugins.pwa.update` option is `"available"`, which means that when new content available, the new SW will be installed and its resources will be fetched silently in the background. A pop-up window appears once the new SW is ready, and users can choose whether to refresh immediately to view new content. This means users are reading old content before a new SW is ready.

If your project is still in building stage, and you want to alert the user that he may be reading outdated content, you can set this to `"hint"`. This allows users to be notified that new content has been published within seconds after visiting docs. But the negative effect of this is that if the user chooses to update before the new SW is ready, he will need to get all the resources of the page from the internet before the new SW installs and controls the page.

If your docs are stable, or you're hosting a blog and don't care much about users receiving the latest version right away, you can set this to `"disabled"`, which means that the new SW will be installed completely silently in the background and start waiting, when all pages controlled by old SW are all closed, the new SW will start to take control and provide users with new content during next visit. This setting can prevent users from being disturbed during the visit.

To speed up user access under weak or no network conditions through SW, but also want users to always access new content, you can set this option to `"force"`. This means any old SW will be removed as soon as a new SW is detected, and all pages are refreshed to ensure the user is browsing the latest content. The biggest disadvantage is that all users will experience unexpected sudden refresh within seconds after reentering an updated site.

### Popups

When new content is detected (new SW detected), a update found popup appears; and when the new content is ready, an update ready popup appears.

If you are not satisfied with the default popup content, you can use your own component. Import `PWAFoundPopup` or `PWAReadyPopup` from `@vuepress/plugin-pwa/client` and use its slot to customize the popup content, then pass the component path to `plugins.pwa.foundComponent` or `plugins.pwa.readyComponent` option:

```vue
<script setup lang="ts">
import { PWAFoundPopup } from "@vuepress/plugin-pwa/client";
</script>
<template>
  <PWAFoundPopup v-slot="{ found, refresh }">
    <div v-if="found">
      New content is found.
      <button @click="refresh">Refresh</button>
    </div>
  </PWAFoundPopup>
</template>
```

```vue
<script setup lang="ts">
import { PWAReadyPopup } from "@vuepress/plugin-pwa/client";
</script>
<template>
  <PWAReadyPopup v-slot="{ isReady, reload }">
    <div v-if="isReady">
      New content is ready.
      <button @click="reload">Apply</button>
    </div>
  </PWAReadyPopup>
</template>
```

## Other Options

The plugin also provides other PWA-related options, such as Microsoft tile icon and color settings, Apple icon and so on. If you are an advanced user, you can also set `plugins.pwa.generateSwConfig` to configure `workbox-build`. Check [Plugin options][pwa-config] for more details.

## Further Reading

For more details, please see:

- [PWA plugin docs][pwa]
- [Google PWA](https://web.dev/progressive-web-apps/)
- [MDN PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [W3C Manifest Specification](https://w3c.github.io/manifest/)

[pwa]: https://ecosystem.vuejs.press/plugins/pwa/
[pwa-config]: https://ecosystem.vuejs.press/plugins/pwa/config.html

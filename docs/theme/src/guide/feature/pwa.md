---
title: PWA
icon: setting
category: feature
tags:
  - feature
  - pwa
---

The theme will enable progressive web app support[^pwa-intro] by including [`@mr-hope/vuepress-plugin-pwa`](https://vuepress-theme-hope.github.io/pwa/).

[^pwa-intro]: **PWA introduction**

    PWA, full name Progressive Web app. PWA standard is stipulated by W3C.

    It allows sites to install the site as an App on supported platform through a browser that supports this feature.

If you do not need this feature or want to use other pwa plugins, you can set the `themeConfig.pwa` to `false` to disable the plugin.

<!-- more -->

## Content caching and updating

Service Worker [^service-worker] (SW for short) is mainly used to cache and proxy site content.

[^service-worker]: **Service Worker Introduction**

    1. The Service Worker will get and cache all the files registered in it during the registration process.

    1. After the registration complete, the Service Worker is activated, and starts to proxy and control all your requests.

    1. Whenever you want to initiate an access request through the browser, the Service Worker will check whether it exists in its own cache list, if it exists, it will directly return the cached result, otherwise it will call its own fetch method to get it. You can use a custom fetch method to fully control the result of the request for resources in the web page, such as providing a fallback web page when offline.

    1. Every time the user reopens the site, the Service Worker will request to the link when it was registered. If a new version of Service Woker is detected, it will update itself and start caching the list of resources registered in the new Service Worker . After the content update is successfully obtained, the Service Worker will trigger the `update` event. The user can be notified through this event, for example, a pop-up window will be displayed in the lower right corner, prompting the user that new content is available and allowing the user to trigger an update.

This plugin will automatically register Service Woker through `workbox-build`.

To better control what the Service Worker can pre-cache, the plugin provides the following configurations.

If you are an advanced user, you can also directly set `themeConfig.pwa.generateSwConfig` to pass options to `workbox-build`.

### Default cache

By default, the plugin will pre-cache all files related to the site: `**/*.{html,js,css,svg}`

At the same time, the plugin will cache font files: `**/*.{woff,woff2,eot,ttf,otf}`.

### Cache Control

Based on the requirement of installable [^installable], the plugin provides related options for cache control.

[^installable]: **Installable**

    To let the site be registered as a PWA, the site needs to successfully register a valid service worker by itself, and at the same time add a valid manifest file and declare it.

    Each platform or browser has requirements for the size of the Service Worker cache. When the file size of the Service Worker cache is too large, the site will be marked as not installable. For Safari, the threshold is 50 MB, a few browsers will set less or more values ​​(30MB, 70MB, 80MB), and Chrome will mark the threshold at 100 MB.

    The manifest file should contain at least `name` (or `short_name`) `icons` `start_url`

    And starting from Chrome 93, Service Woker must contain effective fetch events to control offline requests.

#### Picture Cache

You can cache site pictures by setting the `cachePic` option to `true`.

If your site is not large and the pictures are mostly critical descriptions, and hope to be displayed in offline mode, it is recommended to set this option to `true`.

::: info Image recognition

We recognize images by file extension. Any files ending with `.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp`, `.webp` will be regarded as images.

:::

#### HTML cache

When your site is too large, you can set `themeConfig.pwa.cacheHTML` to `false` to cache only the homepage and 404 error pages.

::: tip Why can these be removed?

Though VuePress generates HTML files through SSR[^ssr] for all pages, these files are mainly used for SEO[^seo] and allow you to directly configure the backend without SPA[^spa] Visit any link.

[^ssr]: **SSR**: **S**erver **S**ide **R**endering,
[^seo]: **SEO**: **S**earch **E**ngine **O**ptimization. For details, please see [SEO Introduction](https://mrhope.site/code/site/html/definition/seo/)
[^spa]: **SPA**: **S**ingle **P**age **A**pplication, mMost of them only have the homepage, and use history mode to handle routing instead of actually navigating between pages.

VuePress is essentially a SPA. This means that you can enter from the homepage to access all pages normally only caching the homepage.

When your site has a large number of pages or content, and the volume is too large after including HTML files, you can consider setting this option to `false`, which can reduce the volume by about 40%. The disadvantage is that users can only enter through the homepage and then navigate to the corresponding page in an offline environment. Direct access to a link will prompt a web page error.

:::

#### Size control

To prevent large files from being included in the pre-cache list, any files larger than 2MB or pictures larger than 1MB will be deleted.

You can customize the maximum file size of the cache (unit: KB) with the `themeConfig.pwa.maxSize` option, or change the size limit of the picture (unit: KB) with `themeConfig.pwa.maxPicSize`.

### Update popup

We provide an update popup when new content is successfully downloaded.

::: tip Custom popup

If you are not satisfied with the default popup component, you can write component and replace it by yourself. To do that, You need to register your popup component globally and pass the name of the component to the `popupComponent` option.

:::

## Manifest file generation

To ensure the installability of PWA, the site needs to generate a manifest file and declare a valid manifest file address [^manifest] through `link`.

[^manifest]: **Manifest File**

    The manifest file uses the JSON format and is responsible for declaring various information of the PWA, such as name, description, icon, and shortcut actions.

    In order for your site to be registered as a PWA, you need to meet the basic specifications of the manifest to make the browser consider the site as an installable PWA and allow users to install it.

    ::: info

    For Manifest standards and specifications, please see [W3C Manifest](https://w3c.github.io/manifest/)

    :::

The plugin will automatically generate the Manifest file `manifest.webmanifest` for you in the output directory, and will also add the manifest address statement to each HTML `<head>`.

If you already have a `manifest.webmanifest` or `manifest.json` in `.vuepress/public`, the plugin will read and merge it into the final manifest.

### Automatic generation

The plugin will use the information from the VuePress plugin API and set the fallback for fields in manifest as much as possible. So you don’t need to set most of the manifest fields.

If the following fields are not set, they will try to fallback to the following preset values ​​in order.

| Options                     | Default value                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| name                        | `siteConfig.title` \|\| `themeConfig.title` \|\| `'Site'`                                              |
| short_name                  | `siteConfig.title` \|\| `themeConfig.title` \|\| `'Site'`                                              |
| description                 | `siteConfig.description` \|\| `themeConfig.description` \|\| `'A site built with vuepress-theme-hope'` |
| lang                        | `siteConfig.locales['/'].lang` \|\| `themeConfig.locales['/'].lang` \|\| `"en-US"`                     |
| start_url                   | `context.base`                                                                                         |
| scope                       | `context.base`                                                                                         |
| display                     | `"standalone"`                                                                                         |
| theme_color                 | `"#46bd87"`                                                                                            |
| background_color            | `'#ffffff'`                                                                                            |
| orientation                 | `'portrait-primary'`                                                                                   |
| prefer_related_applications | `false`                                                                                                |

For complete configuration items, please see [Manifest Type Definition File](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/packages/pwa/src/types/manifest.d.ts)

### Manual configuration

You can manually specify the contents of the manifest in the `themeConfig.pwa.manifest` option.

::: tip Priority

`themeConfig.pwa.manifest` option has the highest priority, followed by manifest files that may exist in the `public` folder.

:::

**You should at least set a valid icon through `themeConfig.pwa.manifest.icons` or other icon related options in the PWA plugin.**

::: warning

The installability [^installable] specification requires at least one valid icon to be declared in the manifest.

So if you do not configure `themeConfig.pwa.manifest.icons`, visitors can only enjoy the offline accessibility brought by the Service Worker cache, while cannot install your site as a PWA.

Besides the plugin does not process anything in the manifest, but outputs them as-is. This means that if you plan to deploy to a subdirectory, you should add `base` to the corresponding URL in the manifest yourself.

:::

## Other options

The plugin also provides other PWA-related options, such as Microsoft tile icon and color settings, Apple icon and so on.

You can set them as needed. For detailed options, please see [Configuration Page](https://vuepress-theme-hope.github.io/pwa/config/)).

## Further Reading

For more details, please see:

- [PWA plugin docs](https://vuepress-theme-hope.github.io/pwa/)
- [Google PWA](https://web.dev/progressive-web-apps/)
- [MDN PWA](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)
- [W3C Manifest Specification](https://w3c.github.io/manifest/)

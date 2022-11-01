---
title: Guide
icon: creative
---

The plugin brings enhanced PWA support to VuePress [^pwa-intro].

<!-- more -->

[^pwa-intro]: **PWA introduction**

    PWA, full name Progressive Web app. PWA standard is stipulated by W3C.

    It allows sites to install the site as an App on supported platform through a browser that supports this feature.

## Intro

Service Worker [^service-worker] (SW for short) is mainly used to cache and proxy site content.

[^service-worker]: **Service Worker Introduction**

    1. The Service Worker will get and cache all the files registered in it during the registration process.

    1. After the registration complete, the Service Worker is activated, and starts to proxy and control all your requests.

    1. Whenever you want to initiate an access request through the browser, the Service Worker will check whether it exists in its own cache list, if it exists, it will directly return the cached result, otherwise it will call its own fetch method to get it. You can use a custom fetch method to fully control the result of the request for resources in the web page, such as providing a fallback web page when offline.

    1. Every time the user reopens the site, the Service Worker will request to the link when it was registered. If a new version of Service Worker is detected, it will update itself and start caching the list of resources registered in the new Service Worker . After the content update is successfully obtained, the Service Worker will trigger the `update` event. The user can be notified through this event, for example, a pop-up window will be displayed in the lower right corner, prompting the user that new content is available and allowing the user to trigger an update.

This plugin will automatically register Service Worker through `workbox-build`. To better control what the Service Worker can pre-cache, the plugin provides the following configurations.

::: tip

If you are an advanced user, you can also set `generateSwConfig` directly to pass options to `workbox-build`.

:::

## Cache Control

Based on the requirement of installable [^installable], the plugin provides related options for cache control.

[^installable]: **Installable**

    To let the site be registered as a PWA, the site needs to successfully register a valid service worker by itself, and at the same time add a valid manifest file and declare it.

    Each platform or browser has requirements for the size of the Service Worker cache. When the file size of the Service Worker cache is too large, the site will be marked as not installable. For Safari, the threshold is 50 MB, a few browsers will set less or more values (30MB, 70MB, 80MB), and Chrome will mark the threshold at 100 MB.

    The manifest file should contain at least `name` (or `short_name`) `icons` `start_url`

    ::: note

    Starting from Chrome 93, Service Worker must contain effective fetch events to control offline requests.

    However, currently the plugin does not contain relevant processing logic by default, so on Android devices with Chrome 93 or later, the site will not pop up an installation prompt.

    :::

### Default cache

By default, the plugin will pre-cache all the `js` `css` and `svg`.And only homepage and 404 `html` are cached.

At the same time, the plugin will cache font files: `**/*.{woff,woff2,eot,ttf,otf}`.

### Image Cache

You can cache site pictures by setting the `cachePic` option to `true`.

If your site is not large and the pictures are mostly critical descriptions, and hope to be displayed in offline mode, please set this option to `true`.

::: info Image recognition

We recognize images by file extension. Any files ending with `.png`, `.jpg`, `.jpeg`, `.gif`, `.bmp`, `.webp` will be regarded as images.

:::

### HTML Cache

If you have small sites, and would like to make document fully offline available, you can set `cacheHTML` to `true` to cache all HTML files.

::: tip Why only home and 404 page been cached by default?

Though VuePress generates HTML files through SSR[^ssr] for all pages, these files are mainly used for SEO[^seo] and allow you to directly configure the backend without SPA[^spa] Visit any link.

[^ssr]: **SSR**: **S**erver **S**ide **R**endering,
[^seo]: **SEO**: **S**earch **E**ngine **O**ptimization.
[^spa]: **SPA**: **S**ingle **P**age **A**pplication, most of them only have the homepage, and use history mode to handle routing instead of actually navigating between pages.

VuePress is essentially a SPA. This means that you only need to cache the home page and enter from the home page to access all pages normally. Therefore, not caching other HTML by default can effectively reduce the cache size (40% smaller in size) and speed up the SW update speed.

But this also has the disadvantage. If the user enters the site directly from a non-home page, the HTML file for the first page still needs to be loaded from the internet. Also, in offline environment, users can only enter through the homepage and then navigate to the corresponding page by themselves. If they directly access a link, an inaccessible prompt will appear.

:::

### Size Control

To prevent large files from being included in the pre-cache list, any files larger than 2MB or pictures larger than 1MB will be deleted.

You can customize the maximum file size of the cache (unit: KB) with the `maxSize` option, or change the size limit of the picture (unit: KB) with `maxPicSize`.

## Update Control

We provide the `update` option to control how users receive updates.

The default value of the `update` option is `"available"`, which means that when new content available, the new SW will be installed silently in the background, and a pop-up window will prompt the user that the new content is ready after SW finish installing. Users can choose whether to refresh immediately to view new content.

Under the default behavior, users will still read old content before the SW is ready and they will not be prompted. If your project is still in building stage and you want to alert the user that he may be reading outdated content, you can set this to `"hint"`. This allows users to be notified that new content has been published within seconds after visiting docs. But the negative effect of this is that if the user chooses to update before the new SW is ready, he will need to get all the resources of the page from the internet before the new SW installs and controls the page.

If your docs are stable, or you’re hosting a blog and don’t care much about users receiving the latest version right away, you can set this to `"disabled"`, which means that the new SW will be installed completely silently in the background and start waiting, when the pages controlled by the old version SW are all closed, the new SW will start to take control and provide users with new content the next time users visit. This setting can prevent users from being disturbed by the pop-up window in the bottom right corner during the visit.

To speed up user access under weak or no network conditions through SW, but also want users to always access new content, you can set this option to `"force"`. The behavior of this option is to unregister old SW as soon as a new SW is detected and refresh the page to ensure the user is browsing the latest content. But we strongly recommend not using this option unless necessary, as after a new SW is released, all users will experience unexpected sudden refresh within seconds after entering the site, and they will have to access the document over the internet and install the whole latest SW.

### Update Prompt Popup

When new content is detected (new SW detected), an update prompt popup will appear in the bottom right corner and allow the user to refresh and apply.

::: tip custom popup

If you are not satisfied with the default popup, you can write your own component. You need to register your own popup component globally and pass the name of the component to the `hintComponent` option.

:::

### Update Ready Popup

When the new content is ready (the new SW installed successfully and started waiting), the update ready popup will appear in the bottom right corner and allow the user to refresh and apply.

::: tip custom popup

If you are not satisfied with the default popup, you can write your own component. You need to register your popup component globally and pass the name of the component to the `updateComponent` option.

:::

## Manifest Generation

To ensure the installability of PWA, the site needs to generate a manifest file and declare a valid manifest file address [^manifest] through `<link>`.

[^manifest]: **Manifest File**

    The manifest file uses the JSON format and is responsible for declaring various information of the PWA, such as name, description, icon, and shortcut actions.

    In order for your site to be registered as a PWA, you need to meet the basic specifications of the manifest to make the browser consider the site as an installable PWA and allow users to install it.

    ::: info

    For Manifest standards and specifications, please see [W3C Manifest](https://w3c.github.io/manifest/)

    :::

The plugin will automatically generate the Manifest file `manifest.webmanifest` for you in the output directory, and will also add the manifest address statement to each HTML `<head>`.

If you already have a `manifest.webmanifest` or `manifest.json` in `.vuepress/public`, the plugin will read and merge it into the final manifest.

### Automatic Generation

The plugin will use the information from the VuePress plugin API and set the fallback for fields in manifest as much as possible. So you don’t need to set most of the manifest fields.

If the following fields are not set, they will try to fallback to the following preset values in order.

| Options                     | Default value                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| name                        | `siteConfig.title` \|\| `siteConfig.locales['/'].title` \|\| `"Site"`                                   |
| short_name                  | `siteConfig.title` \|\| `siteConfig.locales['/'].title` \|\| `"Site"`                                   |
| description                 | `siteConfig.description` \|\| `siteConfig.locales['/'].description` \|\| `"A site built with vuepress"` |
| lang                        | `siteConfig.locales['/'].lang` \|\| `"en-US"`                                                           |
| start_url                   | `siteConfig.base`                                                                                       |
| scope                       | `siteConfig.base`                                                                                       |
| display                     | `"standalone"`                                                                                          |
| theme_color                 | `"#46bd87"`                                                                                             |
| background_color            | `"#ffffff"`                                                                                             |
| orientation                 | `"portrait-primary"`                                                                                    |
| prefer_related_applications | `false`                                                                                                 |

For complete configuration items, please see [Manifest Type Definition File](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/pwa2/src/shared/manifest.ts).

### Manual Config

You can manually specify the contents of the manifest in the `manifest` option.

::: tip Priority

`manifest` option has the highest priority, followed by manifest files that may exist in the `public` directory.

:::

**You should at least set a valid icon through `manifest.icons` or other icon related options in the PWA plugin.**

::: warning

The installability [^installable] specification requires at least one valid icon to be declared in the manifest.

So if you do not configure `manifest.icons`, visitors can only enjoy the offline accessibility brought by the Service Worker cache, while cannot install your site as a PWA.

Besides the plugin does not process anything in the manifest by default, but outputs them as-is. This means that if you plan to deploy to a subdirectory, you should append the URL prefix to manifest Urls yourself.

If everything you need is all under `base` directory, you can set `appendBase: true` in plugin options to let the plugin append `base` to any links in manifest.

:::

## Other Options

The plugin also provides other PWA-related options, such as Microsoft tile icon and color settings, Apple icon and so on.

You can set them as needed. For detailed options, please see [Configuration Page](config.md).

## Further Reading

For more details, please see:

- [Google PWA](https://web.dev/progressive-web-apps/)
- [MDN PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [W3C Manifest Specification](https://w3c.github.io/manifest/)

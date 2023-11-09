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

The theme provides progressive web app support [^pwa-intro] via built-in <ProjectLink name="pwa2">`vuepress-plugin-pwa2`</ProjectLink>, and it's disabled by default.

::: info

If you are using this plugin, we recommend you to set `shouldPrefetch: false` in your VuePress config file.

`vuepress-theme-hope` passes `plugins.pwa` in theme options as plugin options to `vuepress-plugin-pwa2`, so every options mentioned below is under it.

:::

<!-- more -->

[^pwa-intro]: **PWA introduction**

    PWA, full name Progressive Web app. PWA standard is stipulated by W3C.

    It allows sites to install the site as an App on supported platform through a browser that supports this feature.

## Direct Enable <Badge text="Not recommended" type="warning" />

You can set `plugins.pwa` to `true` in theme options to let theme automatically generate the necessary config and enable plugins quickly. However, we recommend you to manually set some options by following the instructions below.

<!-- @include: @pwa/guide.md#intro -->

## Other Options

The plugin also provides other PWA-related options, such as Microsoft tile icon and color settings, Apple icon and so on.

You can set them as needed. For detailed options, please see [PWA config](../../config/plugins/pwa.md).

## Further Reading

For more details, please see:

- <ProjectLink name="pwa2">PWA plugin docs</ProjectLink>
- [Google PWA](https://web.dev/progressive-web-apps/)
- [MDN PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [W3C Manifest Specification](https://w3c.github.io/manifest/)

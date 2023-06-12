---
title: Guide
icon: lightbulb
---

This plugin removes any related service worker from your VuePress site, so that users can still get updates if you removed any PWA plugin after enabling it.

::: tip Why this plugin is needed if you used PWA plugin once?

PWA plugins like [`@vuepress/plugin-pwa`][official-pwa] and <ProjectLink name="pwa2">`vuepress-plugin-pwa2`</ProjectLink> register service worker to your site, which will cache your site and make it available offline.

However, if you remove pwa plugin, the old service worker will still be there, but they can never get an update because they can never found a new service worker to update to. So users will stay with the old version of your site.

To solve this problem:

1. A new service worker with empty contents shall be generated in the original place.
1. The new service worker shall attempt to remove contents that old service worker cached, then it should unregister itself.

:::

[official-pwa]: https://vuejs.press/reference/plugin/pwa.html

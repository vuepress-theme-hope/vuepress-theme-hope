---
title: 指南
icon: creative
---

此插件从您的 VuePress 站点中删除任何相关的 Service Worker，因此如果您在启用后任何 PWA 插件后移除它们，用户仍然可以获得更新。

:::tip 如果你启用过 PWA，为什么需要这个插件？

PWA 插件，如 [`@vuepress/plugin-pwa`][official-pwa] 和 [`vuepress-plugin-pwa2`][pwa2] 将 Service Worker 注册到您的站点，这将缓存您的站点并使其离线可用。

但是，如果您删除 PWA 插件，先前的 Service Worker 仍将在那里，但它们永远无法获得更新，因为他们永远无法找到要更新的新 Service Worker。 因此，用户将继续使用您网站的旧版本。

要解决这个问题：

1. 一个新的内容为空的 Service Worker 需要生成在原位置。

1. 新的 Service Worker 应该尝试删除旧 Service Worker 缓存的内容，然后它应该注销自己。

:::

[official-pwa]: https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa.html
[pwa2]: https://vuepress-theme-hope.github.io/v2/pwa/zh/

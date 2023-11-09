---
title: PWA
icon: mobile-screen
order: 3
category:
  - 高级
tag:
  - 高级
  - PWA
---

该主题将通过内置 <ProjectLink name="pwa2" path="/zh/">`vuepress-plugin-pwa2`</ProjectLink> 提供渐进式 Web 应用程序支持[^pwa-intro]，该功能默认禁用。

::: info

如果你正在使用此插件，我们推荐在你的 VuePress 配置文件中设置 `shouldPrefetch: false`。

`vuepress-theme-hope` 将主题选项中的 `plugins.pwa` 作为插件选项提供给 `vuepress-plugin-pwa2`，后文指出的选项都位于此选项下。

:::

<!-- more -->

[^pwa-intro]: **PWA 介绍**

    PWA 全称 Progressive Web app，即渐进式网络应用程序，标准由 W3C 规定。

    它允许网站通过支持该特性的浏览器将网站作为 App 安装在对应平台上。

## 快速启用 <Badge text="不推荐" type="warning" />

你可以在主题选项中设置 `plugins.pwa: true` 来让主题自动生成必要配置并快速启用插件。但我们推荐你按照下方说明对部分选项进行手动配置。

<!-- @include: @pwa/zh/guide.md#intro -->

## 其他选项

插件还提供了其他 PWA 相关选项，比如微软磁贴图标与颜色设置，苹果图标等。

你可以酌情根据需要设置它们。详细的选项请见 [PWA 插件配置](../../config/plugins/pwa.md)。

## 相关阅读

更多内容，请详见:

- <ProjectLink name="pwa2" path="/zh/">PWA 插件文档</ProjectLink>
- [Google PWA](https://web.dev/progressive-web-apps/)
- [MDN PWA](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)
- [W3C Manifest 规范](https://w3c.github.io/manifest/)

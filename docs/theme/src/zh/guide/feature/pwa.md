---
icon: setting
category: feature
tags:
  - pwa
  - function
---

# PWA

默认情况下，该主题将使用 `@mr-hope/vuepress-plugin-pwa` 启用渐进式 Web 应用程序支持。如果您不需要此功能或想使用其他 pwa 插件，则可以将 `themeConfig.pwa` 设置为 `false` 来禁用该插件。

## 内容缓存和更新

Service worker 成功获取内容更新后，将在右下角显示一个弹出窗口，提示用户新内容可用并允许用户触发更新。

弹出窗口的默认语言将自动设置为 `themeConfig.baseLang` 。

## Manifest

插件将自动在输出目录生成 `mainfest.json`。如果您在 `.vuepress/public` 中有一个 manifest.json，该插件将读取并合并到最终 manifest 中。

为了使您的站点能够被注册为 Web App，您应该在 `themeConfig.pwa.manifest.icons` 中设置图标。

您也可以在 `themeConfig.pwa.manifest` 中设置其他选项。

## 缓存大小

为了更好地控制 Service Worker 可以预缓存的内容，可以设置 `themeConfig.pwa.cachePic` 和 `themeConfig.pwa.cacheHTML` 来决定 Service Worker 是否缓存除主页和 404 错误页外的 HTML 文件与站点图片。

为了防止在预缓存列表中包含大文件，任何大于 1MB 的资源都将被删除。您可以通过设置 `themeConfig.pwa.cacheMaxSize` 来更改大小限制。

## 更多

有关更多详细信息，请参见 [pwa 插件文档][pwa]

[pwa]: https://vuepress-pwa.mrhope.site/zh/

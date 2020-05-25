---
category: config
tags:
  - plugin
  - config
---

# @mr-hope/pwa

Progressive Web App Surpport

## 插件说明

开启 PWA 支持。当获得更新时将会在右下角显示弹窗。

弹窗默认语言将自动设置为 `themeConfig` 中配置的 `baseLang`。

在本主题中，该功能默认启用，如果你不需要该功能或想使用其他的 pwa 插件，可以设置 `themeConfig.pwa` 为 `false` 来禁用本插件。

## 插件配置

### popupComponent

- 类型: `string`

可填入自定义的弹窗组件路径。

### generateSwConfig

传递给 `workbox-build` 的选项，具体详情，请见 [Workbox 文档](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)

---
title: "@mr-hope/plugin-pwa"
category: config
tags:
  - plugin
  - config
---

Progressive Web App Support

## Plugin description

Turn on PWA support. A pop-up window will be displayed in the lower right corner when an update is obtained.

The default language of the popup will automatically be set to `baseLang` configured in `themeConfig`.

This feature is enabled by default. If you do not need this feature or want to use other pwa plugins, you can set the `themeConfig.pwa` to `false` to disable the plugin.

## Plugin configuration

### popupComponent

- Type: `string`

You can fill in the custom pop-up component path.

### generateSwConfig

Options passed to `workbox-build`, for details, see [Workbox documentation](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)

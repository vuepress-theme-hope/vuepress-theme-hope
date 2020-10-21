---
home: true
title: "@mr-hope/vuepress-plugin-pwa"
icon: homefill
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-pwa"
tagline: 一个强大的 PWA 插件
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

渐进式网页应用 (Progressive Web App) 支持。

## 插件说明

此插件将会开启 PWA 支持。当获得更新时将会在右下角显示弹窗。

弹窗默认语言将自动设置为 `themeConfig` 中配置的 `baseLang`。

## 使用插件

### 安装

```bash
npm i -D @mr-hope/vuepress-plugin-pwa
```

或

```bash
yarn add -D @mr-hope/vuepress-plugin-pwa
```

### 使用

```js {3-7}
// .vuepress/config.js
module.exports = {
  plugin: [
    "@mr-hope/pwa",
    {
      // 你的选项
    },
  ],
};
```

## 插件选项

## baseLang

- 类型: `string`
- 默认值: `'en-US'`

主目录所对应的语言。

### popupComponent

- 类型: `string`
- 默认值: `'SWUpdatePopup'`

可填入自定义的弹窗组件路径。

### manifest

- 类型: `ManifestOption`
- 必填: 否

您可以填充一个将被解析为 manifest.json 的对象。

::: tip
如果您未设置某些选项，则这些选项会回退到插件预设值。

- name: `siteConfig.title` || `themeConfig.title` || `'Site'`
- short_name: `siteConfig.title` || `themeConfig.title` || `'Site'`
- description: `siteConfig.description` || `themeConfig.description` || `'A site built with vuepress-theme-hope'`
- start_url: `context.base`
- scope: `context.base`

- theme_color: `"#46bd87"`
- background_color: `'#ffffff'`
- orientation: `'portrait-primary'`

:::

### cacheHTML

- 类型: `boolean`
- 默认值: `true`

是否缓存主页和 404 错误页之外的 HTMl 文件

当你站点包含 HTML 文件后体积过大时很有用。

### cachePic

- 类型: `boolean`
- 默认值: `false`

是否缓存图片

### cacheMaxSize

- 类型: `number`
- 默认值: `1024`

允许缓存的最大大小 (以 KB 为单位)

### generateSwConfig

传递给 `workbox-build` 的选项，具体详情，请见 [Workbox 文档](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)

::: tip
我们将为您预缓存所有与网站相关的文件 `**/*.{html, css, js}` 和字体文件 `**/*.{woff,woff2,eot,ttf,otf}`。

如果将 `cachePic` 设置为 `true`，我们还将为您预缓存 `**/*.{png,jpg,jpeg,svg}` 文件。

所有大于 `cacheMaxSize` 的文件将被忽略。
:::

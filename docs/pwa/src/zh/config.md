---
title: 配置
icon: config
---

## showInstall

- 类型: `boolean`
- 默认值: `true`

是否在 Service Worker 首次成功注册时显示 PWA 安装按钮

## manifest

- 类型: `ManifestOption`
- 必填: 否

填充一个将被解析为 manifest.webmanifest 的对象。

::: tip

如果未设置某些选项，它们会回退到插件预设值。

- name: `siteConfig.title` || `themeConfig.title` || `'Site'`
- short_name: `siteConfig.title` || `themeConfig.title` || `'Site'`
- description: `siteConfig.description` || `themeConfig.description` || `'A site built with vuepress-theme-hope'`
- lang: `siteConfig.locales['/'].lang` || `themeConfig.locales['/'].lang` || `"en-US"`
- start_url: `context.base`
- scope: `context.base`

- display: `"standalone"`
- theme_color: `"#46bd87"`
- background_color: `'#ffffff'`
- orientation: `'portrait-primary'`
- prefer_related_applications: `false`

:::

::: info 更多

更多内容，请详见 [W3C Manifest](https://w3c.github.io/manifest/)

:::

## favicon

- 类型: `string`
- 必填: 否

`favicon.ico` 地址，填入绝对路径。

::: warning

我们建议你为你的站点生成 favicon

:::

## themeColor

- 类型: `string`
- 默认值: `"#46bd87"`

主题色，默认为主题绿

## maxSize

- 类型: `number`
- 默认值: `2048`

允许缓存的最大大小 (以 KB 为单位)

::: warning

此选项具有最高优先级，任何超过此值的文件都会被排除。

所以你如果生成了很大的 HTML 或 JS 文件，请考虑调高此值，否则你的 PWA 可能无法在离线模式下正常运行。

:::

## cacheHTML

- 类型: `boolean`
- 默认值: `true`

是否缓存主页和 404 错误页之外的 HTML 文件

## cachePic

- 类型: `boolean`
- 默认值: `false`

是否缓存图片。

## maxPicSize

- 类型: `number`
- 默认值: `1024`

图片允许缓存的最大大小 (以 KB 为单位)

::: tip

该选项不能大于 `maxSize`。

:::

## apple

针对苹果的特殊设置

> 如果你不想进行精细的设置，可以忽略它；如果你不想兼容 Apple 上的 Safari，请设置为 `false`。

### apple.icon

- 类型: `string`
- 必填: 否

填入苹果使用的图标地址，推荐 152×152 大小

### apple.statusBarColor

- 类型: `"black" | "white"`
- 默认: `"black"`

苹果的状态栏颜色

### apple.maskIcon

- 类型: `string`
- 必填: 否

Safari 图标

## msTile

针对微软磁贴的特殊设置

> 如果你不想进行精细的设置，可以忽略它；如果你不想兼容 windows，请设置为 `false`。

### msTile.image

- 类型: `string`
- 必填: 否

磁贴图标

### msTile.color

- 类型: `string`
- 默认值: `themeColor`

磁贴颜色，缺省会自动回退到主题色。

## popupComponent

- 类型: `string`
- 默认值: `'SWUpdatePopup'`

可填入自定义的弹窗组件路径。

## generateSwConfig

传递给 `workbox-build` 的选项，具体详情，请见 [Workbox 文档](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)

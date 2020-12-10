---
title: 配置
icon: config
---

## baseLang

- 类型: `string`
- 默认值: `'en-US'`

主目录所对应的语言。

## showInstall

- 类型: `boolean`
- 默认值: `true`

是否显示安装按钮

## manifest

- 类型: `ManifestOption`
- 必填: 否

您可以填充一个将被解析为 manifest.webmanifest 的对象。

::: tip
如果您未设置某些选项，则这些选项会回退到插件预设值。

- name: `siteConfig.title` || `themeConfig.title` || `'Site'`
- short_name: `siteConfig.title` || `themeConfig.title` || `'Site'`
- description: `siteConfig.description` || `themeConfig.description` || `'A site built with vuepress-theme-hope'`
- lang: `options.baseLang` || `themeConfig.baseLang` || `"en-US"`
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

`favicon.ico` 地址，填入绝对路径。(建议为你的站点生成 favicon)

## themeColor

- 类型: `string`
- 默认值: `"#46bd87"`

主题色

## maxSize

- 类型: `number`
- 默认值: `2048`

允许缓存的最大大小 (以 KB 为单位)

## cacheHTML

- 类型: `boolean`
- 默认值: `true`

是否缓存主页和 404 错误页之外的 HTML 文件

::: tip
当你站点包含 HTML 文件后体积过大时很有用。
:::

## cachePic

- 类型: `boolean`
- 默认值: `false`

是否缓存图片

> 任何以 `.png`, `.jpg`, `.jpeg` , `.gif`, `.bmp`, `.webp` 结尾的文件都会视为图片。

## maxPicSize

- 类型: `number`
- 默认值: `1024`

图片允许缓存的最大大小 (以 KB 为单位)

## apple

针对苹果的特殊设置

> 如果你不想进行精细的设置，可以忽略它；如果你不想兼容 apple，请设置为 `false`。

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

::: tip
我们将为您预缓存所有与网站相关的文件 `**/*.{js,css,svg}` 和字体文件 `**/*.{woff,woff2,eot,ttf,otf}`。

如果将 `cachePic` 设置为 `true`，我们还将为您预缓存 `**/*.{png,jpg,jpeg,gif,webp}` 文件。

所有大于 `maxSize` 的文件将被忽略。
:::

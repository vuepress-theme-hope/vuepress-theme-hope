---
title: 配置
icon: gears
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

- name: `siteConfig.title` || `siteConfig.locales['/'].title` || `"Site"`
- short_name: `siteConfig.title` || `siteConfig.locales['/'].title` || `"Site"`
- description: `siteConfig.description` || `siteConfig.locales['/'].description` || `"A site built with vuepress"`
- lang: `siteConfig.locales['/'].lang` || `"en-US"`
- start_url: `context.base`
- scope: `context.base`

- display: `"standalone"`
- theme_color: `"#46bd87"`
- background_color: `"#ffffff"`
- orientation: `"portrait-primary"`
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
- 默认值: `false`

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

## update

- 类型: `"disabled" | "available" | "hint" | "force"`
- 默认值: `"available"`

发现新内容时的控制逻辑。

- `"disabled"`: 即使有新的 service worker 也不做任何事情，新的 service work 开始等待后，会在用户下次访问时接管页面，让用户获得新内容。

- `"available"`: 仅当新的 service worker 可用时才显示更新弹出窗口

- `"hint"`: 显示更新内容可用提示，并允许用户立即刷新。当新的 SW 成功注册后，将转为更新内容就绪弹窗。

  当你希望用户立即查看新文档时，这很有帮助。

  ::: note

  如果用户在新 SW 就绪前选择刷新，当前的 Service Worker 将被注销，并且请求将开始向 Web 发出。新的 service worker 将开始安装并在安装后接管页面。

  :::

- `"force"`: 立即注销当前 Service Worker 然后刷新以获取新内容

  ::: danger

  虽然这可以确保用户访问的是最新内容，但这可能会影响访问体验。

  :::

::: warning

文档的更新方式由以前的版本控制，因此当前选项仅影响此版本的下一次更新。

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
- 默认值: `"black"`

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

## hintComponent

- 类型: `string`
- 默认值: `"SWHintPopup"`

可填入自定义的提示弹窗组件路径。

## updateComponent

- 类型: `string`
- 默认值: `"SWUpdatePopup"`

可填入自定义的更新弹窗组件路径。

## appendBase

- 类型: `boolean`
- 默认值: `false`

是否为所有绝对链接添加 base。

## generateSwConfig

传递给 `workbox-build` 的选项，具体详情，请见 [Workbox 文档](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)

## locales

- 类型: `PWALocaleConfig`

  ```ts
  interface PWALocaleData {
    /**
     * 安装按钮文字
     */
    install: string;

    /**
     * iOS 安装文字
     */
    iOSInstall: string;

    /**
     * 取消按钮文字
     */
    cancel: string;

    /**
     * 关闭按钮文字
     */
    close: string;

    /**
     * 上一张图片文字
     */
    prevImage: string;

    /**
     * 下一张图片文字
     */
    nextImage: string;

    /**
     * 安装解释
     */
    explain: string;

    /**
     * 描述标签文字
     */
    desc: string;

    /**
     * 特性标签文字
     */
    feature: string;

    /**
     * 更新内容提示文字
     */
    hint: string;

    /**
     * 更新内容可用文字
     */
    update: string;
  }

  interface PWALocaleConfig {
    [localePath: string]: PWALocaleData;
  }
  ```

- 必填: 否

PWA 插件的国际化配置。

::: details 内置支持语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英文(美国)** (en-US)
- **德语** (de-DE)
- **德语(澳大利亚)** (de-AT)
- **俄语** (ru-RU)
- **乌克兰语** (uk-UA)
- **越南语** (vi-VN)
- **葡萄牙语(巴西)** (pt-BR)
- **波兰语** (pl-PL)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **斯洛伐克** (sk-SK)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)
- **芬兰语** (fi-FI)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::

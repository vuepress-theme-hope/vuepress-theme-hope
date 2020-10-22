---
title: 主题插件配置
icon: configuration
category: config
tags:
  - config
  - plugin
  - themeConfig
---

这些是主题提供的插件配置选项。

::: tip
所有的配置键名均为插件名称的驼峰式 (camelcase) 版本。

例如: `@mr-hope/vuepress-copy-code` 的配置键名为 `copyCode`。
:::

## mdEnhance

Markdown 功能增强，详情请见 [vuepress-plugin-md-enhance 文档][md-enhance-config]

### mdEnhance.enableAll

- 类型: `boolean`
- 默认值: `false`

是否启用全部功能

### mdEnhance.lineNumbers <MyBadge text="改变默认值" type="error" />

- 类型: `boolean`
- 默认值: `true`

是否在每个代码块的左侧显示行号

### mdEnhance.align

- 类型: `boolean`
- 默认值: `false`

是否启用自定义对齐支持

### mdEnhance.sup

- 类型: `boolean`
- 默认值: `false`

是否启用上角标格式支持

### mdEnhance.sub

- 类型: `boolean`
- 默认值: `false`

是否启用下角标格式支持

### mdEnhance.footnote

- 类型: `boolean`
- 默认值: `false`

是否启用脚注格式支持

### mdEnhance.mark

- 类型: `boolean`
- 默认值: `false`

是否启用标记格式支持

### mdEnhance.tex

- 类型: `boolean`
- 默认值: `false`

是否启用 TeX 语法支持

### mdEnhance.flowchart

- 类型: `boolean`
- 默认值: `false`

是否启用 流程图 语法支持

### mdEnhance.presentation

- 类型: `RevealOptions | boolean`
- 默认值: `false`

是否启用 幻灯片 语法支持。

你可以传入一个对象，这个对象将用于 reveal.js 配置。

## 评论设置

评论配置因为复杂度在这里被省略。

具体配置请见　[@mr-hope/vuepress-plugin-comment 文档][comment-config]

> 你可以直接设置为 `false` 来禁用评论插件

## 版权设置

详细信息，请参见 [vuepress-plugin-copyright 文档](https://vuepress.github.io/zh/plugins/copyright/)

> 这是一个 vuepress 社区插件，而不是内置插件。因此，如果你遇到问题，请前往 [它的仓库](https://github.com/vuepress/vuepress-plugin-copyright) 寻求帮助。

### copyright.status

- 类型: `"global" | "local"`
- 必填: 是

是否全局启用该功能。

### copyright.minLength

- 类型: `number`
- 默认值: `100`

触发版权信息或禁止复制动作的最少字符数。

### copyright.noCopy

- 类型: `boolean`
- 默认值: `false`

是否禁止复制

### copyright.noSelect

- 类型: `boolean`
- 默认值: `false`

是否禁止选中文字

## pwa <MyBadge text="默认启用" />

PWA 设置选项，默认情况下无需任何配置。

> 如果您不需要这个功能，请设置为 `false`。

### pwa.popupComponent

- Type: `string`
- Required: No

用于替换默认弹出组件的自定义组件。

### pwa.gerateSWConfig

`workbox-build` 的 [generateSW 配置](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config)

## seo <MyBadge text="默认启用" />

搜索引擎增强，默认情况下无需任何配置。

> 插件配置请参见 [vuepress-plugin-seo 配置][seo-config]
>
> 如果您不需要这个功能，请设置为 `false`。

## sitemap <MyBadge text="默认启用" />

Sitemap 生成配置，默认情况下无需任何配置。

> 插件配置请参见 [vuepress-plugin-sitemap 配置][sitemap-config]
>
> 如果您不需要这个功能，请设置为 `false`。

## addThis

- 类型: `string`
- 必填: 否

AddThis 的 pubid

> 详情请见 [AddThis 插件][add-this]

## copyCode

复制代码插件的选项，设置为 `false` 以禁用此插件。

> 默认情况下，不需要任何配置
>
> 有关详细信息，请参见[copy-code 插件配置][copy-code]

## photoSwipe

照片预览插件的选项，设置为 `false` 以禁用此插件。

> 默认情况下，不需要更多配置
>
> 有关详细信息，请参见 [PhotoSwipe 插件配置][photo-swipe-config]]

### lastUpdate

- 类型: `(timestamp: number, lang: string) => string`
- 默认值: `` `${dayjs(timestamp).format('LL')} ${dayjs(timestamp).format('HH:mm')}` ``

`@mr-hope/plugin-last-update` 的时间转换函数。

默认情况下，会使用 dayjs 自动根据当前页面语言进行本地化。

如: `2020年5月8日 16:05` `May 8, 2020 16:05`

[add-this]: https://vuepress-add-this.mrhope.site/zh/
[comment-config]: https://vuepress-comment.mrhope.site/zh/config/
[copy-code]: https://vuepress-copy-code.mrhope.site/zh/
[md-enhance-config]: https://vuepress-md-enhance.mrhope.site/zh/config/
[photo-swipe-config]: https://vuepress-photo-swipe.mrhope.site/zh/config/
[seo-config]: https://vuepress-seo.mrhope.site/zh/config/
[sitemap-config]: https://vuepress-sitemap.mrhope.site/zh/config/

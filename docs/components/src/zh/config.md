---
title: 插件选项
icon: gears
---

## 选项 {#options}

:::: fields
@`components` type=`AvailableComponent[]` default=`[]`

需要被注册的组件。

可接受的组件名称为:

- `"Badge"`
- `"CodePen"`
- `"Share"`
- `"StackBlitz"`
- `"SiteInfo"`
- `"VPBanner"`
- `"VPCard"`

::: tip

媒体组件已迁移至 [`@vuepress/plugin-media`](https://ecosystem.vuejs.press/zh/plugins/features/media.html)。

:::

@`componentsOptions` type=`ComponentGlobalOptions`

组件的全局配置。

@@`componentsOptions.share` type=`ShareOptions`

分享配置。

@@@`componentsOptions.share.services` type=`(string | ShareService)[]` required

分享服务。

参考：[指南 → Share → 设置组件](./guide/utilities/share.md#设置组件)。

@@@`componentsOptions.share.twitterUserName` type=string

Twitter 用户名。

@`locales` type=`ComponentLocaleOptions`

组件多语言配置。

@@`locales.siteInfo` type=`SiteInfoLocaleConfig`

站点信息组件国际化配置。

@@@`locales.siteInfo.<localePath>.source` type=string

源代码文字。

::::

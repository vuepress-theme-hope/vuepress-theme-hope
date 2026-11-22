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
- `"StackBlitz"`
- `"SiteInfo"`
- `"VPBanner"`
- `"VPCard"`

::: tip

媒体组件已迁移至 [`@vuepress/plugin-media`](https://ecosystem.vuejs.press/zh/plugins/features/media.html)。

分享组件已迁移至 [`@vuepress/plugin-share`](https://ecosystem.vuejs.press/zh/plugins/features/share.html)。

:::

@`componentsOptions` type=`ComponentGlobalOptions`

组件的全局配置。

@`locales` type=`ComponentLocaleOptions`

组件多语言配置。

@@`locales.siteInfo` type=`SiteInfoLocaleConfig`

站点信息组件国际化配置。

@@@`locales.siteInfo.<localePath>.source` type=string

源代码文字。

::::

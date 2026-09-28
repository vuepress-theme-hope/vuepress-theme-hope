---
title: Plugin Options
icon: gears
---

## Options

:::: fields
@`components` type=`AvailableComponent[]` default=`[]`

Components to be registered.

Available component names:

- `"Badge"`
- `"CodePen"`
- `"Share"`
- `"StackBlitz"`
- `"SiteInfo"`
- `"VPBanner"`
- `"VPCard"`

::: tip

The media components are moved to [`@vuepress/plugin-media`](https://ecosystem.vuejs.press/plugins/features/media.html).

:::

@`componentsOptions` type=`ComponentGlobalOptions`

Global config for components.

@@`componentsOptions.share` type=`ShareOptions`

Share config.

@@@`componentsOptions.share.services` type=`(string | ShareService)[]` required

Share services.

See also: [Guide → Share → Setting component](./guide/utilities/share.md#setting-component).

@@@`componentsOptions.share.twitterUserName` type=string

Twitter username.

@`locales` type=`ComponentLocaleOptions`

Component locales.

@@`locales.siteInfo` type=`SiteInfoLocaleConfig`

Locales config for site info component.

@@@`locales.siteInfo.<localePath>.source` type=string

Source text.

::::

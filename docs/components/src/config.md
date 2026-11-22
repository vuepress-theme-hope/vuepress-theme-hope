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
- `"StackBlitz"`
- `"SiteInfo"`
- `"VPBanner"`
- `"VPCard"`

::: tip

The media components are moved to [`@vuepress/plugin-media`](https://ecosystem.vuejs.press/plugins/features/media.html).

The share component is moved to [`@vuepress/plugin-share`](https://ecosystem.vuejs.press/plugins/features/share.html).

:::

@`componentsOptions` type=`ComponentGlobalOptions`

Global config for components.

@`locales` type=`ComponentLocaleOptions`

Component locales.

@@`locales.siteInfo` type=`SiteInfoLocaleConfig`

Locales config for site info component.

@@@`locales.siteInfo.<localePath>.source` type=string

Source text.

::::

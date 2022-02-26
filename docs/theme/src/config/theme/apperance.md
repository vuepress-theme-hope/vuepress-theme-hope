---
title: Theme Appearance Config
icon: config
category:
  - Config
tag:
  - Theme Config
  - Appearance
---

These are appearance options provided by the theme.

## pure

- Type: `boolean`
- Default: `false`

Whether enable pure mode.

::: tip

Enabling this will disable some of the fancy styles.

Useful when you want to provide "A pure document site".

:::

<!-- TODO: Improve it -->

::: info W.I.P

This feature now doesn’t take much effect, and we are planning to improve it.

:::

## iconPrefix

- Type: `string`
- Default: ``
- Details: [Interface → Icon](../../guide/interface/icon.md)

Prefix of icon FontClass.

You probably need to set this option:

- Using [iconfont](../../guide/interface/icon.md#iconfont): `iconfont icon-`
- Using [fontawesome](../../guide/interface/icon.md#fontawesome): `fa fa-`

## darkmode <Badge text="Enabled by default" />

- Type: `'auto-switch' | 'switch' | 'auto' | 'force-dark' | 'disable'`
- Default: `'auto-switch'`
- Details: [Interface → Darkmode](../../guide/interface/darkmode.md)

Dark mode support options:

- `'auto-switch'`: "off | automatic | on" three-stage switch
- `'switch'`: "Close | Open" toggle switch
- `'auto'`: Automatically decide whether to apply dark mode based on user device’s color-scheme or current time
- `'force-dark'`: only dark mode
- `'disable'`: disable dark mode

::: note

If you don’t need this feature, set `darkmode: "disable"` to disable it.

:::

## themeColor <Badge text="Enabled by default" />

- Type: `Record<string, string>`
- Default: `{ blue: '#2196f3', red: '#f26d6d', green: '#3eaf7c', orange: '#fb9b5f' }`
- Details: [Interface → ThemeColor](../../guide/interface/theme-color.md)

Theme color configuration.

::: note

If you don’t need this feature, set `themeColor: false` to disable it.

:::

## fullscreen

- Type: `boolean`
- Default: `true`
- Details: [Interface → FullScreen](../../guide/interface/others.md#fullscreen-button)

Whether show the "full screen" button.

## backToTop <Badge text="Root only" type="warning" />

- Type: `boolean | number`
- Default: `true`

Whether show back to top button.

The default trigger distance is 300px, which can be changed when you fill in the number. Filling in `false` disables the back to top button.

::: note

You can only set this option in root of `themeConfig`.

:::

## mobileBreakPoint <Badge text="Root only" type="warning" />

- Type: `number`
- Default: `719`

Window width switching mobile view and desktop view in pixels

::: note

You can only set this option in root of `themeConfig`.

:::

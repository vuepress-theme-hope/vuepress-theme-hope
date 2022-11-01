---
title: Theme Appearance Options
icon: config
order: 5
category:
  - Config
tag:
  - Theme Config
  - Appearance
---

The following options control the appearance of the theme. You don’t need to pay attention to them in most cases, they are only provided for a small amount of users with needs.

<!-- more -->

::: warning

These options are only valid when setting directly under the theme options, setting them in each language as no effect.

:::

## iconAssets <Badge text="Root only" type="warning" />

- Type: `` "iconfont" | "fontawesome" | `//${string}` | `http://${string}` | `https://${string}`  ``
- Required: No
- Details: [Interface → Icon](../../guide/interface/icon.md)

Link of font icon asset, `'iconfont'` and `'fontawesome'` keywords are supported.

## darkmode <Badge text="Enabled by default" /> <Badge text="Root only" type="warning" />

- Type: `"switch" | "toggle" | "auto" | "enable" | "disable"`
- Default: `"switch"`
- Details: [Interface → Darkmode](../../guide/interface/darkmode.md)

Dark mode support options:

- `"switch"`: switch between dark, light and auto
- `"toggle"`: toggle between lightmode and darkmode
- `"auto"`: Automatically decide whether to apply dark mode based on user device’s color-scheme or current time
- `"enable"`: only dark mode
- `"disable"`: disable dark mode

::: note

If you don’t need this feature, set `darkmode: "disable"` to disable it.

:::

## themeColor <Badge text="Root only" type="warning" />

- Type: `Record<string, string> | false`
- Default: `false`
- Details: [Interface → ThemeColor](../../guide/interface/theme-color.md)

Theme color configuration.

## fullscreen <Badge text="Root only" type="warning" />

- Type: `boolean`
- Default: `false`
- Details: [Interface → FullScreen](../../guide/interface/others.md#fullscreen-button)

Whether show the "full screen" button.

## backToTop <Badge text="Root only" type="warning" />

- Type: `boolean | number`
- Default: `true`
- Details: [Interface → Back to top button](../../guide/interface/others.md#back-to-top-button)

Whether show back to top button.

The default trigger distance is 300px, which can be changed when you fill in the number. Filling in `false` disables the back to top button.

## mobileBreakPoint <Badge text="Root only" type="warning" />

- Type: `number`
- Default: `719`

Window width switching mobile view and desktop view in pixels

::: warning

You should keep this option same value with `$tablet` in `.vuepress/config.scss`

:::

## pure <Badge text="Root only" type="warning" />

- Type: `boolean`
- Default: `false`
- Details: [Interface → Pure mode](../../guide/interface/pure.md)

Whether enable pure mode.

::: tip

Enabling this will disable some of the fancy styles.

Useful when you want to provide "A pure document site".

:::

## iconPrefix <Badge text="Root only" type="warning" />

- Type: `string`
- Default: Inferred from iconAssets
- Details: [Interface → Icon](../../guide/interface/icon.md)

Prefix of icon FontClass， usually, it can be automatically set by the theme.

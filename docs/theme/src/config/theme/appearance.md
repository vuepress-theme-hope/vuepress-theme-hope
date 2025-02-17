---
title: Theme Appearance Options
icon: palette
order: 5
category:
  - Config
tag:
  - Theme Config
  - Appearance
---

The following options control the appearance of the theme. You don't need to pay attention to them in most cases, they are only provided for a small amount of users with needs.

<!-- more -->

::: warning

These options are only valid when setting directly under the theme options, setting them in each language as no effect.

:::

## darkmode <Badge text="Enabled by default" /> <Badge text="Root only" type="warning" />

- Type: `"switch" | "toggle" | "auto" | "enable" | "disable"`
- Default: `"switch"`
- Details:
  - [Interface → Dark mode](../../guide/interface/darkmode.md)

Dark mode support options:

- `"switch"`: switch between dark, light and auto
- `"toggle"`: toggle between lightmode and darkmode
- `"auto"`: Automatically decide whether to apply dark mode based on user device's color-scheme or current time
- `"enable"`: only dark mode
- `"disable"`: disable dark mode

::: note

If you don't need this feature, set `darkmode: "disable"` to disable it.

:::

## externalLinkIcon <Badge text="enabled by default" />

- Type: `boolean`
- Default: `true`

Controls whether an icon is displayed on external links.

## fullscreen <Badge text="Root only" type="warning" />

- Type: `boolean`
- Default: `false`
- Details:
  - [Interface → FullScreen](../../guide/interface/others.md#fullscreen-button)

Whether show the "full screen" button.

## pure <Badge text="Root only" type="warning" />

- Type: `boolean`
- Default: `false`
- Details:
  - [Interface → Pure mode](../../guide/interface/others.md#pure-mode)

Whether enable pure mode.

::: tip

Enabling this will disable some of the fancy styles.

Useful when you want to provide "A pure document site".

:::

## focus <Badge text="Root only" type="warning" />

- Type: `number | boolean`
- Default: value of `pure`
- Details:
  - [Interface → Focus mode](../../guide/interface/others.md#focus-mode)

Whether enable focus mode, default when pure mode is enabled. Number value will be the delay time to trigger focus mode.

## print <Badge text="Root only" type="warning" />

- Type: `boolean`
- Default: `true`
- Details:
  - [Interface → Print button](../../guide/interface/others.md#print-button)

Whether display print icon in desktop mode.

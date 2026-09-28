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

## Options

:::: fields
@`darkmode` type=`'switch' | 'toggle' | 'auto' | 'enable' | 'disable'` enabled-by-default=Yes root-only=Yes default=`'switch'`

Dark mode support options:

- `'switch'`: switch between dark, light and auto
- `'toggle'`: toggle between lightmode and darkmode
- `'auto'`: Automatically decide whether to apply dark mode based on user device's color-scheme or current time
- `'enable'`: only dark mode
- `'disable'`: disable dark mode

::: note

If you don't need this feature, set `darkmode: "disable"` to disable it.

:::

See also: [Interface → Dark mode](../../guide/interface/darkmode.md).

@`externalLinkIcon` type=boolean enabled-by-default=Yes default=`true`

Controls whether an icon is displayed on external links.

@`fullscreen` type=boolean root-only=Yes

Whether show the "full screen" button.

See also: [Interface → FullScreen](../../guide/interface/others.md#fullscreen-button).

@`pure` type=boolean root-only=Yes

Whether enable pure mode.

::: tip

Enabling this will disable some of the fancy styles.

Useful when you want to provide "A pure document site".

:::

See also: [Interface → Pure mode](../../guide/interface/others.md#pure-mode).

@`focus` type=`number | boolean` root-only=Yes default="value of the pure option"

Whether enable focus mode, default when pure mode is enabled. Number value will be the delay time to trigger focus mode.

See also: [Interface → Focus mode](../../guide/interface/others.md#focus-mode).

@`print` type=boolean root-only=Yes default=`true`

Whether display print icon in desktop mode.

See also: [Interface → Print button](../../guide/interface/others.md#print-button).

::::

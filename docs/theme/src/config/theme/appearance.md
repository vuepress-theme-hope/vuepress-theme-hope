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

## iconAssets <Badge text="Root only" type="warning" />

- Type: `FontIconAssets`

  ```ts
  type Link =
    | `/${string}`
    | `//${string}`
    | `http://${string}`
    | `https://${string}`;

  type BuiltInFontIcon =
    | "iconify"
    | "iconfont"
    | "fontawesome"
    | "fontawesome-with-brands";

  type FontIconAssets = BuiltInFontIcon | Link | (BuiltInFontIcon | Link)[];
  ```

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
- `"auto"`: Automatically decide whether to apply dark mode based on user device's color-scheme or current time
- `"enable"`: only dark mode
- `"disable"`: disable dark mode

::: note

If you don't need this feature, set `darkmode: "disable"` to disable it.

:::

## fullscreen <Badge text="Root only" type="warning" />

- Type: `boolean`
- Default: `false`
- Details: [Interface → FullScreen](../../guide/interface/others.md#fullscreen-button)

Whether show the "full screen" button.

## backToTop <Badge text="Root only" type="warning" />

- Type: `BackToTopOptions | boolean`

  ```ts
  interface BackToTopOptions {
    /**
     * Scroll threshold distance to display back to top button (in pixels)
     *
     * @default 100
     */
    threshold?: number;

    /**
     * Whether display scroll progress
     *
     * @default true
     */
    progress?: boolean;
  }
  ```

- Default: `true`
- Details: [Interface → Back to top button](../../guide/interface/others.md#back-to-top-button)

Back to top button customization, setting it to `false` disables the button.

## pure <Badge text="Root only" type="warning" />

- Type: `boolean`
- Default: `false`
- Details: [Interface → Pure mode](../../guide/interface/pure.md)

Whether enable pure mode.

::: tip

Enabling this will disable some of the fancy styles.

Useful when you want to provide "A pure document site".

:::

## print <Badge text="Root only" type="warning" />

- Type: `boolean`
- Default: `true`

Whether display print icon in desktop mode.

## iconPrefix <Badge text="Root only" type="warning" />

- Type: `string`
- Default: Inferred from iconAssets
- Details: [Interface → Icon](../../guide/interface/icon.md)

Prefix of icon FontClass, usually, it can be automatically set by the theme.

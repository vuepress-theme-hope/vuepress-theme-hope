---
title: Plugin Options
icon: config
---

## components

- Type: `AvailableComponent[]`

  ```ts
  type AvailableComponent =
    | "Badge"
    | "CodePen"
    | "FontIcon"
    | "PDF"
    | "StackBlitz"
    | "YouTube";
  ```

- Default: `[]`

Components to be registered.

Available component names:

- `"Badge"`
- `"CodePen"`
- `"FontIcon"`
- `"PDF"`
- `"StackBlitz"`
- `"YouTube"`

## addThis

- Type: `string | false`
- Default: `false`

Public ID of addThis.

## backToTop

- Type: `boolean | number`
- Default: `false`

Whether enabling backToTop button. When setting a number, it will be used as BackToTop button threshold distance (in pixels), default is 300.

## backToTopLocales

- Type: `BackToTopLocaleConfig`

  ```ts
  interface BackToTopLocaleData {
    /**
     * Back to top button label text
     */
    backToTop: string;
  }

  interface BackToTopLocaleConfig {
    [localePath: string]: BackToTopLocaleData;
  }
  ```

- Required: No

Locales config for BackToTop button.

## iconAssets

- Type: `string`
- Required: No

Link of font icon asset, `'iconfont'` and `'font-awesome'` keywords are supported.

## iconPrefix

- Type: `string`
- Default: Inffered from iconAssets

Class prefix of font icon

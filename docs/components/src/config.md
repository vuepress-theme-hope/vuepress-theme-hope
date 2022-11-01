---
title: Plugin Options
icon: config
---

## components

- Type: `AvailableComponent[]`

  ```ts
  type AvailableComponent =
    | "Badge"
    | "BiliBili"
    | "CodePen"
    | "FontIcon"
    | "PDF"
    | "StackBlitz"
    | "VideoPlayer"
    | "YouTube";
  ```

- Default: `[]`

Components to be registered.

Available component names:

- `"Badge"`
- `"BiliBili"`
- `"CodePen"`
- `"FontIcon"`
- `"PDF"`
- `"StackBlitz"`
- `"VideoPlayer"`
- `"YouTube"`

## addThis

- Type: `string | false`
- Default: `false`
- Details:
  - [Guide → AddThis](./guide/addthis.md#usage)

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

- Type: `` "iconfont" | "fontawesome" | `//${string}` | `http://${string}` | `https://${string}`  ``
- Required: No

Link of font icon asset, `'iconfont'` and `'fontawesome'` keywords are supported.

## iconPrefix

- Type: `string`
- Default: Inferred from iconAssets

Class prefix of font icon

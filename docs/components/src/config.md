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

## componentsOptions

Global config for components.

### componentsOptions.fontIcon.assets

- Type: `` "iconfont" | "fontawesome" | `//${string}` | `http://${string}` | `https://${string}`  ``
- Required: No

Link of font icon asset, `'iconfont'` and `'fontawesome'` keywords are supported.

### componentsOptions.fontIcon.prefix

- Type: `string`
- Default: Inferred from assets

Class prefix of font icon

## rootComponents

Components to be mounted at root.

### rootComponents.addThis

- Type: `string | false`
- Default: `false`
- Details:
  - [Guide → AddThis](./guide/addthis.md#usage)

Public ID of addThis.

### rootComponents.backToTop

- Type: `boolean | number`
- Default: `false`

Whether enabling backToTop button. When setting a number, it will be used as BackToTop button threshold distance (in pixels), default is 300.

### rootComponents.notice

- Type: `NoticeOptions`

  ```ts
  interface NoticeLocaleOptions {
    /**
     * Notice title
     */
    title: string;

    /**
     * Notice content
     */
    content: string;

    /**
     * Notice footer
     */
    actions: {
      /**
       * Action text
       */
      text: string;
      /**
       * Action link
       */
      link?: string;
      /**
       * Action type
       *
       * @default 'default
       */
      type?: "primary" | "default";
    }[];
  }

  interface NoticeOptions {
    /**
     * Notice locales Options
     */
    locales: Record<string, NoticeLocaleOptions>;

    /**
     * Notice key
     *
     * @description Used to identify and store the notice status
     */
    key?: string;

    /**
     * Whether show notice only once or show it in every visit
     *
     * @description If `key` is not provided, this option will be ignored
     *
     * @default false
     */
    showOnce?: string;

    /**
     * Whether the notice shall be confirmed
     *
     * @default true
     */
    confirm?: boolean;

    /**
     * Whether the notice should appear fullscreen
     *
     * @default false
     */
    fullscreen?: boolean;
  }
  ```

- Required: No

Config for global notice.

## locales

Component locales.

### locales.backToTop

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

::: details Built-in Supported Languages

- **Simplified Chinese** (zh-CN)
- **Traditional Chinese** (zh-TW)
- **English (United States)** (en-US)
- **German** (de-AT)
- **Russian** (ru-RU)
- **Ukrainian** (uk-UA)
- **Vietnamese** (vi-VN)
- **Portuguese (Brazil)** (pt-BR)
- **Polish** (pl-PL)
- **French** (fr-FR)
- **Spanish** (es-ES)
- **Slovak** (sk-SK)
- **Japanese** (ja-JP)
- **Turkish** (tr-TR)
- **Korean** (ko-KR)

:::

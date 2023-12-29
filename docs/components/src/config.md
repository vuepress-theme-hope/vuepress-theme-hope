---
title: Plugin Options
icon: gears
---

## components

- Type: `AvailableComponent[]`

  ```ts
  type AvailableComponent =
    | "ArtPlayer"
    | "AudioPlayer"
    | "Badge"
    | "BiliBili"
    | "CodePen"
    | "FontIcon"
    | "PDF"
    | "Replit"
    | "Share"
    | "StackBlitz"
    | "SiteInfo"
    | "VPBanner"
    | "VPCard"
    | "VidStack"
    | "VideoPlayer"
    | "XiGua"
    | "YouTube";
  ```

- Default: `[]`

Components to be registered.

Available component names:

- `"ArtPlayer"`
- `"AudioPlayer"`
- `"Badge"`
- `"BiliBili"`
- `"CodePen"`
- `"FontIcon"`
- `"PDF"`
- `"Replit"`
- `"Share"`
- `"StackBlitz"`
- `"SiteInfo"`
- `"VPBanner"`
- `"VPCard"`
- `"VidStack"`
- `"VideoPlayer"`
- `"XiGua"`
- `"YouTube"`

## componentsOptions

Global config for components.

### componentsOptions.artPlayer

- Type: `ComponentsArtPlayerOptions`
- Required: No
- Details:
  - [Guide → ArtPlayer](./guide/media/art-player.md#global-config)

### componentsOptions.share.services

- Type: `(string | ShareService)[]`
- Details:
  - [Guide → Share → Setting component](./guide/utilities/share.md#setting-component)

Share services

### componentsOptions.share.contentSelector

- Type: `string`
- Default: `.theme-default-content`

Page content selector.

### componentsOptions.share.twitterUserName

- Type: `string`
- Required: No

Twitter username.

### componentsOptions.fontIcon.assets

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
- Details:
  - [Guide → FontIcon](./guide/utilities/font-icon.md)

Link of font icon asset, `'iconfont'` and `'fontawesome'` keywords are supported.

### componentsOptions.fontIcon.prefix

- Type: `string`
- Default: Inferred from assets
- Details:
  - [Guide → FontIcon](./guide/utilities/font-icon.md)

Class prefix of font icon

### componentsOptions.pdf.pdfjs

- Type: `string`
- Required: No
- Details:
  - [Guide → PDF → PDFJS](./guide/media/p-d-f.md#pdfjs-viewer)

Location to pdfjs viewer.

## rootComponents

Components to be mounted at root.

### rootComponents.backToTop

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

- Default: `false`
- Details:
  - [Guide → BackToTop](./guide/utilities/back-to-top.md)

Whether enabling backToTop button. When setting a number, it will be used as BackToTop button threshold distance (in pixels), default is 300.

### rootComponents.notice

- Type: `NoticeOptions`

  ```ts
  interface NoticeActionOption {
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
  }

  interface NoticeItemOptions {
    /**
     * Notice title
     */
    title: string;

    /**
     * Notice content
     */
    content: string;

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
    showOnce?: boolean;

    /**
     * Whether the notice shall be confirmed
     *
     * @default false
     */
    confirm?: boolean;

    /**
     * Whether the notice should appear fullscreen
     *
     * @default false
     */
    fullscreen?: boolean;

    /**
     * Notice actions
     */
    actions?: NoticeActionOption[];
  }

  type NoticeOptions = NoticeItemOptions &
    ({ path: string } | { match: RegExp });
  ```

- Required: No
- Details:
  - [Guide → Notice](./guide/utilities/notice.md)

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

### locales.pdf

- Type: `PDFLocaleConfig`

  ```ts
  interface PDFLocaleData {
    /**
     * PDF hint text
     *
     * @description Only used if the browser does not support embedding PDF and no PDFJS URL is provided.
     * [url] will be replaced by actual PDF link.
     */
    hint: string;
  }

  interface PDFLocaleConfig {
    [localePath: string]: CatalogLocaleData;
  }
  ```

- Required: No

Locales config for pdf component.

::: details Built-in Supported Languages

- **Simplified Chinese** (zh-CN)
- **Traditional Chinese** (zh-TW)
- **English (United States)** (en-US)
- **German** (de-DE)
- **German (Australia)** (de-AT)
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
- **Finnish** (fi-FI)
- **Indonesian** (id-ID)
- **Dutch** (nl-NL)

:::

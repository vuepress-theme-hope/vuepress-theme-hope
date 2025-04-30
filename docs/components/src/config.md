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
    | "PDF"
    | "Share"
    | "StackBlitz"
    | "SiteInfo"
    | "VPBanner"
    | "VPCard"
    | "VidStack"
    | "VideoPlayer"
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
- `"PDF"`
- `"Share"`
- `"StackBlitz"`
- `"SiteInfo"`
- `"VPBanner"`
- `"VPCard"`
- `"VidStack"`
- `"VideoPlayer"`
- `"YouTube"`

## componentsOptions

Global config for components.

### componentsOptions.artPlayer

- Type: `ComponentsArtPlayerOptions`
- Required: No
- Details:
  - [Guide → ArtPlayer](./guide/media/art-player.md#global-config)

### componentsOptions.pdf.pdfjs

- Type: `string`
- Required: No
- Details:
  - [Guide → PDF → PDFJS](./guide/media/p-d-f.md#pdfjs-viewer)

Location to pdfjs viewer.

### componentsOptions.share.services

- Type: `(string | ShareService)[]`
- Details:
  - [Guide → Share → Setting component](./guide/utilities/share.md#setting-component)

Share services

### componentsOptions.share.twitterUserName

- Type: `string`
- Required: No

Twitter username.

## locales

Component locales.

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
    [localePath: string]: PDFLocaleData;
  }
  ```

- Required: No

Locales config for pdf component.

### locales.siteInfo

- Type: `SiteInfoLocaleConfig`

  ```ts
  interface SiteInfoLocaleData {
    /**
     * Source text
     *
     * 源代码文字
     */
    source: string;
  }

  interface SiteInfoLocaleConfig {
    [localePath: string]: SiteInfoLocaleData;
  }
  ```

- Required: No

Locales config for site info component.

### locales.vidstack

- Type: `VidstackLocaleConfig`

  ```ts
  interface VidstackLocaleData {
    "Caption Styles": string;
    "Captions look like this": string;
    "Closed-Captions Off": string;
    "Closed-Captions On": string;
    "Display Background": string;
    "Enter Fullscreen": string;
    "Enter PiP": string;
    "Exit Fullscreen": string;
    "Exit PiP": string;
    "Google Cast": string;
    "Keyboard Animations": string;
    "Seek Backward": string;
    "Seek Forward": string;
    "Skip To Live": string;
    "Text Background": string;
    Accessibility: string;
    AirPlay: string;
    Announcements: string;
    Audio: string;
    Auto: string;
    Boost: string;
    Captions: string;
    Chapters: string;
    Color: string;
    Connected: string;
    Connecting: string;
    Continue: string;
    Default: string;
    Disabled: string;
    Disconnected: string;
    Download: string;
    Family: string;
    Font: string;
    Fullscreen: string;
    LIVE: string;
    Loop: string;
    Mute: string;
    Normal: string;
    Off: string;
    Opacity: string;
    Pause: string;
    PiP: string;
    Play: string;
    Playback: string;
    Quality: string;
    Replay: string;
    Reset: string;
    Seek: string;
    Settings: string;
    Shadow: string;
    Size: string;
    Speed: string;
    Text: string;
    Track: string;
    Unmute: string;
    Volume: string;
  }

  interface VidstackLocaleConfig {
    [localePath: string]: VidstackLocaleData;
  }
  ```

- Required: No

Locales config for vidstack component.

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

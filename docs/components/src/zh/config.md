---
title: 插件选项
icon: gears
---

## components

- 类型: `AvailableComponent[]`

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

- 默认值: `[]`

需要被注册的组件。

可接受的组件名称为:

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

组件的全局配置

### componentsOptions.artPlayer

- 类型: `ComponentsArtPlayerOptions`
- 默认值: `{}`
- 详情:
  - [指南 → ArtPlayer](./guide/media/art-player.md#全局配置)

### componentsOptions.pdf.pdfjs

- 类型: `string`
- 必填: 否
- 详情:
  - [指南 → PDF → PDFJS](./guide/media/p-d-f.md#pdfjs-查看器)

PDFJS 查看器的路径

### componentsOptions.share.services

- 类型: `(string | ShareService)[]`
- 详情:
  - [指南 → Share → 设置组件](./guide/utilities/share.md#设置组件)

分享服务

### componentsOptions.share.twitterUserName

- 类型: `string`
- 必填: 否

Twitter 用户名。

## locales

组件多语言配置

### locales.pdf

- 类型: `PDFLocaleConfig`

  ```ts
  interface PDFLocaleData {
    /**
     * PDF 提示文字
     *
     * @description 只有在浏览器不支持嵌入 PDF 且没有提供 PDFJS URL 时才会使用
     * [url] 会被实际 PDF 链接替换
     */
    hint: string;
  }

  interface PDFLocaleConfig {
    [localePath: string]: PDFLocaleData;
  }
  ```

- 必填: 否

PDF 组件国际化配置。

### locales.siteInfo

- 类型: `SiteInfoLocaleConfig`

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

- 必填: 否

站点信息组件国际化配置。

### locales.vidstack

- 类型: `VidstackLocaleConfig`

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

- 必填: 否

VidStack 组件国际化配置。

::: details 内置支持语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英文(美国)** (en-US)
- **德语** (de-DE)
- **德语(澳大利亚)** (de-AT)
- **俄语** (ru-RU)
- **乌克兰语** (uk-UA)
- **越南语** (vi-VN)
- **葡萄牙语(巴西)** (pt-BR)
- **波兰语** (pl-PL)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **斯洛伐克** (sk-SK)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)
- **芬兰语** (fi-FI)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::

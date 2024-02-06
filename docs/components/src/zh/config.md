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

- 默认值: `[]`

需要被注册的组件。

可接受的组件名称为:

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

组件的全局配置

### componentsOptions.artPlayer

- 类型: `ComponentsArtPlayerOptions`
- 默认值: `{}`
- 详情:
  - [指南 → ArtPlayer](./guide/media/art-player.md#全局配置)

### componentsOptions.fontIcon.assets

- 类型: `FontIconAssets`

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

- 必填: 否
- 详情:
  - [指南 → FontIcon](./guide/utilities/font-icon.md)

字体图标资源链接，支持 `'iconfont'` 和 `'fontawesome'` 关键字。

### componentsOptions.fontIcon.prefix

- 类型: `string`
- 默认值: 尝试从 iconAssets 推断
- 详情:
  - [指南 → FontIcon](./guide/utilities/font-icon.md)

字体图标的 Class 前缀

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

### componentsOptions.share.contentSelector

- 类型: `string`
- 默认值: `.theme-default-content`

页面内容选择器

### componentsOptions.share.twitterUserName

- 类型: `string`
- 必填: 否

Twitter 用户名。

## rootComponents

会被挂载到根节点的组件。

是否启用返回顶部按钮，当设置为数字时，会被作为返回顶部按钮触发距离 (单位: 像素)，默认为 300。

### rootComponents.notice

- Type: `NoticeOptions`

  ```ts
  interface NoticeActionOption {
    /**
     * 操作文字
     */
    text: string;
    /**
     * 操作链接
     */
    link?: string;
    /**
     * 操作类型
     *
     * @default 'default
     */
    type?: "primary" | "default";
  }

  interface NoticeItemOptions {
    /**
     * 通知标题
     */
    title: string;

    /**
     * 通知内容
     */
    content: string;

    /**
     * Notice 的 key
     *
     * @description 用于标识和存储 notice 的状态
     */
    key?: string;

    /**
     * 是否只显示一次通知
     *
     * @default false
     */
    showOnce?: boolean;

    /**
     * 通知是否需要确认
     *
     * @default false
     */
    confirm?: boolean;

    /**
     * 通知是否应该全屏显示
     *
     * @default false
     */
    fullscreen?: boolean;

    /**
     * 通知操作
     */
    actions?: NoticeActionOption[];
  }

  type NoticeOptions = NoticeItemOptions &
    ({ path: string } | { match: RegExp });
  ```

- 必填: 否
- 详情:
  - [指南 → Notice](./guide/utilities/notice.md)

全局通知的配置

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

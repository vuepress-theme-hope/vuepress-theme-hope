---
title: Plugin Options
icon: gears
---

## selector

- Type: `string | string[]`
- Default: `'.theme-default-content div[class*="language-"] pre'`
- Details:
  - [Guide → Code Block Selection](./guide.md#code-block-selection)

Code block selector

## showInMobile

- Type: `boolean`
- Default: `false`
- Details:
  - [Guide → Button Display](./guide.md#button-display)

Whether to display copy button on the mobile device

## duration

- Type: `number`
- Default: `2000`
- Details:
  - [Guide → Copy Hint](./guide.md#copy-hint)

Hint display time, setting it to `0` will disable the hint.

## pure

- Type: `false`
- Default: `false`
- Details:
  - [Guide → Pure Mode](./guide.md#pure-mode)

Whether generate a small simple button with pure style.

## delay

- Type: `number`
- Default: `800`

The delay of registering copy code buttons, in ms.

If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`.

## locales

- Type: `CopyCodeLocaleConfig`

  ```ts
  interface CopyCodeLocaleData {
    /**
     * Copy text
     */
    copy: string;

    /**
     * Copied text
     */
    copied: string;

    /**
     * Success message text after content is copied
     */
    hint: string;
  }

  interface CopyCodeLocaleConfig {
    [localePath: string]: CopyCodeLocaleData;
  }
  ```

- Required: No

Locales config for copy code plugin.

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

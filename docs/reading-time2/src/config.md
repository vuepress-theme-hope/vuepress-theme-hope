---
title: Plugin Options
icon: gears
---

## wordPerMinute

- Type: `number`
- Default: `300`

Reading speed (words per minute)

## locales

- Type: `ReadingTimeLocaleConfig`

  ```ts
  interface ReadingTimeLocaleData {
    /**
     * Word template, `$word` will be automatically replaced by actual words
     */
    word: string;

    /**
     * Text for less than one minute
     */
    less1Minute: string;

    /**
     * Time template
     */
    time: string;
  }

  interface ReadingTimeLocaleConfig {
    [localePath: string]: ReadingTimeLocaleData;
  }
  ```

- Required: No

Locales config for reading-time plugin.

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

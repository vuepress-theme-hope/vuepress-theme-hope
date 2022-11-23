---
title: Options
icon: config
---

## Plugin Options

### hostname

- Type: `string`
- Required: No

Deploy hostname

### author

- Type: `string | ((page: Page) => string)`
- Required: No

Author Information

### license

- Type: `string | ((page: Page) => string)`
- Required: No

License Information

### triggerWords

- Type: `number`
- Default: `100`

Min words triggering copyright append

### global

- Type: `boolean`
- Default: `false`

Whether enabled globally

### disableCopy

- Type: `boolean`
- Default: `false`

Disable copy

### disableSelection

- Type: `boolean`
- Default: `false`

Disable selection

### locales

- Type: `CopyrightLocaleConfig`

  ```ts
  interface CopyrightLocaleData {
    /**
     * Author text
     *
     * @description `:author` will be replaced by author
     */
    author: string;

    /**
     * License text
     *
     * @description `:license` will be replaced by current license
     */
    license: string;

    /**
     * Link text
     *
     * @description `:url` will be replaced by current page link
     */
    link: string;
  }

  interface CopyrightLocaleConfig {
    [localePath: string]: CopyrightLocaleData;
  }
  ```

- Required: No

Locale config for copyright plugin.

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

## Frontmatter Options

### copy.triggerWords

- Type: `number`
- Default: `100`

Min words triggering copyright append

### copy.disableCopy

- Type: `boolean`
- Default: `false`

Disable copy

### copy.disableSelection

- Type: `boolean`
- Default: `false`

Disable selection

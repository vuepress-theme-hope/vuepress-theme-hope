---
title: Options
icon: gears
---

## Plugin Options

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

### canonical

- Type: `string`
- Required: No

Canonical hostname with base.

This is useful when your content are deploying in multiple places.

::: note Example

If you are deploying same content under `https://myblog.com` and `https://blog.com/username/`, you may want to prefer one site as reference link.

- If you prefer the first one, you should set `canonical` to `https://myblog.com`
- If you prefer the second one, you should set `canonical` to `https://blog.com/username/`

So copyright message triggered by copying content on another site also points to your preferred site.

:::

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

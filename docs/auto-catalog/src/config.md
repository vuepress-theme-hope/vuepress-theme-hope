---
title: Options
icon: config
---

## component

- Type: `string`
- Default: `"AutoCatalog"`

Catalog component name.

## level

- Type: `1 | 2 | 3`
- Default: `3`

Max depth of Catalog items level.

::: note

Only available when you use the built-in catalog component.

:::

## exclude

- Type: `(RegExp | string)[]`
- Default: `[]`

Page paths excluding from auto generation.

## frontmatter

- Type: `(path: string) => Record<string, any>`
- Required: No

Page Frontmatter generator.

### locales

- Type: `CatalogLocaleConfig`

  ```ts
  interface CatalogLocaleData {
    /**
     * Catalog title
     */
    title: string;
  }

  interface CatalogLocaleConfig {
    [localePath: string]: CatalogLocaleData;
  }
  ```

- Required: No

Locales config for catalog component.

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
- **Finnish** (fi-FI)

:::

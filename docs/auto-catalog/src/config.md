---
title: Options
icon: gears
---

## Plugin Options

### level

- Type: `1 | 2 | 3`
- Default: `3`

Max depth of Catalog items level.

::: note Only available with built-in component.

:::

### index

- Type: `boolean`
- Default: `false`

Whether show index for catalog

::: note Only available with built-in component.

:::

### exclude

- Type: `(RegExp | string)[]`
- Default: `[]`

Page paths excluding from auto generation.

### frontmatter

- Type: `(path: string) => Record<string, any>`
- Required: No

Page Frontmatter generator.

### component

- Type: `string`
- Required: No

Catalog component name.

### locales

- Type: `AutoCatalogLocaleConfig`

  ```ts
  interface AutoCatalogLocaleData {
    /**
     * Catalog title
     */
    title: string;

    /**
     * Empty hint
     */
    empty: string;
  }

  interface AutoCatalogLocaleConfig {
    [localePath: string]: AutoCatalogLocaleData;
  }
  ```

- Required: No

Locales config for catalog component.

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

## Client options

### defineAutoCatalogGetter

```ts
export interface AutoCatalogInfo {
  /** Catalog title */
  title: string;
  /** Catalog order */
  order?: number;
  /** Catalog content */
  content?: Component;
}

export type AutoCatalogInfoGetter = (
  meta: Record<string, unknown>,
) => AutoCatalogInfo | null;

export declare const defineAutoCatalogGetter: (
  options: AutoCatalogInfoGetter,
) => void;
```

Customize how to extract catalog info from meta.

## AutoCatalog Component Props

### base

- Type: `string`
- Default: `Current route path base`

Catalog Base

### level

- Type: `1 | 2 | 3`
- Default: `3`

Max level of catalog.

### index

- Type: `boolean`
- Default: `false`

Whether display index number for catalog.

### hideHeading

- Type: `boolean`
- Default: `false`

Whether hide `Category` title.

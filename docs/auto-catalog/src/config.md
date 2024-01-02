---
title: Config
icon: gears
---

## Plugin Options

### level <Badge text="Built-in component only" />

- Type: `1 | 2 | 3`
- Default: `3`

Max depth of catalog items.

### index <Badge text="Built-in component only" />

- Type: `boolean`
- Default: `false`

Whether show index for catalog

### frontmatter

- Type: `(path: string) => Record<string, any>`
- Required: No

Frontmatter getter for the generated page.

### exclude

- Type: `(RegExp | string)[]`
- Default: `[]`

Catalog page path to be excluded during generation.

### component

- Type: `string`
- Required: No

Component name to use as catalog.

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
interface AutoCatalogInfo {
  /** Catalog title */
  title: string;
  /** Catalog order */
  order?: number;
  /** Catalog content */
  content?: Component;
}

type AutoCatalogInfoGetter = (
  meta: Record<string, unknown>,
) => AutoCatalogInfo | null;

const defineAutoCatalogGetter: (options: AutoCatalogInfoGetter) => void;
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

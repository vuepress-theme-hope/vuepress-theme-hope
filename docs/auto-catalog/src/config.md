---
title: Options
icon: gears
---

## Plugin Options

### level

- Type: `1 | 2 | 3`
- Default: `3`

Max depth of Catalog items level.

::: note

Only available when you use the built-in catalog component.

:::

### index

- Type: `boolean`
- Default: `false`

Whether show index for catalog

### exclude

- Type: `(RegExp | string)[]`
- Default: `[]`

Page paths excluding from auto generation.

### frontmatter

- Type: `(path: string) => Record<string, any>`
- Required: No

Page Frontmatter generator.

### titleGetter

- Type: `(page: Page) => string`
- Default: `(page: Page) => page.title`

Page title getter

### iconGetter

- Type: `(page: Page) => string`
- Required: No

Page icon getter

### orderGetter

- Type: `(page: Page) => string`
- Required: No

Page order getter

### shouldIndex

- Type: `(page: Page) => boolean`
- Default: `() => true`

Whether page should be indexed getter

### component

- Type: `string`
- Required: No

Catalog component name.

### iconComponent

- Type: `string`
- Required: No

Icon component name, icon info will be passed to icon props.

### locales

- Type: `AutoCatalogLocaleConfig`

  ```ts
  interface AutoCatalogLocaleData {
    /**
     * Catalog title
     */
    title: string;
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

### defineAutoCatalogIconComponent

```ts
export type AutoCatalogIconComponent = Component<{
  icon: string;
}>;
export declare const defineAutoCatalogIconComponent: (
  options: AutoCatalogIconComponent
) => void;
```

Customize icon component for auto catalog.

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

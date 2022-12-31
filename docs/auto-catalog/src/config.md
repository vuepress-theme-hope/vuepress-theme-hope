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

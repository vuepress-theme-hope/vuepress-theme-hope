---
title: Layout Frontmatter Config
icon: config
category:
  - Config
tag:
  - Frontmatter
  - Layout
---

You can configue page layout by setting the following frontmatter options.

## pageInfo

- Type: `PageInfo[] | false`
- Default value: value in themeConfig

| Item            | Corresponding Content | Page frontmatter Value                  |
| --------------- | --------------------- | --------------------------------------- |
| `"Author"`      | Author                | `author`                                |
| `"Date"`        | Writing Date          | `date`                                  |
| `"category"`    | Category              | `category`                              |
| `"tag"`         | Tags                  | `tag`                                   |
| `"ReadingTime"` | Expect reading time   | N/A (automatically generated)           |
| `"Word"`        | Word count            | N/A (automatically generated)           |
| `"PageView"`    | Visit Number          | `pageview` (only available with Waline) |

Set whether to show page details on the current page

## pageview

- Type: `boolean`
- Default value: value in themeConfig

Whether display page views.

::: tip

The pageviews feature requires you to have a valid Waline Comment Service config.

:::

## breadcrumb

- Type: `boolean`
- Default value: value in themeConfig

Whether path navigation is enabled on the current page.

## breadcrumbIcon

- Type: `boolean`
- Default value: value in themeConfig

Whether path navigation icon is enabled on the current page.

## navbar

- Type: `boolean`

The navbar configuration of the page, filling in `false` will disable the navbar

## sidebar

- Type: `"heading" | false`

Page sidebar configuration options. Supports `"heading"` or `false`.

## headerDepth

- Type: `number`
- Default: `2`

The page’s sidebar heading rendering depth.

## comment

- Type: `boolean`
- Default value: value in themeConfig

Whether to enable comments on the current page.

## lastUpdated

- Type: `boolean`
- Default value: value in themeConfig

Whether display lastUpdated time.

## editLink

- Type: `boolean`
- Default value: value in themeConfig

Whether to show edit link.

## contributors

- Type: `boolean`
- Default value: value in themeConfig

Whether to show contributors.

## prev

- Type: `AutoLink | string | false`

  ```ts
  interface AutoLink {
    text: string;
    icon: string;
    link: string;
  }
  ```

Previous article link.

## next

- Type: `AutoLink |string | false`

  ```ts
  interface AutoLink {
    text: string;
    icon: string;
    link: string;
  }
  ```

Next article link.

## footer

- Type: `boolean | string | HTMLString`
- Default value: the value configured globally

Footer content.

- Set it to an empty string if you want an empty content
- Set it to `false` to disable the footer
- Set it to `true` to display the default footer

For more details, please see [Page → Footer Support](../../guide/layout/footer.md).

## copyright

- Type: `string | false`
- Default value: value in themeConfig

Copyright information

For more details, please see [Page → Footer Support](../../guide/layout/footer.md).

## backToTop

- Type: `boolean`
- Default value: true

Whether display the back to top button.

## toc

- Type: `boolean`
- Default value: value in themeConfig

Whether display toc in desktop mode.

## containerClass

- Type: `string`
- Required: No

Extra container class.

## layout

- Type: `string`
- Default: `"Layout"`

Page custom layout name.

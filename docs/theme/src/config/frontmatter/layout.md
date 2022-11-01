---
title: Layout Frontmatter Config
icon: config
order: 2
category:
  - Config
tag:
  - Frontmatter
  - Layout
---

You can configure page layout by setting the following frontmatter options.

## pageInfo

- Type: `PageInfo[] | false`
- Default value: value in theme options

| Item            | Corresponding Content | Page frontmatter Value                  |
| --------------- | --------------------- | --------------------------------------- |
| `"Author"`      | Author                | `author`                                |
| `"Date"`        | Writing Date          | `date`                                  |
| `"Category"`    | Category              | `category`                              |
| `"Tag"`         | Tags                  | `tag`                                   |
| `"ReadingTime"` | Expect reading time   | N/A (automatically generated)           |
| `"Word"`        | Word count            | N/A (automatically generated)           |
| `"PageView"`    | Visit Number          | `pageview` (only available with Waline) |

Set whether to show page details on the current page

## pageview

- Type: `boolean`
- Default value: value in theme options

Whether display page views.

::: tip

The pageviews feature requires you to have a valid Waline Comment Service config.

:::

## breadcrumb

- Type: `boolean`
- Default value: value in theme options

Whether path navigation is enabled on the current page.

## breadcrumbIcon

- Type: `boolean`
- Default value: value in theme options

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

## index

- Type: `boolean`
- Default: `true`

Whether index current page in sidebar.

## order

- Type: `number`

Page order in sidebar.

- By filling in a positive number, the page will appear in the front, while the smaller number comes to the front.
- By filling in a negative number, the page will appear in the end, while the greater number comes to the front. (e.g. -1 is after -2)

## dir

Sidebar group information used for [structure sidebar](../../guide/layout/sidebar.md#auto-sidebar).

### dir.text

- Type: `string`
- Default: title of README.md

Group title.

### dir.icon

- Type: `string`
- Default: icon of README.md

Group icon.

### dir.collapsable

- Type: `boolean`
- Default: `true`

Whether group is collapsable

### dir.link

- Type: `boolean`
- Default: `false`

Whether Dir is clickable.

::: note

Setting to `true` means setting group link to link of README.md.

:::

### dir.index

- Type: `boolean`
- Default: `true`

Whether index current dir

## dir.order

- Type: `number`

Group order in sidebar.

- By filling in a positive number, the page will appear in the front, while the smaller number comes to the front.
- By filling in a negative number, the page will appear in the end, while the greater number comes to the front. (e.g. -1 is after -2)

## comment

- Type: `boolean`
- Default value: value in theme options

Whether to enable comments on the current page.

## lastUpdated

- Type: `boolean`
- Default value: value in theme options

Whether display lastUpdated time.

## editLink

- Type: `boolean`
- Default value: value in theme options

Whether to show edit link.

## contributors

- Type: `boolean`
- Default value: value in theme options

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
- Default value: value in theme options

Copyright information

For more details, please see [Page → Footer Support](../../guide/layout/footer.md).

## backToTop

- Type: `boolean`
- Default value: true

Whether display the back to top button.

## toc {#toc-heading}

- Type: `boolean`
- Default value: value in theme options

Whether display toc in desktop mode.

## containerClass

- Type: `string`
- Required: No

Extra container class.

## layout

- Type: `string`
- Default: `"Layout"`

Page custom layout name.

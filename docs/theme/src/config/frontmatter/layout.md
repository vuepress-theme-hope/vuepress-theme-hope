---
title: Layout Frontmatter Config
icon: object-group
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
- Default: value in theme options
- Details:
  - [Feature → PageInfo](../../guide/feature/page-info.md)

Customize page info items in current page.

| Item            | Corresponding Content | Page frontmatter Value                  |
| --------------- | --------------------- | --------------------------------------- |
| `"Author"`      | Author                | `author`                                |
| `"Date"`        | Writing Date          | `date`                                  |
| `"Category"`    | Category              | `category`                              |
| `"Tag"`         | Tags                  | `tag`                                   |
| `"ReadingTime"` | Expect reading time   | N/A (automatically generated)           |
| `"Word"`        | Word count            | N/A (automatically generated)           |
| `"PageView"`    | Visit Number          | `pageview` (only available with Waline) |

## breadcrumb

- Type: `boolean`
- Default: value in theme options
- Details:
  - [Layout → Page](../../guide/layout/page.md#breadcrumb)

Whether enable breadcrumb.

## breadcrumbIcon

- Type: `boolean`
- Default: value in theme options
- Details:
  - [Layout → Page](../../guide/layout/page.md#breadcrumb)

Whether show icons in breadcrumb.

## breadcrumbExclude

- Type: `boolean`
- Default: `false`
- Details:
  - [Layout → Page](../../guide/layout/page.md#breadcrumb)

Whether to exclude the current page from the breadcrumb.

## navbar

- Type: `boolean`
- Details:
  - [Layout → Navbar](../../guide/layout/navbar.md#disabling-navbar)

Setting it to `false` will disable navbar

## sidebar

- Type: `boolean | SidebarArrayOptions`
- Details:
  - [Layout → Sidebar](../../guide/layout/sidebar.md#disabling-sidebar)

Setting it to `false` will disable sidebar, setting it to empty array `[]` will render sidebar slots content only.

## headerDepth

- Type: `number`
- Default: `2`
- Details:
  - [Layout → Page](../../guide/layout/page.md#setting-header-depth)

Heading rendering depth.

## index

- Type: `boolean`
- Default: `true`

Whether index current page in sidebar and catalog.

## order

- Type: `number`

Page order in sidebar and catalog.

- By filling in a positive number, the page will appear in the front, while the smaller number comes to the front.
- By filling in a negative number, the page will appear in the end, while the greater number comes to the front. (e.g. -1 is after -2)

## dir

Sidebar group information used for [structure sidebar](../../guide/layout/sidebar.md#auto-sidebar).

### dir.text

- Type: `string`
- Default: title of `README.md`

Group title.

### dir.icon

- Type: `string`
- Default: icon of `README.md`

Group icon.

### dir.collapsible

- Type: `boolean`
- Default: `true`

Whether group is collapsible

### dir.link

- Type: `boolean`
- Default: `false`

Whether Dir is clickable.

::: note

Setting to `true` means setting group link to link of `README.md`.

:::

### dir.index

- Type: `boolean`
- Default: `true`

Whether index current dir

### dir.order

- Type: `number`

Group order in sidebar.

- By filling in a positive number, the page will appear in the front, while the smaller number comes to the front.
- By filling in a negative number, the page will appear in the end, while the greater number comes to the front. (e.g. -1 is after -2)

## comment

- Type: `boolean`
- Default: value in theme options

Whether to enable comments on the current page.

## lastUpdated

- Type: `boolean`
- Default: value in theme options

Whether to display lastUpdated time.

## editLink

- Type: `boolean`
- Default: value in theme options

Whether to show edit link.

## contributors

- Type: `boolean`
- Default: value in theme options

Whether to show contributors.

## changelog

- Type: `boolean`
- Default: value in theme options

Whether to display changelog.

## prev

- Type: `AutoLinkConfig | string | false`

  ```ts
  interface AutoLinkConfig {
    text: string;
    icon: string;
    link: string;
  }
  ```

Previous article link.

## next

- Type: `AutoLinkConfig | string | false`

  ```ts
  interface AutoLinkConfig {
    text: string;
    icon: string;
    link: string;
  }
  ```

Next article link.

## footer

- Type: `boolean | string | HTMLString`
- Default: the value configured globally

Footer content.

- Set it to an empty string if you want an empty content
- Set it to `false` to disable the footer
- Set it to `true` to display the default footer

For more details, please see [Page → Footer Support](../../guide/layout/footer.md).

## copyright

- Type: `string | false`
- Default: value in theme options

Copyright information

For more details, please see [Page → Footer Support](../../guide/layout/footer.md).

## backToTop

- Type: `boolean`
- Default: `true`

Whether display the back to top button.

## toc {#toc-heading}

- Type: `boolean`
- Default: value in theme options

Whether display toc

## containerClass

- Type: `string`
- Required: No

Extra container class.

## layout

- Type: `string`
- Default: `"Layout"`

Page custom layout name.

---
title: Page Config
icon: config
category:
  - Config
tag:
  - Theme Config
  - Frontmatter
---

The following configuration options have been added to the page’s Front Matter:

## Information

### title

- Type: `string | boolean`
- Required: No

Current page’s title. Markdown’s first h1 by default.

### description

- Type: `string | boolean`
- Required: No

Current page’s description.

### icon

- Type: `string`
- Required: No

FontClass of the current page icon (recommended).

### author

- Type: `Author | boolean`
- Required: No

```ts
type AuthorInfo = { name: string; url?: string };

type Author = string | string[] | AuthorInfo | AuthorInfo[];
```

Show the author of the current page. If you don’t fill it, you will fall back to the default author.

::: tip

When setting default author in themeConfig, you can set `false` to prevent showing the default author.

:::

### isOriginal

- Type: `boolean`
- Default: `false`

Whether the current article is original.

### date

- Type: `DateString`
- Required: No
- Format: `YYYY-MM-DD` or `YYYY/MM/DD hh:mm:ss`

Set the writing time of the current page.

### category

- Type: `string | string[]`
- Required: No

Set the category of the current page.

### tags

- Type: `string | string []`
- Required: No

Set the label of the current page.

### sticky

- Type: `boolean | number`
- Default: `false`

Sets whether the current article is pinned in the list. When fill in with number, greater ones come before smaller ones.

### star

- Type: `boolean | number`
- Default: `false`

Sets whether the current article is pinned in the article list in blog theme. When fill in with number, greater ones come before smaller ones.

### article

- Type: `boolean`
- Default: `true`

Whether to add the article to the article list.

### timeline

- Type: `boolean`
- Default: `true`

Whether to add the article to the timeline list.

### image

- Type: `string`
- Required: No

Current page’s image，needs an absolute path.

## Components and Layout

### pageInfo

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

### pageview

- Type: `boolean`
- Default value: value in themeConfig

Whether display page views.

::: tip

The pageviews feature requires you to have a valid Waline Comment Service config.

:::

### breadcrumb

- Type: `boolean`
- Default value: value in themeConfig

Whether path navigation is enabled on the current page.

### breadcrumbIcon

- Type: `boolean`
- Default value: value in themeConfig

Whether path navigation icon is enabled on the current page.

### navbar

- Type: `boolean`

The navigation bar configuration of the page, filling in `false` will disable the navigation bar

### sidebar

- Type: `"heading" | false`

Page sidebar configuration options. Supports `"heading"` or `false`.

### headingDepth

- Type: `number`
- Default: `2`

The page’s sidebar heading rendering depth.

### comment

- Type: `boolean`
- Default value: value in themeConfig

Whether to enable comments on the current page.

### lastUpdated

- Type: `boolean`
- Default value: value in themeConfig

Whether display lastUpdated time.

### editLink

- Type: `boolean`
- Default value: value in themeConfig

Whether to show edit link.

### contributors

- Type: `boolean`
- Default value: value in themeConfig

Whether to show contributors.

### prev

- Type: `AutoLink | string | false`

  ```ts
  interface AutoLink {
    text: string;
    icon: string;
    link: string;
  }
  ```

Previous article link.

### next

- Type: `AutoLink |string | false`

  ```ts
  interface AutoLink {
    text: string;
    icon: string;
    link: string;
  }
  ```

Next article link.

### footer

- Type: `boolean | string | HTMLString`
- Default value: the value configured globally

Footer content.

- Set it to an empty string if you want an empty content
- Set it to `false` to disable the footer
- Set it to `true` to display the default footer

For more details, please see [Page → Footer Support](../guide/layout/footer.md).

### copyright

- Type: `string | false`
- Default value: value in themeConfig

Copyright information

For more details, please see [Page → Footer Support](../guide/layout/footer.md).

### backToTop

- Type: `boolean`
- Default value: true

Whether display the back to top button.

### toc

- Type: `boolean`
- Default value: value in themeConfig

Whether display toc in desktop mode.

### containerClass

- Type: `string`
- Required: No

Extra container class.

### layout

- Type: `string`
- Default: `"Layout"`

Page custom layout name.

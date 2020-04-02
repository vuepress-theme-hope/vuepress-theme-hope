---
icon: api
category: api
tags: 
  - api
  - frontmatter
---

# Page Configuration

The following configuration options have been added to the page's frontmatter:

## icon

- Type: `string`
- Required: No

Set the FontClass of the current page icon (recommended)

### author

- Type: `string | boolean`
- Required: No

Show the author of the current page. If you don't fill it, you will fall back to the default author.

::: tip
When the global default author is enabled, you can set `false` to cancel the author display
:::

### time

- Type: `string`
- Required: No
- Format: `YYYY/MM/DD hh:mm` `YYYY-MM-DD hh:mm` or `YYYY/MM/DD` `YYYY-MM-DD`

Set the writing time of the current page

## category

- Type: `string`
- Required: No

Set the category of the current page

## tags

- Type: `string | string []`
- Required: No

Set the label of the current page

## sticky

- Type: `boolean`
- Default: `false`

Sets whether the current article is pinned in the list.

### article

- Type: `boolean`
- Default: `true`

Whether to add the article to the article list.

## password

- Type: `string`
- Required: No

Set a password for the current article.

## Page display configuration

## pageInfo

- Type: `boolean`
- Default value: Globally configured value (global default is `true`)

Set whether to show page details on the current page

### visitor

- Type: `boolean`
- Default value: Globally configured value (defaults to `true` after setting global`comment` to `valine ')

Whether the current page shows page views

::: tip
The display pageview feature requires you to configure Valine type comment configuration correctly.
:::

## breadcrumb

- Type: `boolean`
- Default value: Globally configured value (global default is `true`)

Whether path navigation is enabled on the current page

## sidebar

Page sidebar configuration options. Supports `false` or`auto`.

## sidebarDepth

- Type: `number`
- Default: `1`

The page's sidebar rendering depth

## comment

- Type: `boolean`
- Default value: Configured globally (defaults to `true` after configuring global`comment`)

Whether to enable comments on the current page

## footer

- Type: `boolean | string | HTMLString`
- Default value: Globally configured value (depending on whether **Footer default value** and **Footer display footer** are set globally)

Set the footer of the current page. For more details, please see [Page → Footer Support](../guide/layout/page.md#footer-support)

## backtotop

- Type: `boolean`
- Default value: Globally configured value (global default is `true`)

Sets whether the current page displays the back to top button

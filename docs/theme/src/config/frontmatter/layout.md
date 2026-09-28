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

## Options

:::: fields
@`pageInfo` type=`PageInfo[] | false` default="value in theme options"

Customize page info items in current page.

See also: [Feature → PageInfo](../../guide/feature/page-info.md).

| Item            | Corresponding Content | Page frontmatter Value                  |
| --------------- | --------------------- | --------------------------------------- |
| `"Author"`      | Author                | `author`                                |
| `"Date"`        | Writing Date          | `date`                                  |
| `"Category"`    | Category              | `category`                              |
| `"Tag"`         | Tags                  | `tag`                                   |
| `"ReadingTime"` | Expect reading time   | N/A (automatically generated)           |
| `"Word"`        | Word count            | N/A (automatically generated)           |
| `"PageView"`    | Visit Number          | `pageview` (only available with Waline) |

@`breadcrumb` type=boolean default="value in theme options"

Whether enable breadcrumb.

See also: [Layout → Page](../../guide/layout/page.md#breadcrumb).

@`breadcrumbIcon` type=boolean default="value in theme options"

Whether show icons in breadcrumb.

See also: [Layout → Page](../../guide/layout/page.md#breadcrumb).

@`breadcrumbExclude` type=boolean

Whether to exclude the current page from the breadcrumb.

See also: [Layout → Page](../../guide/layout/page.md#breadcrumb).

@`navbar` type=boolean

Setting it to `false` will disable navbar.

See also: [Layout → Navbar](../../guide/layout/navbar.md#disabling-navbar).

@`sidebar` type=`false | SidebarArrayOptions`

Setting it to `false` will disable sidebar, setting it to empty array `[]` will render sidebar slots content only.

See also: [Layout → Sidebar](../../guide/layout/sidebar.md#disabling-sidebar).

@`index` type=boolean default=`true`

Whether index current page in sidebar and catalog.

@`order` type=number

Page order in sidebar and catalog.

- By filling in a positive number, the page will appear in the front, while the smaller number comes to the front.
- By filling in a negative number, the page will appear in the end, while the greater number comes to the front. (e.g. -1 is after -2)

@`dir`

Sidebar group information used for [structure sidebar](../../guide/layout/sidebar.md#generate-sidebar-from-file-structure).

@@`dir.text` type=string default="title of `README.md`"

Group title.

@@`dir.icon` type=string default="icon of `README.md`"

Group icon.

@@`dir.collapsible` type=boolean default=`true`

Whether group is collapsible.

@@`dir.link` type=boolean

Whether Dir is clickable.

::: note

Setting to `true` means setting group link to link of `README.md`.

:::

@@`dir.index` type=boolean default=`true`

Whether index current dir.

@@`dir.order` type=number

Group order in sidebar.

- By filling in a positive number, the page will appear in the front, while the smaller number comes to the front.
- By filling in a negative number, the page will appear in the end, while the greater number comes to the front. (e.g. -1 is after -2)

@`comment` type=boolean default="value in theme options"

Whether to enable comments on the current page.

@`lastUpdated` type=boolean default="value in theme options"

Whether to display lastUpdated time.

@`editLink` type=boolean default="value in theme options"

Whether to show edit link.

@`contributors` type=boolean default="value in theme options"

Whether to show contributors.

@`changelog` type=boolean default="value in theme options"

Whether to display changelog.

@`prev` type=`AutoLinkConfig | string | false`

Previous article link.

@@`prev.text` type=string required

Link text.

@@`prev.icon` type=string required

Link icon.

@@`prev.link` type=string required

Link address.

@`next` type=`AutoLinkConfig | string | false`

Next article link.

@@`next.text` type=string required

Link text.

@@`next.icon` type=string required

Link icon.

@@`next.link` type=string required

Link address.

@`footer` type=`boolean | string | HTMLString` default="the value configured globally"

Footer content.

- Set it to an empty string if you want an empty content.
- Set it to `false` to disable the footer.
- Set it to `true` to display the default footer.

See also: [Page → Footer Support](../../guide/layout/footer.md).

@`copyright` type=`string | false` default="value in theme options"

Copyright information.

See also: [Page → Footer Support](../../guide/layout/footer.md).

@`backToTop` type=boolean default=`true`

Whether display the back to top button.

@`toc` type=`GetHeadersOptions | boolean` default="value in theme options"

Whether display toc.

@@`toc.selector` type=string default=`"#markdown-content >  h1, #markdown-content > h2, #markdown-content > h3, #markdown-content > h4, #markdown-content > h5, #markdown-content > h6, [vp-content] > h2"`

The selector of the headers.

@@`toc.ignore` type=`string[]` default=`[".vp-badge", ".vp-icon"]`

Ignore specific elements within the header, should be an array of `CSS Selector`.

@@`toc.levels` type=`HeaderLevels` default=`"deep"`

The levels of the headers, where `HeaderLevels` is `false`, a number, a `[number, number]` tuple or `"deep"`.

- `1` to `6` for `<h1>` to `<h6>`.
- `false`: No headers.
- `number`: only headings of that level will be displayed.
- `[number, number]`: headings level tuple, where the first number should be less than the second number, for example, `[2, 4]` which means all headings from `<h2>` to `<h4>` will be displayed.
- `deep`: same as `[2, 6]`, which means all headings from `<h2>` to `<h6>` will be displayed.

@`containerClass` type=string

Extra container class.

@`layout` type=string default=`"Layout"`

Page custom layout name.

::::

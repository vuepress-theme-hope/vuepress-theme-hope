---
title: Page
icon: file
order: 5
category:
  - Layout
tag:
  - Page
  - Layout
---

## Icon Support

You can configure the `icon` field in the frontmatter of the page, and fill in the FontClass of the corresponding icon to bind the icon to the page.

This icon is used in navbar, sidebar, breadcrumb and page title.

::: details Example

```md
---
icon: home
---
```

:::

::: info

For icon settings, please see [Icon Support](../interface/icon.md)

:::

## Page Info Display

Please see [Page Info Section](../feature/page-info.md)

## Breadcrumb

Please see [Breadcrumb](breadcrumb.md).

## Header List

In desktop mode, a list of article headers will automatically be displayed on the right side of the screen. (They will be placed in the sidebar on mobile devices)

If you don't want to display the title list on the right in desktop mode, please set `toc: false` in theme options.

You can also set it through `toc` in page frontmatter.

### Setting header depth

You can customize the depth of the header list by setting `headerDepth` in theme options and page frontmatter.

::: note

The valid maximum value depends on which levels of headers you have extracted via [markdown.headers.level](https://vuejs.press/reference/config.html#markdown-headers).

Since the default value of [markdown.headers.level](https://vuejs.press/reference/config.html#markdown-headers) is `[2, 3]`, so The default maximum value for `headerDepth` is `2`.

:::

## Contributors and Last Updated Time

Please see [Page Meta](../feature/meta.md).

## Prev / Next Links

<!-- TODO: Improve it -->

Prev and next links are automatically inferred based on the sidebar order of the active page. You can also explicitly overwrite or disable them globally with theme config or on specific pages using `Front matter`:

```md
---
prev: ./some-other-page
next: false
---
```

## Comment

Please see [Comment section](../feature/comment.md) for details.

## Customize Layout

By default, the content of each `*.md` file is rendered in a `<div class="page">` container, along with the sidebar, auto-generated edit links and previous/next links. To use a fully custom component in place of the page, you can again specify the component using frontmatter:

```md
---
layout: SpecialLayout
---
```

This will render `SpecialLayout` layout registered in VuePress for the given page.

::: note

The theme only provides `Layout`, `404` layout.

Also the theme:

- Provides a `Blog` layout when the blogging feature is enabled
- Provides a `Slide` layout when the slideshow feature is enabled

If you want to provide your own layout, please see [Theme Extending](../advanced/extend.md).

:::

## Customize Container Class

By default, each page is rendered in a `div` with class `theme-container`. To apply some special styles to specific pages, you can additionally specify a class name by setting `containerClass` in frontmatter

```md
---
containerClass: fancy-container
---
```

This will render in `<div class="theme-container fancy-container" />` for the current page.

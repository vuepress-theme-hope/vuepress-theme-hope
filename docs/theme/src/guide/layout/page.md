---
title: Page
icon: page
category: layout
tags:
  - page
  - layout
---

## Icon support

You can configure the `icon` field in the frontmatter of the page, and fill in the FontClass of the corresponding icon to bind the icon to the page.

::: details Example

```md
---
icon: home
---
```

:::

This icon is used in navbar, sidebar, breadcrumb and page title.

::: info

For icon settings, please see [Icon Support](../interface/icon.md)

:::

## Page Info Display

Please see [Page Info Section](../feature/page-info.md)

## Breadcrumb

Please see [Breadcrumb](breadcrumb.md).

## Heading list

In desktop mode, a list of article headings will automatically be displayed on the right side of the screen. (They will be placed in the sidebar on mobile devices)

If you don’t want to display the title list on the right in desktop mode, please set `themeConfig.anchorDisplay` to `false`.

You can also set it in `Front matter` on specific pages.

## Contributors and Last Updated Time

Please see [Git info plugin](../feature/git.md).

## Prev / Next Links

Prev and next links are automatically inferred based on the sidebar order of the active page. You can also explicitly overwrite or disable them globally with theme config or on specific pages using `Front matter`:

```md
---
prev: ./some-other-page
next: false
---
```

## Comment

Please see [Comment section](../feature/comment.md) for details.

## Custom Layout for Specific Pages

By default the content of each `*.md` file is rendered in a `<div class="page">` container, along with the sidebar, auto-generated edit links and prev/next links. To use a fully custom component in place of the page, you can again specify the component to use using `YAML front matter`:

```md
---
layout: SpecialLayout
---
```

This will render `.vuepress/components/SpecialLayout.vue` for the given page.

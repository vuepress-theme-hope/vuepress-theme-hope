---
icon: breadcrumb
tags:
  - component
  - layout
category: layout
---

# Breadcrumb

This theme adds a new Breadcrumb support.

Without any additional configuration, a Breadcrumb that matches the theme color is displayed at the top of the page content to help the reader understand the document structure.

::: warning
In order to ensure Breadcrumb working well, the `readme.md` file should be included in each folder.

Otherwise, the path navigation will automatically ignore that level because the component can not generate titles and links from the corresponding level folder.
:::

## Enable and disable <MyBadge text="Apply Partically Support" />

This feature is enabled by default. The configuration item is `breadcrumb`. For more information about "Apply Partically Support", please see the footnote [^applypartically]

## Icon support

Icon support is enabled by default and the icon for the page will be displayed before the link. It can be disabled by setting `themeConfig.breadcrumbIcon` to false.

[^applypartically]: **Apply Partically Support**

    **Support local configuration** means that the theme allows the configuration of the page to override the global configuration.

    ::: details Example
    Take path navigation as an example:

    This feature is enabled globally by default, that is, `themeConfig.breadcrumb` is `true` by default, and you can set `breadcrumb: false` in the frontmatter of a specific page to disable it locally.

    Of course, you can also set the `themeConfig.breadcrumb` option to `false` to disable it globally, and set `breadcrumb: true` in the frontmatter of a specific page to enable it locally.
    :::

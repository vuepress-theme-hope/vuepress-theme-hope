---
icon: breadcrumb
---

# Breadcrumb

This theme adds a new Breadcrumb support.

Without any additional configuration, a Breadcrumb that matches the theme color is displayed at the top of the page content to help the reader understand the document structure.

::: warning
In order to ensure Breadcrumb working well, the readme.md file should be included in each folder.
:::

## Enable and disable <MyBadge text="Apply Partically Support" />

This feature is enabled by default. The configuration item is `breadcrumb`. For more information about "Apply Partically Support", please see the footnote [^applypartically]

## Icon support

Icon support is enabled by default and the icon for the page will be displayed before the link. It can be disabled in `themeConfig.breadcrumbIcon`.

[^applypartically]: **Apply Partically Support**

    The configuration of the page can override the global configuration.

    That is, it can be enabled in a specific page after being globally disabled, and can also be disabled in a specific page when it is globally enabled.

    ::: tip example
    
    Take path navigation as an example:
    
    This feature is enabled globally by default, that is `themeConfig.breadcrumb` defaults to `true`, and you can disable it locally by setting `breadcrumb: false` in the frontmatter of the specific page.
    
    Of course, you can also disable it globally  by setting `themeConfig.breadcrumb` to `false`. And by setting `breadcrumb: true` in the frontmatter of the specific page, you can enable it in certain page.
    :::

---
title: Path Navigation
icon: navigation
category: layout
tags:
  - breadcrumb
  - layout
---

The theme adds a new Breadcrumb support, you can config it using `breadcrumb` in Frontmatter and themeConfig <Badge text="Support page config" /> [^applypartically], the default value is `true`.

Without any config, a Breadcrumb that matches the theme color is displayed at the top of the page content to help the reader understand the document structure.

<!-- more -->

You can also control the icon display of the path navigation using `breadcrumbIcon` field <Badge text="Support page config" />, the default value is `true`.

::: warning Notice

To ensure Breadcrumb working well, the `readme.md` file should be included in each folder.

Otherwise, the path navigation will automatically ignore that level because the component can not generate titles and links from the corresponding level folder.

:::

[^applypartically]: **Apply Partically Support**

    **Support local configuration**<Badge text="Support page config" /> means that the theme allows the configuration of the page to override the global configuration.

    ::: details Example

    Take path navigation as an example:

    This feature is enabled globally by default, that is, `themeConfig.breadcrumb` is `true` by default, and you can set `breadcrumb: false` in the Front Matter of a specific page to disable it locally.

    Of course, you can also set the `themeConfig.breadcrumb` option to `false` to disable it globally, and set `breadcrumb: true` in the Front Matter of a specific page to enable it locally.

    :::

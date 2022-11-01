---
title: Path Navigation
icon: navigation
order: 3
category:
  - Layout
tag:
  - Breadcrumb
  - Layout
---

The theme adds Breadcrumb support, you can config it using `breadcrumb` in page frontmatter and theme options <Badge text="Support page config" /> [^support-page-config], the default value is `true`.

Without any config, a Breadcrumb that matches the theme color is displayed at the top of the page content to help the reader understand the document structure.

<!-- more -->

You can also control the icon display of the path navigation using `breadcrumbIcon` field <Badge text="Support page config" />, the default value is `true`.

::: warning Notice

To ensure Breadcrumb working well, the `README.md` file should be included in each folder.

Otherwise, the Breadcrumb will ignore that folder level because the component can not generate title and link.

Please remember to set a title for **HOME PAGE**!

:::

[^support-page-config]: **Page config support**

    **Support local configuration**<Badge text="Support page config" /> means that the theme allows the configuration of the page to override the global configuration.

    ::: details Example

    Take path navigation as an example:

    This feature is enabled globally by default, that is, `breadcrumb` in theme options is `true` by default, and you can set `breadcrumb: false` in the Front Matter of a specific page to disable it locally.

    Of course, you can also set the `breadcrumb: false` in theme options to disable it globally, and set `breadcrumb: true` in the Front Matter of a specific page to enable it locally.

    :::

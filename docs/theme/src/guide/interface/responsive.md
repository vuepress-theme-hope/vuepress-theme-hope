---
title: Responsive Layout
icon: grip
order: 5
category:
  - Interface
tag:
  - Interface
  - Responsive layout
---

The whole theme is responsive, which means it works well on different screen sizes.

<!-- more -->

## Introduction to Responsive Layout

On mobile devices:

- In navbar, site name will be hidden, and elements such as navbar links, theme switch, and full-screen button will be collapsed into additional pop-up window, and toggled through the button on the right side of navbar;
- The sidebar will be displayed in the form of a side menu and hidden by default, and the sidebar toggle button is displayed on the left side of navbar to control the pop-up and retraction of the sidebar;
- Path navigation, body text, back to top button text has smaller font size
- The title of the current page is collapsed into the sidebar

On tablet/laptop devices:

- Navbar links will appear in the navbar
- The sidebar will be displayed as a collapsible menu
- The title of the current page is collapsed into the sidebar

On pc device:

- Navbar links will appear in the navbar
- The sidebar will stick to the left side of the content on the page
- The title of the current page will be displayed on the right side of the page

## Responsive configuration

Themes provide breakpoint variables for controlling responsive layout behavior. You can modify them in `.vuepress/styles/config.scss`:

- `$pc`: PC responsive layout breakpoint, default is `1440px`
- `$laptop`: notebook responsive layout breakpoint, default is `1280px`
- `$pad`: Large pad responsive layout breakpoint, defaults to `959px`
- `$tablet`: Tablet responsive layout breakpoint, default is `768px`
- `$mobile`: Mobile responsive layout breakpoint, default is `480px`

::: warning

`$tablet` and `$pc` can only be based on the pixel size.

:::

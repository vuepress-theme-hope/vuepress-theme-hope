---
icon: infofill
---

# Introduction

::: danger W.I.P.
This theme is still being built, the API may contain rapid changes.

If you met a bug while using, you can open an issue [here](https://github.com/Mister-Hope/vuepress-theme-hope/issues)
:::

## Theme Highlights

The theme extends Vupress's default theme and largely maintains the Vuepress default theme style. At the same time, the theme is optimized as follows:

- The appearance and enhancement of the navigation bar and sidebar, as well as icon support
- Theme color, night mode and full screen button
- Add readings, comments and icons, footer support for all pages
- Added new path navigation

::: tip
You should already be familiar with Vuepress's default theme, as all content related to the default theme will not be introduced.

If you wish to read the Vuepress default theme configuration, please visit [Vuepress Default Theme Configuration](https://v1.vuepress.vuejs.org/theme/default-theme-config.html)
:::

## New Features

- **Icon Support**

  Support for FontClass format icons has been added to the entire theme.

  Please import the icon css file in `index.styl` of `.vuepress/styles`. E.g:

  ```css
  @import '//at.alicdn.com/t/font_1426813_4mkpyb46f89.css'
  ```

  The icon's predecessor defaults to `icon-`, which can be changed in the `iconPrefix` field in the theme configuration[^themeConfig].

- [**NavBar**](navbar.md)

  - [Icon Support](navbar.md#icon-support)
  - [Theme Color](themecolor.md#custom-theme-color)
  - [Night Mode](themecolor.md#nightmode)
  - [Fullscreen Button](fullscreen.md)
  - [Style Enhance](navbar.md#style-change)
  - [Home Page](home.md)

- [**Page**](page.md)

  - [Page Info Display](page.md#page-info-display)
  - [Icon Support](page.md#icon-support)
  - [Comment](comment.md)
  - [Footer](page.md#footer-support)

- [**SideBar**](sidebar.md)

  - [Icon Support](sidebar.md#icon-support)
  - [Group Enhancement](sidebar.md#group-enhancement)

- [**Breadcrumb**](breadcrumb.md)

  A new Breadcrumb component with icon support is added.

- [**Components**](component.md)

  - [Badge `<MyBadge />`](component.md#badge): Added color support based on the official one

[^themeConfig]: The theme configuration field

    `themeConfig` object in `.vuepress/config.js`

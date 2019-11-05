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

If you wish to read the Vuepress default theme configuration, please visit [Vuepress Default Theme Configuration](config.md)
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

  - [Icon Support](navbar.md#Icon%20support)
  - [Theme Color](themecolor.md#Custom%20Theme%20color)
  - [Night Mode](themecolor.md#Nightmode)
  - [Fullscreen Button](navbar.md#Fullscreen%20Button)
  - [Style Enhance](navbar.md#Style%20Change)

- [**Page**](page.md)

  - [Page Info Display](page.md#Page%20Info%20Display)
  - [Icon Support](page.md#Icon%20Support)
  - [Comment](comment.md)
  - [Footer](page.md#Footer%20Support)

- [**SideBar**](sidebar.md)

  - [Icon Support](sidebar.md#Icon%20Support)
  - [Group Enhancement](sidebar.md#Group%20Enhancement)

- [**Breadcrumb**](breadcrumb.md)

  A new Breadcrumb component with icon support is added.

- [**Components**](component.md)

  - [Badge `<MyBadge />`](component.md#Badge): Added color support based on the official one

[^themeConfig]: The theme configuration field

    `themeConfig` object in `.vuepress/config.js`

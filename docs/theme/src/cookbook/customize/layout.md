---
title: Customizing layout
icon: object-group
category:
  - Cookbook
  - Customize
tag:
  - Customize
---

This tutorial guides you how to customize theme layout.

<!-- more -->

## Setting Theme Options

The theme provides many layout-related options for you to customize the layout of the theme. For details about these options, see [Theme Configuration → Layout](../../config/theme/layout.md).

## Modify SCSS Variables

### Theme Breakpoints

The theme will automatically apply responsive layouts under different screen widths. If you need to modify these breakpoints, you can modify them in the config file.

```scss
// .vuepress/styles/config.scss

// Modify the breakpoint of the desktop layout
$pc = 1280px;
```

For details about the config file `.vuepress/styles/config.scss` and the breakpoint variables `$pc`, `$laptop`, `$pad`, `$tablet`, `$mobile`, see [Theme Configuration → Styles](../../config/style.md#configscss).

### Theme Layout Size

The theme provides common size variables in the palette file, and you can modify these variables in the palette file to achieve the purpose of modifying the layout size.

```scss
// .vuepress/styles/palette.scss

// Modify the height of the navigation bar
$navbar-height = 80px;
```

The palette file `.vuepress/styles/palette.scss` and the introduction of layout variables can be found at [Theme Configuration → Style](../../config/style.md#palettescss).

## Modify Other Layouts

If you want to change the theme layout, but the theme does not provide relevant options, you can consider the following methods:

### Via CSS

- If you are not satisfied with the style of the theme, you can adjust the style of the theme components through the style file.

  ::: note

  In order to override the original style, you need to use the same or higher priority selector or use `!important` directly.

  :::

- If you want to remove some features, you can hide related dom elements by `display: none` in the style file.

::: note

The style file is `.vuepress/styles/index.scss` in the project directory, see [Theme Configuration → Style](../../config/style.md#indexscss) for details

:::

### By Overriding Components

All theme components are registered and invoked through aliases, which means that you can replace any component of the theme with your own components by overriding component aliases.

If you just want to add new content at a specific position on the page, then you can replace the component and reference the original component through the slot of the original component.

See [Advanced → Replace theme components](../../guide/advanced/replace.md) for component aliases, component slots and replacement methods.

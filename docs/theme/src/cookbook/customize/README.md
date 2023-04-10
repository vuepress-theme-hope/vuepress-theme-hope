---
title: Customize
icon: gear
dir:
  order: 4
category:
  - Cookbook
  - Customize
tag:
  - Customize
article: false
---

This section shows you the relevant codes involved in common customization.

## Adding Component

Each markdown file will be converted to a Vue component in VuePress, so you and import and use Vue components easily.

- [Adding Components](./component.md)

## How to Customize Styles

You can create three files under `.vuepress/styles` folder in your own document for style customization.

- `index.scss`: You can place your own styles via CSS or SCSS syntax to modify the appearance of the theme here.

  These styles will be injected after theme and plugin styles.

- `config.scss`: You can set some style related variables here, including responsive breakpoints, container class names, code themes, etc.

- `palette.scss`: You can set some color and layout related variables here, such as theme color, background color, navbar height, etc.

For the complete config list supported by the above files, see [Config → Style](../../config/style.md).

## Details

- [Customizing layouts](./layout.md)

- [Customizing colors](./color.md)

- [Customizing fonts](./font.md)

- [Customizing effects](./effect.md)

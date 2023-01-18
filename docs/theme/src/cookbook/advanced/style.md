---
title: Style Customization
icon: wand-magic-sparkles
order: 2
category:
  - Cookbook
  - Advanced
tag:
  - Customize
  - Style
---

This article briefly describes how to customize theme styles.

<!-- more -->

## How to Customize Styles

You can create three files under `.vuepress/styles` folder in your own document for style customization.

- `index.scss`: You can place your own styles via CSS or SCSS syntax to modify the appearance of the theme here.

  These styles will be injected after theme and plugin styles.

- `config.scss`: You can set some style related variables here, including responsive breakpoints, container class names, code themes, etc.

- `palette.scss`: You can set some color and layout related variables here, such as theme color, background color, navbar height, etc.

For the complete config list supported by the above files, see [Config → Style](../../config/style.md).

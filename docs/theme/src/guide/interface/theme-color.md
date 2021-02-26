---
title: Theme Color
icon: skin
category: interface
tags:
  - themecolor
---

This is an out-of-the-box feature that offers five theme color "red, blue, green, orange and purple" besides your theme color. You can also use your own theme color list.

<!-- more -->

## Disable

You can disable it by setting the theme field’s `themeConfig.themeColor` to false.

## Custom color

You need to configure `themeConfig.themeColor` in the format `colorname1: colorvalue, colorname2: colorvalue, ... }`:

::: details Example

```js {5-10}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    themeColor: {
      blue: "#2196f3",
      red: "#f26d6d",
      green: "#3eaf7c",
      orange: "#fb9b5f",
    },
  },
};
```

:::

To let the Stylus compiler to work, you also need to assign the color variable to `$colorPicker` and write it to `.vuepress/styles/palette.styl`:

::: details Example

```stylus
// .vuepress/styles/palette.styl
$colorPicker = {
   colorName1: red,
   colorName2: yellow,
   colorName3: blue
}
```

:::

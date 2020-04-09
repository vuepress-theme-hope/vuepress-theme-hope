---
icon: skinfill
category: function
tags:
  - style
  - function
---

# Theme color and Night mode

vuepress-theme-hope implements the theme color and darkmode functions with built-in `@mr-hope/vuepress-plugin-theme-color`.

`themeConfig.themeColor` in `.vuepress/config.js` will be passed directly to the plugin as a plugin option.

## Custom Theme color

This is an out-of-the-box feature that offers four themes "blue, red, green, and orange" in addition to your theme color.

### Disable

You can disable it by setting the theme field's `themeConfig.themeColor.picker` to false.

### Custom color

You need to configure `themeConfig.themeColor.picker` in the format ``colorname1: colorvalue, colorname2: colorvalue, ... }`:

::: details Example

```js {5-10}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    themeColor: {
      picker: {
        blue: '#2196f3',
        red: '#f26d6d',
        green: '#3eaf7c',
        orange: '#fb9b5f'
      }
    }
  }
}
```

:::

In order to let the stylus compiler to work, you also need to assign the color variable to `$colorPicker` and write it to `.vuepress/styles/palette.styl`:

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

## Darkmode

Changed automatically (`'auto'`) by default, you can set the `themeColor.darkmode` in the `themeConfig` to `'disable'` to disable the dark mode, or set to `'switch'` to let visitors change it manually.

In dark mode, the page uses a black background to protect your eyes.

![Darkmode](./assets/darkmode.png)

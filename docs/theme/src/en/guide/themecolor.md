---
icon: skinfill
---

# Theme color and Night mode

vuepress-theme-hope implements the theme color and night mode functions with built-in `@mr-hope/vuepress-plugin-theme-color`.

`themeConfig.themeColor` in `.vuepress/config.js` will be passed directly to the plugin as a plugin option.

## Custom Theme color

This is an out-of-the-box feature that offers four themes "blue, red, green, and orange" in addition to your theme color.

### Disable

You can disable it by setting the theme field's `themeConfig.themeColor.picker` to false.

### Custom color

You need to configure `themeConfig.themeColor.picker` in the format ``colorname1: colorvalue, colorname2: colorvalue, ... }`:

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    themeColor: {
      picker: {
        red: '#f00',
        green: '0f0',
        blue: '00f'
      }
    }
  }
}
```

Also, in order to let the stylus compiler to work, you also need to assign the color variable to `$colorPicker` and write it to `.vuepress/styles/palette.styl`:

```stylus
// .vuepress/styles/palette.styl
$colorPicker = {
   colorName1: red,
   colorName2: yellow,
   colorName3: blue
}
```

## Nightmode

Enable by default.

You can disable night mode by setting `themeConfig.allowNightmode` field to `false`.

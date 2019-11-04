---
icon: skinfill
---

# Theme color and Night mode

## Custom Theme color

This is an out-of-the-box feature that offers four themes "blue, red, green, and orange" in addition to your theme color.

### Disable

You can disable it by setting the theme field's `themePicker` to false.

### Custom color

You need to configure `themePicker` in the format ``colorname1: colorvalue, colorname2: colorvalue, ... }`:

```js
// .vuepress/config.js
module.exports = {
   themeConfig: {
     themePicker: {
       red: '#f00',
       green: '0f0',
       blue: '00f'
     }
   }
}
```

Also, in order to let the stylus compiler to work, you also need to assign the color variable to `$themePicker` and write it to `.vuepress/styles/palette.styl`:

```stylus
// .vuepress/styles/palette.styl
$themePicker = {
   colorName1: red,
   colorName2: yellow,
   colorName3: blue
}
```

## Nightmode

Enable by default.

You can disable night mode by setting `themeConfig.allowNightmode` field to `false`.

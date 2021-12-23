---
title: Theme Color
icon: skin
category: interface
tags:
  - interface
  - theme color
---

This is an out-of-the-box feature that offers five theme color "red, blue, green, orange and purple" besides your theme color. You can also use your own theme color list.

<!-- more -->

## Disable

You can disable it by setting the theme field’s `themeConfig.themeColor` to `false`.

## Accent Color

The first color of the theme color is the default accent color, you need to set it with `$accentColor` in `.vuepress/styles/palette.styl`.

## Custom color

You need to configure `themeConfig.themeColor` in the format `colorname1: colorvalue, colorname2: colorvalue, ... }`:

::: details Example

<CodeGroup>
<CodeGroupItem title="js">

```js {5-10}
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    themeColor: {
      blue: "#2196f3",
      red: "#f26d6d",
      green: "#3eaf7c",
      orange: "#fb9b5f",
    },
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    themeColor: {
      blue: "#2196f3",
      red: "#f26d6d",
      green: "#3eaf7c",
      orange: "#fb9b5f",
    },
  },
});
```

</CodeGroupItem>
</CodeGroup>

:::

To let the Stylus compiler to work, you also need to assign the color variable to `$colorPicker` and write it to `palette.styl` under `.vuepress/styles`:

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

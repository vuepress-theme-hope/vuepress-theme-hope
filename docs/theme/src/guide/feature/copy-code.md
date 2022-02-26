---
title: Code Copy
icon: copy
category:
  - Feature
tag:
  - Copy Code
  - Feature
---

If you are a programmer, you may want your users to be able to copy the code you show in the text with one click.

For this, `vuepress-theme-hope` use [vuepress-plugin-copy-code2][copy-code2] to provide a copy button on code blocks.

::: info

`vuepress-theme-hope` provides `copyCode` options in `themeConfig.plugins` as plugin options to `vuepress-plugin-copy-code2`.

:::

<!-- more -->

## Usage

After enabling, this plugin will automatically add a copy button to the bottom right corner of each code block.

By default, the button is only displayed on desktop mode. To display this button on mobile devices, set `showInMobile` to `true` in `themeConfig.plugins.copyCode`.

After user press the copy button, a success hint will display on the screen. The default hint duration is 2000ms, to change the duration, please set `duration` in `themeConfig.plugins.copyCode` (ms). To disable the hint, set duration to `0`.

## Effect

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    plugins: {
      copyCode: {},
    },
  },
});
```

[copy-code2]: https://vuepress-theme-hope.github.io/v2/copy-code/

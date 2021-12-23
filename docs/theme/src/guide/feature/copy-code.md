---
title: Code Copy
icon: copy
category: feature
tags:
  - copy code
  - feature
---

If you are a programmer, you may want your users to be able to copy the code you show in the text with one click.

For this, `vuepress-theme-hope` includes [@mr-hope/copy-code](https://vuepress-theme-hope.github.io/copy-code/), which provides a copy button on code blocks.

<!-- more -->

## Usage

After enabling, this plugin will automatically add a copy button to the bottom right corner of each code block.

By default, the button is only displayed on desktop mode. To display this button on mobile devices, set `showInMobile` to `true`.

After user press the copy button, a success hint will display on the screen. The default hint duration is 2000ms, to change the duration, please set `duration` in options (ms). To disable the hint, set duration to `0`.

## Effect

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    copyCode: {},
  },
});
```

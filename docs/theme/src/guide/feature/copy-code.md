---
title: Code Copy
icon: copy
category: feature
tags:
  - code-copy
---

If you are a programmer, you may want your users to be able to copy the code you show in the text with one click.

For this, `vuepress-theme-hope` includes [@mr-hope/copy-code](https://vuepress-theme-hope.github.io/copy-code/), which provides a copy button on code blocks.

## Usage

After enabling, this plugin will automatically add a copy button to the bottom right corner of each code block.

By default, the button is only displayed on desktop mode. If you want to display this button on mobile devices, set `showInMobile` to `true`.

After user press the copy button, a success hint will display on the screen. The default hint duration is 2000ms, if you want to change the duration, please set `duration` in options (ms). If you want to disable the hint, set duration to `0`.

## Effect

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    copyCode: {},
  },
};
```

---
title: Guide
icon: creative
---

## Usage

After enabling, this plugin will automatically add a copy button to the bottom right corner of each code block.

By default, the button is only displayed on desktop mode. If you want to display this button on mobile devices, set `showInMobile` to `true`.

After user press the copy button, a success hint will display on the screen. The default hint duration is 2000ms, if you want to change the duration, please set `duration` in options (ms). If you want to disable the hint, set duration to `0`.

## Effect

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "@mr-hope/copy-code",
      {
        // your options
      },
    ],
  ],
};
```

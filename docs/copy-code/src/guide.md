---
title: Guide
icon: creative
---

## Usage

This plugin will add a copy button to the bottom right corner of each code block.

By default, the button is only displayed on desktop mode. To display this button on mobile devices, set `showInMobile` to `true`.

After user press the copy button, a success hint will display on the screen. The default hint duration is 2000ms, to change the duration, please set `duration` in options (ms). To disable the hint, set duration to `0`.

## Demo

:::: code-group

::: code-group-item ts

```ts
// .vuepress/config.ts
export default {
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

:::

::: code-group-item js

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

:::

::::

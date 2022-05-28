---
title: Guide
icon: creative
---

## Usage

This plugin will add a copy button to the bottom right corner of each code block.

By default, the button is only displayed on desktop mode. To display this button on mobile devices, set `showInMobile` to `true`.

After user press the copy button, a success hint will display on the screen. The default hint duration is 2000ms, to change the duration, please set `duration` in options (ms). To disable the hint, set duration to `0`.

## Demo

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { copyCode } from "vuepress-plugin-copy-code2";

export default {
  plugins: [
    copyCode({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
const { copyCode } = require("vuepress-plugin-copy-code2");

module.exports = {
  plugins: [
    copyCode({
      // your options
    }),
  ],
};
```

:::

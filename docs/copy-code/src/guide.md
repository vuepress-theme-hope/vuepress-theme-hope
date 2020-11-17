---
title: Guide
icon: creative
---

## Usage

After enabling, this plugin will automatically add a copy button to the bottom right corner of each code block.

::: tip
By default, the button is only displayed on desktop mode.
:::

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

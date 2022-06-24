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

`vuepress-theme-hope` passes `plugins.copyCode` in theme options as plugin options to `vuepress-plugin-copy-code2`.

:::

<!-- more -->

## Usage

After enabling, this plugin will automatically add a copy button to the bottom right corner of each code block.

By default, the button is only displayed on desktop mode. To display this button on mobile devices, set `plugins.copyCode.showInMobile` to `true` in theme options.

After user press the copy button, a success hint will display on the screen. The default hint duration is `2000` ms, to change the duration, please set `plugins.copyCode.duration` in theme options. To disable the hint, set duration to `0`.

## Effect

```js
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    plugins: {
      copyCode: {},
    },
  }),
};
```

[copy-code2]: https://vuepress-theme-hope.github.io/v2/copy-code/

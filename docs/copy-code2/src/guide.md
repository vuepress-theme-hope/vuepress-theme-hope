---
title: Guide
icon: lightbulb
---

This plugin will automatically add a copy button to the top right corner of each code block.

## Code Block Selection

By default, the plugin will select code blocks according to the default theme's selector. If you are using a third-party theme, you can set one or more CSS selectors to the `selector` option.

## Button Display

By default, the button is only displayed in desktop mode, if you need to display the button on mobile, set `showInMobile` to `true`.

## Copy Hint

After the user clicks the copy button, a success hint will be displayed.

The default duration is 2000ms, set `duration` (in unit ms) if you need to change it. To disable the hint, set `duration` to `0`.

## Fancy Mode

By default, the copy button is only displayed when the mouse hovers over its code fence.

If you just want to display some code for others to copy, you can add the `fancy: true` option. This will render a prominent copy button in the bottom right corner of each code fence.

## Locale Customization

You can add new locale config or modify existing ones through `locales` option.

```ts
import { defineUserConfig } from "vuepress";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

export default defineUserConfig({
  locales: {
    "/": {
      // this is a supported language
      lang: "en-US",
    },
    "/xx/": {
      // the plugin does not support this language
      lang: "mm-NN",
    },
  },

  plugins: [
    copyCodePlugin({
      locales: {
        "/": {
          // Override copy button label text
          copy: "Copy Codes from code block",
        },

        "/xx/": {
          // Complete locale config for `mm-NN` language here
        },
      },
    }),
  ],
});
```

For specific options, see [Config → Locale Settings](./config.md#locales).

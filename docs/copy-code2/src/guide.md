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

After the user clicks the copy button, a copy success message will be displayed on the screen. The default prompt duration is 2000ms, if you need to change this duration, please set `duration` (unit ms), if you don't need this prompt, please set `duration` to `0`.

## Pure Mode

By default, the plugin will show a big blue button, if you want to make the button and tooltip less "obvious" you can add the `pure: true` option.

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

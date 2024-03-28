---
title: Other features
icon: ellipsis
order: 7
category:
  - Interface
tag:
  - Interface
---

## Print Button

Try it: <PrintButton />

The theme fully optimize style for print, and there will be a print button at toc in desktop mode by default.

To hide print button, you should set `print: false` in theme options.

```js {5} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    print: false,
  }),
};
```

## Fullscreen Button

Try it:

<ToggleFullScreenButton />

If you need it, you can enable it by setting `fullscreen: true` in theme options.

```js {5} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    fullscreen: true,
  }),
};
```

::: tip

If the current browser does not support full screen, the full screen button is automatically hidden.

:::

## Back to top button

`vuepress-theme-hope` adds a back-to-top button with progress bar using [`@vuepress/plugin-back-to-top`][back-to-top] which will display after scrolling down 100px by default.

You can set `plugins.backToTop: false` in theme options to disable it, or set it with an object to customize its threshold distance and progress bar display:

```js {8,13-26} title=".vuepress/config.js"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      // disable back to top button
      backToTop: false,

      // or

      // customize back to top button
      backToTop: {
        /**
         * Scroll threshold distance to display back to top button (in pixels)
         *
         * @default 100
         */
        threshold: 500,
        /**
         * Whether display scroll progress
         *
         * @default true
         */
        progress: false,
      },
    },
  }),
});
```

## RTL Layout

`vuepress-theme-hope` fully supports RTL layout. Just set `rtl: true` in rtl language of locales.

Try it: <ToggleRTLButton />

```js {9} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    locales: {
      // ...
      "/ar/": {
        // enable RTL layout
        rtl: true,
      },
    },
  }),
};
```

<script setup lang="ts">
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton";
import PrintButton from "@theme-hope/modules/info/components/PrintButton";
import ToggleRTLButton from "@ToggleRTLButton";
</script>

[back-to-top]: https://ecosystem.vuejs.press/plugins/back-to-top.html

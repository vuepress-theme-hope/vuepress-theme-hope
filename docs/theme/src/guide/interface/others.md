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

```ts twoslash {5} title=".vuepress/config.ts"
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

```ts twoslash {5} title=".vuepress/config.ts"
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

```ts twoslash {8,13-26} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      // disable back to top button with `backToTop: false`
      // or  customize back to top button
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
};
```

## Full A11y Support

"A11y" stands for "accessibility".

The theme adds full support of accessibility.

- All page structures of the theme are processed semantically.

- All buttons and icons have their corresponding accessibility labels

- All main interactive elements can be focused and interacted through the keyboard

This is our support for the visually impaired people around the world! :heart:

## Focus Mode

If you want to focus on reading, you can enable focus mode by setting `focus: true` in theme options.

```ts twoslash {5} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    focus: true,
  }),
};
```

In this mode, we will blur elements other than the main content, providing a more focused reading experience.

The default delay is 1500ms, and you can customize it by setting a number value.

## Pure Mode

If your site is a documentation-only site, and you prefer a clean style, you can enable pure mode by setting `pure: true` in theme options.

```ts twoslash {5} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    pure: true,
  }),
};
```

In this mode, we disable some fancy animations and some colors and just provide functionality.

## RTL Layout

`vuepress-theme-hope` fully supports RTL layout. Just set `rtl: true` in rtl language of locales.

Try it: <ToggleRTLButton />

```ts twoslash {9} title=".vuepress/config.ts"
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

[back-to-top]: https://ecosystem.vuejs.press/plugins/features/back-to-top.html

---
title: Guide
icon: lightbulb
---

This plugin will make the pictures in the body of the page enter the preview mode when clicked.

<!-- more -->

## Browse Mode

In preview mode, you can:

- Swipe left and right to preview other pictures on the page in order
- View the description of the picture
- Zoom in and zoom out the picture
- View pictures in full screen
- Download pictures
- Share pictures

::: tip

- Besides clicking "×" in the upper right corner to exit the preview mode, scrolling up and down more than a certain distance will also exit preview mode.
- On mobile devices, or using the PC trackpad, you can use pan and zoom gestures to pan and zoom in the preview mode.

:::

## Image Selection

By default, the plugin will select images according to the default theme's selector. If you are using a third-party theme, you can set one or more CSS selectors to the `selector` option.

## Customize PhotoSwipe Options

You can pass options to [`photo-swipe`](http://photoswipe.com/) by importing and calling `definePhotoSwipeOptions` in client config file:

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { definePhotoSwipeOptions } from "vuepress-plugin-photo-swipe/client";

definePhotoSwipeOptions({
  // photoswipe options here
});

export default defineClientConfig({
  // ...
});
```

## Operation Delay

If your theme adds animations when switching pages, you may need to delay when photo-swipe re-finds page images. You can configure this delay via the `delay` option, the default value is `800` (in milliseconds).

## Locale Customization

You can add new locale config or modify existing ones through `locales` option.

```ts
import { defineUserConfig } from "vuepress";
import { photoSwipePlugin } from "vuepress-plugin-photo-swipe";

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
    photoSwipePlugin({
      locales: {
        "/": {
          // Override share label text
          share: "Share with friends",
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

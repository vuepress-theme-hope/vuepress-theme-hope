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

You can pass options to [`photo-swipe`](http://photoswipe.com/) by importing and calling `definePhotoSwipeConfig` in [client config file][client-config]:

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import { definePhotoSwipeConfig } from "vuepress-plugin-photo-swipe/client";

definePhotoSwipeConfig({
  // photoswipe options here
});

export default defineClientConfig({
  // ...
});
```

## Page level settings

You can set `photoSwipe` in frontmatter to customize the behavior of the current page:

- String: Image selector for the current page
- `false`: disable photo-swipe in the current page.

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

## Advanced

You can also call photoswipe with apis.

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import {
  createPhotoSwipe,
  registerPhotoSwipe,
} from "vuepress-plugin-photo-swipe/client";

let state = null;

const openPhotoSwipe = (index: number) => {
  state?.open(index);
};

onMounted(async () => {
  // create a new photoswipe instance
  state=  await createPhotoSwipe([
    'https://exmaple.com/image1.png'
    'https://exmaple.com/image2.png'
    'https://exmaple.com/image3.png'
  ]);

  // register the instance to the global registry
  registerPhotoSwipe(photoSwipe);
});

onUnmounted( ()=> {
  state?.destroy()
})
</script>

<template>
  <button @click="openPhotoSwipe(0)">open photo 1</button>
  <button @click="openPhotoSwipe(1)">open photo 2</button>
  <button @click="openPhotoSwipe(2)">open photo 3</button>
</template>
```

[client-config]: https://vuejs.press/guide/configuration.html#client-config-file

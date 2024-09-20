---
title: Image
icon: image
category:
  - Markdown
tag:
  - Markdown
  - Image
---

Improve image syntax in Markdown to support color scheme and size.

<!-- more -->

## Settings

```js {8,10,12,14} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // Enable figure
        figure: true,
        // Enable image lazyload
        imgLazyload: true,
        // Enable image mark
        imgMark: true,
        // Enable image size
        imgSize: true,
      },
    },
  }),
};
```

## Image Lazyload

This feature enables lazyload with native HTML5, so your browser must support [loading=lazy attribute](https://caniuse.com/loading-lazy-attr).

## Image Mark

This feature allows you to mark images with `#light` and `#dark` suffix to display them in a specific color scheme.

::: md-demo Image mark demo

<ColorModeSwitch /> (Try to toggle theme mode)

![GitHub Light](/assets/image/github-light.svg#dark)
![GitHub Dark](/assets/image/github-dark.svg#light)

:::

### Advanced

You can pass an object to `plugins.markdownImage.mark` to config ID marks, available options are:

```ts
interface ImageMarkOptions {
  /** lightmode only IDs */
  light?: string[];
  /** darkmode only IDs */
  dark?: string[];
}
```

## Image Size

You can use `=widthxheight` to specify the image size with this feature.

```md
![Alt](/example.png =200x300)

![Alt](/example.jpg "Image title" =200x)
![Alt](/example.bmp =x300)
```

The above Markdown will be parsed as:

```html
<img src="/example.png" width="200" height="300" />
<img src="/example.jpg" title="Image title" width="200" />
<img src="/example.bmp" height="300" />
```

## Figure

Sometimes, you may want to add a description with image and place it between contents, in this case you should use this feature to convert images to `<figure>`.

If the image is standalone in a line, wrapped or not wrapped by link, it will be displayed as `<figure>` and title (or alt) will be displayed as `<figcaption>`.

<!-- markdownlint-disable MD034 -->

::: md-demo Figure demo

![VuePress Hope Logo](/favicon.ico)

[![VuePress Hope Logo](/favicon.ico)](https://theme-hope.vuejs.press/)

![VuePress Hope Logo](/favicon.ico "VuePress Hope Logo")

[![VuePress Hope Logo](/favicon.ico "VuePress Hope Logo")](https://theme-hope.vuejs.press/)

![VuePress Hope Logo](https://theme-hope-assets.vuejs.press/logo.svg "VuePress Hope Logo" =300x300)

:::

<!-- markdownlint-enable MD034 -->

<script setup lang="ts">
import ColorModeSwitch from "@theme-hope/modules/outlook/components/ColorModeSwitch";
</script>

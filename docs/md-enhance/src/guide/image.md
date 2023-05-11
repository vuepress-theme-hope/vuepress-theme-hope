---
title: Image
icon: image
---

Improve image syntax in Markdown to support color scheme and size.

<!-- more -->

## Config

::: code-tabs#language

@tab TS

```ts {7-14}
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable figure
      figure: true,
      // Enable image lazyload
      imgLazyload: true,
      // Enable image mark
      imgMark: true,
      // Enable image size
      imgSize: true,
    }),
  ],
};
```

@tab JS

```js {7-14}
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable figure
      figure: true,
      // Enable image lazyload
      imgLazyload: true,
      // Enable image mark
      imgMark: true,
      // Enable image size
      imgSize: true,
    }),
  ],
};
```

:::

## Image Lazyload

If you want to lazyload images in your pages, you can set `imgLazyload: true` in plugin options.

::: note

We are enabling lazyload using native HTML5 features, so your browser must support [loading=lazy attribute](https://caniuse.com/loading-lazy-attr).

:::

## Image Mark

GFM supports marking pictures by ID suffix so that pictures are only displayed in a specific mode. We support both GitHub's markup and the easy markup `#light` and `#dark`.

You can enable it using `imgMark` option.

```md
![GitHub Light](/assets/icon/github-light.png#gh-dark-mode-only)
![GitHub Dark](/assets/icon/github-dark.png#gh-light-mode-only)

![GitHub Light](/assets/icon/github-light.png#dark)
![GitHub Dark](/assets/icon/github-dark.png#light)
```

::: details Case

The above demo will render the following result

<AppearanceSwitch /> (Try to toggle theme mode)

![GitHub Light](/assets/icon/github-light.png#gh-dark-mode-only)
![GitHub Dark](/assets/icon/github-dark.png#gh-light-mode-only)

![GitHub Light](/assets/icon/github-light.png#dark)
![GitHub Dark](/assets/icon/github-dark.png#light)

:::

### Advanced

You can pass an object to `imgMark` to config ID marks, available options are:

```ts
interface ImageMarkOptions {
  /** lightmode only IDs */
  light?: string[];
  /** darkmode only IDs */
  dark?: string[];
}
```

## Image Size

You can use `=widthxheight` to specify the image size when setting `imgSize: true` in plugin options.

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

Sometimes, you may want to add a description with image and place it between contents, in this case you should set `figure: true` in plugin options.

If the image is standalone in a line, wrapped or not wrapped by link, it will be displayed as `<figure>` and title (or alt) will be displayed as `<figcaption>`.

```md
![VuePress Hope Logo](/favicon.ico)

[![VuePress Hope Logo](/favicon.ico)](https://theme-hope.vuejs.press/)

![VuePress Hope Logo](/favicon.ico "VuePress Hope Logo")

[![VuePress Hope Logo](/favicon.ico "VuePress Hope Logo")](https://theme-hope.vuejs.press/)

![VuePress Hope Logo](/logo.svg "VuePress Hope Logo" =300x300)
```

Will be rendered as:

![VuePress Hope Logo](/favicon.ico)

[![VuePress Hope Logo](/favicon.ico)](https://theme-hope.vuejs.press/)

![VuePress Hope Logo](/favicon.ico "VuePress Hope Logo")

[![VuePress Hope Logo](/favicon.ico "VuePress Hope Logo")](https://theme-hope.vuejs.press/)

![VuePress Hope Logo](/logo.svg "VuePress Hope Logo" =300x300)

<script setup lang="ts">
import AppearanceSwitch from "@theme-hope/modules/outlook/components/AppearanceSwitch";
</script>

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

```ts twoslash {6,8,10,12} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    // Enable figure
    figure: true,
    // Enable image lazyload
    imgLazyload: true,
    // Enable image mark
    imgMark: true,
    // Enable image size
    imgSize: true,
  },
});
```

## Image Lazyload

This feature enables lazyload with native HTML5, so your browser must support [loading=lazy attribute](https://caniuse.com/loading-lazy-attr).

## Image Mark

This feature allows you to mark images with `#light` and `#dark` suffix to display them in a specific color scheme.

<ColorModeSwitch /> 👈 Try to toggle theme mode

::: md-demo Image mark demo

![GitHub Light](/assets/image/github-light.svg#dark)
![GitHub Dark](/assets/image/github-dark.svg#light)

:::

### Advanced

You can pass an object to `markdown.imgMark` to config ID marks:

```ts twoslash {7,9} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    imgMark: {
      /** light mode only IDs */
      light: ["light"],
      /** dark mode only IDs */
      dark: ["dark"],
    },
  },
});
```

## Image Size

You can use `|widthxheight` to specify the image size at the end of image alt.

Both `width` and `height` should be number which means size in pixels, and both of them are optional (set `0` to indicate ignore).

If you want the same behavior as Obsidian, you can set `markdown.imgSize: 'strict'` in theme options, so `width` and `height` are both required to be set (one of them can be `0` to scale with radio according to the other).

```md
![Logo|200x200](/example.png)

![Logo|200x0](/example.jpg)
![Logo|0x300](/example.bmp)

<!-- These won't work with `size: 'strict'` as obsidian does not support them -->

![Logo|200](/example.jpg)
![Logo|200x](/example.jpg)
![Logo|x300](/example.bmp)
```

will be parsed as:

```html
<img src="/example.png" width="200" height="300" />

<img src="/example.jpg" width="200" />
<img src="/example.bmp" height="300" />

<img src="/example.jpg" width="200" />
<img src="/example.jpg" width="200" />
<img src="/example.bmp" height="300" />
```

### Image Size (legacy)

::: tip

You shall prefer the new grammar, as it's not breaking backward compatibility.

The legacy grammar will break image rendering in environment that doesn't support it, such as GitHub.

:::

You can use `=widthxheight` to specify the image size at the end of the link when setting `markdown.legacyImgSize: true` in theme options.

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

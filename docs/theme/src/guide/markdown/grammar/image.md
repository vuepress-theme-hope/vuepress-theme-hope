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

You can append `=widthxheight` to image alt text with spaces as separator.

Both `width` and `height` should be numbers as pixels and are optional.

```md
![Alt =200x300](/example.png)
![Alt =200x](/example.jpg "Title")
![Alt =x300](/example.bmp)
```

Renders as ↓

```html
<img src="/example.png" alt="Alt" width="200" height="300" />
<img src="/example.jpg" alt="Alt" title="Title" width="200" />
<img src="/example.bmp" alt="Alt" height="300" />
```

### Obsidian Syntax

When you set `markdown.obsidianImgSize: true` in theme options, you can append `widthxheight` after image alt text and use `|` to separate.

Both `width` and `height` should be numbers as pixels and are required. Setting one of them with `0` to scale by ratio with the other.

```md
![Alt|200x200](/example.png)
![Alt|200x0](/example.jpg)
![Alt|0x300](/example.bmp)
```

Renders as ↓

```html
<img src="/example.png" alt="Alt" width="200" height="300" />
<img src="/example.jpg" alt="Alt" width="200" />
<img src="/example.bmp" alt="Alt" height="300" />
```

### Legacy Syntax (Deprecated)

::: warning This may cause rendering issues on platforms like GitHub.
:::

When you set `markdown.legacyImgSize: true` in theme options, you can append `=widthxheight` at the end of image link section with spaces as separator.

Both `width` and `height` should be numbers as pixels and are optional.

```md
![Alt](/example.png =200x300)
![Alt](/example.jpg "Title" =200x)
![Alt](/example.bmp =x300)
```

Renders as ↓

```html
<img src="/example.png" width="200" height="300" />
<img src="/example.jpg" title="TTitle" width="200" />
<img src="/example.bmp" height="300" />
```

::: tip Choosing between 3 Grammars

- The legacy grammar breaks image rendering in environments that don't support it (e.g.: GitHub)
- Both the new grammar and the Obsidian grammar are compatible with the Markdown standard, but new grammar is more natural.

:::

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
import { ColorModeSwitch } from "vuepress-theme-hope/client";
</script>

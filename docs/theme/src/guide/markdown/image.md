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

::: code-tabs#language

@tab TS

```ts {9-16}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
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
});
```

@tab JS

```js {9-16}
// .vuepress/config.js
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

:::

<!-- @include: @md-enhance/guide/grammar/image.md#after -->

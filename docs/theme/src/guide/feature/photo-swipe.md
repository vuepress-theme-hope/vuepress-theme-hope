---
title: Image Preview
icon: image
category:
  - Feature
tag:
  - Feature
  - Image Preview
---

By using [@vuepress/plugin-photo-swipe][photo-swipe], clicking images in pages will enter preview mode.

<!-- more -->

## Disable Feature

If you don't need this feature, you can set `plugins.photoSwipe: false` in theme options to disable it:

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    photoSwipe: false,
  },
});
```

If you want to disable it in specific pages, you can set `photoSwipe: false` in the page's frontmatter.

```md
---
photoSwipe: false
---
```

If you want to exclude specific images, you can add the `no-view` attribute to the image:

```md
<img src="https://vuejs.org/images/logo.png" no-view />
```

## Browse Mode

In preview mode, you can:

- Swipe left and right to preview other pictures on the page in order
- View the description of the picture
- Zoom in and zoom out the picture
- View pictures in full screen
- Download pictures
- Share pictures

::: tip

- Besides clicking "×" in the upper right corner to exit the preview mode, scrolling up and down more than a certain distance will also exit preview mode
- On mobile devices, or using the PC trackpad, you can use pan and zoom gestures to pan and zoom in the preview mode

:::

## Customize Config

`vuepress-theme-hope` passes `plugins.photoSwipe` in theme options as plugin options to `@vuepress/plugin-photo-swipe`.

You can check the [photo-swipe plugin documentation][photo-swipe] for advanced configuration.

## Demo

<!-- markdownlint-disable -->

<div class="image-preview">
  <img src="//theme-hope-assets.vuejs.press/files/img/1.jpg" />
  <img src="//theme-hope-assets.vuejs.press/files/img/2.jpg" />
  <img src="//theme-hope-assets.vuejs.press/files/img/3.jpg" />
</div>

<style>
  .image-preview {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
  }

  .image-preview > img {
     box-sizing: border-box;
     width: 33.3% !important;
     padding: 9px;
     border-radius: 16px;
  }

  @media (max-width: 719px){
    .image-preview > img {
      width: 50% !important;
    }
  }

  @media (max-width: 419px){
    .image-preview > img {
      width: 100% !important;
    }
  }
</style>

<!-- markdownlint-restore -->

[photo-swipe]: https://ecosystem.vuejs.press/zh/plugins/features/photo-swipe.html

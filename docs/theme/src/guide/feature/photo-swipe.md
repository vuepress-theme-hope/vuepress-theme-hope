---
title: Image Preview
icon: preview
category:
  - Feature
tag:
  - Feature
  - Image Preview
---

By including [vuepress-plugin-photo-swipe][photo-swipe], vuepress-theme-hope will make the pictures in the body of the page enter the preview mode when clicked.

If you don’t need this feature, you can set `plugins.photoSwipe: false` in theme options to disable it.

::: info

`vuepress-theme-hope` passes `plugins.photoSwipe` in theme options as plugin options to `vuepress-plugin-photo-swipe`.

:::

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

- Besides clicking "×" in the upper right corner to exit the preview mode, scrolling up and down more than a certain distance will also exit preview mode
- On mobile devices, or using the PC trackpad, you can use pan and zoom gestures to pan and zoom in the preview mode

:::

## Customize Config

You can check the [plugin documentation][photo-swipe] for advanced configuration.

## Demo

<!-- markdownlint-disable -->

<div class="image-preview">
  <img src="/assets/image/1.jpg" />
  <img src="/assets/image/2.jpg" />
  <img src="/assets/image/3.jpg" />
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

[photo-swipe]: https://vuepress-theme-hope.github.io/v2/photo-swipe/

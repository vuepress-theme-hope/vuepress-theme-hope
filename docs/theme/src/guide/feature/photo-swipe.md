---
title: Image Preview
icon: image
category:
  - Feature
tag:
  - Feature
  - Image Preview
---

By including <ProjectLink name="photo-swipe">vuepress-plugin-photo-swipe</ProjectLink>, vuepress-theme-hope will make the pictures in the body of the page enter the preview mode when clicked.

If you don't need this feature, you can set `plugins.photoSwipe: false` in theme options to disable it.

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

You can check the <ProjectLink name="photo-swipe">plugin documentation</ProjectLink> for advanced configuration.

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

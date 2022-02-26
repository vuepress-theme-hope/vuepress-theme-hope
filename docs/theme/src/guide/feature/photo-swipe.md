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

If you don’t need this feature, you can set `photoSwipe` in `themeConfig.plugins` to `false` to disable it.

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
- On cellphones, or using the PC trackpad, you can use pan and zoom gestures to pan and zoom in the preview mode

:::

## Customize config

`themeConfig.plugin.photoSwipe` is passed as plugin options to [`vuepress-plugin-photo-swipe][photo-swipe]. You can check the [plugin documentation][photo-swipe] for advanced configuration.

## Demo

![Logo1](/logo.png)
![Logo2](/logo.png)
![Logo3](/logo.png)

[photo-swipe]: https://vuepress-theme-hope.github.io/v2/photo-swipe/

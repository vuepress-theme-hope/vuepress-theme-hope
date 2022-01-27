---
title: Plugin options
icon: config
---

## selector

- Type: `string`
- Default: `'.theme-default-content :not(a) > img'`

Image selector

## options

Options passed to [**photo-swipe**](http://photoswipe.com/)

## delay

- Type: `number`
- Default: `500`

The delay of operating dom, in ms.

::: tip

If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`.

:::

## locales

```ts
interface PhowoSwipeLocaleData {
  /**
   * Close button label text
   */
  close: string;

  /**
   * Full screen button label text
   */
  fullscreen: string;

  /**
   * Share button label text
   */
  share: string;

  /**
   * Zoom button label text
   */
  zoom: string;

  /**
   * Previous image button label text
   */
  prev: string;

  /**
   * Next image button label text
   */
  next: string;

  /**
   * Share button config
   */
  buttons: PhotoSwipeDefaultUI.ShareButtonData[];
}
```

Locales config.

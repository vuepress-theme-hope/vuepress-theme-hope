---
title: Plugin Options
icon: config
---

## selector

- Type: `string`
- Default: `".theme-default-content :not(a) > img"`

Image selector

## plugins

- Type: `string[]`
- Default: `["pager", "share", "zoom"]`

Light Gallery Plugins to enable

::: note

Optional values:

- `"autoplay"`
- `"fullscreen"`
- `"pager"`
- `"thumbnail"`
- `"rotate"`
- `"share"`
- `"zoom"`

:::

## delay

- Type: `number`
- Default: `500`

The delay of lightgallery fetching page images, in ms.

If the theme you are using has a switching animation, we recommend you setting this option to `Switch animation duration + 200`.

## options

- Type: `LightGallerySettings`

Additional options which will pass to [`lightgallery`](https://www.lightgalleryjs.com/docs/settings/).

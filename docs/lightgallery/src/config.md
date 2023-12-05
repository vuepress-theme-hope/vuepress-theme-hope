---
title: Config
icon: gears
---

## Plugin Options

### selector

- Type: `string`
- Default: `".theme-default-content :not(a) > img:not([no-view])"`

Image selector

### plugins

- Type: `string[]`
- Default: `["pager", "share", "zoom"]`

Light Gallery Plugins to enable

::: info Available plugins

- `"autoplay"`
- `"fullscreen"`
- `"pager"`
- `"thumbnail"`
- `"rotate"`
- `"share"`
- `"zoom"`

:::

### delay

- Type: `number`
- Default: `800`

The delay of lightgallery fetching page images, in ms.

If the theme you are using has a switching animation, we recommend you setting this option to `Switch animation duration + 200`.

## Client Config

### defineLightGalleryConfig

Additional options which will pass to [`lightgallery`](https://www.lightgalleryjs.com/docs/settings/).

```ts
// .vuepress/client.ts
import { defineLightGalleryConfig } from "vuepress-plugin-lightgallery/client";

defineLightGalleryConfig({
  // set lightgallery options here
});

export default {};
```

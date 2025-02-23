---
title: Config
icon: gears
---

## Plugin Options

### selector

- Type: `string`
- Default: `"[vp-content] :not(a) > img:not([no-view])"`

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

## Client Config

### defineLightGalleryConfig

```ts
const defineLightGalleryConfig: (options: LightGallerySettings) => void;
```

Additional options which will pass to [`lightgallery`](https://www.lightgalleryjs.com/docs/settings/).

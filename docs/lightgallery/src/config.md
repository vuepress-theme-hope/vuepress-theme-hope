---
title: Config
icon: gears
---

## Options

:::: fields
@`selector` type=string default=`"[vp-content] :not(a) > img:not([no-view])"`

Image selector.

@`plugins` type=`string[]` default=`["pager", "share", "zoom"]`

Light Gallery plugins to enable.

::: info Available plugins

- `"autoplay"`
- `"fullscreen"`
- `"pager"`
- `"thumbnail"`
- `"rotate"`
- `"share"`
- `"zoom"`

:::

::::

## Client Config

### defineLightGalleryConfig

```ts
const defineLightGalleryConfig: (options: LightGallerySettings) => void;
```

Additional options which will pass to [`lightgallery`](https://www.lightgalleryjs.com/docs/settings/).

---
title: 配置
icon: gears
---

## 选项 {#options}

:::: fields
@`selector` type=string default=`"[vp-content] :not(a) > img:not([no-view])"`

图片选择器。

@`plugins` type=`string[]` default=`["pager", "share", "zoom"]`

想要启用的 Light Gallery 插件。

::: info 可用插件

- `"autoplay"`: 自动播放
- `"fullscreen"`: 全屏
- `"pager"`: 分页
- `"thumbnail"`: 缩略图
- `"rotate"`: 旋转
- `"share"`: 分享
- `"zoom"`: 缩放

:::

::::

## 客户端配置

### defineLightGalleryConfig

```ts
const defineLightGalleryConfig: (options: LightGallerySettings) => void;
```

传递给 [lightgallery](https://www.lightgalleryjs.com/docs/settings/) 的额外选项

---
title: 配置
icon: gears
---

## 插件选项

### selector

- 类型: `string`
- 默认值: `"[vp-content] :not(a) > img:not([no-view])"`

图片选择器

### plugins

- 类型: `string[]`
- 默认值: `["pager", "share", "zoom"]`

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

## 客户端配置

### defineLightGalleryConfig

```ts
const defineLightGalleryConfig: (options: LightGallerySettings) => void;
```

传递给 [lightgallery](https://www.lightgalleryjs.com/docs/settings/) 的额外选项

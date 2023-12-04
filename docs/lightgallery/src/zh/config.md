---
title: 配置
icon: gears
---

## 插件选项

### selector

- 类型: `string`
- 默认值: `".theme-default-content :not(a) > img:not([no-view])"`

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

### delay

- 类型: `number`
- 默认值: `800`

注册复制按钮的延时，单位 ms。

如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`

## 客户端配置

### defineLightGalleryConfig

传递给 [lightgallery](https://www.lightgalleryjs.com/docs/settings/) 的额外选项

```ts
// .vuepress/client.ts
import { defineLightGalleryConfig } from "vuepress-plugin-lightgallery/client";

defineLightGalleryConfig({
  // 在此设置 lightgallery 选项
});

export default {};
```

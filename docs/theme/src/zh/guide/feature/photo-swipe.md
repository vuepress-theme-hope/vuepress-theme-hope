---
title: 图片预览
icon: image
category:
  - 功能
tag:
  - 功能
  - 图片浏览
---

通过内置 [@vuepress/plugin-photo-swipe][photo-swipe], 点击页面正文内的图片会进入浏览模式。

<!-- more -->

## 禁用功能

如果你不需要此功能，请在主题选项中设置 `plugins.photoSwipe: false`:

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    photoSwipe: false,
  },
});
```

如果你想在特定页面中禁用它，你可以在页面的 frontmatter 中设置 `photoSwipe: false`。

```md
---
photoSwipe: false
---
```

如果你想要排除特定图片，你可以为图片添加 `no-view` 属性:

```md
<img src="https://vuejs.org/images/logo.png" no-view />
```

## 浏览模式

在浏览模式中，你可以:

- 左右滑动按顺序浏览页面内其他的图片
- 查看图片的描述
- 对图片进行缩放
- 全屏浏览图片
- 下载图片
- 分享图片

::: tip

- 除了点击右上角的 "×" 退出浏览模式外，在上下滚动超过一定距离后，会自动退出图片浏览模式
- 在移动端，或使用 PC 触控板，你可以使用平移、缩放手势在浏览模式中平移、缩放图片

:::

## 自定义配置

`vuepress-theme-hope` 将主题选项中的 `plugins.photoSwipe` 选项作为插件选项提供给 `@vuepress/plugin-photo-swipe`。

你可以查看 [photo-swipe 插件文档][photo-swipe] 来进行高级配置。

## 演示

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

[photo-swipe]: https://ecosystem.vuejs.press/zh/plugins/features/photo-swipe.html

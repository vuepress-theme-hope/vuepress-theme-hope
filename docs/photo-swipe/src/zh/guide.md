---
title: 指南
icon: lightbulb
---

此插件会使页面正文内的图片在点击时进入浏览模式浏览。

<!-- more -->

## 浏览模式介绍

在浏览模式中，你可以:

- 左右滑动按顺序浏览页面内其他的图片
- 查看图片的描述
- 对图片进行缩放
- 全屏浏览图片
- 下载图片
- 分享图片

::: tip

- 除了点击右上角的 "×" 退出浏览模式外，在上下滚动超过一定距离后，会自动退出图片浏览模式。
- 在移动端，或使用 PC 触控板，你可以使用平移、缩放手势在浏览模式中平移、缩放图片。

:::

## 图片选择

插件默认会按照默认主题的选择器选中图片，如果你在使用第三方主题，你可以将一个或多个 CSS 选择器设置给 `selector` 选项。

## 自定义 PhotoSwipe 选项

你可以通过在客户端配置文件中导入和调用 `definePhotoSwipeOptions` 来将选项传递给 [`photo-swipe`](http://photoswipe.com/)：

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { definePhotoSwipeOptions } from "vuepress-plugin-photo-swipe/client";

definePhotoSwipeOptions({
  // 在此设置 photoswipe 选项
});

export default defineClientConfig({
  // ...
});
```

## 操作延迟

如果你的主题在页面切换时会添加动画，你可能需要延迟 photo-swipe 重新查找页面图片的时间点。你可以通过 `delay` 选项来配置这一延迟，默认的值为 `800` (单位为毫秒)。

## 多语言配置

你可以通过 `locales` 来新增特定语言的多语言配置或修改已支持语言的配置。

```ts
import { defineUserConfig } from "vuepress";
import { photoSwipePlugin } from "vuepress-plugin-photo-swipe";

export default defineUserConfig({
  locales: {
    "/": {
      // 这是一个支持的语言
      lang: "zh-CN",
    },
    "/xx/": {
      // 这是一个没有收到插件支持的语言
      lang: "mm-NN",
    },
  },

  plugins: [
    photoSwipePlugin({
      locales: {
        "/": {
          // 覆盖分享标签文字
          share: "分享给伙伴",
        },

        "/xx/": {
          // 在这里完整设置 `mm-NN` 的多语言配置
        },
      },
    }),
  ],
});
```

对于具体的选项，详见 [配置 → 多语言设置](./config.md#locales).

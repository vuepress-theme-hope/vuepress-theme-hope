---
title: 图片预览
icon: preview
category:
  - feature
tag:
  - feature
  - photo preview
---

通过内置 [vuepress-plugin-photo-swipe][photo-swipe], vuepress-theme-hope 会使页面正文内的图片在点击时进入浏览模式浏览。

如果你不需要此功能，请在 `themeConfig.plugins` 中设置 `photoSwipe` 为 `false`。

<!-- more -->

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

`themeConfig.plugin.photoSwipe` 会作为插件选项传入 [`vuepress-plugin-photo-swipe][photo-swipe]。 你可以查看 [插件文档][photo-swipe] 来来进行高级配置。

## 演示

![Logo1](/logo.png)
![Logo2](/logo.png)
![Logo3](/logo.png)

[photo-swipe]: https://vuepress-theme-hope.github.io/v2/photo-swipe/

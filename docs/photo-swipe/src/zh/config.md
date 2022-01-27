---
title: 插件选项
icon: config
---

## selector

- 类型: `string`
- 默认值: `'.theme-default-content :not(a) > img'`

图片选择器

## options

传递给 [**photo-swipe**](http://photoswipe.com/) 的额外选项

## delay

- 类型: `number`
- 默认值: `500`

操作页面 DOM 的延时，单位 ms。

::: tip

如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`。

:::

## locales

```ts
interface PhowoSwipeLocaleData {
  /**
   * 关闭按钮标签文字
   */
  close: string;

  /**
   * 全屏按钮标签文字
   */
  fullscreen: string;

  /**
   * 分享按钮标签文字
   */
  share: string;

  /**
   * 缩放按钮标签文字
   */
  zoom: string;

  /**
   * 上一张图片按钮标签文字
   */
  prev: string;

  /**
   * 下一张图片按钮标签文字
   */
  next: string;

  /**
   * 功能按钮配置
   */
  buttons: PhotoSwipeDefaultUI.ShareButtonData[];
}
```

国际化配置。

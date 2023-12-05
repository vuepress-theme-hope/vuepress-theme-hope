---
title: 配置
icon: gears
---

## 插件选项

### selector

- 类型: `string | string[]`
- 默认值: `".theme-default-content :not(a) > img:not([no-view])"`

图片选择器

### scrollToClose

- 类型: `boolean`
- 默认值: `true`

是否在滚动时关闭当前图片。

### delay

- 类型: `number`
- 默认值: `800`

操作页面 DOM 的延时，单位 ms。

::: tip

如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`。

:::

### locales

- 类型: `PhotoSwipeLocaleConfig`

  ```ts
  interface PhotoSwipeLocaleData {
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

  interface PhotoSwipeLocaleConfig {
    [localePath: string]: PhotoSwipeLocaleData;
  }
  ```

- 必填: 否

Photo Swipe 插件的国际化配置。

::: details 内置支持语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英文(美国)** (en-US)
- **德语** (de-DE)
- **德语(澳大利亚)** (de-AT)
- **俄语** (ru-RU)
- **乌克兰语** (uk-UA)
- **越南语** (vi-VN)
- **葡萄牙语(巴西)** (pt-BR)
- **波兰语** (pl-PL)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **斯洛伐克** (sk-SK)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)
- **芬兰语** (fi-FI)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::

## 客户端配置

### definePhotoSwipeConfig

传递给 [`photo-swipe`](http://photoswipe.com/) 的额外选项。

```ts
// .vuepress/client.ts
import { definePhotoSwipeConfig } from "vuepress-plugin-photo-swipe/client";

definePhotoSwipeConfig({
  // 在此设置 photoswipe 选项
});

export default {};
```

---
title: Config
icon: gears
---

## Plugin options

### selector

- Type: `string | string[]`
- Default: `".theme-default-content :not(a) > img:not([no-view])"`

Image selector

### scrollToClose

- Type: `boolean`
- Default: `true`

Whether close the current image when scrolling.

### delay

- Type: `number`
- Default: `800`

The delay of operating dom, in ms.

::: tip

If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`.

:::

### locales

- Type: `PhotoSwipeLocaleConfig`

  ```ts
  interface PhotoSwipeLocaleData {
    /**
     * Close button label text
     */
    close: string;

    /**
     * Full screen button label text
     */
    fullscreen: string;

    /**
     * Share button label text
     */
    share: string;

    /**
     * Zoom button label text
     */
    zoom: string;

    /**
     * Previous image button label text
     */
    prev: string;

    /**
     * Next image button label text
     */
    next: string;

    /**
     * Share button config
     */
    buttons: PhotoSwipeDefaultUI.ShareButtonData[];
  }

  interface PhotoSwipeLocaleConfig {
    [localePath: string]: PhotoSwipeLocaleData;
  }
  ```

- Required: No

Locales config for photo-swipe plugin.

::: details Built-in Supported Languages

- **Simplified Chinese** (zh-CN)
- **Traditional Chinese** (zh-TW)
- **English (United States)** (en-US)
- **German** (de-DE)
- **German (Australia)** (de-AT)
- **Russian** (ru-RU)
- **Ukrainian** (uk-UA)
- **Vietnamese** (vi-VN)
- **Portuguese (Brazil)** (pt-BR)
- **Polish** (pl-PL)
- **French** (fr-FR)
- **Spanish** (es-ES)
- **Slovak** (sk-SK)
- **Japanese** (ja-JP)
- **Turkish** (tr-TR)
- **Korean** (ko-KR)
- **Finnish** (fi-FI)
- **Indonesian** (id-ID)
- **Dutch** (nl-NL)

:::

## Client Config

### definePhotoSwipeConfig

Options passed to [`photo-swipe`](http://photoswipe.com/)

```ts
// .vuepress/client.ts
import { definePhotoSwipeConfig } from "vuepress-plugin-photo-swipe/client";

definePhotoSwipeConfig({
  // set photoswipe options here
});

export default {};
```

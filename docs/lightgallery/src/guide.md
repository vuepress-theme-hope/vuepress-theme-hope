---
title: Guide
icon: lightbulb
---

This plugin will use lightgallery make the pictures in the body of the page enter the preview mode when clicked.

<!-- more -->

::: caution LICENSE RESTRICTIONS

Please note that although this plugin release under MIT license, we are currently making this possible with a built-in [organization license of lightgallery](https://www.lightgalleryjs.com/license/) of VuePress Theme Hope, and we would like to admit you are a member of our organization if you are using it for non-commercial usage.

The organization license has no limit for you under non-commercial usage as it supports unlimited developers and unlimited products. You are safe to publish your docs or project with this plugin under ANY License.

But PLEASE DO AWARE that organizational license can only be used on one product. To use this plugin for commercial usage, since lightgallery is under [GNU GPL license v3](https://www.gnu.org/licenses/gpl-3.0.html), you must put your source code under the [GNU GPL license v3](https://www.gnu.org/licenses/gpl-3.0.html) license, or consider [purchasing a license](https://www.lightgalleryjs.com/license/) to avoid troubles.

YOU ARE WARNED!

If you are worried about this, please consider using <ProjectLink name="photo-swipe">vuepress-plugin-photo-swipe</ProjectLink> instead.

:::

## Customize Options

You can pass options to [`lightgallery`](https://www.lightgalleryjs.com/) by importing and calling `defineLightGalleryConfig` in client config file:

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineLightGalleryConfig } from "vuepress-plugin-lightgallery/client";

defineLightGalleryConfig({
  // lightgallery options here
});

export default defineClientConfig({
  // ...
});
```

## Operation Delay

If your theme adds animations when switching pages, you may need to delay when lightgallery re-finds page images. You can configure this delay via the `delay` option, the default value is `800` (in milliseconds).

## Demo

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

---
title: 指南
icon: lightbulb
---

此插件会使用 Lightgallery 让正文内的图片在点击时进入浏览模式浏览。

::: caution 许可证限制

请注意，虽然这个插件是在 MIT 协议下发布的，但我们目前正在通过 VuePress Theme Hope 的内置 [lightgallery 组织许可](https://www.lightgalleryjs.com/license/) 来实现这一点，并且 如果你将其用于非商业用途，我们愿意承认你是我们组织的成员。

组织许可证在非商业用途下对你没有限制，因为它支持无限的开发人员和无限的产品。你可以在任何许可下使用此插件安全地发布你的文档或项目。

但是请注意组织许可证只能用于单个商业产品。如果你想要以商业用途使用本插件，由于 lightgallery 是在 [GNU GPL license v3](https://www.gnu.org/licenses/gpl-3.0.html) 下，所以你必须在没有许可证下将你的源代码置于 [GNU GPL license v3](https://www.gnu.org/licenses/gpl-3.0.html) 协议下，或者考虑 [购买许可证](https://www.lightgalleryjs.com/license/) 以规避可能产生的问题。

你被警告了！

如果你对此表示担忧，你可以考虑使用 [@vuepress/plugin-photo-swipe][photo-swipe]。

:::

## 自定义 LightGallery 选项

你可以通过在[客户端配置文件][client-config]中导入和调用 `defineLightGalleryConfig` 来将选项传递给 [`lightgallery`](https://www.lightgalleryjs.com/)：

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import { defineLightGalleryConfig } from "vuepress-plugin-lightgallery/client";

defineLightGalleryConfig({
  // 在此设置 lightgallery 选项
});

export default defineClientConfig({
  // ...
});
```

## 操作延迟

如果你的主题在页面切换时会添加动画，你可能需要延迟 lightgallery 重新查找页面图片的时间点。你可以通过 `delay` 选项来配置这一延迟，默认的值为 `800` (单位为毫秒)。

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

[client-config]: https://vuejs.press/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6
[photo-swipe]: https://ecosystem.vuejs.press/zh/plugins/photo-swipe.html

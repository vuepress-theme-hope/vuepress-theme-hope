---
title: 指南
icon: creative
---

## 内容缓存和更新

Service worker 成功获取内容更新后，将在右下角显示一个弹出窗口，提示用户新内容可用并允许用户触发更新。

弹出窗口的默认语言将自动设置为 `themeConfig.baseLang` 。

## PWA

### Manifest

插件将自动在输出目录生成 `manifest.webmanifest`。如果您在 `.vuepress/public` 中有一个 manifest.webmanifest 或 manifest.json，该插件将读取并合并到最终 manifest 中。

为了使您的站点能够被注册为 Web App，您应该在 `themeConfig.pwa.manifest.icons` 中设置图标。

您也可以在 `themeConfig.pwa.manifest` 中设置其他选项。

::: info 更多
更多内容，请详见 [W3C Manifest](https://w3c.github.io/manifest/)
:::

### Head 标签注入

你需要使用内置的 head 函数来自动为你站点的头部注入 head 标签，以能够在所有的设备上成功注册并良好显示。 `head` 函数的第一个参数是插件选项，第二个参数是可选的原 head 数组。

```js
const { head } = require("@mr-hope/vuepress-plugin-pwa");

const pwaOptions = {
  // 你的选项
};

// .vuepress/config.js
module.exports = {
  head: head(pwaOptions, [
    /*
     * 你原始的 head 数组
     * 如果你原来没有配置，可以忽略此参数
     */
  ]),
};
```

## 缓存大小

为了更好地控制 Service Worker 可以预缓存的内容，可以设置 `themeConfig.pwa.cachePic` 和 `themeConfig.pwa.cacheHTML` 来决定 Service Worker 是否缓存除主页和 404 错误页外的 HTML 文件与站点图片。

为了防止在预缓存列表中包含大文件，任何大于 2MB 的文件或大于 1MB 的图片都将被删除。您可以通过设置 `themeConfig.pwa.maxSize` 和 `themeConfig.pwa.maxPicSize` 来更改大小限制。

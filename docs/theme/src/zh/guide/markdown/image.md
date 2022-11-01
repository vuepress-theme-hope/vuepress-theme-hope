---
title: 图片
icon: pic
category:
  - Markdown
tag:
  - Markdown
  - 图片
---

改进 Markdown 中的图像语法以支持颜色方案和大小。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {9-16}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用图片懒加载
        imageLazyload: true,
        // 启用图片标记
        imageMark: true,
        // 启用图片大小
        imageSize: true,
        // 启用图片标题
        imageTitle: true,
      },
    },
  }),
});
```

@tab JS

```js {9-16}
/// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 启用图片懒加载
        imageLazyload: true,
        // 启用图片标记
        imageMark: true,
        // 启用图片大小
        imageSize: true,
        // 启用图片标题
        imageTitle: true,
      },
    },
  }),
};
```

:::

## 图片懒加载

如果你想在你的页面中延迟加载图片，你可以在插件选项中设置 `imageLazyload: true`。

::: note

我们正在使用原生 HTML5 功能启用延迟加载，因此您的浏览器必须支持 [loading=lazy 属性](https://caniuse.com/loading-lazy-attr)。

:::

## 图片 ID 标记

GFM 支持通过 ID 标记图片，使得图片只在特定的模式显示。我们同时支持 GitHub 的标记与简易标记 `#light` 和 `#dark`。

你可以通过主题选项中的 `plugins.mdEnhance.imageMark` 选项控制它。

```md
![GitHub Light](/assets/icon/github-light.png#gh-dark-mode-only)
![GitHub Dark](/assets/icon/github-dark.png#gh-light-mode-only)

![GitHub Light](/assets/icon/github-light.png#dark)
![GitHub Dark](/assets/icon/github-dark.png#light)
```

::: details 案例

上述演示会渲染如下结果

<AppearanceSwitch /> (尝试切换主题)

![GitHub Light](/assets/icon/github-light.png#gh-dark-mode-only)
![GitHub Dark](/assets/icon/github-dark.png#gh-light-mode-only)

![GitHub Light](/assets/icon/github-light.png#dark)
![GitHub Dark](/assets/icon/github-dark.png#light)

:::

### 高级用法

你可以将对象传递给 `imageMark` 以配置 ID 标记，可用选项有:

```ts
interface ImageMarkOptions {
  /** 仅限日间模式的 ID */
  light?: string[];
  /** 仅限夜间模式的 ID */
  dark?: string[];
}
```

## 图片尺寸

当你在主题选项中设置 `plugin.mdEnhance.imageSize: true` 时，可以使用 `=widthxheight` 指定图像大小。

```md
![Alt](/example.png =200x300)

![Alt](/example.jpg "图片标题" =200x)
![Alt](/example.bmp =x300)
```

上面的 Markdown 将被解析为:

```html
<img src="/example.png" width="200" height="300" />
<img src="/example.jpg" title="图片标题" width="200" />
<img src="/example.bmp" height="300" />
```

## 图片标题

有时，您可能希望为图像添加描述，在这种情况下，您应该在插件选项中设置 `imageTitle: true`。

这样当您为图像添加标题时，图像将显示为 `<figure>` ，标题将显示为 `<figcaption>`。

```md
![GitHub 徽标](/assets/icon/github-light.png "Github 徽标")
```

将呈现为：

![GitHub 徽标](/assets/icon/github-light.png "Github 徽标")

<script setup lang="ts">
import AppearanceSwitch from "@theme-hope/modules/outlook/components/AppearanceSwitch.js"
</script>

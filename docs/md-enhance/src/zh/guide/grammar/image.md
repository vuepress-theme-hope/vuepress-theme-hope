---
title: 图片
icon: image
---

改进 Markdown 中的图像语法以支持颜色方案和大小。

<!-- more -->

## 配置

```js {7,9,11,13} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用 figure
      figure: true,
      // 启用图片懒加载
      imgLazyload: true,
      // 启用图片标记
      imgMark: true,
      // 启用图片大小
      imgSize: true,
    }),
  ],
};
```

<!-- #region after -->

## 图片懒加载

::: note

我们正在使用原生 HTML5 功能启用延迟加载，因此你的浏览器必须支持 [loading=lazy 属性](https://caniuse.com/loading-lazy-attr)。

:::

## 图片 ID 标记

GFM 支持通过 ID 标记图片，使得图片只在特定的模式显示。我们同时支持 GitHub 的标记与简易标记 `#light` 和 `#dark`。

你可以通过 `imgMark` 选项控制它。

::: md-demo ID 标记 案例

<AppearanceSwitch /> (尝试切换主题)

```md
![GitHub Light](/assets/image/github-light.svg#gh-dark-mode-only)
![GitHub Dark](/assets/image/github-dark.svg#gh-light-mode-only)

![GitHub Light](/assets/image/github-light.svg#dark)
![GitHub Dark](/assets/image/github-dark.svg#light)
```

:::

### 高级用法

你可以将对象传递给 `imgMark` 以配置 ID 标记，可用选项有:

```ts
interface ImageMarkOptions {
  /** 仅限日间模式的 ID */
  light?: string[];
  /** 仅限夜间模式的 ID */
  dark?: string[];
}
```

## 图片尺寸

当你在插件选项中设置 `imgSize: true` 时，可以使用 `=widthxheight` 指定图像大小。

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

## 图片 Figure

有时，你可能希望为图像添加描述，并将其单独展示在上下文中，在这种情况下，你应该在插件选项中设置 `figure: true`。

这样当你单独将图片至于一行 (也可同时嵌套链接)，图像将显示为 `<figure>` ，标题或图片替代文字将显示为 `<figcaption>`。

<!-- markdownlint-disable MD034 -->

::: md-demo Figure 案例

![VuePress Hope 图标](/favicon.ico)

[![VuePress Hope 图标](/favicon.ico)](https://theme-hope.vuejs.press/)

![VuePress Hope 图标](/favicon.ico "VuePress Hope 图标")

[![VuePress Hope 图标](/favicon.ico "VuePress Hope 图标")](https://theme-hope.vuejs.press/)

![VuePress Hope 图标](https://theme-hope-assets.vuejs.press/logo.svg "VuePress Hope 图标" =300x300)

:::

<!-- markdownlint-enable MD034 -->

<script setup lang="ts">
import AppearanceSwitch from "@theme-hope/modules/outlook/components/AppearanceSwitch";
</script>

<!-- #endregion after -->

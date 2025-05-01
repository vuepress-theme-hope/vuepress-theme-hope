---
title: 图片
icon: image
category:
  - Markdown
tag:
  - Markdown
  - 图片
---

改进 Markdown 中的图像语法以支持颜色方案和大小。

<!-- more -->

## 配置

```ts twoslash {6,8,10,12} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    // 启用 figure
    figure: true,
    // 启用图片懒加载
    imgLazyload: true,
    // 启用图片标记
    imgMark: true,
    // 启用图片大小
    imgSize: true,
  },
});
```

## 图片懒加载

此功能通过原生 HTML5 启用图片的延迟加载，因此仅在 [支持 loading=lazy 属性](https://caniuse.com/loading-lazy-attr) 的浏览器生效。

## 图片 ID 标记

此功能允许你通过 `#light` 和 `#dark` 标记图片，使得图片只在特定的模式显示。

::: md-demo 图片 ID 标记示例

<ColorModeSwitch /> 👈 尝试切换主题

![GitHub Light](/assets/image/github-light.svg#dark)
![GitHub Dark](/assets/image/github-dark.svg#light)

:::

### 高级用法

你可以将对象传递给 `markdown.imgMark` 以配置 ID 标记：

```ts twoslash {7,9} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    imgMark: {
      /** 仅限日间模式的 ID */
      light: ["light"],
      /** 仅限夜间模式的 ID */
      dark: ["dark"],
    },
  },
});
```

## 图片尺寸

你可以在图片链接末尾使用 `|widthxheight` 来指定图片尺寸。

`width` 和 `height` 都应该为数字并意味着像素单位的尺寸，并且它们两者都是可选的（设置 `0` 来表示忽略）。

如果你想要与 Obsidian 相同的行为，你可以在主题选项中设置 `imgSize: 'strict'`，这样 `width` 和 `height` 都必须被设置（其中一个可以是 `0` 来根据另一个按比例缩放）。

```md
![Logo|200x200](/example.png)

![Logo|200x0](/example.jpg)
![Logo|0x300](/example.bmp)

<!-- These won't work when `strict: true` as obsidian does not support them -->

![Logo|200](/example.jpg)
![Logo|200x](/example.jpg)
![Logo|x300](/example.bmp)
```

会被解析为:

```html
<img src="/example.png" width="200" height="300" />

<img src="/example.jpg" width="200" />
<img src="/example.bmp" height="300" />

<img src="/example.jpg" width="200" />
<img src="/example.jpg" width="200" />
<img src="/example.bmp" height="300" />
```

### 图片尺寸 (旧版)

::: tip

你应该选择新语法，因为它不会破坏向后兼容性。

旧语法会在不支持的环境中破坏图片渲染，例如 GitHub。

:::

当你在主题选项中设置 `markdown.legacyImgSize: true` 时，可以在链接末尾使用 `=widthxheight` 指定图像大小。

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

## 图片展示

有时，你可能希望为图像添加描述，并将其单独展示在上下文中，在这种情况下，你应该启用此功能将图片渲染为 `<figure>`。

这样当你单独将图片至于一行 (也可同时嵌套链接)，图像将显示为 `<figure>` ，标题或图片替代文字将显示为 `<figcaption>`。

<!-- markdownlint-disable MD034 -->

::: md-demo 图片示例 demo

![VuePress Hope 图标](/favicon.ico)

[![VuePress Hope 图标](/favicon.ico)](https://theme-hope.vuejs.press/)

![VuePress Hope 图标](/favicon.ico "VuePress Hope 图标")

[![VuePress 图标](/favicon.ico "VuePress Hope 图标")](https://theme-hope.vuejs.press/)

![VuePress Hope 图标](https://theme-hope-assets.vuejs.press/logo.svg "VuePress Hope 图标" =300x300)

:::

<!-- markdownlint-enable MD034 -->

<script setup lang="ts">
import ColorModeSwitch from "@theme-hope/modules/outlook/components/ColorModeSwitch";
</script>

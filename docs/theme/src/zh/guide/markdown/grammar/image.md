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

## 配置 {#settings}

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

## 图片懒加载 {#image-lazyload}

此功能通过原生 HTML5 启用图片的延迟加载，因此仅在 [支持 loading=lazy 属性](https://caniuse.com/loading-lazy-attr) 的浏览器生效。

## 图片 ID 标记 {#image-mark}

此功能允许你通过 `#light` 和 `#dark` 标记图片，使得图片只在特定的模式显示。

::: preview 图片 ID 标记示例

<ColorModeSwitch /> 👈 尝试切换主题

![GitHub Light](/assets/image/github-light.svg#dark)
![GitHub Dark](/assets/image/github-dark.svg#light)

:::

### 高级用法 {#advanced}

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

## 图片尺寸 {#image-size}

当你在插件选项中设置 `imgSize: true` 时，你可以在图片替代文字后面添加 `=widthxheight`，并用空格分隔。

`width` 和 `height` 都应该是数字，单位为像素，并且都是可选的。

```md
![替代文字 =200x300](/example.png)
![替代文字 =200x](/example.jpg "标题")
![替代文字 =x300](/example.bmp)
```

渲染为 ↓

```html
<img src="/example.png" alt="替代文字" width="200" height="300" />
<img src="/example.jpg" alt="替代文字" title="标题" width="200" />
<img src="/example.bmp" alt="替代文字" height="300" />
```

### Obsidian 语法 {#obsidian-syntax}

当你在主题选项中设置 `markdown.obsidianImgSize: true` 时，你可以在图片替代文字后面添加 `widthxheight`，并用 `|` 分隔。

`width` 和 `height` 都应该是数字，单位为像素，并且都是必需的。设置其中一个为 `0` 以按比例缩放另一个。

```md
![替代文字|200x200](/example.png)
![替代文字|200x0](/example.jpg)
![替代文字|0x300](/example.bmp)
```

渲染为 ↓

```html
<img src="/example.png" alt="替代文字" width="200" height="300" />
<img src="/example.jpg" alt="替代文字" width="200" />
<img src="/example.bmp" alt="替代文字" height="300" />
```

::: tip 在三种语法之间选择

- 旧语法在不支持的环境中会导致图片渲染问题（例如：GitHub）
- 新语法和 Obsidian 语法都与 Markdown 标准兼容，但新语法更自然。

:::

### 旧语法 (已废弃) {#legacy-syntax-deprecated}

::: warning 这种语法可能会在 GitHub 等平台上导致渲染问题。

:::

当你在主题选项中设置 `markdown.legacyImgSize: true` 时，你可以在图片链接部分的末尾添加 `=widthxheight`，并用空格分隔。

`width` 和 `height` 都应该是数字，单位为像素，并且都是可选的。

```md
![替代文字](/example.png =200x300)
![替代文字](/example.jpg "标题" =200x)
![替代文字](/example.bmp =x300)
```

渲染为 ↓

```html
<img src="/example.png" alt="替代文字" width="200" height="300" />
<img src="/example.jpg" alt="替代文字" title="标题" width="200" />
<img src="/example.bmp" alt="替代文字" height="300" />
```

## 图片展示 {#figure}

有时，你可能希望为图像添加描述，并将其单独展示在上下文中，在这种情况下，你应该启用此功能将图片渲染为 `<figure>`。

这样当你单独将图片至于一行 (也可同时嵌套链接)，图像将显示为 `<figure>` ，标题或图片替代文字将显示为 `<figcaption>`。

<!-- markdownlint-disable MD034 -->

::: preview 图片示例 demo

![VuePress Hope 图标](/favicon.ico)

[![VuePress Hope 图标](/favicon.ico)](https://theme-hope.vuejs.press/)

![VuePress Hope 图标](/favicon.ico "VuePress Hope 图标")

[![VuePress 图标](/favicon.ico "VuePress Hope 图标")](https://theme-hope.vuejs.press/)

![VuePress Hope 图标](https://theme-hope-assets.vuejs.press/logo.svg "VuePress Hope 图标" =300x300)

:::

<!-- markdownlint-enable MD034 -->

<script setup lang="ts">
import { ColorModeSwitch } from "vuepress-theme-hope/client";
</script>

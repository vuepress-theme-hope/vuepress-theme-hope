---
title: 修改字体
icon: font
order: 2
category:
  - 教程知识
  - 自定义
tag:
  - 自定义
---

此页面指导你如何自定义主题字体。

<!-- more -->

## 字体族

对于常见的字体族，一般可以分为 **衬线体**[^serif] 和 **无衬线体**[^sans-serif]。

::: tip 中文字体

对于中文字体来说，常见的无衬线体有黑体、微软雅黑等，而常见的衬线体包括楷体、宋体、仿宋等。

:::

## 修改主题字体

主题在 `.vuepress/styles/palette.scss` 中提供了 `$font-family`、`$font-family-heading` 和 `$font-family-mono` 三个变量控制字体。

- `$font-family`: 普通文本上使用的字体
- `$font-family-heading:` 用于标题元素的字体
- `$font-family-mono`: 代码上使用的字体

默认情况下，主题在普通文本上使用无衬线体。

::: tip 使用衬线体

如果你更喜欢衬线体，你可以自行修改 `$font-family` 为你想要的字体。

中文博客下最常使用的字体是 Adobe 发布的思源宋体[^noto-serif-sc]，因为它具有非常宽松的协议。当然，思源宋体并不存在于大多设备上，所以你可能需要导入这个字体。你可以通过 [GitHub](https://github.com/googlefonts/noto-cjk) 下载该字体引入或直接使用 [Google Font CDN](https://fonts.google.com/noto/specimen/Noto+Serif+SC)。

如下字体族是我们推荐的衬线体首选:

```scss
$font-family: 'Georgia, -apple-system, "Nimbus Roman No9 L", "PingFang SC", "Hiragino Sans GB", "Noto Serif SC", "Microsoft Yahei", "WenQuanYi Micro Hei", "ST Heiti", sans-serif';
```

:::

## 后备字体

由于不同平台、不同操作系统以及不同的安装方式 (slim/full) 会导致字体库中的字体数量以及类别产生较大差异，你应该尽可能地设置多个字体，并确保后备字体[^fallback-font]存在。

::: tip 最佳实践

后备字体[^fallback-font]可以确保你的网站在不同操作系统以及安装了不同字体的设备上显示良好。

:::

## 字体库

你可以在 [Google Fonts](https://fonts.google.com/) 中找到更多字体，并可以在线预览与下载。

请在网页中搜索并选择你想要的字体与粗细，然后点击右侧的 `Select` 按钮，将其添加到你的选择列表中，之后点击右上角的按钮查看你的收藏字体，并获取链接在 VuePress 的配置文件中导入。

我们假定你选择了思源宋体 (Noto Serif SC) 字体的 400，500，700 字体，点击右上角按钮后，Google 会在侧边栏给出下方的代码:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

```css
font-family: "Noto Serif SC", serif;
```

那么你需要做的就是在 VuePress 配置文件中添加如下代码导入并使用它们:

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  // ...

  head: [
    // ...

    // 导入相应链接
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap",
        rel: "stylesheet",
      },
    ],
  ],

  // ...
});
```

同时在调色板文件中修改 `$font-family` 变量:

```scss
// .vuepress/styles/palette.scss

// 应用字体
$font-family: '"Noto Serif SC", serif';
```

这样你就可以在网站中使用思源宋体字体了。

::: details 思源宋体 Demo

<div class="noto-serif">

## 人人生而自由

人人生而自由，在尊严和权利上一律平等。他们赋有理性和良心，并应以弟兄关系的精神相对待。

</div>

:::

[^serif]: 相关简介: <https://www.zhihu.com/topic/19559432/intro>
[^sans-serif]: 相关简介: <https://www.zhihu.com/topic/19559433/intro>
[^fallback-font]: 摘自维基百科

    后备字体 (Fallback font) 是指在当时显示的字型缺乏某些字元时，被用于显示缺失字元的字体。因为其作为显示的最后一道防线，后备字体应该尽可能包含所有 Unicode 字元。

    当缺失字元没有后备字体用于显示时，通常会将缺失字元改为黑色方块、白色空心方块、问号、Unicode 占位字元(U+FFFD)显示，或者干脆略过该字元。在实务上，像是 CSS 等支援字体列表依序显示的系统，通常会将一或多套后备字体置入列表最后，以防止缺字的情况发生。

[^noto-serif-sc]: 基于「开源字体授权发布」，并且在文档中说明可以基于其源代码进行二次修改后使用 (商用或者个人使用)，所以没有任何版权问题。

<script setup lang="ts">
import { useScriptTag } from "@vueuse/core";

useScriptTag("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;900&display=swap");
</script>

<style lang="scss" scoped>
.noto-serif {
  font-family: 'Noto Serif SC', serif;
  font-weight: 600;
  font-size: 1.5rem;

  h2 {
    font-weight: 900;
    font-size: 2.5rem;
  }
}
</style>

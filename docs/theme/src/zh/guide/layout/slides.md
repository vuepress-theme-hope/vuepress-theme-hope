---
title: 幻灯片
icon: slides
category: layout
tags:
  - layout
  - slides
---

`vuepress-theme-hope` 允许你添加幻灯片页面。

你需要在相应的页面的 frontmatter 中，设置 `layout: Slide` 来开启幻灯片风格。

<!-- more -->

::: tip

你应该通过设置 `themeConfig.mdEnhance.enableAll` 或 `themeConfig.mdEnhance.presentation` 在 `vuepress-plugin-md-enhance` 中启用幻灯片功能，否则幻灯片无法正确加载。

:::

![幻灯片页截图](./assets/slides.png)

[这里](https://vuepress-theme-hope-demo.mrhope.site/zh/slides/) 有一个展示了所有幻灯片功能的案例.

你应该仅在该页面包含一个单一的幻灯片语法，以避免其他问题。

```md
@slidestart [your theme]

// your slides

@slideend
```

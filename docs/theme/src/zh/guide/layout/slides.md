---
title: 幻灯片
icon: person-chalkboard
order: 8
category:
  - 布局
tag:
  - 布局
  - 幻灯片
---

`vuepress-theme-hope` 允许你添加幻灯片页面。

你需要在相应的页面的 frontmatter 中，设置 `layout: Slide` 来开启幻灯片风格。

<!-- more -->

## 演示

<ProjectLink name="md-enhance" path="/zh/guide/content/revealjs/demo.html">这里是一个展示了所有幻灯片功能的案例</ProjectLink>.

![幻灯片页截图](./assets/slides-light.png#light)
![幻灯片页截图](./assets/slides-dark.png#dark)

## 注意事项

::: warning 启用功能

你应该在主题选项中通过设置 `plugins.mdEnhance.revealjs` 在 `vuepress-plugin-md-enhance` 中启用幻灯片功能，否则幻灯片无法被正确渲染。

:::

::: warning 不含多个幻灯片

该页面只能拥有一个幻灯片语法。多个幻灯片可能会引发渲染问题。

```md
@slidestart [your theme]

// your slides

@slideend
```

:::

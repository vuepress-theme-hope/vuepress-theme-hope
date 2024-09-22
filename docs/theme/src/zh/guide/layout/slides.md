---
title: 幻灯片
icon: person-chalkboard
order: 9
category:
  - 布局
tag:
  - 布局
  - 幻灯片
---

`vuepress-theme-hope` 允许你添加幻灯片页面。

<!-- more -->

::: tip

想要使用此功能，你应该先启用[幻灯片功能](../markdown/content/revealjs.md)。

:::

你应该在主题选项中通过设置 `plugins.mdEnhance.revealjs` 在 `vuepress-plugin-md-enhance` 中启用幻灯片功能，否则幻灯片无法被正确渲染。

:::

为渲染幻灯片页面，你应该在相应页面的 frontmatter 中设置 `layout: SlidePage`。

在使用此布局的页面中，你应该只包含单个幻灯片语法，不包含其他内容，以避免渲染问题:

```md
---
layout: SlidePage
---

@slidestart

<!-- 此处是幻灯片内容 -->

@slideend
```

- [包含了所有幻灯片功能的页面][revealjs-demo].

[revealjs-demo]: https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html

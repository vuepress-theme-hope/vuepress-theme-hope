---
title: 自定义
icon: gear
dir:
  order: 4
category:
  - 教程知识
  - 自定义
tag:
  - 高级
article: false
---

此章节向你演示常见的自定义需求涉及的相关代码。

<!-- more -->

## 添加组件

每个 markdown 文件将在 VuePress 中转换为一个 Vue 组件，因此你可以轻松导入和使用 Vue 组件。

- [添加组件](./component.md)

## 自定义样式的方式

你可以在自己文档内的 `.vuepress/styles` 文件夹下放置三个文件进行样式配置。

- `index.scss`: 你可以在这里通过 CSS 或 SCSS 语法放置自己的样式以对主题的外观进行修改。

  填入的样式会注入到主题和插件样式的后部。

- `config.scss`: 你可以在这里设置一些样式相关变量，包括响应式断点、容器类名、代码主题等。

- `palette.scss`: 你可以在这里设置一些颜色和布局的相关变量，比如主题色、背景色、导航栏高度等。

上述文件支持的完整配置列表详见 [配置 → 样式](../../config/style.md)。

## 详情

- [修改布局](./layout.md)

- [修改颜色](./color.md)

- [自定义字体](./font.md)

- [修改特效](./effect.md)

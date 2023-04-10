---
title: 修改布局
icon: object-group
category:
  - 教程知识
  - 自定义
tag:
  - 自定义
---

此教程指导你如何修改主题布局。

<!-- more -->

## 修改主题配置

主题提供了很多布局有关的选项，供你自定义主题的布局，关于这些选项详见 [主题配置 → 布局](../../config/theme/layout.md)。

## 修改 SCSS 变量

### 主题断点

主题在不同屏幕宽度下会自动响应式应用不同布局，如果你需要修改这些断点，可以在 配置文件中修改，

```scss
// .vuepress/styles/config.scss

// 修改桌面布局的断点
$pc = 1280px;
```

配置文件 `.vuepress/styles/config.scss` 以及断点变量 `$pc`、`$laptop`、`$pad`、`$tablet`、`$mobile` 的具体介绍详见 [主题配置 → 样式](../../config/style.md#configscss)。

### 主题布局尺寸

主题在调色板文件中提供了常见尺寸的变量，你可以在调色版文件中修改这些变量，以达到修改布局尺寸的目的。

```scss
// .vuepress/styles/palette.scss

// 修改导航栏高度
$navbar-height = 80px;
```

调色板文件 `.vuepress/styles/palette.scss` 以及布局变量的介绍详见 [主题配置 → 样式](../../config/style.md#palettescss)。

## 修改其他布局

如果你希望改变主题布局，但主题并未提供相关选项时，你可以考虑如下方法：

### 通过 CSS

- 如果你对主题的样式不满意，你可以通过样式文件对主题组件的样式进行调节。

  ::: note

  为了覆盖原有样式，你需要使用相同或更高优先级的选择器或者直接使用 `!important`。

  :::

- 如果你希望去掉一些功能，你可以在样式文件中通过 `display: none` 隐藏相关元素。

::: note

样式文件为项目目录下的 `.vuepress/styles/index.scss`，详见 [主题配置 → 样式](../../config/style.md#indexscss)

:::

### 通过覆盖组件

所有的主题组件都是通过别名进行注册与调用的，这意味着你可以通过覆盖组件别名，将主题的任一组件替换为你自己的组件。

如果你只是想在页面的特定位置添加新内容，那么你可以通过替换组件，并引用原组件通过原组件的插槽来实现。

组件别名、组件插槽与替换方式详见 [高级 → 替换主题组件](../../guide/advanced/replace.md)。

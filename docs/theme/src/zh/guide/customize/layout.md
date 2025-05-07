---
title: 自定义布局
icon: clone
order: 5
category:
  - 教程
  - 自定义
tag:
  - 自定义
  - 布局
---

此教程指导你如何修改主题布局。

<!-- more -->

## 修改主题配置

主题提供了很多布局有关的选项，供你自定义主题的布局，关于这些选项详见 [主题配置 → 布局](../../config/theme/layout.md)。

## 响应式断点

主题在不同屏幕宽度下会自动响应式应用不同布局，如果你需要修改这些断点，可以在 [样式配置文件](../../config/style.md#configscss)中修改，

```scss title=".vuepress/styles/config.scss"
// 修改桌面布局的断点
$pc = 1280px;
```

断点变量 `$pc`、`$laptop`、`$pad`、`$tablet`、`$mobile` 的具体介绍详见 [主题配置 → 样式](../../config/style.md#configscss)。

## 布局尺寸

主题在调色板文件中提供了常见尺寸的变量，你可以在 [调色版文件](../../config/style.md#palettescss) 中修改这些变量，以达到修改布局尺寸的目的。

```scss title=".vuepress/styles/palette.scss"
// 修改导航栏高度
$navbar-height = 80px;
```

布局变量的介绍详见 [主题配置 → 样式](../../config/style.md#palettescss)。

## 通过样式文件

[样式文件](../../config/style.md#indexscss) 为项目目录下的 `.vuepress/styles/index.scss`，你可以通过它自行添加样式。

- 如果你对主题的样式不满意，你可以通过样式文件对主题组件的样式进行调节。

  ::: note

  为了覆盖原有样式，你需要使用相同或更高优先级的选择器或者直接使用 `!important`。

  :::

- 如果你希望去掉一些功能，你可以在样式文件中通过 `display: none` 隐藏相关元素。

## 通过添加/覆盖布局

你可以添加新布局或覆盖现有布局，方法是通过 [客户端配置文件](../../cookbook/vuepress/config.md#客户端配置文件) 中的 `layouts` 选项。

查看 [使用插槽自定义布局](slots.md) 了解如何添加或覆盖布局。

### 通过覆盖组件

参见 [替换主题组件](../advanced/replace.md)。

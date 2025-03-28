---
title: 样式配置
icon: wand-magic-sparkles
order: 7
category:
  - 配置
tag:
  - 主题配置
  - 样式
---

你可以在 `.vuepress/styles` 中通过在 `config.scss` 和 `palette.scss` 文件中写入变量值来更改主题的样式。

你也可以在 `.vuepress/styles/index.scss` 中添加你自己的样式。

<!-- more -->

## config.scss

`config.scss` 用于纯变量配置，以下是支持的变量与默认值。

响应式布局断点:

- `$pc`
- `$laptop`
- `$pad`
- `$tablet`
- `$mobile`

主题色:

- `$theme-color`: 主题色，支持多个主题色甚至指定 light/dark 颜色。

代码块 (仅限 shiki 高亮器):

- `$code-bg-color`: 代码块的背景颜色
- `$code-color`: 代码块的字体颜色

颜色列表:

- `$colors`: 用于生成颜色列表。

::: details 例子

```scss
// 修改电脑响应式布局断点
$pc: 1920px;
```

:::

::: details 默认值

@[code{7-}](../../../../../packages/theme/templates/palette/config.scss)

:::

## palette.scss

`palette.scss` 用于 CSS 变量写入，以下是支持的配置与默认值。

::: info

此处的所有变量 (包括你新添加的变量) 都会被转换为 kebab-case 的格式注入为 CSS 变量。

如 `$vp-c-text` 会被注入为 `--vp-c-text`，`$vp-c-bg` 会被注入为 `--vp-c-bg`。

:::

### 颜色设置

对于所有颜色，如果其在浅色模式和深色模式颜色相同，可直接设置；否则，请设置一个 Map 类型的 Sass 变量分别给出浅色和深色模式下的颜色。此变量键名为 `light` 和 `dark`，值为颜色值。

可用的颜色变量:

#### 文字

- `$vp-c-text`：默认文本颜色。

默认情况下，主题会根据 `$vp-c-text` 自动生成以下颜色，但你仍然可以自定义它们：

- `$vp-c-text-mute`：用于静音文本的颜色，例如“非活动菜单”或“信息文本”。
- `$vp-c-text-subtle`：用于细微文本的颜色，例如“占位符”或“插入符号”。

#### 背景

- `$vp-c-bg`：用于主屏幕的背景颜色。
- `$vp-c-bg-alt`：用于“侧边栏”或“代码块”等地方的备用背景颜色。
- `$vp-c-bg-elv`：用于“浮动”部分的提升背景颜色，例如“对话框”。

#### 阴影

- `$vp-c-shadow`：阴影颜色

#### 强调

用于交互组件的强调颜色和品牌颜色。

默认情况下，主题会根据配置文件中的 `$theme-color` 自动生成以下强调颜色，但你仍然可以自定义它们：

- `$vp-c-accent`：主要用于彩色文本的最实色。它必须满足与放在 `$vp-c-accent-soft` 顶部时的对比度。
- `$vp-c-accent-hover`：用于悬停状态的颜色。
- `$vp-c-accent-bg`：用于实色背景的颜色。它必须满足与放在其顶部的 `$vp-c-accent-text` 的对比度。
- `$vp-c-accent-text`：用于 `$vp-c-accent-bg` 背景的文本颜色。它必须满足与 `$vp-c-accent-bg` 的对比度。
- `$vp-c-accent-soft`：用于自定义容器或徽章等细微背景的颜色。当将 `$vp-c-accent` 颜色放在其顶部时，它必须满足对比度。

  软色必须是半透明的 alpha 通道。这是至关重要的，因为它允许将多个“软”颜色叠加在一起以创建强调，例如在自定义容器内部有内联代码块时。

#### 边框

- `$vp-c-border`：交互组件的边框颜色。例如，这应该用于按钮轮廓。
- `$vp-c-divider`：分隔符的颜色，用于在同一组件内分隔部分，例如在“h2”标题上放置分隔符。

默认情况下，主题会根据 `$vp-c-border` 自动生成以下颜色，但你仍然可以自定义它们：

- `$vp-c-border-hard`：较暗的边框颜色，用于紧贴文本的“硬”边框，例如表格和 kbd。

#### 控件

- `$vp-c-control`：用于交互控件（例如按钮或复选框）的背景颜色。
- `$vp-c-control-hover`：用于交互控件悬停状态的背景颜色。
- `$vp-c-control-disabled`：用于交互控件禁用状态的颜色。

::: details 例子

```scss
// 将主题颜色设置为红色
// 注: 为保持一致，你还应该设置其他主题颜色变量
$vp-c-accent: red;

// 将边框颜色加深
$vp-c-border: (
  light: #ddd,
  dark: #444,
);
```

:::

::: details 默认值

@[code{4-60}](../../../../../packages/theme/templates/palette/color.scss)

:::

### 布局设置

可用的布局变量:

导航栏:

- `$navbar-height`: 导航栏高度
- `$navbar-padding-x`: 导航栏水平填充
- `$navbar-padding-y`: 导航栏垂直填充
- `$navbar-mobile-height`: 移动设备上的导航栏高度
- `$navbar-mobile-padding-x`: 移动设备上的导航栏水平填充
- `$navbar-mobile-padding-y`: 移动设备上的导航栏垂直填充

侧边栏:

- `$sidebar-width`: 侧边栏宽度
- `$sidebar-mobile-width`: 移动设备侧边栏宽度

内容:

- `$content-width`: 主要内容的宽度
- `$wide-content-width`: 宽屏上主要内容的宽度 (屏幕宽度 >= 1920px)
- `$home-page-width`: 主页内容的宽度

::: details 例子

```scss
// 加大移动设备上的导航栏高度
$navbar-mobile-height: 3.5rem;
```

:::

::: details 默认值

@[code](../../../../../packages/theme/templates/palette/layout.scss)

:::

### 字体

可用的字体变量:

- `$vp-font`: 正常文本的字体系列
- `$vp-font-heading`: 标题元素的字体系列
- `$vp-font-mono`: 代码块的字体系列

::: details 默认值

@[code](../../../../../packages/theme/templates/palette/font.scss)

:::

### 过渡时间

可用的过渡时间变量:

- `$vp-t-color`：颜色过渡时间。
- `$vp-t-transform`：变换过渡时间。

::: details 默认值

@[code](../../../../../packages/theme/templates/palette/transition.scss)

:::

## index.scss

填入此文件所有内容都将解析为标准 CSS，然后在主题和插件样式之后注入。

因此，你可以在此处添加新样式或覆盖样式:

::: details 例子

```scss
// 在导航栏中将站点名称改为斜体
.site-name {
  font-style: italic;
}
```

:::

---
title: StackBlitz
---

在 Markdown 文件中嵌入 StackBlitz 演示。

<!-- more -->

## 示例 {#demo}

<!-- #region demo -->

::: preview 一个 StackBlitz 项目

<StackBlitz id="vuepress-theme-hope" />

:::

::: preview 一个自定义设置的 StackBlitz 项目

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />

:::

<!-- #endregion demo -->

## 选项 {#options}

::: fields
@`id` type=string required

StackBlitz id。

@`type` type=`"project" | "github"` default=`"project"`

StackBlitz 项目类型。

@`width` type=`string | number` default=`100%`

StackBlitz 组件宽度。

@`height` type=`string | number`

StackBlitz 组件高度。

@`ratio` type=number default=`16 / 9`

StackBlitz 组件宽高比，只有当未指定 `height` 时有效。

@`file` type=`string[] | string`

在编辑器中打开的默认文件。

@`initialPath` type=string

预览时应打开的初始 URL 路径。

@`embed` type=boolean

嵌入 StackBlitz 演示。

@`load` type=boolean

是否直接加载嵌入演示。仅在嵌入视图中有效。

@`theme` type=`"dark" | "light"` default=`"dark"`

编辑器主题。仅在嵌入视图中有效。

@`text` type=string default=`"Open in StackBlitz"`

打开 StackBlitz 按钮的文本。仅在不使用嵌入视图时有效。

@`view` type=`"default" | "editor" | "preview"` default=`"preview"`

默认打开的视图。

@`hideExplorer` type=boolean

在嵌入视图中隐藏文件资源管理器面板。

@`hideNavigation` type=boolean

在嵌入视图中隐藏导航面板。

@`hideDevtools` type=boolean

在编辑器预览中隐藏调试控制台。

:::

---
title: StackBlitz
---

在 Markdown 文件中嵌入 StackBlitz 演示。

<!-- more -->

## 示例

<!-- #region demo -->

::: md-demo 一个 StackBlitz 项目

<StackBlitz id="vuepress-theme-hope" />

:::

::: md-demo 一个自定义设置的 StackBlitz 项目

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />

:::

<!-- #endregion demo -->

## 属性

### id

- 类型: `string`
- 必填: 是

StackBlitz id

### type

- 类型: `"project" | "github"`
- 默认值: `"project"`

StackBlitz 项目类型。

### width

- 类型: `string | number`
- 默认值: `100%`

StackBlitz 组件宽度。

### height

- 类型: `string | number`
- 必填：否

StackBlitz 组件高度。

### ratio

- 类型: `number`
- 默认值: `16 / 9`

StackBlitz 组件高度宽高比，只有当未指定 `height` 时有效。

### file

- 类型: `string[] | string`
- 必填: 否

在编辑器中打开的默认文件。

### initialPath

- 类型: `string`
- 必填: 否

预览时应打开的初始 URL 路径。

### embed

- 类型: `boolean`
- 默认值: `false`

嵌入 StackBlitz 演示。

### load

- 类型: `boolean`
- 默认值: `false`

是否直接加载嵌入演示。(仅在嵌入视图中有效)

### theme

- 类型: `"dark" | "light"`
- 默认值: `"dark"`

编辑器主题。(仅在嵌入视图中有效)

### view

- 类型: `"default" | "editor" | "preview"`
- 默认值: `"preview"`

默认打开的视图。

### text

- 类型: `string`
- 默认值: `"Open in StackBlitz"`

打开 StackBlitz 按钮的文本。

### hideExplorer

- 类型: `boolean`
- 默认值: `false`

在嵌入视图中隐藏文件资源管理器面板。

### hideNavigation

- 类型: `boolean`
- 默认值: `false`

在嵌入视图中隐藏导航面板。

### hideDevtools

- 类型: `boolean`
- 默认值: `false`

在编辑器预览中隐藏调试控制台。

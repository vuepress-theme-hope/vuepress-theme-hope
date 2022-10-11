---
title: StackBlitz
---

在 Markdown 文件中嵌入 StackBlitz 演示。

<!-- more -->

## Props

### id

- 类型: `string`
- 必填: 是

StackBlitz id

### width

- 类型: `string | number`
- 默认值: `100%`

StackBlitz 组件宽度。

### height

- 类型: `string | number`
- 必填：否

StackBlitz 组件高度

### radio

- 类型: `number`
- 默认值: `16 / 9`

StackBlitz 组件高度宽高比，只有当未指定 `height` 时有效。

### file

- 类型: `string`
- 必填: 否

在编辑器中打开的默认文件。

### initialpath

- 类型: `string`
- 必填: 否

预览时应打开的初始 URL 路径。

### embed

- 类型: `boolean`
- 默认值: `true`

无论屏幕大小如何，都强制嵌入视图。

### clickToLoad

- 类型: `boolean`
- 默认值: `true`

要求用户 "点击加载" 嵌入演示。

### view

- 类型: `"editor" | "preview"`
- 默认值: `"preview"`

默认打开的视图。

### hideExplorer

- 类型: `boolean`
- 默认值: `false`

在嵌入视图中隐藏文件资源管理器面板。

### hideNavigation

- 类型: `boolean`
- 默认值: `false`

在嵌入视图中隐藏导航面板。

### hidedevtools

- 类型: `boolean`
- 默认值: `false`

在编辑器预览中隐藏调试控制台。

## 演示

一个 StackBlitz 项目:

<StackBlitz id="vuepress-theme-hope" />

```md
<StackBlitz id="vuepress-theme-hope" />
```

一个自定义设置的 StackBlitz 项目:

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hidedevtools />

```md
<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hidedevtools />
```

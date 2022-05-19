---
title: 指南
icon: creative
---

此插件注册 2 个组件和一个全局组件:

- `<BackToTop />` (全局组件)
- `<Badge />`

## BackToTop

返回顶部按钮

您可以通过在插件选项中设置 `backToTop: true` 来启用它。

默认阈值为 300px，您可以通过在插件选项中设置 `backToTopThreshold` 来覆盖它。

## Badge

支持自定义颜色的徽章。

### Badge 属性

#### text

- 类型: `string`
- 必填: 是

徽章的文字

#### 类型

- 类型: `"tip" | "warning" | "danger" | "info" | "note"`
- 默认值: `"info"`

徽章的类型

- <Badge text="tip" 类型="tip" vertical="middle" />
- <Badge text="warning" 类型="warning" vertical="middle" />
- <Badge text="danger" 类型="danger" vertical="middle" />
- <Badge text="info" 类型="info" vertical="middle" />
- <Badge text="note" 类型="note" vertical="middle" />

#### color

- 类型: `string`
- 必填: 否

徽章的颜色，填入在 CSS 中合法的颜色值。

#### vertical

- 类型: `"top" | "middle"`
- 默认值: `"top"`

徽章的垂直方向的位置

### Badge 使用

你可以在 Markdown 中使用这个组件来为标题或链接添加一些状态:

```md
徽章测试 <Badge text="Building" 类型="warning"/> <Badge text="MrHope" color="grey" />
```

徽章测试 <Badge text="Building" 类型="warning"/> <Badge text="MrHope" color="grey" />

## CodePen

CodePen 演示组件。

### CodePen 属性

#### link

- 类型: `string`
- 必填: 否

CodePen 项目链接。

#### user

- 类型: `string`
- 必填: 如果未设置 `link`，则是

CodePen 用户。

#### slugHash

- 类型: `string`
- 必填: 如果未设置 `link`，则是

CodePen 项目 slug hash。

#### title

- 类型: `string`
- 必填: 否

CodePen 项目标题。

#### height

- 类型: `numbr`
- 默认值: `265`

以 px 为单位的编辑器高度。

#### theme

- 类型: `"默认值" | "light" | "dark"`
- 默认值: `"默认值"`

编辑器主题。

#### 默认值 Tab

- 类型: `string[]`
- 默认值: `["result"]`

编辑器默认打开的选项卡。

### CodePen 用法

您可以在 Markdown 中使用它来添加嵌入演示:

```md
<CodePen user="kowlor" slug-hash="ZYYQoy" title="Solar System animation - Pure CSS" :默认值-tab="['css','result']" />
```

<CodePen user="kowlor" slug-hash="ZYYQoy" title="Solar System animation - Pure CSS" :默认值-tab="['css','result']" />

## PDF

PDF preview component

### PDF Props

#### url

- 类型: `string`
- 必填: 是

PDF 链接，**不支持**相对路径。

#### height

- 类型: `string | number`
- 必填: 是

PDF 预览器的高度

#### page

- 类型: `number`
- 默认值: `1`

PDF 文档的初始页面

#### toolbar

- 类型: `boolean`
- 默认值: `true`

是否显示工具栏

#### zoom

- 类型: `number`
- 默认值: `100`

PDF 文档的初始缩放比例

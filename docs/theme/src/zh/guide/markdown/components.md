---
title: 组件
icon: plugin
index: 16
category:
  - Markdown
tag:
  - Markdown
  - 组件
---

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

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

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
徽章测试 <Badge text="Building" type="warning" /> <Badge text="MrHope" color="grey" />
```

徽章测试 <Badge text="Building" type="warning" /> <Badge text="MrHope" color="grey" />

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

PDF 预览组件

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

## Tab

选项卡组件，由 `<Tabs>` 和 `<Tab>` 组成。

::: tip

对于具有相同 `tab-id` 的选项卡组，选项卡会一起进行切换。

:::

### Tabs Props

#### tabId

- 类型: `string`
- 必填: 否

选项卡组的事件 ID。

### Tab Props

#### title

- 类型: `string`
- 必填: 是

选项卡的标题

#### label

- 类型: `string`
- 默认值: `title`

选项卡的标签名称，用于 A11y。

#### value

- 类型: `string`
- 默认值: `title`

选项卡对应的值

### Tab 用法

您可以在 Markdown 中使用它来添加选项卡

```md
一个水果列表:

<Tabs tab-id="fruit">
  <Tab title="apple" value="apple">
  Apple
  </Tab>
  <Tab title="banana" value="banana">
  banana
  </Tab>
</Tabs>

另一个水果列表:

<Tabs tab-id="fruit">
  <Tab title="apple" >
  Apple
  </Tab>
  <Tab title="banana" >
  banana
  </Tab>
  <Tab title="orange" >
  orange
  </Tab>
</Tabs>

一个没有 ID 的水果列表:

<Tabs>
  <Tab title="apple">
  Apple
  </Tab>
  <Tab title="banana">
  banana
  </Tab>
  <Tab title="orange" >
  orange
  </Tab>
</Tabs>
```

一个水果列表:

<Tabs tab-id="fruit">
  <Tab title="apple" value="apple">
  Apple
  </Tab>
  <Tab title="banana" value="banana">
  banana
  </Tab>
</Tabs>

另一个水果列表:

<Tabs tab-id="fruit">
  <Tab title="apple" >
  Apple
  </Tab>
  <Tab title="banana" >
  banana
  </Tab>
  <Tab title="orange" >
  orange
  </Tab>
</Tabs>

一个没有 ID 的水果列表:

<Tabs>
  <Tab title="apple">
  Apple
  </Tab>
  <Tab title="banana">
  banana
  </Tab>
  <Tab title="orange" >
  orange
  </Tab>
</Tabs>

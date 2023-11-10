---
title: CodePen
---

CodePen 演示组件。

你可以使用它在 Markdown 嵌入 Demo。

<!-- more -->

## 示例

<!-- #region demo -->

::: md-demo 一个使用用户和 Slug Hash 的案例

<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>

:::

::: md-demo 一个使用链接的案例

<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>

:::

::: md-demo 一个加载运行的案例

<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Envelope w/ Hearts"
  status="clicktorun"
  :theme="$isDarkmode? 'dark': 'light'"
/>

:::

<!-- #endregion demo -->

## 属性

### link

- 类型: `string`
- 必填: 否

CodePen 项目链接。

### user

- 类型: `string`
- 必填: 如果未设置 `link`，则是

CodePen 用户。

### slugHash

- 类型: `string`
- 必填: 如果未设置 `link`，则是

CodePen 项目 slug hash。

### title

- 类型: `string`
- 必填: 否

CodePen 项目标题。

### height

- 类型: `number`
- 默认值: `380`

以 px 为单位的编辑器高度。

### theme

- 类型: `"default" | "light" | "dark"`
- 默认值: `"default"`

编辑器主题。

### status

- : `"autoload" | "preview" | "clicktorun"`
- 默认值: `"preview"`

CodePen 嵌入演示状态。

- `"autoload"`: 页面加载时会加载 demo。
- `"preview"`: 演示的代码会被加载并显示预览按钮。
- `"clicktorun"`: 只有在用户单击“运行代码”按钮后才会加载演示。

### defaultTab

- 类型: `string[]`
- 默认值: `["result"]`

编辑器默认打开的选项卡。

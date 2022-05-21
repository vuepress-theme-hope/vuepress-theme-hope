---
title: CodePen
---

CodePen 演示组件。

你可以使用它在 Markdown 嵌入 Demo。

<!-- more -->

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

- 类型: `numbr`
- 默认值: `380`

以 px 为单位的编辑器高度。

### theme

- 类型: `"default" | "light" | "dark"`
- 默认值: `"default"`

编辑器主题。

### defaultTab

- 类型: `string[]`
- 默认值: `["result"]`

编辑器默认打开的选项卡。

## 案例

一个使用用户和 Slug Hash 的案例:

<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
/>

```md
<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
/>
```

一个使用链接的案例:

<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
/>

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
/>
```

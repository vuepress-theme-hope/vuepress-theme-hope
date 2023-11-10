---
title: Replit
---

在 Markdown 文件中嵌入 Replit 演示。

<!-- more -->

## 示例

<!-- #region demo -->

::: md-demo 一个 replit

<Replit user="FuckDoctors" repl="Java-Test" />

:::

::: md-demo 一个 replit，并且显示指定的文件

<Replit user="FuckDoctors" repl="Java-Test" file="Main.java" />

:::

::: md-demo 一个自动加载的 replit

<Replit user="FuckDoctors" repl="Java-Test" auto-load />

:::

::: md-demo 一个 replit 链接

<Replit link="https://replit.com/@FuckDoctors/Java-Test" />

:::

<!-- #endregion demo -->

## 属性

### link

- 类型: `string`
- 必填: 是

Replit 链接。

### user

- 类型: `string`
- 必填: 是

Replit 用户名。

### repl

- 类型: `string`
- 必填: 是

Replit repl 名。

### title

- 类型: `string`
- 必填: 是

Replit 标题。

### width

- 类型: `string | number`
- 默认值: `100%`

Replit 组件宽度。

### height

- 类型: `string | number`
- 必填: 否

Replit 组件高度。

### ratio

- 类型: `number`
- 默认值: `16 / 9`

Replit 组件高度宽高比，只有当未指定 `height` 时有效。

### autoLoad

- 类型: `boolean`
- 默认值: `false`

是否自动加载 ReplIt。

### text

- 类型: `string`
- 默认值: `"Load ReplIt"`

加载按钮文字。

### theme

- 类型: `string`
- 默认值: `"light"`

Replit 主题。

### file

- 类型: `string`
- 必填: 否

在 repl 中打开的默认文件。

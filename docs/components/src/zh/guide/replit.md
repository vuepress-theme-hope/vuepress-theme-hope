---
title: Replit
---

在 Markdown 文件中嵌入 Replit 演示。

<!-- more -->

## 示例

一个嵌入的 repl:

<Replit user="FuckDoctors" repl="Java-Test" />

```md
<Replit user="FuckDoctors" repl="Java-Test" />
```

一个嵌入的 repl，并且显示指定的文件:

<Replit user="FuckDoctors" repl="Java-Test" file="Main.java" />

```md
<Replit user="FuckDoctors" repl="Java-Test" file="Main.java" />
```

一个 repl 链接:

<Replit user="FuckDoctors" repl="Java-Test" plain />

```md
<Replit user="FuckDoctors" repl="Java-Test" plain />
```

另一个 repl 链接:

<Replit link="https://replit.com/@FuckDoctors/Java-Test" />

```md
<Replit link="https://replit.com/@FuckDoctors/Java-Test" />
```

## Props

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

### theme

- 类型: `string`
- 默认值: `"light"`

Replit 主题。(仅在嵌入视图中有效)

### file

- 类型: `string`
- 必填: 否

在 repl 中打开的默认文件。

### plain

- 类型: `boolean`
- 默认值: `false`

显示一个按钮，而不是视图。

### text

- 类型: `string`
- 默认值: `"Open on Replit"`

打开 Replit 按钮的文本。

---
title: 组件
icon: plugin
category:
  - Markdown
tag:
  - Markdown
  - 组件
---

## Badge

在 Markdown 中可用的徽章。

### Badge 属性

#### text

- 类型: `string`
- 必填: 是

徽章的文字

#### type

- 类型: `"tip" | "warn" | "error"`
- 默认值: `"tip"`

徽章的类型

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warn" type="warn" vertical="middle" />
- <Badge text="error" type="error" vertical="middle" />

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
### Badge <Badge text="Building" type="warn"/> <Badge text="MrHope" color="grey" />
```

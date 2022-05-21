---
title: FontIcon
---

此组件用于展示字体图标。

你可以在 Markdown 文件中使用它来添加图标。

<!-- more -->

## 属性

### icon

- 类型: `string`
- 必填: 是

Icon name

### color

- 类型: `string`
- 默认值: `'inherit'`

图标颜色

### size

- 类型: `number`
- 默认值: `当前字体大小`

图标像素大小。

## Demo

- 主页图标: <FontIcon icon="home" />

- 一个大红 Markdown 图标: <FontIcon icon="markdown" color="red" size="32" />

```md
- 主页图标: <FontIcon icon="home" />

- 一个大红 Markdown 图标: <FontIcon icon="markdown" color="red" size="32" />
```

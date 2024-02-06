---
title: Badge
---

支持自定义颜色的徽章。

你可以在 Markdown 中使用这个组件来为标题或链接添加一些状态。

<!-- more -->

## 示例

::: md-demo

## 标题勋章 <Badge text="新" type="tip" /> <Badge text="MrHope" color="grey" />

勋章测试 <Badge text="构建中" type="warning" /> <Badge text="MrHope" color="grey" />

:::

## 属性

### text

- 类型: `string`
- 必填: 是

徽章的文字

### type

- 类型: `"tip" | "warning" | "danger" | "info" | "note"`
- 默认值: `"info"`

徽章的类型

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

### color

- 类型: `string`
- 必填: 否

徽章的颜色，填入在 CSS 中合法的颜色值。

### vertical

- 类型: `"top" | "middle" | "baseline" | "bottom"`
- 必填: 否

徽章的垂直方向的位置

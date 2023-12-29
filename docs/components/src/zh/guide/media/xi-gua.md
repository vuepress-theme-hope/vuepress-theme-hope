---
title: XiGua
---

在 Markdown 文件中嵌入西瓜视频。

<!-- more -->

## Demo

<!-- #region demo -->

::: md-demo 西瓜视频

<XiGua id="7004391080330428964" />

:::

::: md-demo 带有自定义设置的西瓜视频

<XiGua
  id="7004391080330428964"
  autoplay
  time="60"
/>

:::

<!-- #endregion demo -->

## 属性

### id

- 类型: `string`
- 必填: 是

西瓜视频 id

### title

- 类型: `string`
- 必填: 否

西瓜视频标题

### width

- 类型: `string | number`
- 默认值: `100%`

西瓜视频组件宽度

### height

- 类型: `string | number`
- 必填: 否

西瓜视频组件高度

### ratio

- 类型: `number`
- 默认值: `16 / 9`

西瓜视频组件比例，仅在高度未设置时生效

### autoplay

- 类型: `boolean`
- 默认值: `false`

是否自动播放视频

### time

- 类型: `string | number`
- 必填: 否

视频的开始时间 (单位: 秒)

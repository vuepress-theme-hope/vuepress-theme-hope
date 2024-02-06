---
title: AudioPlayer
---

在 Markdown 文件中嵌入音频。

<!-- more -->

::: tip

为了更好的体验，我们建议你使用 [VidStack](./vid-stack.md)。

:::

## 示例

<!-- #region demo -->

::: md-demo 一个音频播放器

<AudioPlayer src="//theme-hope-assets.vuejs.press/files/sample.mp3" />

:::

::: md-demo 一个拥有标题和封面的音频播放器

<AudioPlayer
  src="//theme-hope-assets.vuejs.press/files/sample.mp3"
  title="A Sample Audio"
  poster="//theme-hope-assets.vuejs.press/logo.svg"
/>

:::

<!-- #endregion demo -->

## 属性

### src

- 类型: `string`
- 必填: 是

音频文件地址

### width

- 类型: `string | number`
- 默认值: `100%`

音频组件宽度。

### type

- 类型: `string`
- 必填: 否

音频类型。

::: note

如果你的服务器不能为音频文件返回正确的 mime 类型，你应该指定它。 (例如：`audio/mp3`)

:::

### title

- 类型: `string`
- 必填: 否

音频标题

### poster

- 类型: `string`
- 必填: 否

音频封面

---
title: YouTube
---

在 Markdown 文件中嵌入 YouTube 视频。

<!-- more -->

::: tip

为了更好的体验，我们建议你使用 [VidStack](./vid-stack.md)。

:::

## 示例

<!-- #region demo -->

::: md-demo 一个 YouTube 视频

<YouTube id="0JJPfz5dg20" />

:::

::: md-demo 一个自定义设置的 YouTube 视频

<YouTube id="0JJPfz5dg20" disable-fullscreen />

:::

::: md-demo 一个 YouTube 播放列表

<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />

:::

<!-- #endregion demo -->

## 属性

### id

- 类型: `string`
- 必填: 是

YouTube 视频 ID

::: note

仅当你将 `listType` 设置为 `"playlist"` 并使用 `list` 提供有效的播放列表 ID 时，才不需要此参数。

:::

### title

- 类型: `string`
- 必填: 否

YouTube 视频标题

### width

- 类型: `string | number`
- 默认值: `100%`

YouTube 组件宽度。

### height

- 类型: `string | number`
- 必填：否

YouTube 组件高度

### ratio

- 类型: `number`
- 默认值: `16 / 9`

YouTube 组件高度宽高比，只有当未指定 `height` 时有效。

### autoplay

- 类型: `boolean`
- 默认值: `false`

是否自动播放视频。

### loop

- 类型: `boolean`
- 默认值: `false`

是否循环播放视频。

### showCc

- 类型: `boolean`
- 默认值: `false`

是否显示字幕。

### 显示注释

- 类型: `boolean`
- 默认值: `false`

是否显示视频的注释。

### start

- 类型: `数字`
- 必填: `否`

视频的开始时间（以秒为单位）。

### end

- 类型: `数字`
- 必填: 否

视频的结束时间（以秒为单位）。

::: note

这个时间是从视频的开头开始计算的。

:::

### defaultCcLang

- 类型: `string`
- 默认值: `page.lang`

默认字幕语言。

### uiLang

- 类型: `string`
- 默认值: `page.lang`

用户界面语言。

### listType

- 类型: `"playlist" | "search" | ""`
- 默认值: `""`

列表类型。

### list

- 类型: `string`
- 必填: 否

列表值。

### playlist

- 类型: `string`
- 必填: 否

播放列表 ID。

### disableControls

- 类型: `boolean`
- 默认值: `false`

### disableFullscreen

### 禁用全屏

- 类型: `boolean`
- 默认值: `false`

是否禁用视频的全屏按钮。

### disableKeyboard

- 类型: `boolean`
- 默认值: `false`

是否禁用视频的键盘控制。

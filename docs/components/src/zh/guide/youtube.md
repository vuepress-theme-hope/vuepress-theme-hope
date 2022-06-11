---
title: YouTube
---

在 Markdown 文件中嵌入 YouTube 视频。

<!-- more -->

## Props

### id

- 类型: `string`
- 必填: 是

YouTube 视频 ID

::: note

仅当你将 `listType` 设置为 `"playlist"` 并使用 `list` 提供有效的播放列表 ID 时，才不需要此参数。

:::

### height

- 类型: `string | number`
- 默认值: `400`

YouTube iframe 高度。

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

## 演示

<YouTube id="0JJPfz5dg20" />

```md
<YouTube id="0JJPfz5dg20" />
```

<YouTube id="0JJPfz5dg20" disable-fullscreen />

```md
<YouTube id="0JJPfz5dg20" disable-fullscreen />
```

<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />

```md
<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />
```

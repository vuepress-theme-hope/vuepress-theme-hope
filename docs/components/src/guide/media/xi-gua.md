---
title: XiGua
---

Embed XiGua videos in Markdown files.

<!-- more -->

## Demo

<!-- #region demo -->

::: md-demo A XiGua video

<XiGua id="7004391080330428964" />

:::

::: md-demo A XiGua video with custom settings

<XiGua
  id="7004391080330428964"
  autoplay
  time="60"
/>

:::

<!-- #endregion demo -->

## Props

### id

- Type: `string`
- Required: Yes

XiGua video id

### title

- Type: `string`
- Required: No

XiGua video title

### width

- Type: `string | number`
- Default: `100%`

XiGua component width.

### height

- Type: `string | number`
- Required: No

XiGua component height

### ratio

- Type: `number`
- Default: `16 / 9`

XiGua component ratio, ONLY valid when `height` not set.

### autoplay

- Type: `boolean`
- Default: `false`

Whether autoplay the video.

### time

- Type: `string | number`
- Required: No

Start time of the video (in seconds).

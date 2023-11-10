---
title: BiliBili
---

Embed BiliBili videos in Markdown files.

<!-- more -->

## Demo

<!-- #region demo -->

::: md-demo A bilibili video

<BiliBili bvid="BV1kt411o7C3" />

:::

::: md-demo A bilibili video with custom settings

<BiliBili aid="34304064" cid="109293122" ratio="9:16" time="60" page="2" />

:::

<!-- #endregion demo -->

## Props

### bvid

- Type: `string`
- Required: Yes

BiliBili video id.

### title

- Type: `string`
- Required: No

BiliBili video title

### page

- Type: `number`
- Default: `1`

Part of the video.

::: info

When setting this option, you must provide `aid` and `cid` as well and you can omit `bvid` prop.

:::

### width

- Type: `string | number`
- Default: `100%`

BiliBili component width.

### height

- Type: `string | number`
- Required: No

BiliBili component height

### ratio

- Type: `number`
- Default: `16 / 9`

BiliBili component ratio, ONLY valid when `height` not set.

### time

- Type: `number`
- Default: `0`

Start time of the video (in seconds).

### autoplay

- Type: `boolean`
- Default: `false`

Video autoplay.

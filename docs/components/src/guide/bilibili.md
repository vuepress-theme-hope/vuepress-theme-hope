---
title: BiliBili
---

Embed BiliBili vidoes in Markdown files.

## Props

### bvid

- Type: `string`
- Required: Yes

BiliBili video id

### page

- Type: `number`
- Default: `1`

Part of the video.

### height

- Type: `string | number`
- Default: `400`

BiliBili iframe height.

### time

- Type: `number`
- Default: `0`

Start time of the video (in seconds).

### danmaku

- Type: `boolean`
- Default: `true`

Whether to enable danmaku

## Demo

<BiliBili bvid="BV1Be4y1f7Es" />

<BiliBili bvid="BV1Be4y1f7Es" :time="60" />

<BiliBili bvid="BV1kt411o7C3" :page="2" :high-quality="false" :danmaku="false" />

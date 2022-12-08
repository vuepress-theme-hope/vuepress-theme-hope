---
title: BiliBili
---

Embed BiliBili videos in Markdown files.

<!-- more -->

## Props

### bvid

- Type: `string`
- Required: Yes

BiliBili video id.

### page

- Type: `number`
- Default: `1`

Part of the video.

### width

- Type: `string | number`
- Default: `100%`

BiliBili component width.

### height

- Type: `string | number`
- Required: No

BiliBili component height

### radio

- Type: `number`
- Default: `16 / 9`

BiliBili component radio, ONLY valid when `height` not set.

### time

- Type: `number`
- Default: `0`

Start time of the video (in seconds).

### lowQuality

- Type: `boolean`
- Default: `false`

Whether to use source having low quality.

### noDanmaku

- Type: `boolean`
- Default: `false`

Whether to disable danmaku

## Demo

A bilibili video:

<BiliBili bvid="BV1kt411o7C3" />

```md
<BiliBili bvid="BV1kt411o7C3" />
```

A bilibili video with radio, start time and page:

<BiliBili bvid="BV1kt411o7C3" :ratio="9/16" :time="60" :page="2" />

```md
<BiliBili bvid="BV1kt411o7C3" :ratio="9/16" :time="60" :page="2" />
```

A bilibili video with custom settings:

<BiliBili bvid="BV1kt411o7C3" :auto-height="[9 / 16, 20]" low-quality no-danmaku />

```md
<BiliBili bvid="BV1kt411o7C3" :auto-height="[9 / 16, 20]" low-quality no-danmaku />
```

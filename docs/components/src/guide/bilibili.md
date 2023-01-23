---
title: BiliBili
---

Embed BiliBili videos in Markdown files.

<!-- more -->

## Demo

A bilibili video:

<BiliBili bvid="BV1kt411o7C3" />

```md
<BiliBili bvid="BV1kt411o7C3" />
```

A bilibili video with ratio, start time and page:

<BiliBili bvid="BV1kt411o7C3" ratio="16:9" time="60" page="2" />

```md
<BiliBili bvid="BV1kt411o7C3" ratio="16:9" time="60" page="2" />
```

A bilibili video with custom settings:

<BiliBili bvid="BV1kt411o7C3" ratio="16:9" low-quality no-danmaku />

```md
<BiliBili bvid="BV1kt411o7C3" ratio="16:9" low-quality no-danmaku />
```

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

### lowQuality

- Type: `boolean`
- Default: `false`

Whether to use source having low quality.

### noDanmaku

- Type: `boolean`
- Default: `false`

Whether to disable danmaku

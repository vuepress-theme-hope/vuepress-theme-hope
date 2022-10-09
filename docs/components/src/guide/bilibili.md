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

### width

- Type: `string | number`
- Default: `100%`

BiliBili iframe width.

### height

- Type: `string | number`
- Default: `auto`

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

A bilibili video:

<BiliBili bvid="BV1Be4y1f7Es" />

```md
<BiliBili bvid="BV1Be4y1f7Es" />
```

A bilibili video with start time and page:

<BiliBili bvid="BV1Be4y1f7Es" :time="60" :page="2" />

```md
<BiliBili bvid="BV1Be4y1f7Es" :time="60" :page="2" />
```

A bilibili video with custom settings:

<BiliBili bvid="BV1kt411o7C3" :high-quality="false" :danmaku="false" />

```md
<BiliBili bvid="BV1kt411o7C3" :high-quality="false" :danmaku="false" />
```

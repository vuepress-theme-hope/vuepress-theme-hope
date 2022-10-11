---
title: BiliBili
---

Embed BiliBili vidoes in Markdown files.

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

BiliBili iframe width.

### height

- Type: `string | number`
- Default: `0`

BiliBili iframe height, when the value is 0, `autoHeight` is valid.

### autoHeight

- Type: `Array<number>`
- Default: `[9 / 16, 70]`

Automatic calculation parameters of BiliBili iframe height, `height = width * autoHeight[0] + autoHeight[1]`.

### mobileWidth

- Type: `number`
- Default: `520`

BiliBili iframe mobile player trigger width, must be used with `autoHeight`. When the iframe width smaller than the set width, the height will become `height = width * autoHeight[0]`

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

<BiliBili bvid="BV1kt411o7C3" :auto-height="[9 / 16, 20]" :high-quality="false" :danmaku="false" />

```md
<BiliBili bvid="BV1kt411o7C3" :auto-height="[9 / 16, 20]" :high-quality="false" :danmaku="false" />
```

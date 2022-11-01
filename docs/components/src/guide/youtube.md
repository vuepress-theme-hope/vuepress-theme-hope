---
title: YouTube
---

Embed YouTube videos in Markdown files.

<!-- more -->

## Props

### id

- Type: `string`
- Required: Yes

YouTube video id

::: note

It is ONLY not required, when you are setting `listType` to `"playlist"` and provide a valid playlist id using `list`.

:::

### width

- Type: `string | number`
- Default: `100%`

YouTube component width.

### height

- Type: `string | number`
- Required: No

YouTube component height

### radio

- Type: `number`
- Default: `16 / 9`

YouTube component radio, ONLY valid when `height` not set.

### autoplay

- Type: `boolean`
- Default: `false`

Whether autoplay the video.

### loop

- Type: `boolean`
- Default: `false`

Whether loop the video.

### showCc

- Type: `boolean`
- Default: `false`

Whether display captions.

### showAnnotations

- Type: `boolean`
- Default: `false`

Whether show annotations of the video.

### start

- Type: `number`
- Required: No

Start time of the video (in seconds).

### end

- Type: `number`
- Required: No

End time of the video (in seconds).

::: note

This time is counted from the beginning of the video.

:::

### defaultCcLang

- Type: `string`
- Default: `page.lang`

Default caption language.

### uiLang

- Type: `string`
- Default: `page.lang`

UI language.

### listType

- Type: `"playlist" | "search" | ""`
- Default: `""`

List type.

### list

- Type: `string`
- Required: No

List value.

### playlist

- Type: `string`
- Required: No

Play list id.

### disableControls

- Type: `boolean`
- Default: `false`

Whether disable controls of the video.

### disableFullscreen

- Type: `boolean`
- Default: `false`

Whether disable fullscreen button of the video.

### disableKeyboard

- Type: `boolean`
- Default: `false`

Whether disable keyboard control of the video.

## Demo

A YouTube video:

<YouTube id="0JJPfz5dg20" />

```md
<YouTube id="0JJPfz5dg20" />
```

A YouTube video with custom settings:

<YouTube id="0JJPfz5dg20" disable-fullscreen />

```md
<YouTube id="0JJPfz5dg20" disable-fullscreen />
```

A YouTube play list:

<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />

```md
<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />
```

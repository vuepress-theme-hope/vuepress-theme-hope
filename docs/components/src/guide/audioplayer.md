---
title: AudioPlayer
---

Embed audios in Markdown files.

<!-- more -->

## Demo

An audio player:

<AudioPlayer src="/sample.mp3" />

```md
<AudioPlayer src="/sample.mp3" />
```

An audio player with poster and title:

<AudioPlayer
  src="/sample.mp3"
  title="A Sample Audio"
  poster="/logo.svg"
/>

```md
<AudioPlayer
  src="/sample.mp3"
  title="A Sample Audio"
  poster="/logo.svg"
/>
```

## Props

### src

- Type: `string`
- Required: Yes

Audio source link

### width

- Type: `string | number`
- Default: `100%`

Audio component width.

### type

- Type: `string`
- Required: No

Audio type.

::: note

If your server cannot return a correct mime type for your audio files, you should specify it. (e.g.: `audio/mp3`)

:::

### title

- Type: `string`
- Required: No

Audio title

### poster

- Type: `string`
- Required: No

Audio poster

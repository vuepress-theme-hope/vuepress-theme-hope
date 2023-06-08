---
title: VidStack
---

Embed [VidStack](https://www.vidstack.io/) in Markdown files.

::: warning

VidStack has some known issues with Vue. So stop using it until we fixed it.

:::

<!-- more -->

## Demo

A video player:

<!-- <VidStack src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" /> -->

```md
<VidStack src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" />
```

A video player with poster and tracks:

<!-- <VidStack
  src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm"
  title="VidStack video"
  poster="/poster.svg"
  :tracks="[
    {
      default: true,
      src: '/en.vtt',
      kind: 'subtitles',
      label: 'English',
      srcLang: 'en',
    },
    {
      src: '//fr.vtt',
      kind: 'subtitles',
      label: 'French',
      srcLang: 'fr',
    },
  ]"
/> -->

```md
<VidStack
  src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm"
  title="VidStack video"
  poster="/poster.svg"
  :tracks="[
    {
      default: true,
      src: '/en.vtt',
      kind: 'subtitles',
      label: 'English',
      srcLang: 'en',
    },
    {
      src: '//fr.vtt',
      kind: 'subtitles',
      label: 'French',
      srcLang: 'fr',
    },
  ]"
/>
```

An audio player:

<!-- <VidStack
  src="/sample.mp3"
  title="A Sample Audio"
/> -->

```md
<VidStack
  src="/sample.mp3"
  title="A Sample Audio"
/>
```

## Props

### src

- Type: `string`
- Required: No

Video source link.

### sources

- Type: `VidStackSource[]`

  ```ts
  interface VidStackSource {
    src: string;
    type: string;
  }
  ```

- Required: No

Detailed audio/video source with type.

### title

- Type: `string`
- Required: No

Audio/Video title

### poster

- Type: `string`
- Required: No

Video poster (not working with audio)

### alt

- Type: `string`
- Default: `poster`

Video poster alt (not working with audio)

### thumbnails

- Type: `string`
- Required: No

Video thumbnails (not working with audio)

### aspect-ratio

- Type: `${number}/${number}`
- Required: No

Video aspect ratio (not working with audio). E.g.: `16/9`

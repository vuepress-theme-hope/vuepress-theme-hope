---
title: VideoPlayer
---

::: warning Deprecated

We recommend you to use [VidStack](./vid-stack.md) for better experience.

:::

Embed videos in Markdown files.

Install `vidstack@next` package in your project first to use this component:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vidstack@next
```

@tab yarn

```bash
yarn add -D vidstack@next
```

@tab npm

```bash
npm i -D vidstack@next
```

:::

<!-- more -->

## Demo

<!-- #region demo -->

::: md-demo A video player

<VideoPlayer src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4" />

:::

::: md-demo A video player with poster, multiple sources, tracks, thumbnails and markers

<VideoPlayer
  :src="[
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
      type: 'video/mp4',
      size: 576,
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
      type: 'video/mp4',
      size: 720,
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
      type: 'video/mp4',
      size: 1080,
    },
  ]"
  poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
  :tracks="[
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
      label: 'English',
      language: 'en',
      kind: 'subtitles',
      default: true,
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
      label: 'French',
      language: 'fr',
      kind: 'subtitles',
    },
  ]"
  crossorigin
  :options="{
    title: 'View From A Blue Moon',
    iconUrl: 'https://cdn.plyr.io/3.7.8/demo.svg',
    keyboard: {
      global: true,
    },
    tooltips: {
      controls: true,
    },
    captions: {
      active: true,
    },
    previewThumbnails: {
      enabled: true,
      src: [
        'https://cdn.plyr.io/static/demo/thumbs/100p.vtt',
        'https://cdn.plyr.io/static/demo/thumbs/240p.vtt'
      ],
    },
    vimeo: {
      referrerPolicy: 'no-referrer',
    },
    mediaMetadata: {
      title: 'View From A Blue Moon',
      album: 'Sports',
      artist: 'Brainfarm',
      artwork: [
        {
          src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
          type: 'image/jpeg',
        },
      ],
    },
    markers: {
      enabled: true,
      points: [
        {
          time: 10,
          label: 'first marker',
        },
        {
          time: 40,
          label: 'second marker',
        },
        {
          time: 120,
          label: '<strong>third</strong> marker',
        }
      ],
    },
  }
  "
/>

:::

<!-- #endregion demo -->

## Props

### src

- Type: `PlayerSrc`

  ```ts
  type PlayerSrc = MediaSrc | MediaSrc[];
  type MediaSrc =
    | string
    | AudioSrc
    | VideoSrc
    | HLSSrc
    | DASHSrc
    | YouTubeSrc
    | VimeoSrc;
  ```

- Required: Yes

Video source link.

Relative URL is NOT supported. When filling in a pathname, `base` will be automatically added to the beginning of the pathname.

### tracks

- Type: `TextTrackInit[]`
- Required: No

Audio/Video subtitles and chapters.

### title

- Type: `string`
- Required: No

Audio/Video title

### poster

- Type: `string`
- Required: No

Video poster (not working with audio)

### thumbnails

- Type: `string`
- Required: No

Video thumbnails (not working with audio)

### player

- Type: `Omit<VidstackPlayerConfig, "target" | "src" | "sources" | "tracks">`
- Required: No

VidStack player options

### layout

- Type: `Partial<DefaultLayoutProps>`
- Required: No

VidStack layout options

---
title: VidStack
---

Embed [VidStack](https://www.vidstack.io/) in Markdown files.

Install `vidstack@1` package in your project first to use this component:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vidstack@1
```

@tab yarn

```bash
yarn add -D vidstack@1
```

@tab npm

```bash
npm i -D vidstack@1
```

:::

<!-- more -->

## Demo

<!-- #region demo -->

::: md-demo A video player

<VidStack src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" />

:::

::: md-demo A video player with poster, thumbnail, chapter and tracks

<VidStack
  src="https://media-files.vidstack.io/720p.mp4"
  title="Agent 327 Operation Barber Shop"
  poster="https://media-files.vidstack.io/poster-2.png"
  :sourses="[
    {
      src: 'https://media-files.vidstack.io/720p.mp4',
      type: 'video/mp4',
    },
    {
      src:  'https://media-files.vidstack.io/720p.avi',
      type: 'video/avi',
    },
    {
      src:  'https://media-files.vidstack.io/720p.ogv',
      type: 'video/ogg',
    },
  ]"
  :tracks="[
    {
      src: 'https://media-files.vidstack.io/subs/english.vtt',
      label: 'English',
      language: 'en-US',
      kind: 'subtitles',
      default: true,
    },
    {
      src: 'https://media-files.vidstack.io/subs/spanish.vtt',
      label: 'Spanish',
      language: 'es-ES',
      kind: 'subtitles',
    },
    // Chapters
    {
      src: 'https://media-files.vidstack.io/chapters.vtt',
      kind: 'chapters',
      language: 'en-US',
      default: true,
    },
  ]"
  thumbnails="https://media-files.vidstack.io/thumbnails.vtt"
  crossorigin
/>

:::

::: md-demo An audio player

<VidStack src="//theme-hope-assets.vuejs.press/files/sample.mp3" title="VidStack Audio Demo" />

:::

::: md-demo YouTube player

<VidStack
  src="youtube/_cMxraX_5RE"
  title="VidStack YouTube Demo"
/>

:::

<!-- #endregion demo -->

## Props

### src

- Type: `string`
- Required: No

Video source link.

Relative URL is NOT supported. When filling in a pathname, `base` will be automatically added to the beginning of the pathname.

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

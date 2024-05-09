---
title: VidStack
---

Embed [VidStack](https://www.vidstack.io/) in Markdown files.

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

<VidStack
  src="https://files.vidstack.io/sprite-fight/720p.mp4"
  poster="https://files.vidstack.io/sprite-fight/poster.webp"
/>

:::

::: md-demo A video player with poster, subtitles, chapters and thumbnails

<VidStack
  title="Agent 327 Operation Barber Shop"
  poster="https://files.vidstack.io/agent-327/poster.png"
  :src="[
    {
      src: 'https://files.vidstack.io/agent-327/720p.mp4',
      type: 'video/mp4',
    },
    {
      src:  'https://files.vidstack.io/agent-327/720p.avi',
      type: 'video/avi',
    },
    {
      src:  'https://files.vidstack.io/agent-327/720p.ogv',
      type: 'video/ogg',
    },
  ]"
  :tracks="[
    {
      src: 'https://files.vidstack.io/agent-327/subs/english.vtt',
      label: 'English',
      language: 'en-US',
      kind: 'subtitles',
      default: true,
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/spanish.vtt',
      label: 'Spanish',
      language: 'es-ES',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/french.vtt',
      label: 'French',
      language: 'fr-FR',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/german.vtt',
      label: 'German',
      language: 'ge-GE',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/italian.vtt',
      label: 'Italian',
      language: 'it-IT',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/russian.vtt',
      label: 'Russian',
      language: 'ru-RU',
      kind: 'subtitles',
    },
    // Chapters
    {
      src: 'https://files.vidstack.io/agent-327/chapters.vtt',
      kind: 'chapters',
      language: 'en-US',
      default: true,
    },
  ]"
  thumbnails="https://files.vidstack.io/agent-327/thumbnails.vtt"
/>

:::

::: md-demo A streaming video player

<VidStack
  src="https://files.vidstack.io/sprite-fight/hls/stream.m3u8"
  :tracks="[
    {
      src: 'https://files.vidstack.io/agent-327/subs/english.vtt',
      label: 'English',
      language: 'en-US',
      kind: 'subtitles',
      default: true,
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/spanish.vtt',
      label: 'Spanish',
      language: 'es-ES',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/french.vtt',
      label: 'French',
      language: 'fr-FR',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/german.vtt',
      label: 'German',
      language: 'ge-GE',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/italian.vtt',
      label: 'Italian',
      language: 'it-IT',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/russian.vtt',
      label: 'Russian',
      language: 'ru-RU',
      kind: 'subtitles',
    },
    // Chapters
    {
      src: 'https://files.vidstack.io/agent-327/chapters.vtt',
      kind: 'chapters',
      language: 'en-US',
      default: true,
    },
  ]"
  thumbnails="https://files.vidstack.io/agent-327/thumbnails.vtt"
/>

:::

::: md-demo An audio player

<VidStack
  src="//theme-hope-assets.vuejs.press/files/sample.mp3"
  title="VidStack Audio Demo"
/>

:::

::: md-demo YouTube player

<VidStack
  src="youtube/_cMxraX_5RE"
  title="VidStack YouTube Demo"
/>

:::

<!-- #endregion demo -->

## Streaming

VidStack supports streaming video, by default it loads `hls.js` and `dash.js` to support HLS and DASH streaming via jsdelivr CDN.

To use local version of package, install `hls.js` and `dash.js` in your project.

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

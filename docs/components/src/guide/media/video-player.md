---
title: VideoPlayer
---

Embed videos in Markdown files.

Install `plyr` package in your project first to use this component:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D plyr
```

@tab yarn

```bash
yarn add -D plyr
```

@tab npm

```bash
npm i -D plyr
```

:::

<!-- more -->

::: tip

We recommend you to use [VidStack](./vid-stack.md) for better experience.

:::

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

- Type: `string`
- Required: Yes

Video source link

Relative URL is NOT supported. When filling in a pathname, `base` will be automatically added to the beginning of the pathname.

### width

- Type: `string | number`
- Default: `100%`

Video component width.

### type

- Type: `string`
- Required: No

Video type.

::: note

If your server cannot return a correct mime type for your video files, you should specify it. (e.g.: `video/mp4`)

:::

### poster

- Type: `string`
- Required: No

Video poster

### title

- Type: `string`
- Required: No

Video title

### tracks

- Type: `UseMediaTextTrackSource[]`

  ```ts
  interface UseMediaTextTrackSource {
    /**
     * Indicates that the track should be enabled unless the user's preferences indicate
     * that another track is more appropriate
     */
    default?: boolean;
    /**
     * How the text track is meant to be used. If omitted the default kind is subtitles.
     */
    kind: TextTrackKind;
    /**
     * A user-readable title of the text track which is used by the browser
     * when listing available text tracks.
     */
    label: string;
    /**
     * Address of the track (.vtt file). Must be a valid URL. This attribute
     * must be specified and its URL value must have the same origin as the document
     */
    src: string;
    /**
     * Language of the track text data. It must be a valid BCP 47 language tag.
     * If the kind attribute is set to subtitles, then srcLang must be defined.
     */
    srcLang: string;
  }
  ```

- Required: No

Tracks for video.

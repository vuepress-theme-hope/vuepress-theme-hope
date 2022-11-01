---
title: Video Player
---

Embed videos in Markdown files.

## Props

### src

- Type: `string`
- Required: Yes

Video source link

### width

- Type: `string | number`
- Default: `100%`

Video width.

### height

- Type: `string | number`
- Required: No

Video height

### radio

- Type: `number`
- Default: `16 / 9`

Video radio, ONLY valid when `height` not set.

### type

- Type: `string`
- Required: No

Video type.

::: note

If your server cannot return a correct mime type for your video files, you should specific it. (e.g.: `video/mp4`)

:::

### poster

- Type: `string`
- Required: No

Video poster

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
     * If the kind attribute is set to subtitles, then srclang must be defined.
     */
    srcLang: string;
  }
  ```

- Required: No

Tracks for video.

## Demo

A video player:

<VideoPlayer src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm" />

```md
<VideoPlayer src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm" />
```

A video player with tracks and poster:

<VideoPlayer
  src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm"
  poster="/poster.svg"
  :tracks="[
    {
      default: true,
      src: 'https://gist.githubusercontent.com/wheatjs/a85a65a82d87d7c098e1a0972ef1f726/raw',
      kind: 'subtitles',
      label: 'English',
      srcLang: 'en',
    },
    {
      src: 'https://gist.githubusercontent.com/wheatjs/38f32925d20c683bf77ba33ff737891b/raw',
      kind: 'subtitles',
      label: 'French',
      srcLang: 'fr',
    },
  ]"
/>

```md
<VideoPlayer
  src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm"
  poster="/poster.svg"
  :tracks="[
    {
      default: true,
      src: 'https://gist.githubusercontent.com/wheatjs/a85a65a82d87d7c098e1a0972ef1f726/raw',
      kind: 'subtitles',
      label: 'English',
      srcLang: 'en',
    },
    {
      src: 'https://gist.githubusercontent.com/wheatjs/38f32925d20c683bf77ba33ff737891b/raw',
      kind: 'subtitles',
      label: 'French',
      srcLang: 'fr',
    },
  ]"
/>
```

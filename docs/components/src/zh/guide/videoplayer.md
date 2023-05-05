---
title: VideoPlayer
---

在 Markdown 文件中嵌入视频。

<!-- more -->

## 示例

一个视频播放器:

<VideoPlayer src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm" />

```md
<VideoPlayer src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm" />
```

一个包含了封面和字幕的播放器:

<VideoPlayer
  src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm"
  poster="/poster.svg"
  :tracks="[
    {
      default: true,
      src: '/assets/subtitles/en.vtt',
      kind: 'subtitles',
      label: 'English',
      srcLang: 'en',
    },
    {
      src: '/assets/subtitles/fr.vtt',
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
      src: '/assets/subtitles/en.vtt',
      kind: 'subtitles',
      label: 'English',
      srcLang: 'en',
    },
    {
      src: '/assets/subtitles/fr.vtt',
      kind: 'subtitles',
      label: 'French',
      srcLang: 'fr',
    },
  ]"
/>
```

## Props

### src

- 类型: `string`
- 必填: 是

视频文件地址

### width

- 类型: `string | number`
- 默认值: `100%`

视频宽度。

### type

- 类型: `string`
- 必填: 否

视频类型。

::: note

如果你的服务器不能为视频文件返回正确的 mime 类型，你应该指定它。 (例如：`video/mp4`)

:::

### title

- 类型: `string`
- 必填: 否

视频标题

### poster

- 类型: `string`
- 必填: 否

视频封面

### tracks

- 类型: `UseMediaTextTrackSource[]`

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

- 必填: 否

视频的音轨

---
title: VideoPlayer
---

在 Markdown 文件中嵌入视频。

使用本组件前，请先在你的项目中安装 `plyr` 包:

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

为了更好的体验，我们建议你使用 [VidStack](./vid-stack.md)。

:::

## 示例

<!-- #region demo -->

::: md-demo 一个视频播放器

<VideoPlayer src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4" />

:::

::: md-demo 一个包含了封面、多个源、缩略图、字幕和标记点的播放器

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

## 属性

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

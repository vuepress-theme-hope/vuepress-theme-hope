---
title: VidStack
---

::: warning

VidStack 有一些和 Vue 渲染的已知问题。

:::

在 Markdown 文件中嵌入 [VidStack](https://www.vidstack.io/)。

<!-- more -->

## 示例

视频播放器:

<!-- <VidStack src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" /> -->

```md
<VidStack src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" />
```

有封面和音轨的播放器:

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

一个音频播放器:

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

## 属性

### src

- 类型: `string`
- 必填: 否

视频源链接。

### sources

- 类型: `VidStackSource[]`

  ```ts
  interface VidStackSource {
    src: string;
    type: string;
  }
  ```

- 必填: 否

带有类型的详细音频/视频源。

### title

- 类型: `string`
- 必填: 否

音频/视频标题

### poster

- 类型: `string`
- 必填: 否

视频封面 (不适用于音频)

### alt

- 类型: `string`
- 默认值: `poster`

视频封面替代文字 (不适用于音频)

### thumbnails

- 类型: `string`
- 必填: 否

视频缩略图 (不适用于音频)

### aspect-ratio

- 类型: `${number}/${number}`
- 必填: 否

视频宽高比 (不适用于音频)。例如: `16/9`

---
title: VidStack
---

在 Markdown 文件中嵌入 [VidStack](https://www.vidstack.io/)。

使用本组件前，请先在你的项目中安装 `vidstack` 包:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vidstack
```

@tab yarn

```bash
yarn add -D vidstack
```

@tab npm

```bash
npm i -D vidstack
```

:::

<!-- more -->

## 示例

视频播放器:

<VidStack src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" />

```md
<VidStack src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" />
```

有封面、章节、缩略图和音轨的播放器:

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

```md
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
```

一个音频播放器:

<VidStack src="/sample.mp3" title="VidStack 示例音频" />

```md
<VidStack src="/sample.mp3" title="VidStack 示例音频" />
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

---
title: VidStack
---

在 Markdown 文件中嵌入 [VidStack](https://www.vidstack.io/)。

使用本组件前，请先在你的项目中安装 `vidstack@next` 包:

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

## 示例

<!-- #region demo -->

::: md-demo 视频播放器

<VidStack
  src="https://files.vidstack.io/sprite-fight/720p.mp4"
  poster="https://files.vidstack.io/sprite-fight/poster.webp"
/>

:::

::: md-demo 有封面、章节、缩略图和字幕的播放器

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

::: md-demo 一个流式视频播放器

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

::: md-demo 一个音频播放器

<VidStack src="//theme-hope-assets.vuejs.press/files/sample.mp3" title="VidStack 示例音频" />

:::

::: md-demo YouTube 播放器

<VidStack
  src="youtube/_cMxraX_5RE"
  title="VidStack YouTube Demo"
/>

:::

<!-- #endregion demo -->

## Streaming

## 流式

VideoStack 支持流式视频，默认通过 jsdelivr CDN 加载 `hls.js` 和 `dash.js` 以支持的 HLS 和 DASH 流式传输。

由于 jsdelivr 在大陆很不稳定，你可以在项目中安装 `hls.js` 和 `dash.js` 以使用这些包的本地版本。

## 属性

### src

- 类型: `PlayerSrc`

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

- 必填: 是

视频源链接。

不支持相对路径。当填写路径名时，`base` 将自动添加到路径名的开头。

### tracks

- 类型: `TextTrackInit[]`
- 必填: 否

视频/音频字幕和章节。

### title

- 类型: `string`
- 必填: 否

音频/视频标题

### poster

- 类型: `string`
- 必填: 否

视频封面 (不适用于音频)

### thumbnails

- 类型: `string`
- 必填: 否

视频缩略图 (不适用于音频)

### player

- 类型: `Omit<VidstackPlayerConfig, "target" | "src" | "sources" | "tracks">`
- 必填: 否

VidStack 播放器选项

### layout

- 类型: `Partial<DefaultLayoutProps>`
- 必填: 否

VidStack 布局选项

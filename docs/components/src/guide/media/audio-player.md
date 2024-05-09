---
title: AudioPlayer
---

::: warning Deprecated

We recommend you to use [VidStack](./vid-stack.md) for better experience.

:::

Embed audios in Markdown files.

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

::: md-demo An audio player

<AudioPlayer src="//theme-hope-assets.vuejs.press/files/sample.mp3" />

:::

::: md-demo An audio player with poster and title

<AudioPlayer
  src="//theme-hope-assets.vuejs.press/files/sample.mp3"
  title="A Sample Audio"
  poster="//theme-hope-assets.vuejs.press/logo.svg"
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

### player

- Type: `Omit<VidstackPlayerConfig, "target" | "src" | "sources" | "tracks">`
- Required: No

VidStack player options

### layout

- Type: `Partial<DefaultLayoutProps>`
- Required: No

VidStack layout options

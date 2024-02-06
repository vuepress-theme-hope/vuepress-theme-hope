---
title: AudioPlayer
---

Embed audios in Markdown files.

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

- Type: `string`
- Required: Yes

Audio source link

### width

- Type: `string | number`
- Default: `100%`

Audio component width.

### type

- Type: `string`
- Required: No

Audio type.

::: note

If your server cannot return a correct mime type for your audio files, you should specify it. (e.g.: `audio/mp3`)

:::

### title

- Type: `string`
- Required: No

Audio title

### poster

- Type: `string`
- Required: No

Audio poster

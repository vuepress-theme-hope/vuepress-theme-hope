---
title: AudioPlayer
---

::: warning 已废弃

为了更好的体验，我们建议你使用 [VidStack](./vid-stack.md)。

:::

在 Markdown 文件中嵌入音频。

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

::: md-demo 一个音频播放器

<AudioPlayer src="//theme-hope-assets.vuejs.press/files/sample.mp3" />

:::

::: md-demo 一个拥有标题和封面的音频播放器

<AudioPlayer
  src="//theme-hope-assets.vuejs.press/files/sample.mp3"
  title="A Sample Audio"
  poster="//theme-hope-assets.vuejs.press/logo.svg"
/>

:::

<!-- #endregion demo -->

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

### player

- 类型: `Omit<VidstackPlayerConfig, "target" | "src" | "sources" | "tracks">`
- 必填: 否

VidStack 播放器选项

### layout

- 类型: `Partial<DefaultLayoutProps>`
- 必填: 否

VidStack 布局选项

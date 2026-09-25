---
title: 媒体
icon: video
category:
  - 功能
tag:
  - 功能
  - 媒体
---

VuePress Theme Hope 通过 [`@vuepress/plugin-media`][media] 允许你嵌入视频、音频与 PDF 文档。

<!-- more -->

## 介绍

该插件注册了一组组件，你可以直接在 Markdown 文件中使用它们:

- `ArtPlayer`: 由 [ArtPlayer][artplayer] 驱动的视频播放器。
- `PDFViewer`: 由 [EmbedPDF][embedpdf] 驱动的 PDF 查看器。
- `VideoPlayer` 与 `AudioPlayer`: 由 [Video.js][videojs] 驱动的视频与音频播放器。
- `BiliBiliEmbed`、`YouTubeEmbed`、`VimeoEmbed`、`TwitchEmbed`、`DailymotionEmbed`、`TikTokEmbed` 与 `SpotifyEmbed`: 由平台自身提供的播放器。
- `YouTubePlayer`、`VimeoPlayer`、`TwitchPlayer`、`TikTokPlayer` 与 `SpotifyPlayer`: 由 Video.js 皮肤控制的播放器。

## 启用功能

该插件默认不启用，你需要在主题选项中设置 `plugins.media` 来启用它:

```ts twoslash {5-11} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    media: {
      artplayer: true,
      pdf: true,
      videojs: true,
      videojsAudio: true,
      embeds: ["bilibili", "youtube"],
    },
  },
});
```

之后你就可以在 Markdown 文件中使用这些组件:

```md
<ArtPlayer src="/assets/video.mp4" />

<BiliBiliEmbed bvid="BV1xx411c7mD" />
```

::: tip

每个组件都需要安装对应的包，缺少包时插件会跳过该组件的注册。`embeds` 中的播放器不需要安装任何包，因此它们是最轻量的选择。

:::

## 链接语法

除组件外，插件也为每个启用的组件注册了 `@[name ...props](link)` 语法。该语法必须独占一行。

```md
@[youtube title="A video" width="80%"](https://youtu.be/dQw4w9WgXcQ)

@[video autoplay loop](/assets/video.mp4)
```

链接会成为组件的资源地址，props 会作为属性传给组件，因此对象与函数类型的选项不可用。

语法名称与细节请参阅 [链接语法文档][media-link]。

## 自定义配置

`vuepress-theme-hope` 会将主题选项中的 `plugins.media` 作为插件选项传给 `@vuepress/plugin-media`。

有关可用的组件、属性与插件选项，请参阅 [媒体插件文档][media]。

[artplayer]: https://artplayer.org/
[embedpdf]: https://www.embedpdf.com/
[media]: https://ecosystem.vuejs.press/zh/plugins/features/media.html
[media-link]: https://ecosystem.vuejs.press/zh/plugins/features/media.html#链接语法
[videojs]: https://videojs.org/

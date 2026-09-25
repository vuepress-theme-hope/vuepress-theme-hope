---
title: Media
icon: video
category:
  - Feature
tag:
  - Feature
  - Media
---

VuePress Theme Hope allows you to embed videos, audios and PDF documents with [`@vuepress/plugin-media`][media].

<!-- more -->

## Introduction

The plugin registers a set of components which can be used directly in your Markdown files:

- `ArtPlayer`: Video player powered by [ArtPlayer][artplayer].
- `PDFViewer`: PDF viewer powered by [EmbedPDF][embedpdf].
- `VideoPlayer` and `AudioPlayer`: Video and audio player powered by [Video.js][videojs].
- `BiliBiliEmbed`, `YouTubeEmbed`, `VimeoEmbed`, `TwitchEmbed`, `DailymotionEmbed`, `TikTokEmbed` and `SpotifyEmbed`: Players provided by the platform itself.
- `YouTubePlayer`, `VimeoPlayer`, `TwitchPlayer`, `TikTokPlayer` and `SpotifyPlayer`: Players controlled by the Video.js skin.

## Enable Feature

The plugin is disabled by default, you should set `plugins.media` in theme options to enable it:

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

Then you can use the components in your Markdown files:

```md
<ArtPlayer src="/assets/video.mp4" />

<BiliBiliEmbed bvid="BV1xx411c7mD" />
```

::: tip

Every component needs its own package installed, and the plugin skips registering a component when its package is missing. The `embeds` players need no package, so they are the lightest option.

:::

## Link Syntax

Besides the components, the plugin also registers the `@[name ...props](link)` syntax for every enabled component. The syntax must occupy its own line.

```md
@[youtube title="A video" width="80%"](https://youtu.be/dQw4w9WgXcQ)

@[video autoplay loop](/assets/video.mp4)
```

The link becomes the source of the component, and the props are passed to it as attributes, so options taking an object or a function are not available.

See the [link syntax documentation][media-link] for the syntax names and details.

## Customize Config

`vuepress-theme-hope` passes `plugins.media` in theme options as plugin options to `@vuepress/plugin-media`.

You can check the [media plugin documentation][media] for available components, props and plugin options.

[artplayer]: https://artplayer.org/
[embedpdf]: https://www.embedpdf.com/
[media]: https://ecosystem.vuejs.press/plugins/features/media.html
[media-link]: https://ecosystem.vuejs.press/plugins/features/media.html#link-syntax
[videojs]: https://videojs.org/

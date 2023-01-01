---
title: Components
icon: plugin
category:
  - Markdown
tag:
  - Components
  - Markdown
---

By using `vuepress-plugin-components`, you can import and use some components in your Markdown files.

Available components:

- AudioPlayer
- Badge
- BiliBili
- Catalog
- CodePen
- FontIcon
- PDF
- StackBlitz
- VideoPlayer
- YouTube

By default, `<Badge />` and `<FontIcon />` is enabled.

To enable components, you should set `plugin.components.components` with an array of components name.

<!-- more -->

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      components: {
        // components you want
        components: [
          "AudioPlayer",
          "Badge",
          "BiliBili",
          "Catalog",
          "CodePen",
          "PDF",
          "StackBlitz",
          "VideoPlayer",
          "YouTube",
        ],
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      components: {
        // components you want
        components: [
          "AudioPlayer",
          "Badge",
          "BiliBili",
          "Catalog",
          "CodePen",
          "PDF",
          "StackBlitz",
          "VideoPlayer",
          "YouTube",
        ],
      },
    },
  }),
};
```

:::

## AudioPlayer

An audio player:

<AudioPlayer src="/assets/sample.mp3" />

```md
<AudioPlayer src="/assets/sample.mp3" />
```

An audio player with poster and title:

<AudioPlayer
  src="/assets/sample.mp3"
  title="A Sample Audio"
  poster="/logo.svg"
/>

```md
<AudioPlayer
  src="/assets/sample.mp3"
  title="A Sample Audio"
  poster="/logo.svg"
/>
```

See [AudioPlayer][audioplayer] page for available props.

## Badge

A badge component.

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

See [Badge][badge] page for available props.

## BiliBili

Embed BiliBili videos in Markdown files.

A bilibili video:

<BiliBili bvid="BV1kt411o7C3" />

```md
<BiliBili bvid="BV1kt411o7C3" />
```

A bilibili video with start time and page:

<BiliBili bvid="BV1kt411o7C3" ratio="16:9" time="60" page="2" />

```md
<BiliBili bvid="BV1kt411o7C3" ratio="16:9" time="60" page="2" />
```

A bilibili video with custom settings:

<BiliBili bvid="BV1kt411o7C3" low-quality no-danmaku />

```md
<BiliBili bvid="BV1kt411o7C3" low-quality no-danmaku />
```

See [BiliBili][bilibili] page for available props.

## Catalog

A component which display catalog.

Home page catalog:

<!-- markdownlint-disable MD033 -->

<div class="catalog-display-container">
  <Catalog base='/' />
</div>

<!-- markdownlint-enable MD033 -->

```md
<Catalog base='/' />
```

See [Catalog][catalog] page for available props.

## CodePen

A component which allows you to embed CodePen demo.

A demo with user and slug hash:

<CodePen user="kowlor" slug-hash="ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" :theme="$isDarkMode? 'dark': 'light'" />

```md
<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"
/>
```

A demo with link:

<CodePen link="https://codepen.io/kowlor/pen/ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" :theme="$isDarkMode? 'dark': 'light'" />

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"
/>
```

A click to run demo:

<CodePen link="https://codepen.io/keginaring/pen/XWZazwW" title="Solar System animation - Pure CSS" status="clicktorun" :theme="$isDarkMode? 'dark': 'light'" />

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Envelope w/ Hearts"
  status="clicktorun"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"
/>
```

See [CodePen][codepen] page for available props.

## FontIcon

Component which allows you to display font icons.

- Home icon: <FontIcon icon="home" />
- A big and red markdown icon: <FontIcon icon="markdown" color="red" size="32" />

```md
- Home icon: <FontIcon icon="home" />
- A big and red markdown icon: <FontIcon icon="markdown" color="red" size="32" />
```

See [FontIcon][fonticon] page for available props.

## PDF

PDF viewer component.

Default PDF viewer:

<PDF url="/assets/sample.pdf" />

```md
<PDF url="/assets/sample.pdf" />
```

PDF viewer starting with page 2 and without toolbar:

<PDF url="/assets/sample.pdf" page="2" no-toolbar />

```md
<PDF url="/assets/sample.pdf" page="2" no-toolbar />
```

See [PDF][pdf] page for available props.

## StackBlitz

Embed StackBlitz demo in Markdown files.

A StackBlitz project:

<StackBlitz id="vuepress-theme-hope" />

```md
<StackBlitz id="vuepress-theme-hope" />
```

A StackBlitz project with custom settings:

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />

```md
<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />
```

See [StackBlitz][stackblitz] page for available props.

## VideoPlayer

Embed videos in Markdown files.

A video player:

<VideoPlayer src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm" />

```md
<VideoPlayer src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm" />
```

A video player with tracks and poster:

<VideoPlayer
  src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm"
  poster="/assets/poster.svg"
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
  poster="/assets/poster.svg"
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

See [VideoPlayer][videoplayer] page for available props.

## YouTube

Embed YouTube video in Markdown files.

A YouTube video:

<YouTube id="0JJPfz5dg20" />

```md
<YouTube id="0JJPfz5dg20" />
```

A YouTube video with custom settings:

<YouTube id="0JJPfz5dg20" disable-fullscreen />

```md
<YouTube id="0JJPfz5dg20" disable-fullscreen />
```

A YouTube play list:

<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />

```md
<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />
```

See [YouTube][youtube] page for available props.

[audioplayer]: https://vuepress-theme-hope.github.io/v2/components/guide/audioplayer.html
[badge]: https://vuepress-theme-hope.github.io/v2/components/guide/badge.html
[bilibili]: https://vuepress-theme-hope.github.io/v2/components/guide/bilibili.html
[catalog]: https://vuepress-theme-hope.github.io/v2/components/guide/catalog.html
[codepen]: https://vuepress-theme-hope.github.io/v2/components/guide/codepen.html
[fonticon]: https://vuepress-theme-hope.github.io/v2/components/guide/fonticon.html
[pdf]: https://vuepress-theme-hope.github.io/v2/components/guide/pdf.html
[stackblitz]: https://vuepress-theme-hope.github.io/v2/components/guide/stackblitz.html
[videoplayer]: https://vuepress-theme-hope.github.io/v2/components/guide/videoplayer.html
[youtube]: https://vuepress-theme-hope.github.io/v2/components/guide/youtube.html

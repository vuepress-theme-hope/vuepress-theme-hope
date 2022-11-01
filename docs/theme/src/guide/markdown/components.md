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

- Badge
- BiliBili
- CodePen
- FontIcon
- PDF
- StackBlitz

By default, `<Badge />` and `<CodePen />` is enabled.

To enable components, you should set `plugin.components` with an array of components name.

<!-- more -->

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

<BiliBili bvid="BV1kt411o7C3" :ratio="9/16" :time="60" :page="2" />

```md
<BiliBili bvid="BV1kt411o7C3" :ratio="9/16" :time="60" :page="2" />
```

A bilibili video with custom settings:

<BiliBili bvid="BV1kt411o7C3" :high-quality="false" :danmaku="false" />

```md
<BiliBili bvid="BV1kt411o7C3" :high-quality="false" :danmaku="false" />
```

See [BiliBili][bilibili] page for available props.

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
- A big and red markdown icon: <FontIcon icon="markdown" color="red" :size="32" />

```md
- Home icon: <FontIcon icon="home" />
- A big and red markdown icon: <FontIcon icon="markdown" color="red" :size="32" />
```

See [FontIcon][fonticon] page for available props.

## PDF

PDF viewer component.

Default PDF viewer:

<PDF url="/sample.pdf" />

```md
<PDF url="/sample.pdf" />
```

PDF viewer without toolbar:

<PDF url="/sample.pdf" :toolbar="false" />

```md
<PDF url="/sample.pdf" :toolbar="false" />
```

PDF viewer with initial page 2:

<PDF url="/sample.pdf" :page="2" />

```md
<PDF url="/sample.pdf" :page="2" />
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

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hidedevtools />

```md
<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hidedevtools />
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
  poster="/poster.svg"
  :tracks="[
    {
      default: true,
      src: 'https://gist.githubusercontent.com/wheatjs/a85a65a82d87d7c098e1a0972ef1f726/raw',
      kind: 'subtitles',
      label: 'English',
      srcLang: 'en',
    },
    {
      src: 'https://gist.githubusercontent.com/wheatjs/38f32925d20c683bf77ba33ff737891b/raw',
      kind: 'subtitles',
      label: 'French',
      srcLang: 'fr',
    },
  ]"
/>

```md
<VideoPlayer
  src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm"
  poster="/poster.svg"
  :tracks="[
    {
      default: true,
      src: 'https://gist.githubusercontent.com/wheatjs/a85a65a82d87d7c098e1a0972ef1f726/raw',
      kind: 'subtitles',
      label: 'English',
      srcLang: 'en',
    },
    {
      src: 'https://gist.githubusercontent.com/wheatjs/38f32925d20c683bf77ba33ff737891b/raw',
      kind: 'subtitles',
      label: 'French',
      srcLang: 'fr',
    },
  ]"
/>
```

See [Video Player][videoplayer] page for available props.

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

[badge]: https://vuepress-theme-hope.github.io/v2/components/guide/badge.html
[bilibili]: https://vuepress-theme-hope.github.io/v2/components/guide/bilibili.html
[codepen]: https://vuepress-theme-hope.github.io/v2/components/guide/codepen.html
[fonticon]: https://vuepress-theme-hope.github.io/v2/components/guide/fonticon.html
[pdf]: https://vuepress-theme-hope.github.io/v2/components/guide/pdf.html
[stackblitz]: https://vuepress-theme-hope.github.io/v2/components/guide/stackblitz.html
[videoplayer]: https://vuepress-theme-hope.github.io/v2/components/guide/videoplayer.html
[youtube]: https://vuepress-theme-hope.github.io/v2/components/guide/youtube.html

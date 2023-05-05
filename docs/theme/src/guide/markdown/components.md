---
title: Components
icon: puzzle-piece
category:
  - Markdown
tag:
  - Components
  - Markdown
---

By using `vuepress-plugin-components`, you can import and use some components in your Markdown files.

Available components:

- ArtPlayer
- AudioPlayer
- Badge
- BiliBili
- CodePen
- FontIcon
- PDF
- Replit
- SiteInfo
- StackBlitz
- VideoPlayer
- YouTube

By default, `<Badge />` and `<FontIcon />` is enabled.

To enable components, you should set `plugin.components.components` with an array of components names.

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
          "CodePen",
          "PDF",
          "Replit",
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
          "CodePen",
          "PDF",
          "Replit",
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

## ArtPlayer

A video player:

<ArtPlayer src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4" />

```md
<ArtPlayer src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4" />
```

A video player with poster:

<ArtPlayer
  src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
  poster="/poster.svg"
/>

```md
<ArtPlayer
  src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
  poster="/poster.svg"
/>
```

A video player with custom settings:

<ArtPlayer
  src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
  airplay
  aspect-ratio
  auto-size
  auto-orientation
  auto-playback
  fast-forward
  flip
  fullscreen-web
  lock
  loop
  is-live
  muted
  mini-progress-bar
  pip
  screenshot
  subtitle-offset
/>

```md
<ArtPlayer
  src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
  airplay
  aspect-ratio
  auto-size
  auto-orientation
  auto-playback
  fast-forward
  flip
  fullscreen-web
  lock
  loop
  is-live
  muted
  mini-progress-bar
  pip
  screenshot
  subtitle-offset
/>
```

See <ProjectLink name="components" path="/guide/artplayer.html">ArtPlayer</ProjectLink> page for available props.

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

See <ProjectLink name="components" path="/guide/audioplayer.html">AudioPlayer</ProjectLink> page for available props.

## Badge

A badge component.

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

See <ProjectLink name="components" path="/guide/badge.html">Badge</ProjectLink> page for available props.

## BiliBili

Embed BiliBili videos in Markdown files.

A bilibili video:

<BiliBili bvid="BV1kt411o7C3" />

```md
<BiliBili bvid="BV1kt411o7C3" />
```

A bilibili video with custom settings:

<BiliBili aid="34304064" cid="109293122" ratio="9:16" time="60" autoplay page="2" />

```md
<BiliBili aid="34304064" cid="109293122" ratio="9:16" time="60" autoplay page="2" />
```

See <ProjectLink name="components" path="/guide/bilibili.html">BiliBili</ProjectLink> page for available props.

## CodePen

A component which allows you to embed CodePen demo.

A demo with user and slug hash:

<CodePen user="kowlor" slug-hash="ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" :theme="$isDarkmode? 'dark': 'light'" />

```md
<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>
```

A demo with link:

<CodePen link="https://codepen.io/kowlor/pen/ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" :theme="$isDarkmode? 'dark': 'light'" />

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>
```

A click to run demo:

<CodePen link="https://codepen.io/keginaring/pen/XWZazwW" title="Solar System animation - Pure CSS" status="clicktorun" :theme="$isDarkmode? 'dark': 'light'" />

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Envelope w/ Hearts"
  status="clicktorun"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>
```

See <ProjectLink name="components" path="/guide/codepen.html">CodePen</ProjectLink> page for available props.

## FontIcon

Component which allows you to display font icons.

- Home icon: <FontIcon icon="home" />
- A big and green share icon: <FontIcon icon="share" color="#3eaf7c" size="32" />

```md
- Home icon: <FontIcon icon="home" />
- A big and green share icon: <FontIcon icon="share" color="#3eaf7c" size="32" />
```

See <ProjectLink name="components" path="/guide/fonticon.html">FontIcon</ProjectLink> page for available props.

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

See <ProjectLink name="components" path="/guide/pdf.html">PDF</ProjectLink> page for available props.

## Replit

An embedded repl:

<Replit user="FuckDoctors" repl="Java-Test" />

```md
<Replit user="FuckDoctors" repl="Java-Test" />
```

An embedded repl with opening file:

<Replit user="FuckDoctors" repl="Java-Test" file="Main.java" />

```md
<Replit user="FuckDoctors" repl="Java-Test" file="Main.java" />
```

A repl link:

<Replit user="FuckDoctors" repl="Java-Test" plain />

```md
<Replit user="FuckDoctors" repl="Java-Test" plain />
```

## SiteInfo

Basic site info:

<SiteInfo name="Mr.Hope's Blog" url="https://mrhope.site" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />

```md
<SiteInfo name="Mr.Hope's Blog" url="https://mrhope.site" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />
```

Site info with more properties:

<SiteInfo
  name="Mr.Hope's Blog"
  desc="Where there is light, there is hope"
  url="https://mrhope.site"
  logo="https://mrhope.site/logo.svg"
  repo="https://github.com/Mister-Hope/Mister-Hope.github.io"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>

```md
<SiteInfo
  name="Mr.Hope's Blog"
  desc="Where there is light, there is hope"
  url="https://mrhope.site"
  logo="https://mrhope.site/logo.svg"
  repo="https://github.com/Mister-Hope/Mister-Hope.github.io"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>
```

See <ProjectLink name="components" path="/guide/siteinfo.html">SiteInfo</ProjectLink> page for available props.

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

See <ProjectLink name="components" path="/guide/stackblitz.html">StackBlitz</ProjectLink> page for available props.

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

See <ProjectLink name="components" path="/guide/videoplayer.html">VideoPlayer</ProjectLink> page for available props.

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

See <ProjectLink name="components" path="/guide/youtube.html">YouTube</ProjectLink> page for available props.

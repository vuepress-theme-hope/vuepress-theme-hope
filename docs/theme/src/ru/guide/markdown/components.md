---
title: Компоненты
icon: puzzle-piece
category:
  - Markdown
tag:
  - Компоненты
  - Markdown
---

Используя `vuepress-plugin-components`, вы можете импортировать и использовать некоторые компоненты в ваших файлах Markdown.

Доступные компоненты:

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

По умолчанию `<Badge />` и `<FontIcon />` включены.

Чтобы включить компоненты, вы должны установить `plugin.components.components` с массивом имен компонентов.

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

<AudioPlayer src="/assets/assets/sample.mp3" />

```md
<AudioPlayer src="/assets/assets/sample.mp3" />
```

An audio player with poster and title:

<AudioPlayer
  src="/assets/assets/sample.mp3"
  title="A Sample Audio"
  poster="/logo.svg"
/>

```md
<AudioPlayer
  src="/assets/assets/sample.mp3"
  title="A Sample Audio"
  poster="/logo.svg"
/>
```

See <ProjectLink name="components" path="/guide/audioplayer.html">AudioPlayer</ProjectLink> page for available props.

## Значок

Компонент значка.

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

Доступные свойства смотрите на странице <ProjectLink name="components" path="/guide/badge.html">Значок</ProjectLink>.

## BiliBili

Встраивайте видео BiliBili в файлы Markdown.

Видео bilibili:

<BiliBili bvid="BV1kt411o7C3" />

```md
<BiliBili bvid="BV1kt411o7C3" />
```

Видео bilibili со временем начала и страницей:

<BiliBili bvid="BV1kt411o7C3" ratio="16:9" time="60" page="2" />

```md
<BiliBili bvid="BV1kt411o7C3" ratio="16:9" time="60" page="2" />
```

Видео bilibili с пользовательскими настройками:

<BiliBili bvid="BV1kt411o7C3" low-quality no-danmaku />

```md
<BiliBili bvid="BV1kt411o7C3" low-quality no-danmaku />
```

Смотрите страницу <ProjectLink name="components" path="/guide/bilibili.html">BiliBili</ProjectLink> для доступных свойств.

## CodePen

Компонент, который позволяет встраивать демо-версию CodePen.

Демонстрация с пользователем и слаг-хешем:

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

Демо со ссылкой:

<CodePen link="https://codepen.io/kowlor/pen/ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" :theme="$isDarkmode? 'dark': 'light'" />

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>
```

Нажмите, чтобы запустить демонстрацию:

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

Доступные свойства смотрите на странице <ProjectLink name="components" path="/guide/codepen.html">CodePen</ProjectLink>.

## FontIcon

Компонент, который позволяет отображать иконки шрифтов.

- Home icon: <FontIcon icon="home" />
- A big and green share icon: <FontIcon icon="share" color="#3eaf7c" size="32" />

```md
- Home icon: <FontIcon icon="home" />
- A big and green share icon: <FontIcon icon="share" color="#3eaf7c" size="32" />
```

Доступные свойства смотрите на странице <ProjectLink name="components" path="/guide/fonticon.html">FontIcon</ProjectLink>.

## PDF

Компонент просмотра PDF.

Средство просмотра PDF по умолчанию:

<PDF url="/assets/sample.pdf" />

```md
<PDF url="/assets/sample.pdf" />
```

Просмотрщик PDF без панели инструментов, Просмотрщик PDF с начальной страницей 2:

<PDF url="/assets/sample.pdf" page="2" no-toolbar />

```md
<PDF url="/assets/sample.pdf" page="2" no-toolbar />
```

Доступные свойства смотрите на странице <ProjectLink name="components" path="/guide/pdf.html">PDF</ProjectLink>.

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

<SiteInfo name="Mr.Hope’s Blog" url="https://mrhope.site" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />

```md
<SiteInfo name="Mr.Hope’s Blog" url="https://mrhope.site" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />
```

Site info with more properties:

<SiteInfo
  name="Mr.Hope’s Blog"
  desc="Where there is light, there is hope"
  url="https://mrhope.site"
  logo="https://mrhope.site/logo.svg"
  repo="https://github.com/Mister-Hope/Mister-Hope.github.io"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>

```md
<SiteInfo
  name="Mr.Hope’s Blog"
  desc="Where there is light, there is hope"
  url="https://mrhope.site"
  logo="https://mrhope.site/logo.svg"
  repo="https://github.com/Mister-Hope/Mister-Hope.github.io"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>
```

See <ProjectLink name="components" path="/guide/siteinfo.html">SiteInfo</ProjectLink> page for available props.

## StackBlitz

Встраивайте демонстрацию StackBlitz в файлы разметки.

Проект StackBlitz:

<StackBlitz id="vuepress-theme-hope" />

```md
<StackBlitz id="vuepress-theme-hope" />
```

Проект StackBlitz с пользовательскими настройками:

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />

```md
<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />
```

Доступные свойства смотрите на странице <ProjectLink name="components" path="/guide/stackblitz.html">StackBlitz</ProjectLink>.

## VideoPlayer

Встраивание видео в файлы Markdown.

Видеоплеер:

<VideoPlayer src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm" />

```md
<VideoPlayer src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm" />
```

Видеоплеер с треками и постером:

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

Смотрите страницу <ProjectLink name="components" path="/guide/videoplayer.html">VideoPlayer</ProjectLink> для доступных свойств.

## YouTube

Встраивайте видео с YouTube в файлы разметки.

Видео YouTube:

<YouTube id="0JJPfz5dg20" />

```md
<YouTube id="0JJPfz5dg20" />
```

Видео YouTube с пользовательскими настройками:

<YouTube id="0JJPfz5dg20" disable-fullscreen />

```md
<YouTube id="0JJPfz5dg20" disable-fullscreen />
```

Плейлист на YouTube:

<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />

```md
<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />
```

Доступные свойства смотрите на странице <ProjectLink name="components" path="/guide/youtube.html">YouTube</ProjectLink>.

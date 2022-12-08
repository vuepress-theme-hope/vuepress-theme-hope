---
title: Компоненты
icon: plugin
category:
  - Markdown
tag:
  - Компоненты
  - Markdown
---

Используя `vuepress-plugin-components`, вы можете импортировать и использовать некоторые компоненты в ваших файлах Markdown.

Доступные компоненты:

- Badge
- BiliBili
- CodePen
- FontIcon
- PDF
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
          "Badge",
          "BiliBili",
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
          "Badge",
          "BiliBili",
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

## Значок

Компонент значка.

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

Доступные свойства смотрите на странице [Значок][badge].

## BiliBili

Встраивайте видео BiliBili в файлы Markdown.

Видео bilibili:

<BiliBili bvid="BV1kt411o7C3" />

```md
<BiliBili bvid="BV1kt411o7C3" />
```

Видео bilibili со временем начала и страницей:

<BiliBili bvid="BV1kt411o7C3" :ratio="9/16" :time="60" :page="2" />

```md
<BiliBili bvid="BV1kt411o7C3" :ratio="9/16" :time="60" :page="2" />
```

Видео bilibili с пользовательскими настройками:

<BiliBili bvid="BV1kt411o7C3" low-quality no-danmaku />

```md
<BiliBili bvid="BV1kt411o7C3" low-quality no-danmaku />
```

Смотрите страницу [BiliBili][bilibili] для доступных свойств.

## CodePen

Компонент, который позволяет встраивать демо-версию CodePen.

Демонстрация с пользователем и слаг-хешем:

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

Демо со ссылкой:

<CodePen link="https://codepen.io/kowlor/pen/ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" :theme="$isDarkMode? 'dark': 'light'" />

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"
/>
```

Нажмите, чтобы запустить демонстрацию:

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

Доступные свойства смотрите на странице [CodePen][codepen].

## FontIcon

Компонент, который позволяет отображать иконки шрифтов.

- Home icon: <FontIcon icon="home" />
- A big and red markdown icon: <FontIcon icon="markdown" color="red" :size="32" />

```md
- Home icon: <FontIcon icon="home" />
- A big and red markdown icon: <FontIcon icon="markdown" color="red" :size="32" />
```

Доступные свойства смотрите на странице [FontIcon][fonticon].

## PDF

Компонент просмотра PDF.

Средство просмотра PDF по умолчанию:

<PDF url="/sample.pdf" />

```md
<PDF url="/sample.pdf" />
```

Просмотрщик PDF без панели инструментов:

<PDF url="/sample.pdf" no-toolbar />

```md
<PDF url="/sample.pdf" no-toolbar />
```

Просмотрщик PDF с начальной страницей 2:

<PDF url="/sample.pdf" :page="2" />

```md
<PDF url="/sample.pdf" :page="2" />
```

Доступные свойства смотрите на странице [PDF][pdf].

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

Доступные свойства смотрите на странице [StackBlitz][stackblitz].

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

Смотрите страницу [VideoPlayer][videoplayer] для доступных свойств.

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

Доступные свойства смотрите на странице [YouTube][youtube].

[badge]: https://vuepress-theme-hope.github.io/v2/components/guide/badge.html
[bilibili]: https://vuepress-theme-hope.github.io/v2/components/guide/bilibili.html
[codepen]: https://vuepress-theme-hope.github.io/v2/components/guide/codepen.html
[fonticon]: https://vuepress-theme-hope.github.io/v2/components/guide/fonticon.html
[pdf]: https://vuepress-theme-hope.github.io/v2/components/guide/pdf.html
[stackblitz]: https://vuepress-theme-hope.github.io/v2/components/guide/stackblitz.html
[videoplayer]: https://vuepress-theme-hope.github.io/v2/components/guide/videoplayer.html
[youtube]: https://vuepress-theme-hope.github.io/v2/components/guide/youtube.html

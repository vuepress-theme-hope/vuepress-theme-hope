---
title: 组件
icon: puzzle-piece
category:
  - Markdown
tag:
  - Markdown
  - 组件
---

通过使用`vuepress-plugin-components`，你可以在你的 Markdown 文件中导入和使用一些组件。

可用组件:

- ArtPlayer
- AudioPlayer
- Badge
- BiliBili
- CodePen
- FontIcon
- PDF
- Replit
- Share
- StackBlitz
- SiteInfo
- VidStack
- VideoPlayer
- XiGua
- YouTube

默认情况下，`<Badge />` 和 `<FontIcon />` 是启用的。

要启用组件，你应该使用组件名称数组设置 `plugin.components.components`。

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
        // 你想使用的组件
        components: [
          "ArtPlayer",
          "AudioPlayer",
          "Badge",
          "BiliBili",
          "CodePen",
          "PDF",
          "Replit",
          "Share",
          "SiteInfo",
          "StackBlitz",
          "VidStack",
          "VideoPlayer",
          "XiGua",
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
        // 你想使用的组件
        components: [
          "ArtPlayer",
          "AudioPlayer",
          "Badge",
          "BiliBili",
          "CodePen",
          "PDF",
          "Replit",
          "Share",
          "SiteInfo",
          "StackBlitz",
          "VidStack",
          "VideoPlayer",
          "XiGua",
          "YouTube",
        ],
      },
    },
  }),
};
```

:::

## ArtPlayer

一个视频播放器:

<ArtPlayer src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" />

一个包含了封面的播放器:

<ArtPlayer
  src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4"
  poster="/assets/poster.svg"
/>

一个包含自定义设置的播放器:

<ArtPlayer
  src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4"
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

::: details 代码

一个视频播放器:

```md
<ArtPlayer src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" />
```

一个包含了封面的播放器:

```md
<ArtPlayer
  src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4"
  poster="/assets/poster.svg"
/>
```

一个包含自定义设置的播放器:

```md
<ArtPlayer
  src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4"
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

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/artplayer.html">ArtPlayer</ProjectLink> 页面。

## AudioPlayer

一个音频播放器:

<AudioPlayer src="/assets/assets/sample.mp3" />

一个拥有标题和封面的音频播放器:

<AudioPlayer
  src="/assets/assets/sample.mp3"
  title="A Sample Audio"
  poster="/logo.svg"
/>

::: details 代码

一个音频播放器:

```md
<AudioPlayer src="/assets/assets/sample.mp3" />
```

一个拥有标题和封面的音频播放器:

```md
<AudioPlayer
  src="/assets/assets/sample.mp3"
  title="A Sample Audio"
  poster="/logo.svg"
/>
```

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/audioplayer.html">AudioPlayer</ProjectLink> 页面。

## Badge

支持自定义颜色的徽章。

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

::: details 代码

```md
- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />
```

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/badge.html">Badge</ProjectLink> 页面。

## BiliBili

在 Markdown 文件中嵌入 B 站视频。

一个 B 站视频:

<BiliBili bvid="BV1kt411o7C3" />

一个自定义空降地址的 B 站视频:

<BiliBili aid="34304064" cid="109293122" ratio="9:16" time="60" page="2" />

::: details 代码

一个 B 站视频:

```md
<BiliBili bvid="BV1kt411o7C3" />
```

一个自定义空降地址的 B 站视频:

```md
<BiliBili aid="34304064" cid="109293122" ratio="9:16" time="60" page="2" />
```

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/bilibili.html">BiliBili</ProjectLink> 页面。

## CodePen

一个允许你嵌入 CodePen 演示的组件。

一个使用用户和 Slug Hash 的案例:

<CodePen user="kowlor" slug-hash="ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" :theme="$isDarkmode? 'dark': 'light'" />

一个使用链接的案例:

<CodePen link="https://codepen.io/kowlor/pen/ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" :theme="$isDarkmode? 'dark': 'light'" />

一个加载运行的案例:

<CodePen link="https://codepen.io/keginaring/pen/XWZazwW" title="Solar System animation - Pure CSS" status="clicktorun" :theme="$isDarkmode? 'dark': 'light'" />

::: details 代码

一个使用用户和 Slug Hash 的案例:

```md
<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>
```

一个使用链接的案例:

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>
```

一个加载运行的案例:

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Envelope w/ Hearts"
  status="clicktorun"
  :theme="$isDarkmode? 'dark': 'light'"
/>
```

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/codepen.html">CodePen</ProjectLink> 页面。

## FontIcon

允许你显示字体图标的组件。

- 主页图标: <FontIcon icon="home" />

- 一个大绿分享图标: <FontIcon icon="share" color="#3eaf7c" size="32" />

::: details 代码

```md
- 主页图标: <FontIcon icon="home" />

- 一个大绿分享图标: <FontIcon icon="share" color="#3eaf7c" size="32" />
```

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/fonticon.html">FontIcon</ProjectLink> 页面。

## PDF

PDF 浏览器组件。

默认 PDF 阅读器:

<PDF url="/assets/sample.pdf" />

禁用工具栏且初始页面为第二页的阅读器:

<PDF url="/assets/sample.pdf" page="2" no-toolbar />

::: details 代码

默认 PDF 阅读器:

```md
<PDF url="/assets/sample.pdf" />
```

禁用工具栏且初始页面为第二页的阅读器:

```md
<PDF url="/assets/sample.pdf" page="2" no-toolbar />
```

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/pdf.html">PDF</ProjectLink> 页面。

## Replit

一个 replit:

<Replit user="FuckDoctors" repl="Java-Test" />

一个 replit，并且显示指定的文件:

<Replit user="FuckDoctors" repl="Java-Test" file="Main.java" />

一个自动加载的 replit:

<Replit user="FuckDoctors" repl="Java-Test" auto-load />

::: details 代码

一个 replit:

```md
<Replit user="FuckDoctors" repl="Java-Test" />
```

一个 replit，并且显示指定的文件:

```md
<Replit user="FuckDoctors" repl="Java-Test" file="Main.java" />
```

一个自动加载的 replit:

```md
<Replit user="FuckDoctors" repl="Java-Test" auto-load />
```

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/replit.html">Replit</ProjectLink> 页面。

## Share

基础分享:

<Share />

自定义分享服务:

<Share services="qq,weibo" />
<Share :services="['qq','weibo']" />

彩色图标:

<Share colorful />

::: details 代码

基础分享:

```md
<Share />
```

自定义分享服务:

```md
<Share services="qq,weibo" />
<Share :services="['qq','weibo']" />
```

彩色图标:

```md
<Share colorful />
```

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/share.html">Share</ProjectLink> 页面。

## SiteInfo

基础站点信息:

<SiteInfo name="Mr.Hope's Blog" url="https://mister-hope.com" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />

有更多属性的站点信息:

<SiteInfo
  name="Mr.Hope's Blog"
  desc="Where there is light, there is hope"
  url="https://mister-hope.com"
  logo="https://mister-hope.com/logo.svg"
  repo="https://github.com/Mister-Hope/Mister-Hope.github.io"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>

::: details 代码

基础站点信息:

```md
<SiteInfo name="Mr.Hope's Blog" url="https://mister-hope.com" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />
```

有更多属性的站点信息:

```md
<SiteInfo
  name="Mr.Hope's Blog"
  desc="Where there is light, there is hope"
  url="https://mister-hope.com"
  logo="https://mister-hope.com/logo.svg"
  repo="https://github.com/Mister-Hope/Mister-Hope.github.io"
  preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg"
/>
```

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/siteinfo.html">SiteInfo</ProjectLink> 页面。

## StackBlitz

在 Markdown 文件中嵌入 StackBlitz 演示。

一个 StackBlitz 项目:

<StackBlitz id="vuepress-theme-hope" />

一个自定义设置的 StackBlitz 项目:

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />

::: details 代码

一个 StackBlitz 项目:

```md
<StackBlitz id="vuepress-theme-hope" />
```

一个自定义设置的 StackBlitz 项目:

```md
<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />
```

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/stackblitz.html">StackBlitz</ProjectLink> 页面。

## VidStack

视频播放器:

<VidStack src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" />

有封面、章节、缩略图和音轨的播放器:

<VidStack
  src="https://media-files.vidstack.io/720p.mp4"
  title="Agent 327 Operation Barber Shop"
  poster="https://media-files.vidstack.io/poster-2.png"
  :sourses="[
    {
      src: 'https://media-files.vidstack.io/720p.mp4',
      type: 'video/mp4',
    },
    {
      src:  'https://media-files.vidstack.io/720p.avi',
      type: 'video/avi',
    },
    {
      src:  'https://media-files.vidstack.io/720p.ogv',
      type: 'video/ogg',
    },
  ]"
  :tracks="[
    {
      src: 'https://media-files.vidstack.io/subs/english.vtt',
      label: 'English',
      language: 'en-US',
      kind: 'subtitles',
      default: true,
    },
    {
      src: 'https://media-files.vidstack.io/subs/spanish.vtt',
      label: 'Spanish',
      language: 'es-ES',
      kind: 'subtitles',
    },
    // Chapters
    {
      src: 'https://media-files.vidstack.io/chapters.vtt',
      kind: 'chapters',
      language: 'en-US',
      default: true,
    },
  ]"
  thumbnails="https://media-files.vidstack.io/thumbnails.vtt"
  crossorigin
/>

一个音频播放器:

<VidStack src="/sample.mp3" title="VidStack 示例音频" />

::: details 代码

视频播放器:

```md
<VidStack src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" />
```

有封面、章节、缩略图和音轨的播放器:

```md
<VidStack
  src="https://media-files.vidstack.io/720p.mp4"
  title="Agent 327 Operation Barber Shop"
  poster="https://media-files.vidstack.io/poster-2.png"
  :sourses="[
    {
      src: 'https://media-files.vidstack.io/720p.mp4',
      type: 'video/mp4',
    },
    {
      src:  'https://media-files.vidstack.io/720p.avi',
      type: 'video/avi',
    },
    {
      src:  'https://media-files.vidstack.io/720p.ogv',
      type: 'video/ogg',
    },
  ]"
  :tracks="[
    {
      src: 'https://media-files.vidstack.io/subs/english.vtt',
      label: 'English',
      language: 'en-US',
      kind: 'subtitles',
      default: true,
    },
    {
      src: 'https://media-files.vidstack.io/subs/spanish.vtt',
      label: 'Spanish',
      language: 'es-ES',
      kind: 'subtitles',
    },
    // Chapters
    {
      src: 'https://media-files.vidstack.io/chapters.vtt',
      kind: 'chapters',
      language: 'en-US',
      default: true,
    },
  ]"
  thumbnails="https://media-files.vidstack.io/thumbnails.vtt"
  crossorigin
/>
```

一个音频播放器:

```md
<VidStack src="/sample.mp3" title="VidStack 示例音频" />
```

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/vidstack.html">VidStack</ProjectLink> 页面。

## VideoPlayer

在 Markdown 文件中嵌入视频。

A video player:

<VideoPlayer src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4" />

一个包含了封面、多个源、缩略图、字幕和标记点的播放器:

<VideoPlayer
  :src="[
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
      type: 'video/mp4',
      size: 576,
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
      type: 'video/mp4',
      size: 720,
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
      type: 'video/mp4',
      size: 1080,
    },
  ]"
  poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
  :tracks="[
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
      label: 'English',
      language: 'en',
      kind: 'subtitles',
      default: true,
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
      label: 'French',
      language: 'fr',
      kind: 'subtitles',
    },
  ]"
  crossorigin
  :options="{
    title: 'View From A Blue Moon',
    iconUrl: 'https://cdn.plyr.io/3.7.8/demo.svg',
    keyboard: {
      global: true,
    },
    tooltips: {
      controls: true,
    },
    captions: {
      active: true,
    },
    previewThumbnails: {
      enabled: true,
      src: [
        'https://cdn.plyr.io/static/demo/thumbs/100p.vtt',
        'https://cdn.plyr.io/static/demo/thumbs/240p.vtt'
      ],
    },
    vimeo: {
      referrerPolicy: 'no-referrer',
    },
    mediaMetadata: {
      title: 'View From A Blue Moon',
      album: 'Sports',
      artist: 'Brainfarm',
      artwork: [
        {
          src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
          type: 'image/jpeg',
        },
      ],
    },
    markers: {
      enabled: true,
      points: [
        {
          time: 10,
          label: 'first marker',
        },
        {
          time: 40,
          label: 'second marker',
        },
        {
          time: 120,
          label: '<strong>third</strong> marker',
        }
      ],
    },
  }
  "
/>

::: details 代码

一个视频播放器:

```md
<VideoPlayer src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4" />
```

一个包含了封面、多个源、缩略图、字幕和标记点的播放器:

```md
<VideoPlayer
  :src="[
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
      type: 'video/mp4',
      size: 576,
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
      type: 'video/mp4',
      size: 720,
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
      type: 'video/mp4',
      size: 1080,
    },
  ]"
  poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
  :tracks="[
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
      label: 'English',
      language: 'en',
      kind: 'subtitles',
      default: true,
    },
    {
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
      label: 'French',
      language: 'fr',
      kind: 'subtitles',
    },
  ]"
  crossorigin
  :options="{
    title: 'View From A Blue Moon',
    iconUrl: 'https://cdn.plyr.io/3.7.8/demo.svg',
    keyboard: {
      global: true,
    },
    tooltips: {
      controls: true,
    },
    captions: {
      active: true,
    },
    previewThumbnails: {
      enabled: true,
      src: [
        'https://cdn.plyr.io/static/demo/thumbs/100p.vtt',
        'https://cdn.plyr.io/static/demo/thumbs/240p.vtt'
      ],
    },
    vimeo: {
      referrerPolicy: 'no-referrer',
    },
    mediaMetadata: {
      title: 'View From A Blue Moon',
      album: 'Sports',
      artist: 'Brainfarm',
      artwork: [
        {
          src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
          type: 'image/jpeg',
        },
      ],
    },
    markers: {
      enabled: true,
      points: [
        {
          time: 10,
          label: 'first marker',
        },
        {
          time: 40,
          label: 'second marker',
        },
        {
          time: 120,
          label: '<strong>third</strong> marker',
        }
      ],
    },
  }
  "
/>
```

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/videoplayer.html">VideoPlayer</ProjectLink> 页面。

## YouTube

在 Markdown 文件中嵌入 YouTube 视频。

一个 YouTube 视频:

<YouTube id="0JJPfz5dg20" />

一个自定义设置的 YouTube 视频:

<YouTube id="0JJPfz5dg20" disable-fullscreen />

一个 YouTube 播放列表:

<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />

::: details 代码

一个 YouTube 视频:

```md
<YouTube id="0JJPfz5dg20" />
```

一个自定义设置的 YouTube 视频:

```md
<YouTube id="0JJPfz5dg20" disable-fullscreen />
```

一个 YouTube 播放列表:

```md
<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />
```

:::

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/youtube.html">YouTube</ProjectLink> 页面。

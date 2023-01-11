---
title: 组件
icon: plugin
category:
  - Markdown
tag:
  - Markdown
  - 组件
---

通过使用`vuepress-plugin-components`，你可以在你的 Markdown 文件中导入和使用一些组件。

可用组件:

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
        // 你想使用的组件
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

一个音频播放器:

<AudioPlayer src="/assets/assets/sample.mp3" />

```md
<AudioPlayer src="/assets/assets/sample.mp3" />
```

一个拥有标题和封面的音频播放器:

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

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/audioplayer.html">AudioPlayer</ProjectLink> 页面。

## Badge

支持自定义颜色的徽章。

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/badge.html">Badge</ProjectLink> 页面。

## BiliBili

在 Markdown 文件中嵌入 B 站视频。

一个 B 站视频:

<BiliBili bvid="BV1kt411o7C3" />

```md
<BiliBili bvid="BV1kt411o7C3" />
```

一个自定义分 P 和空降地址的 B 站视频:

<BiliBili bvid="BV1kt411o7C3" ratio="16:9" time="60" page="2" />

```md
<BiliBili bvid="BV1kt411o7C3" ratio="16:9" time="60" page="2" />
```

一个自定义设置的 B 站视频:

<BiliBili bvid="BV1kt411o7C3" low-quality no-danmaku />

```md
<BiliBili bvid="BV1kt411o7C3" low-quality no-danmaku />
```

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/bilibili.html">BiliBili</ProjectLink> 页面。

## Catalog

一个展示目录的组件。

主页目录:

<!-- markdownlint-disable MD033 -->

<div class="catalog-display-container">
  <Catalog base='/zh/' />
</div>

<!-- markdownlint-enable MD033 -->

```md
<Catalog base='/zh/' />
```

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/catalog.html">Catalog</ProjectLink> 页面。

## CodePen

一个允许你嵌入 CodePen 演示的组件。

一个使用用户和 Slug Hash 的案例:

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

一个使用链接的案例:

<CodePen link="https://codepen.io/kowlor/pen/ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" :theme="$isDarkMode? 'dark': 'light'" />

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"
/>
```

一个加载运行的案例:

<CodePen link="https://codepen.io/keginaring/pen/XWZazwW" title="Solar System animation - Pure CSS" status="clicktorun" :theme="$isDarkMode? 'dark': 'light'" />

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Envelope w/ Hearts"
  status="clicktorun"
  :theme="$isDarkMode? 'dark': 'light'"
/>
```

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/codepen.html">CodePen</ProjectLink> 页面。

## FontIcon

允许你显示字体图标的组件。

- 主页图标: <FontIcon icon="home" />

- 一个大红 Markdown 图标: <FontIcon icon="markdown" color="red" size="32" />

```md
- 主页图标: <FontIcon icon="home" />

- 一个大红 Markdown 图标: <FontIcon icon="markdown" color="red" size="32" />
```

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/fonticon.html">FontIcon</ProjectLink> 页面。

## PDF

PDF 浏览器组件。

默认 PDF 阅读器:

<PDF url="/assets/sample.pdf" />

```md
<PDF url="/assets/sample.pdf" />
```

禁用工具栏且初始页面为第二页的阅读器:

<PDF url="/assets/sample.pdf" page="2" no-toolbar />

```md
<PDF url="/assets/sample.pdf" page="2" no-toolbar />
```

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/pdf.html">PDF</ProjectLink> 页面。

## SiteInfo

基础站点信息:

<SiteInfo name="Mr.Hope’s Blog" url="https://mrhope.site" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />

```md
<SiteInfo name="Mr.Hope’s Blog" url="https://mrhope.site" preview="https://theme-hope.vuejs.press/assets/image/mrhope.jpg" />
```

有更多属性的站点信息:

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

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/siteinfo.html">SiteInfo</ProjectLink> 页面。

## StackBlitz

在 Markdown 文件中嵌入 StackBlitz 演示。

一个 StackBlitz 项目:

<StackBlitz id="vuepress-theme-hope" />

```md
<StackBlitz id="vuepress-theme-hope" />
```

一个自定义设置的 StackBlitz 项目:

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />

```md
<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />
```

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/stackblitz.html">StackBlitz</ProjectLink> 页面。

## VideoPlayer

在 Markdown 文件中嵌入视频。

一个视频播放器:

<VideoPlayer src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm" />

```md
<VideoPlayer src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm" />
```

一个包含了封面和字幕的播放器:

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

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/videoplayer.html">VideoPlayer</ProjectLink> 页面。

## YouTube

在 Markdown 文件中嵌入 YouTube 视频。

一个 YouTube 视频:

<YouTube id="0JJPfz5dg20" />

```md
<YouTube id="0JJPfz5dg20" />
```

一个自定义设置的 YouTube 视频:

<YouTube id="0JJPfz5dg20" disable-fullscreen />

```md
<YouTube id="0JJPfz5dg20" disable-fullscreen />
```

一个 YouTube 播放列表:

<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />

```md
<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />
```

有关可用属性，请参阅 <ProjectLink name="components" path="/zh/guide/youtube.html">YouTube</ProjectLink> 页面。

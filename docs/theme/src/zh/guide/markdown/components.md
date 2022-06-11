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

- Badge
- CodePen
- FontIcon
- PDF
- StackBlitz

默认情况下，`<Badge />` 和 `<CodePen />` 是启用的。

要启用组件，你应该使用组件名称数组设置 `plugin.components`。

<!-- 更多 -->

## Badge

支持自定义颜色的徽章。

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

有关可用属性，请参阅 [Badge][badge] 页面。

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

有关可用属性，请参阅 [CodePen][codepen] 页面。

## FontIcon

允许你显示字体图标的组件。

- 主页图标: <FontIcon icon="home" />

- 一个大红 Markdown 图标: <FontIcon icon="markdown" color="red" size="32" />

```md
- 主页图标: <FontIcon icon="home" />

- 一个大红 Markdown 图标: <FontIcon icon="markdown" color="red" size="32" />
```

有关可用属性，请参阅 [FontIcon][fonticon] 页面。

## PDF

PDF 浏览器组件。

默认 PDF 阅读器:

<PDF url="/sample.pdf" />

```md
<PDF url="/sample.pdf" />
```

禁用工具栏:

<PDF url="/sample.pdf" :toolbar="false" />

```md
<PDF url="/sample.pdf" :toolbar="false" />
```

初始页面为第二页:

<PDF url="/sample.pdf" :page="2" />

```md
<PDF url="/sample.pdf" :page="2" />
```

有关可用属性，请参阅 [PDF][pdf] 页面。

## StackBlitz

在 Markdown 文件中嵌入 StackBlitz 演示。

<StackBlitz id="vuepress-theme-hope" />

```md
<StackBlitz id="vuepress-theme-hope" />
```

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hidedevtools />

```md
<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hidedevtools />
```

有关可用属性，请参阅 [StackBlitz][stackblitz] 页面。

## YouTube

在 Markdown 文件中嵌入 YouTube 视频。

<YouTube id="0JJPfz5dg20" />

```md
<YouTube id="0JJPfz5dg20" />
```

<YouTube id="0JJPfz5dg20" disable-fullscreen />

```md
<YouTube id="0JJPfz5dg20" disable-fullscreen />
```

<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />

```md
<YouTube list-type="playlist" list="PLJNLwTPak6dhCRzVelZIs2-DfBp01NX_1" />
```

有关可用属性，请参阅 [YouTube][youtube] 页面。

[badge]: https://vuepress-theme-hope.github.io/v2/components/zh/guide/badge.html
[codepen]: https://vuepress-theme-hope.github.io/v2/components/zh/guide/codepen.html
[fonticon]: https://vuepress-theme-hope.github.io/v2/components/zh/guide/fonticon.html
[pdf]: https://vuepress-theme-hope.github.io/v2/components/zh/guide/pdf.html
[stackblitz]: https://vuepress-theme-hope.github.io/v2/components/zh/guide/stackblitz.html
[youtube]: https://vuepress-theme-hope.github.io/v2/components/zh/guide/youtube.html

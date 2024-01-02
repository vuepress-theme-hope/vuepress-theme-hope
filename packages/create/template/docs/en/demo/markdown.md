---
title: Markdown Enhance
icon: fab fa-markdown
order: 2
category:
  - Guide
tag:
  - Markdown
---

VuePress basically generate pages from Markdown files. So you can use it to generate documentation or blog sites easily.

You should create and write Markdown files, so that VuePress can convert them to different pages according to file structure.

<!-- more -->

## Markdown Introduction

If you are a new learner and don't know how to write Markdown, please read [Markdown Intro](https://theme-hope.vuejs.press/cookbook/markdown/) and [Markdown Demo](https://theme-hope.vuejs.press/cookbook/markdown/demo.html).

## Markdown Config

VuePress introduce configuration for each markdown page using Frontmatter.

::: info

Frontmatter is a important concept in VuePress. If you don't know it, you need to read [Frontmatter Introduction](https://theme-hope.vuejs.press/cookbook/vuepress/page.html#front-matter).

:::

## Markdown Extension

The Markdown content in VuePress will be parsed by [markdown-it](https://github.com/markdown-it/markdown-it), which supports [syntax extensions](https://github.com/markdown-it/markdown-it#syntax-extensions) via markdown-it plugins.

### VuePress Enhancement

To enrich document writing, VuePress has extended Markdown syntax.

For these extensions, please read [Markdown extensions in VuePress](https://theme-hope.vuejs.press/basic/vuepress/markdown.html).

### Theme Enhancement

By using [`vuepress-plugin-md-enhance`][md-enhance], the theme extends more Markdown syntax and provides richer writing functions.

#### Hint box

::: v-pre

Safely use {{ variable }} in Markdown.

:::

::: info Custom Title

A custom information container with `code`, [link](#hint-box).

```js
const a = 1;
```

:::

::: tip Custom Title

A custom tip container

:::

::: warning Custom Title

A custom warning container

:::

::: caution Custom Title

A custom caution container

:::

::: details Custom Title

A custom details container

:::

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/hint.html)

#### Tabs

::: tabs#fruit

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/tabs.html)

#### Code Tabs

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-theme-hope
```

@tab yarn

```bash
yarn add -D vuepress-theme-hope
```

@tab:active npm

```bash
npm i -D vuepress-theme-hope
```

:::

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/code-tabs.html)

#### Superscript and Subscript

19^th^ H~2~O

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/sup-sub.html)

#### Align

::: center

I am center

:::

::: right

I am right align

:::

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/align.html)

#### Attrs

A **word**{#word} having id.

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/attrs.html)

#### Footnote

This text has footnote[^first].

[^first]: This is footnote content

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/footnote.html)

#### Mark

You can mark ==important words== .

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/mark.html)

#### Tasklist

- [x] Plan A
- [ ] Plan B

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/tasklist.html)

#### Image Enhancement

Support setting color scheme and size

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/image.html)

#### Component

```component VPCard
title: Mr.Hope
desc: Where there is light, there is hope
logo: https://mister-hope.com/logo.svg
link: https://mister-hope.com
background: rgba(253, 230, 138, 0.15)
```

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/component.html)

#### Include files

<!-- @include: ./README.md{11-17} -->

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/include.html)

#### Stylize

Donate Mr.Hope a cup of coffee. _Recommended_

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/stylize.html)

#### Tex

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/tex.html)

#### Chart.js

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/chartjs.html" width="100%" height="450"/>

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/chartjs.html)

#### Echarts

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/echarts.html" width="100%" height="800"/>

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/echarts.html)

#### Flowchart

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/flowchart.html" width="100%" height="450"/>

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/flowchart.html)

#### MarkMap

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/markmap.html" width="100%" height="380"/>

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/markmap.html)

#### Mermaid

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/mermaid.html" width="100%" height="620"/>

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/mermaid.html)

#### Code Demo

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/code-demo.html" width="100%" height="450"/>

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/demo.html)

#### Playground

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/playground.html" width="100%" height="480"/>

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/playground.html)

#### Kotlin Playground

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/kotlin-playground.html" width="100%" height="220"/>

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/kotlin-playground.html)

#### Vue Playground

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/vue-playground.html" width="100%" height="380"/>

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/vue-playground.html)

#### Sandpack Playground

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/sandpack.html" width="100%" height="380"/>

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/sandpack.html)

#### Reveal.js

<iframe src="https://plugin-md-enhance-demo.vuejs.press/snippet/revealjs.html" width="100%" height="400"/>

- [View Detail](https://theme-hope.vuejs.press/guide/markdown/revealjs.html)

[md-enhance]: https://md-enhance.vuejs.press/

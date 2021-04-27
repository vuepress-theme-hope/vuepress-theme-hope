---
title: Markdown
icon: markdown
category: Get Started
tags:
  - markdown
---

Every document page in VuePress is rendered by Markdown.

You need to build your document or blog page by creating and writing Markdown in the corresponding path.

<!-- more -->

## Markdown introduction

If you are a new learner and don’t know how to write Markdown, please read [Markdown Intro](../../basic/markdown/readme.md) and [Markdown Demo](../../basic/markdown/demo.md).

::: info Frontmatter

Frontmatter is a important concept in VuePress. If you don’t know it, you need to read [Frontmatter Introduction](../../basic/vuepress/markdown.md#front-matter).

:::

## VuePress enhance

To enrich document writing, VuePress has extended Markdown syntax.

For these extensions, please read [Markdown extensions in VuePress](../../basic/vuepress/markdown.md).

## Theme enhance

### Superscript and Subscript

19^th^ H~2~O

- [View Detail](../markdown/sup-sub.md)

### Align

::: center

I am center

:::

::: right

I am right align

:::

- [View Detail](../markdown/align.md)

### Footnote

This text has footnote[^first].

[^first]: This is footnote content

- [View Detail](../markdown/footnote.md)

### Mark

You can mark ==important words== .

- [View Detail](../markdown/mark.md)

### Tasklist

- [x] Plan A
- [ ] Plan B

- [View Detail](../markdown/tasklist.md)

### Flowchart

```flow
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
```

- [View Detail](../markdown/flowchart.md)

## Mermaid

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

- [View Detail](../markdown/mermaid.md)

### Tex

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

- [View Detail](../markdown/tex.md)

### Code Demo

::: demo A normal demo

```html
<h1>Mr.Hope</h1>
<p>Is <span id="very">very</span> handsome</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very handsome!");
});
```

```css
span {
  color: red;
}
```

:::

- [View Detail](../markdown/demo.md)

### Presentation

@slidestart

## Slide 1

A paragraph with some text and a [link](https://mrhope.site)

---

## Slide 2

- Item 1
- Item 2

---

## Slide 3.1

```js
const a = 1;
```

--

## Slide 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend

- [View Detail](../markdown/presentation.md)

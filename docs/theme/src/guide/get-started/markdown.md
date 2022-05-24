---
title: Markdown
icon: markdown
order: 3
category:
  - Get Started
tag:
  - Get Started
  - Markdown
---

VuePress basically generate pages from Markdown files. So you can use it to generate documentation or blog sites easily.

You should create and write Markdown files, so that VuePress can convert them to different pages according to file structure.

<!-- more -->

## Markdown Introduction

If you are a new comer and don’t know how to write Markdown, please read [Markdown Intro](../../cookbook/markdown/README.md) and [Markdown Demo](../../cookbook/markdown/demo.md).

::: info Frontmatter

Frontmatter is a important concept in VuePress. If you don’t know it, you need to read [Frontmatter Introduction](../../cookbook/vuepress/page.md#frontmatter).

:::

## VuePress Enhancement

To enrich document content, VuePress extends standard Markdown syntax.

For these extended syntax, please see [Built-in Markdown Features](../../cookbook/vuepress/markdown.md).

## Theme Enhancement

### Code Tabs

::: code-tabs

@tab yarn

```bash
yarn add -D vuepress-theme-hope
```

@tab:active npm

```bash
npm i -D vuepress-theme-hope
```

:::

- [View Detail](../markdown/code-tabs.md)

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

### Chart

::: chart A Scatter Chart

```json
{
  "type": "scatter",
  "data": {
    "datasets": [
      {
        "label": "Scatter Dataset",
        "data": [
          { "x": -10, "y": 0 },
          { "x": 0, "y": 10 },
          { "x": 10, "y": 5 },
          { "x": 0.5, "y": 5.5 }
        ],
        "backgroundColor": "rgb(255, 99, 132)"
      }
    ]
  },
  "options": {
    "scales": {
      "x": {
        "type": "linear",
        "position": "bottom"
      }
    }
  }
}
```

:::

- [View Detail](../markdown/chart.md)

### Flowchart

```flow
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
```

- [View Detail](../markdown/flowchart.md)

### Mermaid

```mermaid
flowchart TB
    c1-->a2
    subgraph one
    a1-->a2
    end
    subgraph two
    b1-->b2
    end
    subgraph three
    c1-->c2
    end
    one --> two
    three --> two
    two --> c2
```

- [View Detail](../markdown/mermaid.md)

### Tex

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

- [View Detail](../markdown/tex.md)

### Code Demo

::: normal-demo A normal demo

```html
<h1>VuePress Theme Hope</h1>
<p>Is <span id="very">very</span> powerful!</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("Very powerful!");
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

---
title: Content
icon: pen
dir:
  collapsible: false
  order: 2
  link: true
index: false
category:
  - Markdown
tag:
  - Content
  - Markdown
---

The theme provides the following ways to enrich your content.

- Footnotes: Supplementary explanation of key content
- Import files: Easily split or reuse files
- Presentation: Show content

<!-- more -->

## Demo

### component

### Footnote

This text has footnote[^first].

[^first]: This is footnote content

- [View Detail](./footnote.md)

### Include files

<!-- @include: ./demo.snippet.md{9-13} -->

- [View Detail](./include.md)

### Presentation

@slidestart

## Slide 1

A paragraph with some text and a [link](https://mister-hope.com)

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

- [View Detail](./revealjs.md)

### Tabs

::: tabs#fruit

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::

- [View Detail](./tabs.md)

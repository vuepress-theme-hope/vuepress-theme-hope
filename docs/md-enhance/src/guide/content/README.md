---
title: Content
icon: pen
dir:
  collapsible: false
  order: 2
index: false
---

<!-- #region intro -->

This plugin provides the following ways to enrich your content.

- Component: quickly insert component in M.
- Footnotes: Supplementary explanation of key content
- Import files: Easily split or reuse files
- Slideshow: Show content

<!-- #endregion intro -->

<!-- more -->

## Demo

<!-- #region demo -->

### component

```component VPCard
title: Mr.Hope
desc: Where there is light, there is hope
logo: https://mister-hope.com/logo.svg
link: https://mister-hope.com
background: rgba(253, 230, 138, 0.15)
```

- [View Detail](./component.md)

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

- [View Detail](./revealjs/README.md)

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

<!-- #endregion demo -->

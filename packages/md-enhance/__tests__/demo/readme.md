---
home: true
title: vuepress-plugin-md-enhance
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-md-enhance
tagline: Enhancement for markdown in VuePress
action:
  - text: Get Started 💡
    link: /guide/

  - text: Config 🛠
    link: /config/

features:
  - title: Superscript and subscript support
    details: Your markdown now suppport superscript and subscript
    link: /guide/sup-sub/

  - title: Footnote support
    details: Your markdown now suppport footnotes
    link: /guide/footnote/

  - title: DIY Align
    details: Let you decide to align paragraphs in the way you like
    link: /guide/align/

  - title: Mark Support
    details: Mark words and sentences in markdown
    link: /guide/flowchart/

  - title: Flowchart Support
    details: Create your flowchart in markdown
    link: /guide/flowchart/

  - title: Tex Support
    details: Markdown now have Tex Support so you can write your formula
    link: /guide/tex/

  - title: Code Demo Support
    details: You can insert code demo easily
    link: /guide/demo/

  - title: Presentation Support
    details: You can insert presentation in markdown files directly
    link: /guide/presentation/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

### Install

```bash
npm i -D vuepress-plugin-md-enhance
```

Or

```bash
yarn add -D vuepress-plugin-md-enhance
```

### Usage

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // your options
      },
    ],
  ],
};
```

## Theme enhance

::: tip AAA

NSdjaisdoj oi

:::

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

### Flowchart

```flow
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
```

- [View Detail](../markdown/flowchart.md)

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

---
title: Slide page
icon: slides
layout: Slide
---

<!-- markdownlint-disable MD024 MD033 MD051 -->

@slidestart

<!-- .slide: data-transition="slide" -->

## Slide Demo

<!-- .element: class="r-fit-text" -->

A simple slide demo and useful hints.

<!-- .element: class="r-fit-text" -->

> By Mr.Hope. Please scroll mouse wheel down to the next slide

---

<!-- .slide: data-transition="slide" data-auto-animate -->

## Marking Slides

<!-- .element: class="r-fit-text" -->

[👇](#/1/1)

--

<!-- .slide: data-transition="slide" data-auto-animate -->

## Marking Slides

<!-- .element: class="r-fit-text" -->

Use `---` to mark horizontal slides

<!-- .element: class="fragment fade-in" -->

Use `--` to separate vertical slides in a horizontal slide.

<!-- .element: class="fragment fade-in" -->

Use `<!-- .slide: ... -->` to add attributes to slide

<!-- .element: class="fragment fade-in" -->

Use `<!-- .element: ... -->` to add attributes to the previous html element

<!-- .element: class="fragment fade-in" -->

---

<!-- .slide: data-transition="slide" data-auto-animate -->

## Markdown

<!-- .element: class="r-fit-text" -->

You can use all kinds of markup in slides.

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Markdown

You can use all kinds of markup in slides.

### This is a H3

Headings will transform to UPPERCASE by default.

Here is paragraph with some **bold**, _italic_, ~~strike-through~~ text and a [link](https://mrhope.site), and it can auto break itself so you don't need to worry the length.

--

<!-- .slide: data-auto-animate -->

## Markdown

You can use all kinds of markup in slides.

List is `inline-block` by default.

- Item
- Item
- Item

1. Item 1
1. Item 2
1. Item 3

--

<!-- .slide: data-auto-animate -->

## Markdown

You can use all kinds of markup in slides.

Code block will get auto highlight if you enable `highlight` plugin.

```js
const a = 1;
```

--

<!-- .slide: data-auto-animate -->

## Markdown

You can use all kinds of markup in slides.

You can also write math equation using tex syntax if you enable `math` plugin.

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

--

<!-- .slide: data-auto-animate -->

## Markdown

You can use all kinds of markup in slides.

⚠**Note**: Table, hr and other nonstandard Markdown syntax is not supported.

---

<!-- .slide: data-transition="slide" data-auto-animate -->

## Layout

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate  -->

## Layout

<!-- .element: class="r-fit-text" -->

👆 The `r-fit-text` class makes text as large as possible without overflowing the slide.

--

<!-- .slide: data-auto-animate  -->

## Layout

![Logo](/logo.svg)

<!-- .element: class="r-stretch" -->

👆 The `r-stretch` class helper lets you resize an element, like an image or video, to cover the remaining vertical space in a slide.

--

<!-- .slide: data-auto-animate data-background-color="rgb(70, 70, 255)" -->

## Layout

### Background

Custom background by adding `data-background` attribute to slide.

---

<!-- .slide: data-auto-animate -->

## Fragment

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-auto-animate -->

## Fragment

<!-- .element: class="r-fit-text" -->

Fragments are used to highlight or incrementally reveal individual elements on a slide.

Add `fragment` and animation class to element.

--

<!-- .slide: data-auto-animate -->

## Fragment

### Animation class

- `fade-in`
<!-- .element: class="fragment fade-in" -->

- `fade-out`
<!-- .element: class="fragment fade-out" -->

- `fade-up`
<!-- .element: class="fragment fade-up" -->

<!-- list break -->

- `fade-down`
<!-- .element: class="fragment fade-down" -->

- `fade-left`
<!-- .element: class="fragment fade-left" -->

- `fade-right`
<!-- .element: class="fragment fade-right" -->

<!-- list break -->

- `fade-in-then-out`
<!-- .element: class="fragment fade-in-then-out" -->

- `fade-in-then-semi-out`
<!-- .element: class="fragment fade-in-then-semi-out" -->

--

<!-- .slide: data-auto-animate -->

## Fragment

### Animation class

- `grow`
<!-- .element: class="fragment grow" -->

- `shrink`
<!-- .element: class="fragment shrink" -->

- `strike`
<!-- .element: class="fragment strike" -->

<!-- list break -->

- `highlight-red`
<!-- .element: class="fragment highlight-red" -->

- `highlight-green`
<!-- .element: class="fragment highlight-green" -->

- `highlight-blue`
<!-- .element: class="fragment highlight-blue" -->

<!-- list break -->

- `highlight-current-red`
<!-- .element: class="fragment highlight-current-red" -->

- `highlight-current-green`
<!-- .element: class="fragment highlight-current-green" -->

- `highlight-current-blue`
<!-- .element: class="fragment highlight-current-blue" -->

--

<!-- .slide: data-auto-animate -->

## Fragment

### Multiple fragments

Multiple fragments can be applied to the same element sequentially by wrapping it

<span class="fragment fade-in">
  <span class="fragment highlight-red">
    <span class="fragment fade-out">
      Fade in > Turn red > Fade out
    </span>
  </span>
</span>

--

<!-- .slide: data-auto-animate -->

## Fragment

### Order

Order can be changed using the `data-fragment-index` attribute.

Multiple elements can appear at the same index.

- Appears last
<!-- .element: class="fragment" data-fragment-index="3"-->

- Appears second
<!-- .element: class="fragment" data-fragment-index="2"-->

<!-- list break -->

- Appears first
<!-- .element: class="fragment" data-fragment-index="1"-->

- Appears second
<!-- .element: class="fragment" data-fragment-index="2"-->

---

<!-- .slide: data-transition="slide" data-auto-animate -->

## Transition

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-transition="slide" data-auto-animate -->

## Transition

<!-- .element: class="r-fit-text" -->

Transition can be changed by setting the `transition` config option globally or `data-transition` attribute on slide.

Possible values:

- none
- fade
- slide

<!-- list break -->

- convex
- concave
- zoom

--

<!-- .slide: data-auto-animate -->

## Transition

<!-- .element: class="r-fit-text" -->

### Auto animate

`data-auto-animate` can be added on nearby slides to make an animation on unchanged elements.

---

<!-- .slide: data-transition="slide" data-auto-animate -->

## Functions

<!-- .element: class="r-fit-text" -->

--

<!-- .slide: data-transition="slide" data-auto-animate -->

## Functions

<!-- .element: class="r-fit-text" -->

### Code

By enabling `highlight` plugin, you can highlight code blocks.

You can use `[a-b|c-d]` syntax to highlight lines by steps.

```js [1-2|3|4]
let a = 1;
let b = 2;
let c = (x) => 1 + 2 + x;
c(3);
```

--

<!-- .slide: data-transition="slide" data-auto-animate -->

## Functions

<!-- .element: class="r-fit-text" -->

### Overview

Press `Esc` or `O` to enter overview mode when the presentation is active

--

<!-- .slide: data-transition="slide" data-auto-animate -->

## Functions

<!-- .element: class="r-fit-text" -->

### Full Screen

Press `F` or `F11` to enter fullscreen when the presentation is active

--

<!-- .slide: data-transition="slide" data-auto-animate -->

## Functions

<!-- .element: class="r-fit-text" -->

### Zoom

Hold down the `alt` key (`ctrl` in Linux) and click on any element to zoom towards it.

Click again to zoom back out.

---

<!-- .element: class="r-fit-text" -->

## The End

@slideend

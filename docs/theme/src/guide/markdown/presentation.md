---
title: Presentation
icon: slides
category: markdown
tags:
  - slides
  - markdown
---

Let the Markdown file in your VuePress site support presentation.

<!-- more -->

<!--lint disable no-duplicate-headings-->

## Configuration

```js {5}
module.exports = {
  themeConfig: {
    mdEnhance: {
      // or you can pass an object to config reveal.js
      presentation: true,
    },
  },
};
```

This plugin is using [reveal.js](https://revealjs.com/) to support this feature.

## Syntax

- Use `---` to split slides
- Use `--` to split the slides second time (vertical display)

```md
@slidestart [theme]

<!-- slide1 -->

---

<!-- slide2 -->

---

<!-- slide3 -->

@slideend
```

Theme available(replace `[theme]` with them):

- `auto` (Default)
- `black`
- `white`
- `league`
- `beige`
- `sky`
- `night`
- `serif`
- `simple`
- `solarized`
- `blood`
- `moon`

For details, see [Themes demo](https://vuepress-theme-hope.github.io/md-enhance/guide/presentation/themes/).

## Demo

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

````md
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
````

For detailed demo, please see [Presentation Demo](https://vuepress-theme-hope.github.io/md-enhance/guide/presentation/demo/)

## Options

You can set `reveal` to pass options to reveal.js per page in frontmatter, you can also set `presentation` in plugin options to set reveal.js globally.

For more options, see [reveal.js config](https://revealjs.com/config/). For more usage, see [reveal.js documatation](https://revealjs.com/)

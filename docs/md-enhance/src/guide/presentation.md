---
icon: presentation
---

# Presentation support

<!--lint disable no-duplicate-headings-->

Let the Markdown file in your VuePress site support presentation.

## Configuration

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // Enable presentation
        presentation: true,
      },
    ],
  ],
};
```

This plugin is using [reveal.js](https://revealjs.com/) to support this feature.

You can also pass an object for configuration.

`presentation.plugins` receives an array of strings, allowing you to freely config whether to enable some preset plugins.

::: tip

Acceptable plugins are:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

:::

You can also use `presentation.revealConfig` set configuration options passed to Reveal.js globally.

Reveal.js also provides [more plugins](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware). If you need a specific plugin, please submit a [Feature Request](https://github.com/Mister-Hope/vuepress-theme-hope/issues/new?assignees=Mister-Hope&labels=enhancement&template=feature_request.md&title=%5BFeature+Request%5D) on GitHub.

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

Theme available:

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

## Options

You can set `reveal` to pass options to reveal.js per page in frontmatter, you can also set `presentation` in plugin options to set reveal.js globally.

For more options, see [reveal.js config](https://revealjs.com/config/). For more usage, see [reveal.js documatation](https://revealjs.com/)

## Themes

<!-- markdownlint-disable -->

### Auto

@slidestart

## Slide Title

A paragraph with some text and a [link](https://mrhope.site)

---

## Highlight

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Black

@slidestart black

## Slide Title

A paragraph with some text and a [link](https://mrhope.site)

---

## Highlight

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### White

@slidestart white

## Slide Title

A paragraph with some text and a [link](https://mrhope.site)

---

## Highlight

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### League

@slidestart league

## Slide Title

A paragraph with some text and a [link](https://mrhope.site)

---

## Highlight

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Beige

@slidestart beige

## Slide Title

A paragraph with some text and a [link](https://mrhope.site)

---

## Highlight

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Sky

@slidestart sky

## Slide Title

A paragraph with some text and a [link](https://mrhope.site)

---

## Highlight

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Night

@slidestart night

## Slide Title

A paragraph with some text and a [link](https://mrhope.site)

---

## Highlight

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Serif

@slidestart serif

## Slide Title

A paragraph with some text and a [link](https://mrhope.site)

---

## Highlight

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Simple

@slidestart simple

## Slide Title

A paragraph with some text and a [link](https://mrhope.site)

---

## Highlight

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Solarized

@slidestart solarized

## Slide Title

A paragraph with some text and a [link](https://mrhope.site)

---

## Highlight

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Blood

@slidestart blood

## Slide Title

A paragraph with some text and a [link](https://mrhope.site)

---

## Highlight

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

### Moon

@slidestart moon

## Slide Title

A paragraph with some text and a [link](https://mrhope.site)

---

## Highlight

```js
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

<!-- markdownlint-restore -->

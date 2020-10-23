# Presentation support

<!--lint disable no-duplicate-headings-->

Let the Markdown file in your VuePress site support presentation.

## Configuration

```js {3,5,6}
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

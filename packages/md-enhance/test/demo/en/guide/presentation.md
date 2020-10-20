# Presentation support

Let the Markdown file in your VuePress site support presentation.

## Configuration

```js {3,5,6}
module.exports = {
  plugin: [
    "md-enhance",
    {
      // Enable presentation
      presentation: true,
    },
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

A paragraph with some text and a [link](http://mrhope.site)

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

$$ J(\theta_0,\theta_1) = \sum_{i=0} $$

@slideend

````md
@slidestart

## Slide 1

A paragraph with some text and a [link](http://mrhope.site)

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

$$ J(\theta_0,\theta_1) = \sum_{i=0} $$

@slideend
````

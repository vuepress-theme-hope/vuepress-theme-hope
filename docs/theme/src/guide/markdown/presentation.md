---
title: Presentation
icon: slides
category:
  - Markdown
tag:
  - Markdown
  - Slides
---

Let the Markdown file in your VuePress site support presentation.

<!-- more -->

<!--lint disable no-duplicate-headings-->

## Configuration

:::: code-group

::: code-group-item TS

```ts {7-9}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        presentation: true,
      },
    },
  },
});
```

:::

::: code-group-item JS

```js {7-9}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        presentation: true,
      },
    },
  },
});
```

:::

::::

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

:::

You can also use `presentation.revealConfig` set configuration options passed to Reveal.js globally.

Reveal.js also provides [more plugins](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware). If you need a specific plugin, please submit a [Feature Request](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues/new?assignees=Mister-Hope&labels=enhancement&template=feature_request.md&title=%5BFeature+Request%5D) on GitHub.

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

For details, see [Themes demo][theme-demo].

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

::: info

For detailed demo, please see [Presentation Demo][presentation-demo]

:::

## Options

You can set `reveal` to pass options to reveal.js per page in frontmatter, you can also set `presentation` in plugin options to set reveal.js globally.

For more options, see [reveal.js config](https://revealjs.com/config/). For more usage, see [reveal.js documatation](https://revealjs.com/)

[theme-demo]: https://vuepress-theme-hope.github.io/v2/md-enhance/guide/presentation/themes.html
[presentation-demo]: https://vuepress-theme-hope.github.io/v2/md-enhance/guide/presentation/demo.html

---
title: Presentation
icon: person-chalkboard
category:
  - Markdown
tag:
  - Markdown
  - Slides
---

<!-- @include: @md-enhance/guide/content/revealjs/README.md#before -->

::: code-tabs#language

@tab TS

```ts {8-10} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        revealJs: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        revealJs: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/content/revealjs/README.md#options -->

For the appearance of each theme, see <ProjectLink name="md-enhance" path="/guide/content/revealjs/themes.html">Themes demo</ProjectLink>.

## Demo

::: md-demo Simple presentation demo

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

:::

::: info

For detailed demo, please see <ProjectLink name="md-enhance" path="/guide/content/revealjs/demo.html">Presentation demo</ProjectLink>

:::

<!-- @include: @md-enhance/guide/content/revealjs/README.md#customize -->

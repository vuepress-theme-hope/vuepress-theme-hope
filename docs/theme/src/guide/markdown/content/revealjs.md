---
title: Presentation
icon: person-chalkboard
category:
  - Markdown
tag:
  - Markdown
  - Slides
---

Add presentation in your VuePress site via Reveal.js.

<!-- more -->

## Settings

Install `@vuepress/plugin-revealjs` in your project:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D @vuepress/plugin-revealjs@next
```

@tab yarn

```bash
yarn add -D @vuepress/plugin-revealjs@next
```

@tab npm

```bash
npm i -D @vuepress/plugin-revealjs@next
```

:::

Then enabling via:

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    revealjs: true,
  },
});
```

## Slide Syntax

- Use `---` to split slides
- Use `--` to split the slides second time (vertical display)

```md
@slidestart

<!-- slide1 -->

---

<!-- slide2 -->

---

<!-- slide3 -->

@slideend
```

::: details A basic demo

@slidestart

## Slide Title

A paragraph with some text and a [link](https://mister-hope.com)

---

## Highlight

```js [2-4|1-5]
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

````md
@slidestart

## Slide Title

A paragraph with some text and a [link](https://mister-hope.com)

---

## Highlight

```js [2-4|1-5]
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend
````

:::

By default, we use `auto` theme to render the presentation, but you can also use other themes with `@slidestart THEME_NAME`.

You can enable the following themes in reveal.js via `themes` in plugin options:

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

For the appearance of each theme, see [Themes demo][revealjs-themes-demo].

::: important Assets Path

Since Markdown contents between `@slidestart` and `@slideend` are handled by Reveal.js at browser, so you can only use absolute paths for assets in slides, which must be accessible directly in browser, relative paths or alias are not supported.

:::

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

For detailed demo, please see [revealjs-demo][revealjs-demo].

:::

## Customize Reveal.js

### Built-in Plugins

You can enable built-in plugins in reveal.js via `plugins` in plugin options. It accepts an array of the following plugin names:

- `highlight`
- `math`
- `search`
- `notes`
- `zoom`

::: note

`markdown` plugin is enabled anyway to support markdown grammar.

:::

### Advanced Configuration

You can also import and call `defineRevealJsConfig` in [client config file](../../../cookbook/vuepress/config.md#client-config-file) to customize reveal.js:

```ts title=".vuepress/client.ts"
import { defineRevealJsConfig } from "@vuepress/plugin-revealjs/client";

defineRevealJsConfig({
  // reveal.js options here
});
```

::: note

Reveal.js also provides [more plugins](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware), you can add them via `plugin` option in `defineRevealJsConfig`. Built-in plugins you request at node side will be added automatically.

:::

### Per Page Configuration

You can also set `revealJs` to pass options to reveal.js per page in frontmatter.

For reveal.js options, see [reveal.js config](https://revealjs.com/config/). For reveal.js usage, see [reveal.js documentation](https://revealjs.com/)

[revealjs-demo]: https://ecosystem.vuejs.press/plugins/markdown/revealjs/demo.html
[revealjs-themes-demo]: https://ecosystem.vuejs.press/plugins/markdown/revealjs/themes.html

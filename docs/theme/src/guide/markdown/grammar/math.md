---
title: Math
icon: square-root-variable
category:
  - Markdown
tag:
  - Markdown
  - Math
---

Adds $\TeX$ support in your VuePress site.

<!-- more -->

## Settings

Install related $\TeX$ package [katex](https://katex.org) or [mathjax-full](https://docs.mathjax.org/en/latest/) in your project:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D katex
# or
pnpm add -D mathjax-full
```

@tab yarn

```bash
yarn add -D katex
# or
yarn add -D mathjax-full
```

@tab npm

```bash
npm i -D katex
# or
npm i -D mathjax-full
```

:::

Then enabling via:

```ts twoslash {6} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    math: {
      type: "katex", // or 'mathjax'
    },
  },
});
```

## Syntax

- Inline mode: `$xxx$`

- Display mode:

  ```md
  $$xxx$$

  $$
  xxx
  $$
  ```

::: md-demo Escaping

Escaping can be done by using `\` before the `$` character, or adding space both before and after the `$` character.

The $a=1$ is a TeX equation, while $ a=1 $ and \$a=1$ is not.

:::

## Demo

::: md-demo Inline

Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

:::

::: md-demo Display

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
$$

:::

## Playground

<!-- markdownlint-disable -->

<KatexPlayground />

<!-- markdownlint-restore -->

## Support List

Plugin tutorial and FAQs: [TeX](https://mdit-plugins.github.io/tex.html#tex-tutorial)

Katex:

- [KaTeX Support Features](https://katex.org/docs/supported.html)
- [KaTeX Support List](https://katex.org/docs/support_table.html)

Mathjax:

- [Supported TeX/LaTeX commands](https://docs.mathjax.org/en/latest/input/tex/macros/index.html#tex-commands)

### Using KaTeX

When using KaTeX, any other options will be passed to KaTeX as `KatexOptions`. See [KaTeX Docs](https://katex.org/docs/options.html) for all available options.

Besides, 2 special options are supported:

- `copy`: enable copy extension or not.
- `mhchem`: enable mhchem extension or not.

### Using MathJax

When using MathJax, you can set:

- `tex`: options which is passed to TeX input parser
- `output`: either `'svg'` (default) or `'chtml'` to change output format between SVG and HTML.
- `chtml`: options which is passed to Common HTML output parser
- `svg`: options which is passed to SVG output parser

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const KatexPlayground = defineAsyncComponent(()=> import('@KatexPlayground'));
</script>

---
title: TeX
icon: square-root-variable
---

Let the Markdown file in your VuePress site support the $\TeX$ syntax.

<!-- more -->

## Config

::: code-tabs#language

@tab TS

```ts {7-10}
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable Tex Support using katex
      katex: true,
      // Enable Tex Support using mathjax
      mathjax: true,
    }),
  ],
};
```

@tab JS

```js {7-10}
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable Tex Support using katex
      katex: true,
      // Enable Tex Support using mathjax
      mathjax: true,
    }),
  ],
};
```

:::

You can only enable ONE of them, and katex has a higher priority.

## Syntax

- Inline mode: `$xxx$`

- Display mode:

  ```md
  $$xxx$$

  $$
  xxx
  $$
  ```

::: tip Escaping

Escaping can be done by using `\` before the `$` character, or adding space both before and after the `$` character:

- The $a=1$ is a TeX equation, while $ a=1 $ and \$a=1$ is not.

```md
- The $a=1$ is a TeX equation, while $ a=1 $ and \$a=1$ is not.
```

:::

## Demo

Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

```md
Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
```

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
$$

```md
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
$$
```

## Playground

<!-- markdownlint-disable -->

<KatexPlayground />

<!-- markdownlint-restore -->

## Support List

Katex:

- [KaTeX Support Features](https://katex.org/docs/supported.html)
- [KaTeX Support List](https://katex.org/docs/support_table.html)

Mathjax:

- [Supported TeX/LaTeX commands](https://docs.mathjax.org/en/latest/input/tex/macros/index.html#tex-commands)

## Advanced

::: info KaTeX

When using KaTeX, you can pass an object to `katex` as `KatexOptions`. It will be passed to KaTeX. Please see [KaTeX Docs](https://katex.org/docs/options.html) for available options.

Also, 2 special options are supported:

- `copy`: enable copy extension by setting it to `true`.
- `mhchem`: enable mhchem extension by setting it to `true`.

:::

::: info Mathjax

When using mathjax, you can pass an object to `mathjax`.

You can set `output` option to either `svg` (default) or `chtml` to change between SVG and HTML output.

Also, you can set `tex` option which is passed to TeX input parser, and you can set `chtml` or `svg` option based on your output syntax which is passed to Common HTML output parser and SVG output parser.

:::

## Tex Tutorial

- [Tex Tutorial](https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes)
- [Tex Cheat Sheets](https://mdit-plugins.github.io/tex.html#tex-tutorial)

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const KatexPlayground = defineAsyncComponent(()=> import('@KatexPlayground'));
</script>

---
title: TeX
icon: tex
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

## Grammar

### Inline Syntax

Use `$codes$`.

```md
Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
```

Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

### Block Syntax

Use `$$codes$$`.

```md
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
$$
```

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}
$$

## Playground

<!-- markdownlint-disable -->

<KatexPlayground />

<!-- markdownlint-restore -->

## Support List

Katex:

- [$\KaTeX$ Support Features](https://katex.org/docs/supported.html)
- [$\KaTeX$ Support List](https://katex.org/docs/support_table.html)

Mathjax:

- [Supported TeX/LaTeX commands](https://docs.mathjax.org/en/latest/input/tex/macros/index.html#tex-commands)

## Advanced

::: info KaTeX

When using KaTeX, you can pass an object to `katex` as `KatexOptions`. It will be passed to KaTeX. Please see [KaTeX Docs](https://katex.org/docs/options.html) for available options.

Also, a special option `mhchem` is supported for you to enable mhchem extension by setting it to `true`.

:::

::: info Mathjax

When using mathjax, you can pass an object to `mathjax`.

You can set `output` option to either `svg` (default) or `chtml` to change between SVG and HTML output.

Also, you can set `tex` option which is passed to TeX input parser, and you can set `chtml` or `svg` option based on your output syntax which is passed to Common HTML output parser and SVG output parser.

:::

## Tex Tutorial

### Operator

- Some operators can be entered directly in math mode; others need to be generated using control sequences:

  - `+`: $+$
  - `-`: $-$
  - `\times`: $\times$
  - `\ div`: $\div$
  - `=`: $=$
  - `\pm`: $\pm$
  - `\cdot`: $\cdot$
  - `\cup`: $\cup$
  - `\geq`: $\geq$
  - `\leq`: $\leq$
  - `\neq`: $\neq$
  - `\approx`: $\approx$
  - `\equiv`: $\equiv$
  - `\quad`: $\quad$ (blank separator)

- Radical: `\sqrt{xxx}` $\sqrt{xxx}$

- Fraction `\frac{aaa}{bbb}` $\frac{aaa}{bbb}$ (the first parameter is the numerator and the second is the denominator).

- Sum: `\sum` $\sum$

- Tandem: `\prod` $\prod$

- Limit: `\lim` $\lim$

- Points: `\int` $\int$

- Multiple points:
  - `\iint`: $\iint$
  - `\iiint`: $\iiint$
  - `\liiiint`: $\liiiint$ (Use `\iiiint` for block as normal)
  - `\idotsint` $\idotsint$

::: tip

Large operators such as continuous addition, multiplication, limits, and integrals can use `\limits` and `\nolimits` to force explicitly specify compress these superscripts or not.

`\iiiint`($\liiiint$) is support by hack, so for inline display you should use `\liiiint`.

`\varoiint`, `\sqint`, `\sqiint`, `\ointctrclockwise`, `\ointclockwise`, `\varointclockwise`, `\varointctrclockwise`, `\fint`, `\landupint`, `\landdownint` are not supported currently.

:::

::: tip Case

$\sqrt{x}$, $\frac{1}{2}$.

$\sum_{i=1}^n i\; \prod_{i=1}^n$

$\sum\limits _{i=1}^n i\; \prod\limits_{i=1}^n$

$\iint_1^2 x^2\; \iiint_1^2 x^2\; \liiiint_1^2 x^2\; \idotsint_1^2 x^2$

$\iint\limits_1^2 x^2\; \iiint\limits_1^2 x^2\; \liiiint\limits_1^2 x^2\; \idotsint\limits_1^2 x^2$

$$
\iint_1^2 x^2\; \iiint_1^2 x^2\; \iiiint_1^2 x^2\; \idotsint_1^2 x^2
$$

```md
$\sqrt{x}$, $\frac{1}{2}$.

$\sum_{i=1}^n i\; \prod_{i=1}^n$

$\sum\limits _{i=1}^n i\; \prod\limits _{i=1}^n$

$\iint_1^2 x^2\; \iiint_1^2 x^2\; \liiiint_1^2 x^2\; \idotsint_1^2 x^2$

$\iint\limits_1^2 x^2\; \iiint\limits_1^2 x^2\; \liiiint\limits_1^2 x^2\; \idotsint\limits_1^2 x^2$

$$\iint_1^2 x^2\; \iiint_1^2 x^2\; \iiiint_1^2 x^2\; \idotsint_1^2 x^2$$
```

:::

### Symbol

- English letters can be entered directly

  $a \quad b \quad c \quad x \quad y \quad z \quad A \quad B \quad C$

  ```md
  $a \quad b \quad c \quad x \quad y \quad z \quad A \quad B \quad C$
  ```

- Greek characters use `\characterName` to enter symbols, and output capital letters when the first letter is capitalized.

  $\alpha \quad \beta \quad \gamma \quad \Omega \quad \Delta \quad \Gamma$

  ```md
  $\alpha \quad \beta \quad \gamma \quad \Omega \quad \Delta \quad \Gamma$
  ```

- Other mathematical expressions can be used correspondingly

  $\log_{a}{b} \quad \partial x$

  ```md
  $\log_{a}{b} \quad \partial x$
  ```

### Superscript and Subscript

- Superscript, use `^` to achieve
- Subscript, use `_` to achieve
- By default, superscript and subscript only apply to the next character. To work with multiple consecutive characters, please enclose these characters in curly brackets `{}`.

#### Demo

Einstein ’s $E=mc^2$.

$2^{10} > 1000$

```md
Einstein ’s $E=mc^2$.

$2^{10} > 1000$
```

### Delimiters (parentheses, etc.)

Various parentheses are represented by commands such as `()`, `[]`, `\{\}`, `\langle\rangle`.

::: tip

Note that curly braces are usually used to enter command and environment parameters, so they must be preceded by `\` in mathematical formulas.

Because the application of `|` and `\|` in LaTeX is too casual, we recommend using `\lvert\rvert` and `\ lVert\rVert` instead.

:::

To adjust the size of these delimiters, we recommend using `\big`, `\Big`, `\bigg`, `\Bigg` and a series of commands to adjust the size before the above brackets.

$\Biggl(\biggl(\Bigl(\bigl((x)\bigr)\Bigr)\biggr)\Biggr)$
$\Biggl[\biggl[\Bigl[\bigl[[x]\bigr]\Bigr]\biggr]\Biggr]$
$\Biggl \{\biggl \{\Bigl \{\bigl \{\{x\}\bigr \}\Bigr \}\biggr \}\Biggr\}$
$\Biggl\langle\biggl\langle\Bigl\langle\bigl\langle\langle x
\rangle\bigr\rangle\Bigr\rangle\biggr\rangle\Biggr\rangle$
$\Biggl\lvert\biggl\lvert\Bigl\lvert\bigl\lvert\lvert x
\rvert\bigr\rvert\Bigr\rvert\biggr\rvert\Biggr\rvert$
$\Biggl\lVert\biggl\lVert\Bigl\lVert\bigl\lVert\lVert x
\rVert\bigr\rVert\Bigr\rVert\biggr\rVert\Biggr\rVert$

```md
$\Biggl(\biggl(\Bigl(\bigl((x)\bigr)\Bigr)\biggr)\Biggr)$
$\Biggl[\biggl[\Bigl[\bigl[[x]\bigr]\Bigr]\biggr]\Biggr]$
$\Biggl \{\biggl \{\Bigl \{\bigl \{\{x\}\bigr \}\Bigr \}\biggr \}\Biggr\}$
$\Biggl\langle\biggl\langle\Bigl\langle\bigl\langle\langle x
\rangle\bigr\rangle\Bigr\rangle\biggr\rangle\Biggr\rangle$
$\Biggl\lvert\biggl\lvert\Bigl\lvert\bigl\lvert\lvert x
\rvert\bigr\rvert\Bigr\rvert\biggr\rvert\Biggr\rvert$
$\Biggl\lVert\biggl\lVert\Bigl\lVert\bigl\lVert\lVert x
\rVert\bigr\rVert\Bigr\rVert\biggr\rVert\Biggr\rVert$
```

### Ellipsis

The ellipsis is represented by commands such as `\dots`,`\cdots`, `\vdots`,`\ddots`.

::: tip

`\dots` and`\cdots` have different vertical positions. The former is generally used for subscripted sequences.

:::

$x_1,x_2,\dots ,x_n \quad 1,2,\cdots ,n \quad \vdots\quad \ddots$

```md
$x_1,x_2,\dots ,x_n \quad 1,2,\cdots ,n \quad \vdots\quad \ddots$
```

### Matrix

`pmatrix`, `bmatrix`, `Bmatrix`, `vmatrix`, `Vmatrix` and other environments can add various separators on both sides of the matrix.

$$
\begin{pmatrix} a&b\\c&d \end{pmatrix} \quad
\begin{bmatrix} a&b\\c&d \end{bmatrix} \quad
\begin{Bmatrix} a&b\\c&d \end{Bmatrix} \quad
\begin{vmatrix} a&b\\c&d \end{vmatrix} \quad
\begin{Vmatrix} a&b\\c&d \end{Vmatrix}
$$

```md
$$
\begin{pmatrix} a&b\\c&d \end{pmatrix} \quad
\begin{bmatrix} a&b\\c&d \end{bmatrix} \quad
\begin{Bmatrix} a&b\\c&d \end{Bmatrix} \quad
\begin{vmatrix} a&b\\c&d \end{vmatrix} \quad
\begin{Vmatrix} a&b\\c&d \end{Vmatrix}
$$
```

Using the `smallmatrix` environment, you can generate small matrices of inline formulas.

A small matrix: $( \begin{smallmatrix} a&b\\c&d \end{smallmatrix} )$.

```md
A small matrix: $( \begin{smallmatrix} a&b\\c&d \end{smallmatrix} )$.
```

### Multi-line Formula

- **newline**

  Use `\\` or `\newline` to wrap

  $$
  x = a+b+c+{} \\
  d+e+f+g
  $$

  $$
  x = a+b+c+ \newline
  d+e+f+g
  $$

  ```md
  $$
  x = a+b+c+ \\
  d+e+f+g
  $$

  $$
  x = a+b+c+ \newline
  d+e+f+g
  $$
  ```

- **Alignment**

  You can use the `aligned` environment to achieve alignment, and`&`to identify fixed anchor points

  $$
  \begin{aligned}
  x ={}& a+b+c+{} \\
  &d+e+f+g
  \end{aligned}
  $$

  $$
  \begin{alignedat}{2}
     10&x+ &3&y = 2 \\
     3&x+&13&y = 4
  \end{alignedat}
  $$

  ```md
  $$
  \begin{aligned}
  x ={}& a+b+c+{} \\
  &d+e+f+g
  \end{aligned}
  $$

  $$
  \begin{alignedat}{2}
     10&x+ &3&y = 2 \\
     3&x+&13&y = 4
  \end{alignedat}
  $$
  ```

### Formula Group

Formula groups that do not require alignment can use the `gather` environment.

$$
\begin{gathered}
a = b+c+d \\
x = y+z
\end{gathered}
$$

```md
$$
\begin{gathered}
a = b+c+d \\
x = y+z
\end{gathered}
$$
```

### Numbering

$$
\tag{1} x+y^{2x}
$$

$$
\tag*{1} x+y^{2x}
$$

```md
$\tag{1} x+y^{2x}$

$\tag*{1} x+y^{2x}$
```

### Segmented Functions

Use `case` environment

$$
y= \begin{cases}
-x,\quad x\leq 0 \\
x,\quad x>0
\end{cases}
$$

```md
$$
y= \begin{cases}
-x,\quad x\leq 0 \\
x,\quad x>0
\end{cases}
$$
```

## Text

To insert text in TeX, you should use `\text{}` to wrap them.

<script setup lang="ts">
import KatexPlayground from '@KatexPlayground';
</script>

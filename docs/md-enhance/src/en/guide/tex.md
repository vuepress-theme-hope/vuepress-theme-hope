---
icon: tex
---

# Tex Support

Let the Markdown file in your VuePress site support the Tex syntax.

This feature is brought by [vuepress-plugin-mathjax](https://github.com/vuepress/vuepress-plugin-mathjax).

## Configuration

```js {4}
module.exports = {
  plugin: ['@mr-hope/md-enhance', {
    // Enable Tex Support
    mathjax: true
  }]
};
```

## Grammar

### Inline syntax

Use `$codes$` to indicate.

```md
Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
```

Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

### Block syntax

Use `$$codes$$` to indicate.

```md
$$\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}$$
```

$$\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^ Ir \cdots (r-i+1) (\log y)^{ri}} {\omega^i} \right\}$$

## Tutorial

### Operator

- Some operators can be entered directly in math mode; others need to be generated using control sequences:

  - `+`: $+$
  - `-`: $-$
  - `\times`: $\times$
  - `\ div`: $\div$
  - `=`: $ =$
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

- Lianjia: `\sum` $\sum$

- Tandem: `\prod` $\prod$

- Limit: `\lim` $\lim$

- Points: `\int` $\int$

- Multiple points:
  - `\iint`: $\iint$
  - `\iiint`: $\iiint$
  - `\iiiint`: $\iiiint$
  - `\idotsint` $\idotsint$

::: tip
Large operators such as continuous addition, multiplication, limits, and integrals can use `\limits` and `\nolimits` to force explicitly specify whether or not to compress these superscripts
:::

#### Case

$\sqrt{x}$, $\frac{1}{2}$.

$\sum_{i=1}^n i\quad \prod_{i=1}^n$

$\sum\limits _{i=1}^n i\quad \prod\limits _{i=1}^n$

$\iint\quad \iiint\quad \iiiint\quad \idotsint$

```md
$\sqrt{x}$, $\frac{1}{2}$.

$\sum_{i=1}^n i\quad \prod_{i=1}^n$

$\sum\limits _{i=1}^n i\quad \prod\limits _{i=1}^n$

$\iint\quad \iiint\quad \iiiint\quad \idotsint$
```

### symbol

-English letters can be entered directly

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

### Superscript and subscript

- Superscript, use `^` to achieve
- Subscript, use `_` to achieve
- By default, superscript and subscript only apply to the next character. If you want to work with several consecutive characters, please enclose these characters in curly brackets `{}`.

#### Case

Einstein 's $E=mc^2$.

$$2^{10} > 1000$$

```md
Einstein 's $E=mc^2$.

$$2^{10} > 1000$$
```

### Delimiters (parentheses, etc.)

Various parentheses are represented by commands such as `()`, `[]`, `\{\}`, `\langle\rangle`.

::: tip
Note that curly braces are usually used to enter command and environment parameters, so they must be preceded by `\` in mathematical formulas.

Because the application of `|` and `\|` in LaTeX is too casual,  we recommend using `\lvert\rvert` and `\ lVert\rVert` instead.
:::

In order to adjust the size of these delimiters, we recommend using `\big`, `\Big`, `\bigg`, `\Bigg` and a series of commands to adjust the size before the above brackets.

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
> ()
$\Biggl(\biggl(\Bigl(\bigl((x)\bigr)\Bigr)\biggr)\Biggr)$
> []
$\Biggl[\biggl[\Bigl[\bigl[[x]\bigr]\Bigr]\biggr]\Biggr]$
> {}
$\Biggl \{\biggl \{\Bigl \{\bigl \{\{x\}\bigr \}\Bigr \}\biggr \}\Biggr\}$
> <>
$\Biggl\langle\biggl\langle\Bigl\langle\bigl\langle\langle x
\rangle\bigr\rangle\Bigr\rangle\biggr\rangle\Biggr\rangle$
> ||
$\Biggl\lvert\biggl\lvert\Bigl\lvert\bigl\lvert\lvert x
\rvert\bigr\rvert\Bigr\rvert\biggr\rvert\Biggr\rvert$
> z||
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

::: warning
Because Mathjax3 does not support environments like `\begin{..} ... \end{..}`, matrices, piecewise functions, alignments, formula groups, and other features will not be supported.
:::

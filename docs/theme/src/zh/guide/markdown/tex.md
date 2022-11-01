---
title: Tex 语法
icon: tex
category:
  - Markdown
tag:
  - Markdown
  - TEX
---

让你的 VuePress 站点中的 Markdown 文件支持 $\TeX$ 语法。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-13}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 使用 KaTeX 启用 TeX 支持
        katex: true,
        // 使用 mathjax 启用 TeX 支持
        mathjax: true,
      },
    },
  }),
});
```

@tab JS

```js {7-12}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // 使用 KaTeX 启用 TeX 支持
        katex: true,
        // 使用 mathjax 启用 TeX 支持
        mathjax: true,
      },
    },
  }),
};
```

:::

您只能启用其中一个，并且 katex 具有更高的优先级。

## 语法

### 行内语法

使用 `$codes$` 来表示。

```md
Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
```

Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

### 块语法

使用 `$$codes$$` 来表示。

```md
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$
```

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

## 在此尝试

<KatexPlayground />

## 支持列表

Katex:

- [$\KaTeX$ 支持功能](https://katex.org/docs/supported.html)
- [$\KaTeX$ 支持列表](https://katex.org/docs/support_table.html)

Mathjax:

- [支持的 TeX/LaTeX 命令](https://docs.mathjax.org/en/latest/input/tex/macros/index.html#tex-commands)

## 高级

::: info KaTeX

使用 KaTeX 时，您可以将对象作为 `KatexOptions` 传递给 `katex`。 它将被传递给 KaTeX 有关可用选项，请参阅 [KaTeX Docs](https://katex.org/docs/options.html)。

此外，我们还支持一个特殊选项 `mhchem`，您可以通过将其设置为 `true` 来启用 mhchem 扩展。

:::

::: info Mathjax

使用 mathjax 时，您可以将对象传递给 `mathjax`。

您可以将 `output` 选项设置为 `svg` (默认) 或 `chtml` 以更改 SVG 和 HTML 输出。

此外，您可以通过 `tex` 选项将设置传递给 TeX 输入解析器，并且可以根据出书格式，通过 `chtml` 或 `svg` 选项传递给通用 HTML 输出解析器和 SVG 输出解析器的输出语法设置 。

:::

## TeX 教程

### 运算符

- 一些运算符，可以在数学模式下直接输入；另一些需要用控制序列生成:

  - `+`: $+$
  - `-`: $-$
  - `\times`: $\times$
  - `\div`: $\div$
  - `=`: $=$
  - `\pm`: $\pm$
  - `\cdot`: $\cdot$
  - `\cup`: $\cup$
  - `\geq`: $\geq$
  - `\leq`: $\leq$
  - `\neq`: $\neq$
  - `\approx`: $\approx$
  - `\equiv`: $\equiv$
  - `\quad`: $\quad$ (空白分隔符)

- 根式: `\sqrt{xxx}` $\sqrt{xxx}$

- 分式 `\frac{aaa}{bbb}` $\frac{aaa}{bbb}$ (第一个参数为分子，第二个为分母) 。

- 连加: `\sum` $\sum$
- 连乘: `\prod` $\prod$
- 极限: `\lim` $\lim$
- 积分: `\int` $\int$
- 多重积分:
  - `\iint`: $\iint$
  - `\iiint`: $\iiint$
  - `\liiiint`: $\liiiint$ (块级公式正常使用 `\iiiint`)
  - `\idotsint` $\idotsint$

::: tip

连加、连乘、极限、积分等大型运算符可以用 `\limits` 和 `\nolimits` 来强制显式地指定是否压缩这些上下标。

`\iiiint`($\liiiint$) 是使用 hack 实现的，由于间距问题对于行公式需要使用 `\liiiint` 命令。

`\varoiint`, `\sqint`, `\sqiint`, `\ointctrclockwise`, `\ointclockwise`, `\varointclockwise`, `\varointctrclockwise`, `\fint`, `\landupint`, `\landdownint` 目前不被支持。

:::

::: tip 案例

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

### 符号

- 英文字母可以直接输入

  $a \quad b \quad c \quad x \quad y \quad z \quad A \quad B \quad C$

  ```md
  $a \quad b \quad c \quad x \quad y \quad z \quad A \quad B \quad C$
  ```

- 希腊字母使用 `\characterName` 来输入符号，首字母大写时输出大写字母。

  $\alpha \quad \beta \quad \gamma \quad \Omega \quad \Delta \quad \Gamma$

  ```md
  $\alpha \quad \beta \quad \gamma \quad \Omega \quad \Delta \quad \Gamma$
  ```

- 其他数学表达式可以对应使用

  $\log_{a}{b} \quad \partial x$

  ```md
  $\log_{a}{b} \quad \partial x$
  ```

### 上下标

- 上标，使用 `^` 来实现
- 下标，使用 `_` 来实现
- 上下标默认只作用于之后的一个字符，如果想对连续的几个字符起作用，请将这些字符用花括号 `{}` 括起来。

#### 例子

Einstein ’s $E=mc^2$.

$2^{10} > 1000$

```md
Einstein ’s $E=mc^2$.

$2^{10} > 1000$
```

### 定界符 (括号等)

各种括号用 `()`, `[]`, `\{\}`, `\langle\rangle` 等命令表示。

::: tip

注意花括号通常用来输入命令和环境的参数，所以在数学公式中它们前面要加 `\`。

因为 LaTeX 中 `|` 和 `\|` 的应用过于随意，推荐用 `\lvert\rvert` 和 `\lVert\rVert` 取而代之。

:::

为了调整这些定界符的大小，推荐使用 `\big`, `\Big`, `\bigg`, `\Bigg` 等一系列命令放在上述括号前面调整大小。

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

### 省略号

省略号用 `\dots`, `\cdots`, `\vdots`, `\ddots` 等命令表示。

::: tip

`\dots` 和 `\cdots` 的纵向位置不同，前者一般用于有下标的序列。

:::

$x_1,x_2,\dots ,x_n \quad 1,2,\cdots ,n \quad \vdots\quad \ddots$

```md
$x_1,x_2,\dots ,x_n \quad 1,2,\cdots ,n \quad \vdots\quad \ddots$
```

### 矩阵

`pmatrix`, `bmatrix`, `Bmatrix`, `vmatrix`, `Vmatrix` 等环境可以在矩阵两边加上各种分隔符。

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

使用 `smallmatrix` 环境，可以生成行内公式的小矩阵。

A small matrix: $( \begin{smallmatrix} a&b\\c&d \end{smallmatrix} )$.

```md
A small matrix: $( \begin{smallmatrix} a&b\\c&d \end{smallmatrix} )$.
```

### 多行公式

- **换行**

  使用 `\\` 或 `\newline` 进行换行

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

- **对齐**

  可以使用 `aligned` 环境来实现对齐，使用 `&` 标识固定锚点

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

### 公式组

无需对齐的公式组可以使用 `gather` 环境。

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

### 编号

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

### 分段函数

使用 `case` 环境

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

## 文字

如果你需要在公式中插入文字，请使用 `\text{}`。

<script setup lang="ts">
import KatexPlayground from '@KatexPlayground';
</script>

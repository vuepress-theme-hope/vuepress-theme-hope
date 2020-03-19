---
icon: tex
---

# Tex 语法支持

让你的 VuePress 站点中的 Markdown 文件支持 Tex 语法。

本功能借助插件 [vuepress-plugin-mathjax](https://github.com/vuepress/vuepress-plugin-mathjax) 实现。

## 配置

```js {4}
module.exports = {
  plugin: ['@mr-hope/md-enhance', {
    // 启用 Tex 支持
    mathjax: true
  }]
};
```

## 语法

### 行内语法

使用 `$codes$` 来表示。

```md
Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
```

Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

### 块语法

使用 `$$codes$$` 来表示。

```md
$$\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}$$
```

$$\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}$$

## 教程

### 运算符

- 一些运算符，可以在数学模式下直接输入；另一些需要用控制序列生成：

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

- 分式 `\frac{aaa}{bbb}` $\frac{aaa}{bbb}$（第一个参数为分子，第二个为分母）。

- 连加: `\sum` $\sum$
- 连乘: `\prod` $\prod$
- 极限: `\lim` $\lim$
- 积分: `\int` $\int$
- 多重积分:
  - `\iint`: $\iint$
  - `\iiint`: $\iiint$
  - `\iiiint`: $\iiiint$
  - `\idotsint` $\idotsint$

::: tip
连加、连乘、极限、积分等大型运算符可以用 `\limits` 和 `\nolimits` 来强制显式地指定是否压缩这些上下标
:::

#### 案例

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

#### 案例

Einstein 's $E=mc^2$.

$$2^{10} > 1000$$

```md
Einstein 's $E=mc^2$.

$$2^{10} > 1000$$
```

### 定界符（括号等）

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

### 省略号

省略号用 `\dots`, `\cdots`, `\vdots`, `\ddots` 等命令表示。

::: tip
`\dots` 和 `\cdots` 的纵向位置不同，前者一般用于有下标的序列。
:::

$x_1,x_2,\dots ,x_n \quad 1,2,\cdots ,n \quad \vdots\quad \ddots$

```md
$x_1,x_2,\dots ,x_n \quad 1,2,\cdots ,n \quad \vdots\quad \ddots$
```

::: warning
由于 Mathjax3 并不支持 `\begin{..} ... \end{..}` 这样的环境，所以矩阵、分段函数、对齐、公式组等特性将不被支持。
:::

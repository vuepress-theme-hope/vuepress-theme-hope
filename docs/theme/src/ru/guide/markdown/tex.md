---
title: TeX
icon: square-root-variable
category:
  - Markdown
tag:
  - Markdown
  - TEX
---

Пусть файл Markdown на вашем сайте VuePress поддерживает синтаксис $\TeX$.

<!-- more -->

## Конфиг

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
        // Enable Tex Support using katex
        katex: true,
        // Enable Tex Support using mathjax
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
        // Enable Tex Support using katex
        katex: true,
        // Enable Tex Support using mathjax
        mathjax: true,
      },
    },
  }),
};
```

:::

Вы можете включить только ОДНУ из них, и катекс имеет более высокий приоритет.

## Грамматика

### Инлайновый синтаксис

Использование `$tex expression$`.

```md
Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
```

Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

### Блочный синтаксис

Использование `$$tex expression$$`.

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

## Плейграунд

<!-- markdownlint-disable -->

<KatexPlayground />

<!-- markdownlint-restore -->

## Список поддержки

Katex:

- [Функции поддержки KaTeX](https://katex.org/docs/supported.html)
- [Список поддержки KaTeX](https://katex.org/docs/support_table.html)

Mathjax:

- [Поддерживаемые команды TeX/LaTeX](https://docs.mathjax.org/en/latest/input/tex/macros/index.html#tex-commands)

## Продвинутые

::: info KaTeX

При использовании KaTeX вы можете передать объект в `katex` как `KatexOptions`. Он будет передан KaTeX. Доступные варианты смотрите в [Документации KaTeX](https://katex.org/docs/options.html).

Кроме того, поддерживается специальная опция `mhchem`, позволяющая включить расширение mhchem, установив для него значение `true`.

:::

::: info Mathjax

При использовании mathjax вы можете передать объект в `mathjax`.

Вы можете установить для параметра `output` значение `svg` (по умолчанию) или `chtml`, чтобы изменить вывод между SVG и HTML.

Кроме того, вы можете установить параметр `tex`, который передается парсеру ввода TeX, и вы можете установить параметр `chtml` или `svg` на основе вашего синтаксиса вывода, который передается парсеру вывода Common HTML и парсеру вывода SVG.

:::

## Учебник по Tex

### Оператор

- Некоторые операторы можно вводить непосредственно в математическом режиме; другие должны быть сгенерированы с использованием управляющих последовательностей:

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

- Радикальный: `\sqrt{xxx}` $\sqrt{xxx}$

- Дробь `\frac{aaa}{bbb}` $\frac{aaa}{bbb}$ (первый параметр - числитель, второй - знаменатель).

- Ляньцзя: `\sum` $\sum$

- Тандем: `\prod` $\prod$

- Ограничение: `\lim` $\lim$

- Точки: `\int` $\int$

- Мультиточки:
  - `\iint`: $\iint$
  - `\iiint`: $\iiint$
  - `\iiiint`: $\iiiint$
  - `\idotsint` $\idotsint$

::: tip

Большие операторы, такие как непрерывное сложение, умножение, пределы и интегралы, могут использовать `\limits` и `\nolimits`, чтобы явно указать сжимать эти верхние индексы или нет.

`\varoiint`, `\sqint`, `\sqiint`, `\ointctrclockwise`, `\ointclockwise`, `\varointclockwise`, `\varointctrclockwise`, `\fint`, `\landupint`, `\landdownint` в настоящее время не поддерживается.

:::

::: tip Кейс

$\sqrt{x}$, $\frac{1}{2}$.

$\sum_{i=1}^n i\; \prod_{i=1}^n$

$\sum\limits _{i=1}^n i\; \prod\limits_{i=1}^n$

$\iint_1^2 x^2\; \iiint_1^2 x^2\; \iiiint_1^2 x^2\; \idotsint_1^2 x^2$

$\iint\limits_1^2 x^2\; \iiint\limits_1^2 x^2\; \iiiint\limits_1^2 x^2\; \idotsint\limits_1^2 x^2$

$$
\iint_1^2 x^2\; \iiint_1^2 x^2\; \iiiint_1^2 x^2\; \idotsint_1^2 x^2
$$

```md
$\sqrt{x}$, $\frac{1}{2}$.

$\sum_{i=1}^n i\; \prod_{i=1}^n$

$\sum\limits _{i=1}^n i\; \prod\limits _{i=1}^n$

$\iint_1^2 x^2\; \iiint_1^2 x^2\; \iiiint_1^2 x^2\; \idotsint_1^2 x^2$

$\iint\limits_1^2 x^2\; \iiint\limits_1^2 x^2\; \iiiint\limits_1^2 x^2\; \idotsint\limits_1^2 x^2$

$$\iint_1^2 x^2\; \iiint_1^2 x^2\; \iiiint_1^2 x^2\; \idotsint_1^2 x^2$$
```

:::

### Символ

- Английские буквы можно вводить напрямую

  $a \quad b \quad c \quad x \quad y \quad z \quad A \quad B \quad C$

  ```md
  $a \quad b \quad c \quad x \quad y \quad z \quad A \quad B \quad C$
  ```

- Греческие символы используют `\characterName` для ввода символов и выводят заглавные буквы, когда первая буква заглавная.

  $\alpha \quad \beta \quad \gamma \quad \Omega \quad \Delta \quad \Gamma$

  ```md
  $\alpha \quad \beta \quad \gamma \quad \Omega \quad \Delta \quad \Gamma$
  ```

- Соответственно могут использоваться и другие математические выражения

  $\log_{a}{b} \quad \partial x$

  ```md
  $\log_{a}{b} \quad \partial x$
  ```

### Верхний индекс и нижний индекс

- Верхний индекс, используйте `^` для достижения
- Нижний индекс, используйте `_` для достижения
- По умолчанию верхний и нижний индексы применяются только к следующему символу. Чтобы работать с несколькими последовательными символами, заключите их в фигурные скобки `{}`.

#### Демо

Эйнштейн $E=mc^2$.

$2^{10} > 1000$

```md
Эйнштейн $E=mc^2$.

$2^{10} > 1000$
```

### Разделители (круглые скобки и т.д.)

Различные круглые скобки представлены такими командами, как `()`, `[]`, `\{\}`, `\langle\rangle`.

::: tip

Обратите внимание, что фигурные скобки обычно используются для ввода параметров команды и среды, поэтому в математических формулах им должен предшествовать символ `\`.

Поскольку применение `|` и `\|` в LaTeX слишком случайное, мы рекомендуем вместо этого использовать `\lvert\rvert` и `\ lVert\rVert`.

:::

Чтобы настроить размер этих разделителей, мы рекомендуем использовать `\big`, `\Big`, `\bigg`, `\Bigg`, а также серию команд для регулировки размера перед указанными выше скобками.

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

### Многоточие

Многоточие представлено такими командами, как `\dots`,`\cdots`, `\vdots`,`\ddots`.

::: tip

`\dots` и `\cdots` имеют разное вертикальное положение. Первый обычно используется для последовательностей с индексами.

:::

$x_1,x_2,\dots ,x_n \quad 1,2,\cdots ,n \quad \vdots\quad \ddots$

```md
$x_1,x_2,\dots ,x_n \quad 1,2,\cdots ,n \quad \vdots\quad \ddots$
```

### Матрица

`pmatrix`, `bmatrix`, `Bmatrix`, `vmatrix`, `Vmatrix` и другие среды могут добавлять различные разделители с обеих сторон матрицы.

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

Используя среду `smallmatrix`, вы можете генерировать небольшие матрицы встроенных формул.

Маленькая матрица: $( \begin{smallmatrix} a&b\\c&d \end{smallmatrix} )$.

```md
Маленькая матрица: $( \begin{smallmatrix} a&b\\c&d \end{smallmatrix} )$.
```

### Многострочная формула

- **newline**

  Используйте `\\` или `\newline` для переноса

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

  Вы можете использовать среду выравнивания `aligned` для достижения выравнивания и определения фиксированных точек привязки.

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

### Группа формул

Группы формул, не требующие выравнивания, могут использовать среду `gather`.

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

### Нумерация

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

### Сегментированные функции

Использовать среду `case`

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

## Текст

Чтобы вставить текст в TeX, вы должны использовать `\text{}` для переноса их.

<script setup lang="ts">
import KatexPlayground from '@KatexPlayground';
</script>

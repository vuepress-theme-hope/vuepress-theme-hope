# Operator

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
  - `\iiiint`: $\iiiint$
  - `\idotsint` $\idotsint$

::: tip

Large operators such as continuous addition, multiplication, limits, and integrals can use `\limits` and `\nolimits` to force explicitly specify compress these superscripts or not.

`\varoiint`, `\sqint`, `\sqiint`, `\ointctrclockwise`, `\ointclockwise`, `\varointclockwise`, `\varointctrclockwise`, `\fint`, `\landupint`, `\landdownint` are not supported currently.

:::

::: tip Case

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

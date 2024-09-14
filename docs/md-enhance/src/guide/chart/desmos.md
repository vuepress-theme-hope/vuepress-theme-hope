---
title: Desmos
icon: fa-solid fa-chart-area
---

<!-- #region before -->

Add [Desmos][] support to the Markdown files in your VuePress site.

[Desmos]: https://www.desmos.com/calculator

<!-- more -->

## Settings

Install [Desmos][] in your project:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D desmos
```

@tab yarn

```bash
yarn add -D desmos
```

@tab npm

```bash
npm i -D desmos
```

:::

Then enabling via:

<!-- #endregion before -->

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable Desmos
      desmos: true,
    }),
  ],
};
```

<!-- #region after -->

## Syntax

```md
::: desmos

$latex Expression$

$latex Expression$

$latex Expression$

:::
```

## Demo

::::: md-demo Lines: Slope Intercept Form

::: desmos

$y=2x+3$

:::

:::::

::::: md-demo Lines: Point Slope Form

::: desmos

$y-y_{1}=m\left(x-x_{1}\right)$

$m=\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$

$x_{1}=-1$

$y_{1}=1$

$y_{2}=2$

$x_{2}=3$

$\left(x_{1},y_{1}\right)$

$\left(x_{2},y_{2}\right)$

:::

:::::

::::: md-demo Parabolas: Standard Form

::: desmos

$y\ge ax^{2}+bx+c$

$a=1$

$b=0$

$c=1$

:::

:::::

::::: md-demo Parabolas: Vertex Form

::: desmos

$y=a\left(x-h\right)^{2}+k$

$a=1$

$h=1$

$k=0$

:::

:::::

::::: md-demo Parabolas: Standard Form + Tangent

::: desmos

$y\ge ax^{2}+bx+c$

$a=0.7$

$b=1$

$c=1$

$y=bx+c$

:::

:::::

::::: md-demo Trigonometry: Period and Amplitude

::: desmos

$a\ \cos\left(\frac{2\pi x}{b}\right)$

$a=2.58$

$b=4.65$

$\left(b,\ at\right)$

$\left(bt,\ a\right)$

:::

:::::

::::: md-demo Trigonometry: Unit Circle

::: desmos

$x^{2}+y^{2}=1$

$\left(\cos a,\ \sin a\right)$

$a=130$

$y=\left(\tan a\right)\cdot x\left\{0<x<\cos a\right\}$

$y=\left(\tan a\right)\cdot x\left\{\cos a<x<0\right\}$

$x=\cos(a)\left\{0<y<\sin(a)\right\}$

$x=\cos(a)\left\{\sin(a)<y<0\right\}$

:::

:::::

::::: md-demo Polar: Rose

::: desmos

$r \le \sin\left(\frac{a}{b}\theta\right)$

$a=5$

$b=6$

:::

:::::

::::: md-demo Polar: Logarithmic Spiral

::: desmos

$r\ =\ a^{\theta}$

$a=1.25$

:::

:::::

::::: md-demo Parametric: Cycloid

::: desmos

$a=11.7$

$\left(at-\sin\left(at\right),1-\cos\left(at\right)\right)$

$\left(x-a\right)^{2}+\left(y-1\right)^{2}=1$

$\left(a-\sin\left(a\right),1-\cos\left(a\right)\right)$

:::

:::::

::::: md-demo Transformations: Translating a Function

::: desmos

$f\left(x\right)=x^{2}+\sin\left(3x\right)$

$g\left(x\right)=f\left(x-h\right)+k$

$k=1.5$

$h=-1$

:::

:::::

::::: md-demo Transformations: Scaling a Function

::: desmos

$f\left(x\right)=x^{2}+\sin\left(3x\right)$

$g\left(x\right)=af\left(\frac{x}{b}\right)$

$a=0.5$

$b=1$

:::

:::::

::::: md-demo Transformations: Inverse of a Function

::: desmos

$f\left(x\right)=.2x^{3}+.1x^{5}$

$x=f\left(y\right)$

$y=x$

$a=1.74$

$\left(a,f\left(a\right)\right)$

$\left(f\left(a\right),a\right)$

:::

:::::

::::: md-demo Lists: Curve Stitching

::: desmos

$a=\left[1,...,10\right]$

$y=a+\frac{a}{a-11}x$

$y=a+\frac{a}{a-11}x\left\{x\ge0\right\}\left\{y\ge0\right\}$

:::

:::::

::::: md-demo Calculus: Derivatives

::: desmos

$f\left(x\right)\ =\ ax^{3}+cx$

$a=0.42$

$c=-1.64$

$g\left(x\right)\ =\ \frac{d}{dx}f\left(x\right)$

:::

:::::

::::: md-demo Calculus: Secant Line

::: desmos

$f\left(x\right)=\sin\left(x\right)+.3x$

$a=0.23$

$h=2$

$m=\frac{\left(f\left(a+h\right)-f\left(a\right)\right)}{h}$

$y=m\left(x-a\right)+f\left(a\right)$

$\left(a,f\left(a\right)\right)$

$\left(a+h,f\left(a+h\right)\right)$

:::

:::::

::::: md-demo Calculus: Tangent Line

::: desmos

$a=1.27$

$f\left(x\right)=\sin\left(x\right)+.3x$

$g\left(x\right)=\frac{d}{dx}f\left(x\right)$

$y=g\left(a\right)\left(x-a\right)+f\left(a\right)$

$\left(a,\ f\left(a\right)\right)$

:::

:::::

::::: md-demo Calculus: Taylor Expansion of sin(x)

::: desmos

$y\ =\ \sin\left(x\right)$

$y\ =\ \sum_{n=0}^{a}\frac{\left(-1\right)^{n}x^{\left(2n+1\right)}}{\left(2n+1\right)!}$

$a=1$

:::

:::::

::::: md-demo Calculus: Integrals

::: desmos

$f\left(x\right)=ax^{2}+c$

$a=0.4$

$c=-1.4$

$F\left(x\right)=\int_{0}^{x}f\left(t\right)dt$

$\int_{0}^{1}f\left(t\right)dt$

$F\left(1\right)$

:::

:::::

::::: md-demo Calculus: Integral with adjustable bounds

::: desmos

$f\left(x\right)=\left(1-x^{2}\right)\exp\left(-\frac{1}{2}x^{2}\right)$

$F\left(x\right)=\int_{a}^{x}f\left(u\right)du$

$F\left(b\right)$

$\int_{a}^{b}f\left(u\right)du$

$a=-1.365$

$b=0.745$

$0\le y\le f\left(x\right)\left\{\left(a-x\right)\left(b-x\right)<0\right\}$

$f\left(x\right)\le y\le0\left\{\left(a-x\right)\left(b-x\right)<0\right\}$

$\left(a,\ f\left(a\right)\right)$

$\left(a,\ F\left(a\right)\right)$

$\left(b,\ f\left(b\right)\right)$

$\left(b,\ F\left(b\right)\right)$

:::

:::::

::::: md-demo Calculus: Fundamental Theorem of Calculus

::: desmos

$f\left(x\right)=x^{3}-2x+1$

$F\left(x\right)=\int_{0}^{x}f\left(t\right)dt$

$F'\left(x\right)$

:::

:::::

<!-- #endregion after -->

---
title: Tex
icon: tex
category: markdown
tags:
  - markdown
  - tex
---

Let the Markdown file in your VuePress site support the $\TeX$ syntax.

<!-- more -->

## Configuration

```js {4}
module.exports = {
  themeConfig: {
    mdEnhance: {
      tex: true,
    },
  },
};
```

## Grammar

### Inline syntax

Use `$codes$`.

```md
Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
```

Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

### Block syntax

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

### More

For specific Tex syntax, see [Katex tutorial](https://vuepress-theme-hope.github.io/md-enhance/guide/tex/#tutorial)

## Playground

<KatexPlayground />

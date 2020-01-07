---
icon: tex
---

# Tex Support <MyBadge text="V0.0.8+" />

Let the Markdown file in your VuePress site support the Tex syntax.

## Configuration

```js
module.exports = {
  themeConfig: {
    markdown: {
      // Add Tex support
      mathjax: true
    }
  }
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

### More

For specific Tex syntax, see [Latex Getting Started Guide → Chapter 8](https://liam.page/2014/09/08/latex-introduction/)

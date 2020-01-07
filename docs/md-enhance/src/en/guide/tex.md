---
icon: tex
---

# Tex Support

Let the Markdown file in your VuePress site support the Tex syntax.

This feature is brought by [vuepress-plugin-mathjax](https://github.com/vuepress/vuepress-plugin-mathjax).

## Configuration

```js
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

### More

For specific Tex syntax, see [Latex Getting Started Guide → Chapter 8](https://liam.page/2014/09/08/latex-introduction/)

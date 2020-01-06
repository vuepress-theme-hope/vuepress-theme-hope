---
icon: tex
---

# Tex 语法支持

让你的 VuePress 站点中的 Markdown 文件支持 Tex 语法。

本功能借助插件 [vuepress-plugin-mathjax](https://github.com/vuepress/vuepress-plugin-mathjax) 实现。

## 配置

```js
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

### 更多

关于具体的 Tex 语法，请看 [Latex 入门指南 → 第八章](https://liam.page/2014/09/08/latex-introduction/)

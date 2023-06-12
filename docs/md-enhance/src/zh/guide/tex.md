---
title: Tex 语法
icon: square-root-variable
---

让你的 VuePress 站点中的 Markdown 文件支持 $\TeX$ 语法。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {7-10}
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 使用 KaTeX 启用 TeX 支持
      katex: true,
      // 使用 mathjax 启用 TeX 支持
      mathjax: true,
    }),
  ],
};
```

@tab JS

```js {7-10}
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 使用 KaTeX 启用 TeX 支持
      katex: true,
      // 使用 mathjax 启用 TeX 支持
      mathjax: true,
    }),
  ],
};
```

:::

你只能启用其中一个，并且 katex 具有更高的优先级。

## 格式

- 内联模式：`$xxx$`

- 显示模式：

  ```md
  $$xxx$$

  $$
  xxx
  $$
  ```

::: tip 转义

可以通过在 `$` 字符之前使用 `\` 或在 `$` 字符前后添加空格来完成转义：

- $a=1$ 是一个 TeX 方程，而 $a=1$ 和 \$a=1$ 不是。

```MD
- $a=1$ 是一个 TeX 方程，而 $a=1$ 和 \$a=1$ 不是。
```

:::

## 案例

### 行内语法

Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

```md
Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
```

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

```md
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$
```

## 在此尝试

<KatexPlayground />

## 支持列表

Katex:

- [KaTeX 支持功能](https://katex.org/docs/supported.html)
- [KaTeX 支持列表](https://katex.org/docs/support_table.html)

Mathjax:

- [支持的 TeX/LaTeX 命令](https://docs.mathjax.org/en/latest/input/tex/macros/index.html#tex-commands)

## 高级

::: info KaTeX

使用 KaTeX 时，你可以将对象作为 `KatexOptions` 传递给 `katex`。 它将被传递给 KaTeX 有关可用选项，请参阅 [KaTeX Docs](https://katex.org/docs/options.html)。

此外，我们还支持两个特殊选项：

- `copy`: 设置为 `true` 来启用 copy 扩展。
- `mhchem`: 设置为 `true` 来启用 mhchem 扩展。

:::

::: info Mathjax

使用 mathjax 时，你可以将对象传递给 `mathjax`。

你可以将 `output` 选项设置为 `svg` (默认) 或 `chtml` 以更改 SVG 和 HTML 输出。

此外，你可以通过 `tex` 选项将设置传递给 TeX 输入解析器，并且可以根据出书格式，通过 `chtml` 或 `svg` 选项传递给通用 HTML 输出解析器和 SVG 输出解析器的输出语法设置 。

:::

## TeX 教程

- [Tex 教程](https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes)
- [Tex 速查表](https://mdit-plugins.github.io/zh/tex.html#tex-tutorial)

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const KatexPlayground = defineAsyncComponent(()=> import('@KatexPlayground'));
</script>

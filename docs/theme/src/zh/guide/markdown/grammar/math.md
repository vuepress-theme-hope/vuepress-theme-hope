---
title: 数学公式
icon: square-root-variable
category:
  - Markdown
tag:
  - Markdown
  - 数学公式
---

让你的 VuePress 站点中的 Markdown 文件支持 $\TeX$ 语法。

<!-- more -->

## 配置

在你的项目中安装相关的 $\TeX$ 包 [katex](https://katex.org) 或 [mathjax-full](https://docs.mathjax.org/en/latest/):

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D katex
# or
pnpm add -D mathjax-full
```

@tab yarn

```bash
yarn add -D katex
# or
yarn add -D mathjax-full
```

@tab npm

```bash
npm i -D katex
# or
npm i -D mathjax-full
```

:::

之后启用它:

```ts twoslash {6} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    math: {
      type: "katex", // 或 'mathjax'
    },
  },
});
```

## 格式

- 内联模式：`$xxx$`

- 显示模式：

  ```md
  $$xxx$$

  $$
  xxx
  $$
  ```

::: md-demo 转义

可以通过在 `$` 字符之前使用 `\` 或在 `$` 字符前后添加空格来完成转义：

$a=1$ 是一个 TeX 方程，而 $ a=1 $ 和 \$a=1$ 不是。

:::

## 案例

::: md-demo 行内语法

Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

:::

::: md-demo 显示语法

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

:::

## 在此尝试

<KatexPlayground />

## 支持列表

插件教程和常见问题: [TeX](https://mdit-plugins.github.io/zh/tex.html#tex-%E6%95%99%E7%A8%8B)

Katex:

- [KaTeX 支持功能](https://katex.org/docs/supported.html)
- [KaTeX 支持列表](https://katex.org/docs/support_table.html)

Mathjax:

- [支持的 TeX/LaTeX 命令](https://docs.mathjax.org/en/latest/input/tex/macros/index.html#tex-commands)

### 使用 KaTeX

使用 KaTeX 时，任何其他选项都将作为 `KatexOptions` 传递给 KaTeX。有关所有可用选项，请参阅 [KaTeX 文档](https://katex.org/docs/options.html)。

此外，还支持 2 个特殊选项：

- `copy`：是否启用复制扩展。
- `mhchem`：是否启用 mhchem 扩展。

### 使用 MathJax

使用 MathJax 时，您可以设置：

- `tex`：传递给 TeX 输入解析器的选项
- `output`：`'svg'`（默认）或 `'chtml'` 来更改输出格式为 SVG 或 HTML。
- `chtml`：传递给通用 HTML 输出解析器的选项
- `svg`：传递给 SVG 输出解析器的选项

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const KatexPlayground = defineAsyncComponent(()=> import('@KatexPlayground'));
</script>

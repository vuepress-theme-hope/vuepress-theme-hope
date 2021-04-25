---
title: Markdown
icon: markdown
category: Get Started
tags:
  - markdown
---

VuePress 的每个文档页面都是由 Markdown 渲染而成。所以你需要通过在相应路径创建编写 Markdown 建立你的文档或博客页面。

<!-- more -->

## Markdown 介绍

如果你是一个新手，还不会编写 Markdown，请先阅读 [Markdown 介绍](../../basic/markdown/readme.md) 和 [Markdown 演示](../../basic/markdown/demo.md)。

::: info Frontmatter

Frontmatter 是 VuePress 中很重要的一个概念，如果你不了解它，你需要阅读 [Frontmatter 介绍](../../basic/vuepress/markdown.md#front-matter)。

:::

## VuePress 扩展

为了丰富文档写作，VuePress 对 Markdown 语法进行了扩展。

关于这些扩展，请阅读 [VuePress 中的 Markdown 扩展](../../basic/vuepress/markdown.md)。

## 主题扩展

### 自定义对齐

::: center

我是居中的

:::

::: right

我在右对齐

:::

- [查看详情](../markdown/align.md)

### 上下角标

19^th^ H~2~O

- [查看详情](../markdown/sup-sub.md)

### 脚注

此文字有脚注[^first].

[^first]: 这是脚注内容

- [查看详情](../markdown/footnote.md)

### 标记

你可以标记 ==重要的内容== 。

- [查看详情](../markdown/mark.md)

### 任务列表

- [x] 计划 1
- [ ] 计划 2

- [查看详情](../markdown/tasklist.md)

### 流程图

```flow
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
```

- [查看详情](../markdown/flowchart.md)

## Mermaid

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

- [查看详情](../markdown/mermaid.md)

### Tex 语法

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

- [查看详情](../markdown/tex.md)

### 代码演示

::: demo 一个普通 Demo

```html
<h1>Mr.Hope</h1>
<p><span id="very">十分</span> 帅</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("十分帅");
});
```

```css
span {
  color: red;
}
```

:::

- [查看详情](../markdown/demo.md)

### 幻灯片

@slidestart

## 幻灯片 1

一个有文字和 [链接](https://mrhope.site) 的段落

---

## 幻灯片 2

- 项目 1
- 项目 2

---

## 幻灯片 3.1

```js
const a = 1;
```

--

## 幻灯片 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend

- [查看详情](../markdown/presentation.md)

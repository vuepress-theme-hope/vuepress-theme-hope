---
icon: markdown
tags:
  - feature
  - markdown
---

# Markdown 增强

vuepress-theme-hope 通过内置 [md-enhance](https://vuepress-md-enhance.mrhope.site/)，在 Markdown 中启用了更多的语法与新功能。

`.vuepress/config.js` 中的 `themeconfig.markdown` 会直接传递给插件作为插件选项。所以你也可以直接阅读 [md-enhance 文档](https://vuepress-md-enhance.mrhope.site/) 查看用法。

::: tip
请不用担心你的网站大小，如果你不启用相关功能，最终代码不会包含这些功能相关的代码。

同时 vuepress 本身新增了一些 Markdown 语法，如果你对它们不熟悉，可以 [查看官方文档](https://v1.vuepress.vuejs.org/zh/guide/markdown.html)。
:::

## 一键启用

你可以设置 `themeconfig.markdown.enableAll` 启用 [md-enhance](https://vuepress-md-enhance.mrhope.site/) 插件的所有功能。

```js {3-5}
module.exports = {
  themeConfig: {
    markdown: {
      enableAll: true,
    },
  },
};
```

## 新增的更多语法

### 自定义对齐

::: center
我是居中的
:::

::: right
我在右对齐
:::

- [点击查看](align.md)

### 上下角标

19^th^ H~2~O

- [点击查看](sup-sub.md)

### 脚注

此文字有脚注[^first].

[^first]: 这是脚注内容

- [点击查看](footnote.md)

### 标记

你可以标记 ==重要的内容== 。

- [点击查看](mark.md)

### 流程图

@flowstart
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
@flowend

- [点击查看](flowchart.md)

### Tex 语法

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

- [点击查看](tex.md)

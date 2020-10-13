---
icon: markdown
tags:
  - feature
  - markdown
---

# Markdown Enhance

vuepress-theme-hope enables more syntax in Markdown via the built-in [md-enhance](https://vuepress-md-enhance.mrhope.site) plugin.

`themeconfig.markdown` in `.vuepress/config.js` will be passed directly to the plugin as a plugin option. So you can also read the [md-enhance documentation](https://vuepress-md-enhance.mrhope.site) to see the usage.

::: tip
Don't worry about the size of your site. If you don't enable related features, the final code won't include code for these features.

At the same time, vuepress itself adds some Markdown syntaxes. If you are not familiar with them, you can [View the official documentation](https://v1.vuepress.vuejs.org/guide/markdown.html).
:::

## Enable all

You can set `themeconfig.markdown.enableAll` to enable all features of the [md-enhance](https://vuepress-md-enhance.mrhope.site) plugin.

```js {3-5}
module.exports = {
  themeConfig: {
    markdown: {
      enableAll: true,
    },
  },
};
```

## New Feature

### Superscript and Subscript

19^th^ H~2~O

- [View Detail](sup-sub.md)

### Align

::: center
I am center
:::

::: right
I am right align
:::

- [View Detail](align.md)

### Footnote

This text has footnote[^first].

[^first]: This is footnote content

- [View Detail](footnote.md)

### Mark

You can mark ==important things== .

- [View Detail](mark.md)

### Flowchart

@flowstart
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
@flowend

- [View Detail](flowchart.md)

### Tex

$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$

- [View Detail](tex.md)

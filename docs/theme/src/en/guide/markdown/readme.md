---
icon: markdown
---

# New syntax in Markdown

vuepress-theme-hope enables more syntax in Markdown via the built-in [md-enhance](https://vuepress-md-enhance.mrhope.site/) plugin.

`themeconfig.markdown` in `.vuepress/config.js` will be passed directly to the plugin as a plugin option. So you can also read the [md-enhance documentation](https://vuepress-md-enhance.mrhope.site/) to see the usage.

::: tip
Don't worry about the size of your site. If you don't enable related features, the final code won't include code for these features.

At the same time, vuepress itself adds some Markdown syntaxes. If you are not familiar with them, you can [View the official documentation](https://v1.vuepress.vuejs.org/guide/markdown.html).
:::

## Enable all

You can set `themeconfig.markdown.enableAll` to enable all features of the [md-enhance](https://vuepress-md-enhance.mrhope.site/) plugin.

```js {3-5}
module.exports = {
  themeConfig: {
    markdown: {
      enableAll: true
    }
  }
};
```

## New Feature

- [Superscript and Subscript](sup-sub.md)

- [Align](align.md)

- [Footnote](footnote.md)

- [Flowchart](flowchart.md)

- [$\TeX$ Syntax](tex.md)

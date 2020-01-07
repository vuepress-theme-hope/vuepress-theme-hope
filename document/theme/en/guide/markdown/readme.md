---
icon: markdown
---

# New syntax in Markdown

vuepress-theme-hope enables more syntax in Markdown via the built-in [md-enhance](https://vuepress-md-enhance.mrhope.site/).

`themeconfig.markdown` in `.vuepress/config.js` will be passed directly to the plugin as a plugin option. So you can also read the [md-enhance documentation](https://vuepress-md-enhance.mrhope.site/) to see the usage.

::: tip
Don't worry about the size of your site. If you don't enable related features, the final code won't include code for these features.
:::

## Enable all

You can set `themeconfig.markdown.enableAll` to enable all features of the [md-enhance](https://vuepress-md-enhance.mrhope.site/) plugin.

```js
module.exports = {
  themeConfig: {
    markdown: {
      enableAll: true
    }
  }
};
```

## Superscript and Subscript

[See Details](sup-sub.md)

## Footnote

[See Details](footnote.md)

## Flowchart

[See Details](flowchart.md)

## Tex Syntax

[See Details](tex.md)

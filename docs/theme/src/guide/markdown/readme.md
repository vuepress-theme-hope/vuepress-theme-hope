---
title: Markdown Enhance
icon: markdown
tags:
  - Markdown
---

Besides Markdown syntaxes VuePress itself adds, `vuepress-theme-hope` enables more syntax in Markdown via [vuepress-plugin-md-enhance](https://vuepress-theme-hope.github.io/md-enhance) plugin.

## Enable Markdown Enhance

`themeconfig.mdEnhance` in `.vuepress/config.js` will be passed directly to the plugin as a plugin option. Visit [md-enhance documentation](https://vuepress-theme-hope.github.io/md-enhance) to see the usage.

::: tip

Don’t worry about the size of your site. If you don’t enable related features, the final code won’t include code for these features.

:::

## Enable all

You can set `themeconfig.mdEnhance.enableAll` to enable all features of the [md-enhance](https://vuepress-theme-hope.github.io/md-enhance) plugin.

```js {3-5}
module.exports = {
  themeConfig: {
    mdEnhance: {
      enableAll: true,
    },
  },
};
```

::: danger

Please use this option ONLY for playing or testing.

As time grows,`vupress-plugin-md-enhance` is becoming more powerful. It’s adding more syntax to Markdown parser and more code to output.

Enabling features you don’t need will increase dev and build time. (`markdown-it` has to check for extra syntaxs)

Also, presentation feature will add a 700KB size chunk (mostly is `reveal.js`) to your output.

Please use the options below and enable ONLY the feature you want to use.

:::

### Enable specific syntax

Specific syntax configuration items can be found in the corresponding instruction page or [Theme Plugin Config](../../config/theme/plugin.md#mdEnhance).

## New syntax

- [Custom Alignment](align.md)

- [Superscript and subscript](sup-sub.md)

- [Footnote](footnote.md)

- [Mark](mark.md)

- [Flowchart](flowchart.md)

- [Tex](tex.md)

- [Code demo](demo.md)

- [Presentation](presentation.md)

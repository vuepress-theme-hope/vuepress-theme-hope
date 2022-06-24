---
title: Enable Enhance
icon: enable
order: 1
category:
  - Markdown
tag:
  - Intro
  - Markdown
---

Besides Markdown syntaxes VuePress itself adds, `vuepress-theme-hope` enables more syntax in Markdown via [vuepress-plugin-md-enhance][md-enhance] plugin.

<!-- more -->

## Built-in Enhancements

VuePress comes with GitHub-style tables, Emoji, TOC, code line numbers, specific line highlighting, etc. are all available out of the box.

For detailed syntax, please see [Built-in Markdown Enhance](../../cookbook/vuepress/markdown.md).

## Enable Markdown Enhancement

`plugin.mdEnhance` in theme options will be passed to the plugin as a plugin option. Visit [plugin documentation][md-enhance] to see the usage.

::: tip

Don’t worry about the size of your site. If you don’t enable related features, the final code won’t include code for these features.

:::

## Enable All

You can set `plugins.mdEnhance.enableAll` to enable all features of the [md-enhance][md-enhance] plugin.

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        enableAll: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        enableAll: true,
      },
    },
  }),
};
```

:::

::: danger

Please use this option ONLY for playing or testing.

As time grows, `vuepress-plugin-md-enhance` is becoming more powerful. It’s adding lots of syntax to Markdown parser and more code to output.

Enabling features you don’t need will increase dev and build time. (`markdown-it` has to check extra syntax)

Also, presentation feature will add a 700KB size chunk (mostly is `reveal.js`) to your output.

Please enable ONLY the feature you want to use.

:::

### Enable Specific Syntax

Specific syntax configuration items can be found in the corresponding instruction page or [Theme Plugin Config](../../config/plugins/md-enhance.md).

[md-enhance]: https://vuepress-theme-hope.github.io/v2/md-enhance/

---
title: Enable Enhance
icon: enable
category:
  - Markdown
tag:
  - Intro
  - Markdown
---

Besides Markdown syntaxes VuePress itself adds, `vuepress-theme-hope` enables more syntax in Markdown via [vuepress-plugin-md-enhance][md-enhance] plugin.

<!-- more -->

## Built-in enhancements

VuePress comes with GitHub-style tables, Emoji, TOC, code line numbers, specific line highlighting, etc. are all available out of the box.

For detailed syntax, please see [Built-in Markdown Enhance](../../cookbook/vuepress/markdown.md).

## Enable Markdown Enhance

`themeconfig.plugin.mdEnhance` in `.vuepress/config.js` will be passed to the plugin as a plugin option. Visit [plugin documentation][md-enhance] to see the usage.

::: tip

Don’t worry about the size of your site. If you don’t enable related features, the final code won’t include code for these features.

:::

## Enable all

You can set `themeconfig.plugins.mdEnhance.enableAll` to enable all features of the [md-enhance][md-enhance] plugin.

:::: code-group

::: code-group-item TS

```ts {7-9}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        enableAll: true,
      },
    },
  },
});
```

:::

::: code-group-item JS

```js {7-9}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        enableAll: true,
      },
    },
  },
});
```

:::

::::

::: danger

Please use this option ONLY for playing or testing.

As time grows, `vupress-plugin-md-enhance` is becoming more powerful. It’s adding lots of syntax to Markdown parser and more code to output.

Enabling features you don’t need will increase dev and build time. (`markdown-it` has to check extra syntax)

Also, presentation feature will add a 700KB size chunk (mostly is `reveal.js`) to your output.

Please enable ONLY the feature you want to use.

:::

### Enable specific syntax

Specific syntax configuration items can be found in the corresponding instruction page or [Theme Plugin Config](../../config/plugins/md-enhance.md).

[md-enhance]: https://vuepress-theme-hope.github.io/v2/md-enhance/

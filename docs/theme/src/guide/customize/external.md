---
title: External Scripts and Styles
icon: wand-magic-sparkles
order: 7
category:
  - Cookbook
  - Customize
tag:
  - Customize
---

This tutorial guides you how to add external scripts and styles to your site.

<!-- more -->

## Global

If you need to add global CSS and JS, please set `head` option in VuePress [config file](../../cookbook/vuepress/config.md).

::: tip Example

```ts title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  //...

  head: [
    //...

    // import an external script
    ["script", { src: "YOUR_SCRIPT_LINK" }],
    // add a script
    [
      "script",
      {},
      `\
        // your script here
      `,
    ],
    // add an external CSS
    ["link", { rel: "stylesheet", href: "YOUR_STYLE_LINK" }],
    // add a style
    // We don't recommend this, you should prefer to use .vuepress/style/index.scss
    [
      "style",
      {},
      `\
        /* your style here */
      `,
    ],
  ],

  //...
});
```

:::

## Per Page

If you need to add page-level CSS and JS, please set `head` option in [Front Matter](../../cookbook/vuepress/page.md#frontmatter).

```md
---
head:
  - script: YOUR_SCRIPT_LINK
  - script:
      type: module
      src: YOUR_SCRIPT_LINK
  - style: YOUR_STYLE_LINK
  - style:
      type: text/css
      content: |
        /* your style here */
---

Page content

...
```

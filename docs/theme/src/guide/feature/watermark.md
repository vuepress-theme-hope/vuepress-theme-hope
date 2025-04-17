---
title: Watermark
icon: xmarks-lines
category:
  - Feature
tag:
  - Feature
  - Watermark
watermark: true
---

VuePress Theme Hope allows you to add watermark with [`@vuepress/plugin-watermark`][watermark].

<!-- more -->

## Introduction

You can customize the watermark behavior with `plugins.watermark` in theme options, or with `watermark` in page frontmatter.

The simplest way is to set it to `true` to get a site name watermark:

- Enable globally:

  ```ts twoslash {5} title=".vuepress/theme.ts"
  import { hopeTheme } from "vuepress-theme-hope";

  export default hopeTheme({
    plugins: {
      watermark: true,
    },
  });
  ```

- Enable in a specific page:

  ```md title="example.md"
  ---
  watermark: true
  ---
  ```

You can also fully customize the watermark:

- Customize globally:

  ```ts twoslash {5-11} title=".vuepress/theme.ts"
  import { hopeTheme } from "vuepress-theme-hope";

  export default hopeTheme({
    plugins: {
      watermark: {
        watermarkOptions: {
          content: "Customized Content",
          movable: true,
          // other options
        },
      },
    },
  });
  ```

- Customize in a specific page:

  ```md title="example.md"
  ---
  watermark:
    width: 200
    height: 200
    content: Your Content
    opacity: 0.5
  ---
  ```

For detailed configuration, see [watermark plugin docs][watermark-config].

[watermark]: https://ecosystem.vuejs.press/plugins/features/watermark.html
[watermark-config]: https://ecosystem.vuejs.press/plugins/features/watermark.html#options

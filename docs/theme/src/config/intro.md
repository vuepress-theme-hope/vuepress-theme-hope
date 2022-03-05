---
title: Config Intro
icon: config
category:
  - Config
tag:
  - Intro
---

## Config Concepts

VuePress mainly stores config and required files through the `.vuepress/` folder in the directory.

::: info

For the file structure of VuePress, see [VuePress Basics → File Structure](../cookbook/vuepress/file.md).

:::

In VuePress, there are three config concepts:

- Site Config: this is the object you export directly in the config file
- Theme Config: `themeConfig` object in the config file
- Page Config: provided by Frontmatter at the top of the page based on YAML syntax

## Theme Usage

:::: code-group

::: code-group-item TS

```ts {2,4,6,8,9}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  // siteConfig here
  themeConfig: {
    // themeConfig here
  },
});
```

:::

::: code-group-item JS

```js {2,4,6,8,9}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  // siteConfig here
  themeConfig: {
    // themeConfig here
  },
});
```

:::

::::

---
title: Config Intro
icon: gears
order: 1
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
- Theme Config: first option passed to `hopeTheme` function
- Page Config: provided by Frontmatter at the top of the page based on YAML syntax

## Theme Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // siteConfig here
  // ...

  theme: hopeTheme(
    {
      // themeConfig here
      // ...
    },
    {
      // theme behavior options here (optional)
    },
  ),
});
```

@tab JS

```js
// .vuepress/config.js
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // siteConfig here
  // ...

  theme: hopeTheme(
    {
      // themeConfig here
      // ...
    },
    {
      // theme behavior options here (optional)
    },
  ),
});
```

:::

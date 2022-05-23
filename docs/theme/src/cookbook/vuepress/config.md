---
title: VuePress Config
icon: config
category:
  - Cookbook
  - VuePress
tag:
  - Config
  - VuePress
---

## Config File

Without any configuration, the VuePress site is pretty minimal. To customize your site, let’s first create a `.vuepress` directory inside your docs directory. This is where all VuePress-specific files will be placed. Your project structure is probably like this:

```
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
├─ .gitignore
└─ package.json
```

The essential file for configuring a VuePress site is `.vuepress/config.js`, while TypeScript config file is also supported. You can use `.vuepress/config.ts` instead to get better types hint for VuePress Config.

A basic config file looks like this:

::: code-tabs#language

@tab TS

```ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // site config
  lang: "en-US",
  title: "Hello VuePress",
  description: "Just playing around",

  // theme
  theme: hopeTheme({
    // theme config
  }),
});
```

@tab JS

```js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  // site config
  lang: "en-US",
  title: "Hello, VuePress!",
  description: "This is my first VuePress site",

  // theme
  theme: hopeTheme({
    // theme config
  }),
};
```

:::

::: tip

Check out the [Config Reference](https://v2.vuepress.vuejs.org/reference/config.md) for a full list of VuePress config.

:::

## Config Scopes

### Site Config

Site config means that, no matter what theme you are using, these configurations are always valid.

As we know, every site should have its own `lang`, `title`, `description`, etc. Thus, VuePress has built-in support for those options.

### Theme Config

Theme config will be processed by VuePress theme, so it depends on the theme you are using.

To use `vuepress-theme-hope`, you should import `hopeTheme` from it, passing in your theme options and call it, then assign it to `theme` option.

::: warning

If you don’t specify the `theme` option of VuePress config, the default theme will be used.

:::

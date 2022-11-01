---
title: Theme Config
icon: palette
category:
  - Cookbook
  - VuePress
tag:
  - Theme
  - VuePress
---

VuePress theme can provide layouts, styles and many other features for you, helping you to focus on writing Markdown content.

## Default Theme

VuePress has a default theme out of the box, which is applied to our documentation site you are currently browsing.

If you don’t specify the theme to use, the default theme will be used automatically.

To configure the default theme, you need to import and use it in your config file via the [theme](https://v2.vuepress.vuejs.org/reference/config.html#theme) option:

```js
import { defaultTheme } from "vuepress";

export default {
  theme: defaultTheme({
    // default theme config
    navbar: [
      {
        text: "Home",
        link: "/",
      },
    ],
  }),
};
```

The default theme provides basic but useful features for documentation site, you can check out [Default Theme Config Reference](https://v2.vuepress.vuejs.org/reference/default-theme/config.html) for a full list of config.

However, you might think it is not good enough. Or, you want to build a different type of site, for example, a blog, instead of a documentation. Then, you can try to use a community theme or create a local theme.

## Community Theme

Community users have created lots of theme and published them to [NPM](https://www.npmjs.com/search?q=keywords:vuepress-theme). You should check the theme's own documentation for detailed guide.

## Local Theme

If you want to use your own custom theme but don’t want to publish it, you can create a local theme. Refer to [Advanced > Writing a Theme](https://v2.vuepress.vuejs.org/advanced/theme.html) for how to write your own theme.

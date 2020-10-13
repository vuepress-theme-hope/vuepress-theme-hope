---
title: Install / Usage
icon: install
category: instruction
tags: intro
---

## Use in new project

You can use [vuepress-theme-hope template](https://github.com/Mister-Hope/vuepress-theme-hope-template) directly to start your vuepress journey.

## Use in existing project

### Installation

```bash
npm i -D vuepress-theme-hope
```

### Usage

```js
// .vuepress/config.js
const resolve = require("vuepress-theme-hope/resolve");

module.exports = resolve({
  // your config here
});
```

::: tip
In order to minimize user configuration, vuepress-theme-hope provides some additional configuration options that need to be processed before being submitted to vuepress. At the same time, vuepress-theme-hope will also allow you to omit some configurations and automatically generate them for you.

For example, automatically generate multi-language options in the project configuration for you based on the multi-language options in your theme configuration, and automatically help you complete the localization work.
:::

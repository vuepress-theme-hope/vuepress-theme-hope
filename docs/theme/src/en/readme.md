---
home: true
title: vuepress-theme-hope
heroImage: /logo.svg
heroText: vuepress-theme-hope
tagline: A light Vuepress theme
actionText: Get Started →
actionLink: /en/guide/
features:
- title: Custom theme color and night mode
  details: Supports custom theme colors and allows users to switch between preset theme colors
  link: /en/guide/themecolor.html#custom-theme-color
- title: Night mode
  details: Switch between offical style and a cool night mode theme
  link: /en/guide/themecolor.html#nightmode
- title: Pageviews and comments
  details: with Valine and Vssue to start pageview statistics and comment support
  link: /en/guide/comment.html
- title: Enhancements to the default theme
  details: Enhances a range of features based on the default theme, path navigation, footer support, author display, etc.
- title: Icon Support
  details: Icon support through the whole theme
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

### vuepress-theme-hope is a light vuepress theme

### Install

```bash
npm i -D vuepress-theme-hope
```

### Usage

```js
// .vuepress/config.js
const resolve = require('vuepress-theme-hope/resolve');

module.exports = resolve({
  // your config here
});
```

::: tip Why using `resolve` function
**vuepress-theme-hope** is extendsng from the official default theme. In order to reduce user configuration as much as possible, **vuepress-theme-hope** provides some additional configuration options that need to be processed before submitting to the official theme. In addition, **vuepress-theme-hope** will also automatically generate some configurations for you, such as automatically selecting the multi-language options in your theme configuration, generating the multi-language options in the project configuration for you, and automatically helping you complete the localization work.
:::

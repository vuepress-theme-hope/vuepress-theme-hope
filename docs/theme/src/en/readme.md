---
home: true
icon: homefill
title: vuepress-theme-hope
heroImage: /logo.svg
heroText: vuepress-theme-hope
tagline: A light Vuepress theme
action:
  - text: Get Started 💡
    link: /en/guide/

  - text: Config 🛠
    link: /en/config/

features:
  - title: Pageviews and comments
    details: Start pageview statistics and comment support with Valine and Vssue
    link: /en/guide/feature/comment/

  - title: Article information display
    details: Add author, writing date, reading time, word count and other information to your article
    link: /en/guide/feature/page-info/

  - title: Markdown Enhance
    details: Add align, sup/sub script, footnote, tex, flowchart and mark support in markdown
    link: /en/guide/feature/markdown/

  - title: Blog support
    details: Just date, tags and category to your articles, then article, tag, category and timeline list will be auto generated
    link: /en/guide/feature/blog/

  - title: Article Encryption
    details: Encrypt you article based on path and folders, so that only the one you want could see them
    link: /en/guide/feature/blog/

  - title: Custom theme color
    details: Supports custom theme colors and allows users to switch between preset theme colors
    link: /en/guide/feature/themecolor/

  - title: Dark Mode
    details: Switch between light and dark modes freely
    link: /en/guide/feature/darkmode/

  - title: Sitemap generation and SEO enhancement
    details: The theme can automatically generate a Sitemap for your website, and optimize the resulting web page for search engines.
    link: /en/guide/feature/seoAndSitemap/

  - title: More new features
    details: Including icon support, path navigation, footer support, fullscreen button, blog homepage, etc.
    link: /en/guide/feature/

  - title: PWA support
    details: The built-in PWA plugin will make your website more like an APP.
    link: /en/config/plugin/pwa/

  - title: TS support
    details: Turn on Typescript support for your Vuepress
    link: /en/guide/feature/typescript/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## Use themes

You can use [vuepress-theme-hope template](https://github.com/Mister-Hope/vuepress-theme-hope-template) directly to start your vuepress journey.

### Install

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
The purpose of introducing the resolve function is to give you full hints through TS's Interface and JSDoc when you edit the configuration.

At the same time, the resolve function will also complete some default configurations for your current configuration which will pass directly to vuepress.
:::

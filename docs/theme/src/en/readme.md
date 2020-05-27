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
  - title: Custom theme color
    details: Supports custom theme colors and allows users to switch between preset theme colors
    link: /en/guide/feature/themecolor/

  - title: Dark Mode
    details: Switch between light and dark modes freely
    link: /en/guide/feature/darkmode/

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
    details: Add date, tags and category to your articles, than we will generate article, tag, category and timeline list for you
    link: /en/guide/feature/blog/

  - title: Article Encryption
    details: Encrypt you article based on path and folders, so that only the one you want could see them
    link: /en/guide/feature/blog/

  - title: More new features
    details: Including icon support, path navigation, footer support, fullscreen button, blog homepage, etc.

  - title: PWA support
    details: The built-in PWA plugin will make your website more like an APP.

  - title: TS support
    details: Turn on Typescript support for your Vuepress

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

### FAQ

If you do not have typescript package in your project, you may also need to install it:

```bash
npm i -D typescript
```

And then create a `tsconfig.json` file in your root directory:

```json
{
  "compilerOptions": {
    "target": "ES6", /// Any target which is not less than 'ES5'
    "allowSyntheticDefaultImports": true, // Avoiding some issues related to vuepress-types
    "experimentalDecorators": true, // Typescript files for '.vue' needs this option
    "module": "commonjs", // Avoiding some issues related to vuepress-types
    // type definition files of vuepress and this theme
    "types": ["@mr-hope/vuepress-theme-types"]
  },
  "include": [
    "src/.vuepress/enhanceApp.ts" // replace `src` with your doc folder
  ]
}
```

If Typescript related errors appears in the conosle, that means Typescript is not correctly configured in your project.

For more details, please see [FAQ](FAQ/readme.md)

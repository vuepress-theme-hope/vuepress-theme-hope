---
home: true
title: vuepress-theme-hope
heroImage: /logo.svg
heroText: vuepress-theme-hope
tagline: A light Vuepress theme
actionText: Get Started →
actionLink: /en/guide/
features:
  - title: Custom theme color
    details: Supports custom theme colors and allows users to switch between preset theme colors
    link: /en/guide/feature/themecolor.html

  - title: Dark Mode
    details: Switch between light and dark modes freely
    link: /en/guide/feature/darkmode.html

  - title: Pageviews and comments
    details: Start pageview statistics and comment support with Valine and Vssue
    link: /en/guide/feature/comment.html

  - title: Blog support
    details: add dates, tags and categories to your articles and display them based on visitor filters
    link: /en/guide/feature/blog.html

  - title: More new features
    details: Enhanced a series of features based on the default theme, including icon support, path navigation, footer support, author display, etc.

  - title: PWA support
    details: The built-in PWA plugin will make your website more like an APP.

  - title: TS support
    details: Turn on Typescript support for your Vuepress

footer: MIT Licensed | Copyright © 2019-present Mr. Hope
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
const resolve = require('vuepress-theme-hope/resolve');

module.exports = resolve({
  // your config here
});
```

::: tip
The purpose of introducing the resolve function is to give you full hints through TS's Interface and JSDoc when you edit the configuration.

At the same time, the resolve function will also complete some default configurations for your current configuration items when you preview or package the project, reducing the calculation pressure when rendering the website.
:::

### FAQ

If your project does not use typescript, you may also need to install typescript:

```bash
npm i -D typescript
```

And create a `tsconfig.json` file in your root directory

```json
{
  "compilerOptions": {
    "target": "ES6", /// Any target which is not less than 'ES5'
    "experimentalDecorators": true, // Typescript files for '.vue' needs this option
    // type definition files of vuepress and this theme
    "types": ["@mr-hope/vuepress-theme-types", "vuepress-types"]
  },
  "include": [
    "src/.vuepress/enhanceApp.ts" // replace `src` with your doc folder
  ]
}
```

If Typescript related errors appears in the conosle, that means Typescript is not correctly configured in your project.

For more details, please see [FAQ](FAQ/readme.md)

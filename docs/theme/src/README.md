---
home: true
icon: home
title: Home
heroImage: /logo.svg
heroText: vuepress-theme-hope
tagline: A vuepress theme with tons of features✨
actions:
  - text: Get Started 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config/

features:
  - title: Markdown Enhance
    icon: markdown
    details: Add align, sup/sub script, footnote, tasklist, tex, flowchart, diagram, mark and presentation support in markdown
    link: /guide/markdown/

  - title: Pageviews and comments
    icon: comment
    details: Start pageview statistics and comment support with Waline
    link: /guide/feature/comment/

  - title: Article information display
    icon: info
    details: Add author, writing date, reading time, word count and other information to your article
    link: /guide/feature/page-info/

  - title: Blog support
    icon: blog
    details: Add date, tags and category to your articles, then article, tag, category and timeline list will be auto generated
    link: /guide/blog/intro/

  - title: Article Encryption
    icon: lock
    details: Encrypt you article based on path and folders, so that only the one you want could see them
    link: /guide/feature/encrypt/

  - title: Custom theme color
    icon: skin
    details: Supports custom theme colors and allows users to switch between preset theme colors
    link: /guide/interface/theme-color/

  - title: Dark Mode
    icon: contrast
    details: Switch between light and dark modes freely
    link: /guide/interface/darkmode/

  - title: SEO enhancement
    icon: config
    details: Optimize pages for search engines
    link: /guide/feature/seo/

  - title: Sitemap
    icon: sitemap
    details: Generate a Sitemap for your website
    link: /guide/feature/sitemap/

  - title: Feed support
    icon: rss
    details: Generate feed to allow users to subcribe it
    link: /guide/feature/feed/

  - title: PWA support
    icon: mobile
    details: Make your website more like an APP
    link: /guide/feature/pwa/

  - title: More new features
    icon: more
    details: Including icon support, path navigation, footer support, fullscreen button, blog homepage, etc.
    link: /guide/feature/

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## 🛠Install

Create a vuepress-theme-hope project in `[dir]` folder under the current project:

:::: code-group

::: code-group-item yarn

```bash
yarn create vuepress-theme-hope [dir]
```

:::

::: code-group-item npm

```bash
npm init vuepress-theme-hope [dir]
```

:::

::::

## 🚀Usage

:::: code-group

::: code-group-item TS

```ts {2,4,6}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  // your config here
});
```

:::

::: code-group-item JS

```js {2,4,6}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  // your config here
});
```

:::

::::

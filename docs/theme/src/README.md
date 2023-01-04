---
home: true
icon: home
title: Home
heroImage: /logo.svg
heroText: VuePress Theme Hope
tagline: A VuePress theme with tons of features✨
actions:
  - text: Tutorial 🧭
    link: /cookbook/tutorial/
    type: primary

  - text: Intro 💡
    link: /guide/get-started/intro.html

  - text: Config 🛠
    link: /config/

  - text: Online Demo 🪀
    link: https://stackblitz.com/fork/vuepress-theme-hope

features:
  - title: Markdown Enhance
    icon: markdown
    details: Add align, sup/sub script, footnote, tasklist, tex, flowchart, diagram, mark and presentation support in Markdown
    link: /guide/markdown/

  - title: Slide Page
    icon: slides
    details: Adding slide pages to display things you like
    link: /guide/layout/slides

  - title: Layout Enhancement
    icon: layout
    details: Adding breadcrumb, footer, improved navbar, improved page nav and etc.
    link: /guide/layout/

  - title: Pageviews and Comments
    icon: comment
    details: Start pageview statistics and comment support with Waline
    link: /guide/feature/comment.html

  - title: Article Information
    icon: info
    details: Add author, writing date, reading time, word count and other information to your article
    link: /guide/feature/page-info.html

  - title: Blog Support
    icon: blog
    details: Listing your articles with their dates, tags and categories with some awesome layouts
    link: /guide/blog/

  - title: Customizable Theme Color
    icon: palette
    details: Customize theme color
    link: /guide/interface/theme-color.html

  - title: Dark Mode
    icon: contrast
    details: Switch between light and dark modes freely
    link: /guide/interface/darkmode.html

  - title: Full A11y support
    icon: support
    details: Full support of accessibility in your site
    link: /guide/interface/accessibility.html

  - title: Article Encryption
    icon: lock
    details: Encrypt you articles based on page links, so that only the one you want could see them
    link: /guide/feature/encrypt.html

  - title: Search
    icon: search
    details: Support docsearch and client search
    link: /guide/feature/search.html

  - title: Copy Code Blocks
    icon: copy
    details: Copy codes with one click in code blocks
    link: /guide/feature/copy-code.html

  - title: Image Preview
    icon: pic
    details: Support viewing, zooming, sharing your page images like a gallery
    link: /guide/feature/photo-swipe.html

  - title: SEO Enhancement
    icon: config
    details: Optimize pages for search engines
    link: /guide/advanced/seo.html

  - title: Sitemap
    icon: sitemap
    details: Generate a Sitemap for your site
    link: /guide/advanced/sitemap.html

  - title: Feed
    icon: rss
    details: Generate feed to allow users to subscribe it
    link: /guide/advanced/feed.html

  - title: PWA
    icon: mobile
    details: Make your site more like an APP
    link: /guide/advanced/pwa.html

  - title: More New Features
    icon: more
    details: Including icon support, fullscreen button, etc.
    link: /guide/feature/

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## 🛠Install

Create a new vuepress-theme-hope project in `[dir]` directory under the current path:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope@next [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope@next [dir]
```

:::

To add vuepress-theme-hope as docs builder to an existing project, run the following command in the project root directory:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope@next add [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope@next add [dir]
```

:::

## 🚀Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // your theme config here
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    // your theme config here
  }),
};
```

:::

## Step by Step Tutorial

- [Tutorial](cookbook/tutorial/README.md)

## Telegram Group

- [vuepressthemehope](https://t.me/vuepressthemehope)

<NetlifyBadge />

<script setup lang="ts">
import NetlifyBadge from "@NetlifyBadge";
</script>

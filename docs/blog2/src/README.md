---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-blog2
tagline: Blog plugin for VuePress2
actions:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-blog2@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-blog2@next
```

@tab npm

```bash
npm i -D vuepress-plugin-blog2@next
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { blogPlugin } from "vuepress-plugin-blog2";

export default {
  plugins: [
    blogPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { blogPlugin } from "vuepress-plugin-blog2";

export default {
  plugins: [
    blogPlugin({
      // your options
    }),
  ],
};
```

:::

## Migrating from V1

This plugin wasn’t released in V1.

If you were using `@vuepress/plugin-blog` in VuePress1, you should know that this plugin is targeting a total different level with `@vuepress/plugin-blog`.

- `@vuepress/plugin-blog` is more like a blogging utils collection targeting users.

  It gives you detailed options to filter with frontmatter, dir and other conditions. Also, it's combined with feed, sitemap, mailchimp, pagination and other blog related features. Mainly, you get collections you want using complicated options, and the results are mixed in globally with pagination.

- `vuepress-plugin-blog2` however, is targeting theme developers, and only have < 1kb gzipped client chunk size.

  Since `siteData.pages` is no longer available in VuePress2 for scalability reasons, the plugin is only injecting them to routeMeta on node side and provide composition apis for you to get them on client side. While it does not provide any related features such as pagination, feed, sitemap. Mainly, you will get collections through functions returning values from page objects, and you will need to use other plugins to provide other features, and handle pagination yourself.

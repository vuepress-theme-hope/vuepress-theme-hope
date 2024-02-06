---
home: true
title: Home
icon: home
heroText: vuepress-plugin-search-pro
tagline: Powerful client search plugin for VuePress2
actions:
  - text: Guide
    icon: lightbulb
    link: ./guide.html
    type: primary

  - text: Config
    icon: tools
    link: ./config.html

features:
  - title: High Performance
    icon: rocket
    details: High speed searching in a separated worker powered by <strong>slimsearch</strong>
    link: ./guide.html#ultra-fast

  - title: Full Indexing
    icon: file-zipper
    details: Indexing all contents in your site
    link: ./guide.html#index-range

  - title: Highlight and Context
    icon: highlighter
    details: Highlight keywords and show related context in search result
    link: ./guide.html#highlighting-and-context

  - title: Auto Suggest
    icon: lightbulb
    details: Get query suggestions while typing
    link: ./guide.html#auto-suggestions

  - title: Custom Fields
    icon: gears
    details: Adding data to index with options
    link: ./guide.html#custom-fields

  - title: Search History
    icon: clock
    details: Preserve history of queries and results
    link: ./guide.html#query-and-search-history

footer: MIT Licensed | Copyright © 2022-present Mr.Hope
copyrightText: false
---

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-search-pro
```

@tab yarn

```bash
yarn add -D vuepress-plugin-search-pro
```

@tab npm

```bash
npm i -D vuepress-plugin-search-pro
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts title=".vuepress/config.ts"
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default {
  plugins: [
    searchProPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js title=".vuepress/config.js"
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default {
  plugins: [
    searchProPlugin({
      // your options
    }),
  ],
};
```

:::

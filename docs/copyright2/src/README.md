---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-copyright2
tagline: Append copyright info during copy
actions:
  - text: Guide 💡
    link: ./guide.html
    type: primary

  - text: Config 🛠
    link: ./config.html

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-copyright2
```

@tab yarn

```bash
yarn add -D vuepress-plugin-copyright2
```

@tab npm

```bash
npm i -D vuepress-plugin-copyright2
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { copyrightPlugin } from "vuepress-plugin-copyright2";

export default {
  plugins: [
    copyrightPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { copyrightPlugin } from "vuepress-plugin-copyright2";

export default {
  plugins: [
    copyrightPlugin({
      // your options
    }),
  ],
};
```

:::

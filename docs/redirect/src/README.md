---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-redirect
tagline: Redirect Plugin for VuePress2
actions:
  - text: Guide 💡
    link: ./guide.html
    type: primary

  - text: Config 🛠
    link: ./config.html

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyrightText: false
---

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-redirect
```

@tab yarn

```bash
yarn add -D vuepress-plugin-redirect
```

@tab npm

```bash
npm i -D vuepress-plugin-redirect
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { redirectPlugin } from "vuepress-plugin-redirect";

export default {
  plugins: [
    redirectPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { redirectPlugin } from "vuepress-plugin-redirect";

export default {
  plugins: [
    redirectPlugin({
      // your options
    }),
  ],
};
```

:::

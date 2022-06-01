---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-redirect
tagline: Redirect Plugin for VuePress2
actions:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-redirect@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-redirect@next
```

@tab npm

```bash
npm i -D vuepress-plugin-redirect@next
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
const { redirectPlugin } = require("vuepress-plugin-redirect");

module.exports = {
  plugins: [
    redirectPlugin({
      // your options
    }),
  ],
};
```

:::

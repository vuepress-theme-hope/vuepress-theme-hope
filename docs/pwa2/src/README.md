---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-pwa2
tagline: Turning on Progressive Web App Support
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
pnpm add -D vuepress-plugin-pwa2@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-pwa2@next
```

@tab npm

```bash
npm i -D vuepress-plugin-pwa2@next
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { pwaPlugin } from "vuepress-plugin-pwa2";

export default {
  plugins: [
    pwaPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { pwaPlugin } from "vuepress-plugin-pwa2";

export default {
  plugins: [
    pwaPlugin({
      // your options
    }),
  ],
};
```

:::

::: tip

If you are using this plugin, we recommend you to set `shouldPrefetch: false` in your VuePress config file.

:::

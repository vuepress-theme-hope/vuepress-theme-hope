---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-lightgallery
tagline: Light gallery plugin for VuePress2
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
pnpm add -D vuepress-plugin-lightgallery@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-lightgallery@next
```

@tab npm

```bash
npm i -D vuepress-plugin-lightgallery@next
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { lightgalleryPlugin } from "vuepress-plugin-lightgallery";

export default {
  plugins: [
    lightgalleryPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { lightgalleryPlugin } from "vuepress-plugin-lightgallery";

export default {
  plugins: [
    lightgalleryPlugin({
      // your options
    }),
  ],
};
```

:::

::: danger LICENSE RESTRICTIONS

Please note that although this plugin release under MIT license, we are currently making this possible with a built-in [organization license of lightgallery](https://www.lightgalleryjs.com/license/) of VuePress Theme Hope, and we would like to admit you are a member of our organization if you are using it for non-commercial usage.

The organization license has no limit for you under non-commercial usage as it supports unlimited developers and unlimited products. You are safe to publish your docs or project with this plugin under ANY License.

But PLEASE DO AWARE that organizational license can only be used on one product. To use this plugin for commercial usage, since lightgallery is under [GNU GPL license v3](https://www.gnu.org/licenses/gpl-3.0.html), you must put your source code under the [GNU GPL license v3](https://www.gnu.org/licenses/gpl-3.0.html) license, or consider [purchasing a license](https://www.lightgalleryjs.com/license/) to avoid troubles.

YOU ARE WARNED!

:::

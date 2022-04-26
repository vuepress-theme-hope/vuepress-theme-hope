---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-sass-palette
tagline: Sass palette plugin for VuePress2
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

:::: code-group

::: code-group-item pnpm

```bash
pnpm add -D vuepress-plugin-sass-palette@next
```

:::

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-sass-palette@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-sass-palette@next
```

:::

::::

### Usage

You must invoke `useSassPalettePlugin` function during plugin initialization to use this plugin.

:::: code-group

::: code-group-item TS

```ts
// Your plugin or theme entry
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import type { PluginFunction } from "@vuepress/core";

const yourPlugin =
  (options): PluginFunction =>
  (app) => {
    useSassPalettePlugin(app, {
      // plugin options
    });

    return {
      // your plugin api
    };
  };

export default yourPlugin;
```

:::

::: code-group-item JS

```js
// Your plugin or theme entry
const { useSassPalettePlugin } = require("vuepress-plugin-sass-palette");

module.exports = (options) => (app) => {
  useSassPalettePlugin(app, {
    // plugin options
  });

  return {
    // your plugin api
  };
};
```

:::

::::

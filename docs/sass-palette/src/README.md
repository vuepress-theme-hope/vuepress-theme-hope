---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-sass-palette
tagline: Sass palette plugin for VuePress2
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
pnpm add -D vuepress-plugin-sass-palette
```

@tab yarn

```bash
yarn add -D vuepress-plugin-sass-palette
```

@tab npm

```bash
npm i -D vuepress-plugin-sass-palette
```

:::

### Usage

You must invoke `useSassPalettePlugin` function during plugin initialization to use this plugin.

::: code-tabs#language

@tab TS

```ts
// Your plugin or theme entry
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";
import type { PluginFunction } from "@vuepress/core";

export const yourPlugin =
  (options): PluginFunction =>
  (app) => {
    useSassPalettePlugin(app, {
      // plugin options
    });

    return {
      // your plugin api
    };
  };
```

@tab JS

```js
// Your plugin or theme entry
import { useSassPalettePlugin } from "vuepress-plugin-sass-palette";

export const yourPlugin = (options) => (app) => {
  useSassPalettePlugin(app, {
    // plugin options
  });

  return {
    // your plugin api
  };
};
```

:::

---
home: true
title: Home
icon: home
heroText: vuepress-plugin-rtl
tagline: Plugins to support rtl layout for your site

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope
copyright: false
---

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-rtl
```

@tab yarn

```bash
yarn add -D vuepress-plugin-rtl
```

@tab npm

```bash
npm i -D vuepress-plugin-rtl
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { rtlPlugin } from "vuepress-plugin-rtl";

export default {
  plugins: [
    rtlPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { rtlPlugin } from "vuepress-plugin-rtl";

export default {
  plugins: [
    rtlPlugin({
      // your options
    }),
  ],
};
```

:::

## Plugin Options

### locales

- Type: `string[]`
- Default: `['/']`

Locale path to enable rtl.

### selector

- Type: `SelectorOptions`

  ```ts
  interface SelectorOptions {
    [element: string]: {
      [attrs: string]: string;
    };
  }
  ```

- Default: `{ 'html': { dir: 'rtl' } }`

Selector to enable rtl.

The default settings mean that the `dir` attribute of the `html` element will be set to `rtl` in rtl locales.

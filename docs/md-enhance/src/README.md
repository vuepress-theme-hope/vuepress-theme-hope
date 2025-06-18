---
home: true
title: Home
icon: home
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: vuepress-plugin-md-enhance
tagline: Enhancement for Markdown in VuePress
actions:
  - text: Guide
    icon: lightbulb
    link: ./guide/
    type: primary

  - text: Config
    icon: tools
    link: ./config.html

highlights:
  - header: Showing your codes and works
    image: /assets/image/code.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/4-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/4-dark.svg
    highlights:
      - title: Code Demo Support
        icon: laptop-code
        details: You can insert code demo easily
        link: ./guide/code/demo/

      - title: Playground Support
        icon: code
        details: You can add playground in Markdown files
        link: ./guide/code/playground.html

      - title: Kotlin playground Support
        icon: b:kickstarter
        details: Reactive kotlin playground
        link: ./guide/code/kotlin-playground.html

      - title: Vue playground Support
        icon: b:vuejs
        details: Show living vue component in playground
        link: ./guide/code/vue-playground.html

      - title: Sandpack playground Support
        icon: code
        details: A live coding environment driven by Sandpack.
        link: ./guide/code/sandpack.html

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

## Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-md-enhance
```

@tab yarn

```bash
yarn add -D vuepress-plugin-md-enhance
```

@tab npm

```bash
npm i -D vuepress-plugin-md-enhance
```

:::

## Usage

::: code-tabs#language

@tab TS

```ts title=".vuepress/config.ts"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // your options
    }),
  ],
};
```

:::

## Migrating from V1

For details, see [Migration Guide](./migration.md).

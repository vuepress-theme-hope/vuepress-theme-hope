---
title: Install / Usage
icon: install
tags: intro
category: instruction
---

## Use in new project

You can use [vuepress-theme-hope template](https://github.com/Mister-Hope/vuepress-theme-hope-template) directly to start your vuepress journey.

## Use in existing project

### Installation

```bash
npm i -D vuepress-theme-hope
```

### Usage

```js
// .vuepress/config.js
const resolve = require('vuepress-theme-hope/resolve');

module.exports = resolve({
  // your config here
});
```

::: tip
The purpose of introducing the resolve function is to give you full hints through TS's Interface and JSDoc when you edit the configuration.

At the same time, the resolve function will also complete some default configurations for your current configuration items when you preview or package the project, reducing the calculation pressure when rendering the website.
:::

If your project does not use typescript, you may also need to install typescript:

```bash
npm i -D typescript
```

And create a `tsconfig.json` file in your root directory

```json
{
  "compilerOptions": {
    "target": "es6", // Any target not lower than 'es6'
    "experimentalDecorators": true,
    "types": ["@mr-hope/vuepress-theme-types", "vuepress-types"]
  },
  "include": [
    "src/.vuepress/enhanceApp.ts" // replace `src` with your doc folder
  ]
}
```

If you already have `tsconfig.json`, then you only need to add the type definition file package of vuepress-theme-hope to `compilerOptions.types`.

You should also create a ts file in your project and add it in the `include` option of `tsconfig.json`. You can simply create an empty enhanceApp.ts and import it.

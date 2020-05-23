---
title: Install / Usage
icon: install
category: instruction
tags: intro
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
const resolve = require("vuepress-theme-hope/resolve");

module.exports = resolve({
  // your config here
});
```

::: tip
In order to minimize user configuration, vuepress-theme-hope provides some additional configuration options that need to be processed before being submitted to vuepress. At the same time, vuepress-theme-hope will also allow you to omit some configurations and automatically generate them for you.

For example, automatically generate multi-language options in the project configuration for you based on the multi-language options in your theme configuration, and automatically help you complete the localization work.
:::

If your project does not use typescript, you may also need to install typescript:

```bash
npm i -D typescript
```

And create a `tsconfig.json` file in your root directory

```json
{
  "compilerOptions": {
    "target": "ES6", // Any target not lower than 'es6'
    "allowSyntheticDefaultImports": true, // Avoiding some issues related to vuepress-types
    "experimentalDecorators": true, // Typescript files for '.vue' needs this option
    "module": "commonjs", // Avoiding some issues related to vuepress-types
    "types": ["@mr-hope/vuepress-theme-types"]
  },
  "include": [
    "src/.vuepress/enhanceApp.ts" // replace `src` with your doc folder
  ]
}
```

If you already have `tsconfig.json`, then you only need to add the type definition file package of vuepress-theme-hope to `compilerOptions.types`.

You should also create a ts file in your project and add it in the `include` option of `tsconfig.json`. You can simply create an empty enhanceApp.ts and import it.

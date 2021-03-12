---
title: TS support
icon: typescript
category: feature
tags:
  - feature
  - typescript
---

Most of the files of vuepress-theme-hope are written using TypeScript, so vuepress-theme-hope can also bring native TypeScript support to your VuePress project, you only need to set `themeConfig.typescript` to `true` so that support for `typescript` can be turned on.

This means you can use `enhanceAppFiles.ts` and use TypeScript in both your vue components and Markdown files.

To pass some custom options to ts-loader, you can also set `themeConfig.typescript` with an Object to pass it to ts-loader.

<!-- more -->

::: tip

After enabling this theme, you no longer need to require and enable `@vuepress/plugin-typescript`.

:::

## Precautions

If your project does not use typescript, you may also need to install typescript:

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D typescript
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm i -D typescript
```
</CodeGroupItem>
</CodeGroup>

At the same time, you need to ensure that your workspace contains a valid `tsconfig.json`. One of the simplest `tsconfig.json` is as follows:

```json
{
  "compilerOptions": {
    "target": "ES6", // Any target not lower than 'es6'
    "allowSyntheticDefaultImports": true, // Avoiding some issues related to vuepress-types
    "experimentalDecorators": true, // TypeScript files for '.vue' needs this option
    "module": "commonjs", // Avoiding some issues related to vuepress-types
    "types": ["@mr-hope/vuepress-theme-types"]
  },
  // At least one ts file should be included in the project (empty files are also acceptable)
  "include": [
    "src/.vuepress/enhanceApp.ts" // replace `src` with your doc folder
  ]
}
```

If you already have `tsconfig.json`, then you only need to add the type definition file package of vuepress-theme-hope `"@mr-hope/vuepress-theme-types"` to `compilerOptions.types`.

You should also create a ts file in your project and add it in the `include` option of `tsconfig.json`. You can create an empty enhanceApp.ts and import it.

::: warning

`ts-loader` requires `tsconfig.json` to hit at least one valid ts file, so the easiest way is to create or convert (if you already have `enhanceAppFiles.js`) an `enhanceAppFiles.ts` and add it in the `include` option

:::
